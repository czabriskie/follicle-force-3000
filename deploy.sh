#!/bin/bash
# FOLLICLE FORCE 3000™ Deployment Script
# This script sets up the Flask application on a fresh Ubuntu EC2 instance

set -e

echo "🚨 DEPLOYING FOLLICLE FORCE 3000™! 🚨"
echo "=================================="

# Update system
echo "📦 Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Python and dependencies
echo "🐍 Installing Python and dependencies..."
sudo apt-get install -y python3 python3-pip python3-venv nginx git

# Create application directory
echo "📁 Setting up application directory..."
sudo mkdir -p /opt/follicle-force-3000
sudo chown -R $USER:$USER /opt/follicle-force-3000
cd /opt/follicle-force-3000

# Copy application files (assuming they're in current directory)
if [ -f "app.py" ]; then
    echo "📋 Application files found in current directory"
    cp -r . /opt/follicle-force-3000/
else
    echo "❌ Application files not found! Please run this script from the project directory."
    exit 1
fi

# Create virtual environment
echo "🌐 Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python packages
echo "📚 Installing Python packages..."
pip install --upgrade pip
pip install -r requirements.txt

# Initialize database
echo "🗄️ Initializing database..."
python3 -c "from app import init_db; init_db()"

# Setup systemd service
echo "⚙️ Setting up systemd service..."
sudo cp follicle-force.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable follicle-force
sudo systemctl start follicle-force

# Setup Nginx
echo "🌐 Configuring Nginx..."
sudo cp nginx-follicle-force.conf /etc/nginx/sites-available/follicle-force
sudo ln -sf /etc/nginx/sites-available/follicle-force /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start services
echo "🚀 Starting services..."
sudo systemctl restart nginx
sudo systemctl restart follicle-force

# Check service status
echo "📊 Checking service status..."
sudo systemctl status follicle-force --no-pager -l
sudo systemctl status nginx --no-pager -l

# Get public IP (if running on EC2)
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "localhost")

echo ""
echo "🎉 DEPLOYMENT COMPLETE! 🎉"
echo "========================="
echo ""
echo "🌐 Your FOLLICLE FORCE 3000™ website is now running!"
echo "📍 Access it at: http://$PUBLIC_IP"
echo ""
echo "📊 Useful commands:"
echo "   - Check app status: sudo systemctl status follicle-force"
echo "   - View app logs: sudo journalctl -u follicle-force -f"
echo "   - Check nginx status: sudo systemctl status nginx"
echo "   - View nginx logs: sudo tail -f /var/log/nginx/follicle-force_access.log"
echo ""
echo "🔥 Your hair transformation empire is ready to scale! 🔥"
