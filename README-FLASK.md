# FOLLICLE FORCE 3000™ 🦁 Hair Growth Website

Welcome to the most REVOLUTIONARY hair growth website ever created! This Python Flask application transforms the static HTML infomercial into a dynamic web application with customer database functionality, ready for deployment on AWS EC2.

## 🚀 Features

### Core Functionality
- **Python Flask Web Application**: Complete rewrite from static HTML to dynamic Python
- **Customer Database**: SQLite database to store customer information
- **Order Form**: Comprehensive customer information collection
- **Admin Dashboard**: View all customers and their information
- **RESTful API**: JSON API endpoints for customer data
- **Health Checks**: Built-in health monitoring for load balancers

### The Experience
- **Infomercial Magic**: All the ridiculous charm of the original website
- **Interactive Elements**: Dynamic countdowns, animations, and effects
- **Mobile Responsive**: Works perfectly on all devices
- **Form Validation**: Client and server-side validation
- **Flash Messages**: User feedback for all actions

## 📁 Project Structure

```
follicle-force-3000/
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── templates/                  # Jinja2 templates
│   ├── base.html              # Base template
│   ├── index.html             # Main page
│   ├── order.html             # Order form
│   ├── thank_you.html         # Success page
│   └── customers.html         # Admin customer list
├── static/                     # Static assets
│   ├── styles.css             # CSS styles
│   └── script.js              # JavaScript
├── packer-template.json        # Packer AMI template
├── packer-vars.json           # Packer variables
├── follicle-force.service     # Systemd service file
├── nginx-follicle-force.conf  # Nginx configuration
├── deploy.sh                  # Deployment script
└── README-FLASK.md            # This file
```

## 🛠️ Local Development

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Quick Start

1. **Clone or navigate to the project directory**
   ```bash
   cd /home/cam/Classes/cloud_computing/ec2/follicle-force-3000
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   - Main site: http://localhost:5000
   - Order form: http://localhost:5000/order
   - Customer list: http://localhost:5000/customers
   - API: http://localhost:5000/api/customers
   - Health check: http://localhost:5000/health

## 🌐 Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Main landing page |
| `/order` | GET/POST | Order form |
| `/thank-you` | GET | Success page |
| `/customers` | GET | Admin customer list |
| `/api/customers` | GET | JSON API for customers |
| `/health` | GET | Health check endpoint |

## 📊 Database Schema

The application uses SQLite with the following customer table:

```sql
CREATE TABLE customers (
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
);
```

## 🏗️ AWS Deployment

### Option 1: Using Packer (Recommended)

1. **Install Packer**
   ```bash
   # On macOS
   brew install packer
   
   # On Ubuntu/Debian
   curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
   sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
   sudo apt-get update && sudo apt-get install packer
   ```

2. **Configure AWS credentials**
   ```bash
   # Set environment variables
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   
   # Or update packer-vars.json with your credentials
   ```

3. **Build the AMI**
   ```bash
   packer build -var-file=packer-vars.json packer-template.json
   ```

4. **Launch EC2 instance from the created AMI**
   - Use the AMI ID from Packer output
   - Ensure security group allows HTTP (port 80) traffic
   - The application will start automatically

### Option 2: Manual Deployment

1. **Launch Ubuntu 22.04 EC2 instance**
2. **Copy files to instance**
   ```bash
   scp -r . ubuntu@your-instance-ip:/home/ubuntu/
   ```
3. **Run deployment script**
   ```bash
   ssh ubuntu@your-instance-ip
   cd /home/ubuntu/follicle-force-3000
   ./deploy.sh
   ```

## 🔧 Configuration

### Environment Variables
- `PORT`: Application port (default: 5000)
- `FLASK_ENV`: Environment (production/development)
- `DATABASE`: SQLite database path (default: customers.db)

### Service Management
```bash
# Check application status
sudo systemctl status follicle-force

# View logs
sudo journalctl -u follicle-force -f

# Restart application
sudo systemctl restart follicle-force

# Nginx status
sudo systemctl status nginx
```

## 🧪 Testing

### API Testing
```bash
# Health check
curl http://your-domain/health

# Get customers (JSON)
curl http://your-domain/api/customers

# Test form submission
curl -X POST http://your-domain/order \
  -d "first_name=John&last_name=Doe&email=john@example.com"
```

## 📈 Monitoring

The `/health` endpoint returns:
```json
{
  "status": "healthy",
  "timestamp": "2025-09-26T12:00:00.000000"
}
```

## 🎉 Support

Having issues with your hair growth empire? Contact our support team:
- 📞 1-800-HAIR-NOW
- 📧 support@follicleforce3000.com

---

**Remember**: With great hair comes great responsibility! 💇‍♂️✨
