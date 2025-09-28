#!/usr/bin/env python3
"""
Follicle Force 3000 Flask Web Application
A Python-based web server for the hair growth infomercial website
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import sqlite3
import os
from datetime import datetime
import logging

app = Flask(__name__)
app.secret_key = 'follicle-force-super-secret-key-3000'

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE = 'customers.db'

def init_db():
    """Initialize the database with customers table"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            zip_code TEXT,
            hair_type TEXT,
            baldness_level TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    logger.info("Database initialized successfully")

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    """Main page - serve the Follicle Force 3000 website"""
    return render_template('index.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    """Order page with customer information form"""
    if request.method == 'POST':
        try:
            # Get form data
            first_name = request.form['first_name']
            last_name = request.form['last_name']
            email = request.form['email']
            phone = request.form.get('phone', '')
            address = request.form.get('address', '')
            city = request.form.get('city', '')
            state = request.form.get('state', '')
            zip_code = request.form.get('zip_code', '')
            hair_type = request.form.get('hair_type', '')
            baldness_level = request.form.get('baldness_level', '')
            
            # Validate required fields
            if not all([first_name, last_name, email]):
                flash('Please fill in all required fields!', 'error')
                return render_template('order.html')
            
            # Save to database
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO customers 
                (first_name, last_name, email, phone, address, city, state, zip_code, hair_type, baldness_level)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (first_name, last_name, email, phone, address, city, state, zip_code, hair_type, baldness_level))
            
            conn.commit()
            conn.close()
            
            logger.info(f"New customer order: {first_name} {last_name} ({email})")
            flash('🎉 CONGRATULATIONS! Your order has been placed! Your hair will start growing in 3... 2... 1... 🎉', 'success')
            return redirect(url_for('thank_you'))
            
        except sqlite3.IntegrityError:
            flash('This email address is already registered!', 'error')
            return render_template('order.html')
        except Exception as e:
            logger.error(f"Error processing order: {str(e)}")
            flash('There was an error processing your order. Please try again!', 'error')
            return render_template('order.html')
    
    return render_template('order.html')

@app.route('/thank-you')
def thank_you():
    """Thank you page after successful order"""
    return render_template('thank_you.html')

@app.route('/customers')
def customers():
    """Admin page to view all customers (for demonstration)"""
    conn = get_db_connection()
    customers = conn.execute('SELECT * FROM customers ORDER BY created_at DESC').fetchall()
    conn.close()
    return render_template('customers.html', customers=customers)

@app.route('/api/customers', methods=['GET'])
def api_customers():
    """API endpoint to get customers data as JSON"""
    conn = get_db_connection()
    customers = conn.execute('SELECT * FROM customers ORDER BY created_at DESC').fetchall()
    conn.close()
    
    customers_list = []
    for customer in customers:
        customers_list.append({
            'id': customer['id'],
            'first_name': customer['first_name'],
            'last_name': customer['last_name'],
            'email': customer['email'],
            'phone': customer['phone'],
            'address': customer['address'],
            'city': customer['city'],
            'state': customer['state'],
            'zip_code': customer['zip_code'],
            'hair_type': customer['hair_type'],
            'baldness_level': customer['baldness_level'],
            'created_at': customer['created_at']
        })
    
    return jsonify(customers_list)

@app.route('/health')
def health_check():
    """Health check endpoint for load balancer"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/stress')
def cpu_stress():
    """CPU stress endpoint for testing autoscaling"""
    import hashlib
    import random
    
    # Do CPU-intensive work
    result = 0
    for i in range(50000):  # Increased iterations for more CPU load
        data = str(random.random() * 1000000 + i).encode()
        hash_result = hashlib.sha256(data).hexdigest()
        result += len(hash_result)
    
    return jsonify({
        'status': 'stress_complete', 
        'iterations': 50000,
        'result_length': result,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    # Initialize database
    init_db()
    
    # Run the application
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
