# 🏗️ Follicle Force 3000™ Architecture Overview

## 📊 High-Level Architecture Flow

```
Internet Users
     ↓
Route 53 (DNS)
     ↓
CloudFront (CDN)
     ↓
Application Load Balancer (ALB)
     ↓
Auto Scaling Group
     ↓
EC2 Instances (Flask App)
     ↓
RDS/Local Database
```

## 🌐 Detailed Request Flow

### 1. **DNS Resolution (Route 53)**
```
User types: follicle-force-3000.com
Route 53 resolves to: d2mzl75ftehodf.cloudfront.net
```

### 2. **CDN Layer (CloudFront)**
```
CloudFront Distribution: E2QIM9PKUDZL7Q
Domain: d2mzl75ftehodf.cloudfront.net
SSL Certificate: arn:aws:acm:us-east-1:999855041308:certificate/ea6ca324-5754-41b1-bccf-b592c8c2513a
Origin Protocol: HTTP-only (to ALB)
Cache Behavior: Redirect to HTTPS for users
```

### 3. **Load Balancing (ALB)**
```
ALB DNS: follicle-force-1-1793883685.us-east-1.elb.amazonaws.com
Protocol: HTTP (port 80)
Health Check: / (root path)
Target Group: follicle-force-1
```

### 4. **VPC & Networking**
```
VPC: Default VPC (172.31.0.0/16)
Subnets: Multi-AZ deployment
Security Groups:
  - ALB Security Group: Allow HTTP/HTTPS from internet
  - EC2 Security Group: Allow HTTP from ALB only
```

### 5. **Auto Scaling Group**
```
ASG Name: follicle-force
Min Size: 1
Max Size: 4
Desired: 1 (scales based on CPU)
Scaling Policy: Aggressive (40% CPU trigger)
```

### 6. **EC2 Instances**
```
AMI: Custom AMI with Flask app pre-installed
Instance Type: t2.micro/t3.micro
OS: Ubuntu
Services:
  - nginx (port 80) → proxy to Flask
  - Flask via gunicorn (port 5000)
  - systemd service: follicle-force.service
```

### 7. **Application Stack**
```
Web Server: nginx (reverse proxy)
WSGI Server: gunicorn (3 workers)
Framework: Flask (Python)
Database: SQLite (customers.db)
Templates: Jinja2 HTML templates
Static Files: CSS, JavaScript
```

## 🔒 Security Layers

### SSL/TLS Termination
```
Users → HTTPS → CloudFront (SSL cert) → HTTP → ALB → HTTP → EC2
```

### Security Groups
```
CloudFront: Managed by AWS
ALB: Allows 80/443 from 0.0.0.0/0
EC2: Allows 80 from ALB security group only
```

### Network Isolation
```
Public Subnets: ALB only
Private Subnets: EC2 instances (if configured)
```

## ⚡ Scaling & Monitoring

### Auto Scaling Triggers
```
Scale Up: CPU > 40% for 1 minute → Add 1-2 instances
Scale Down: CPU < 15% for 5 minutes → Remove 1 instance
Cooldown: 60 seconds up, 300 seconds down
```

### CloudWatch Alarms
```
- follicle-force-cpu-high-aggressive (40% threshold)
- follicle-force-cpu-low-aggressive (15% threshold)
- follicle-force-response-time-high (0.5s threshold)
```

### Health Checks
```
ALB → EC2: HTTP GET / every 30s
Target: Healthy if HTTP 200
Unhealthy threshold: 2 consecutive failures
```

## 🚀 Request Processing Flow

### Typical User Request:
1. **User**: Visits https://follicle-force-3000.com
2. **Route 53**: Resolves to CloudFront
3. **CloudFront**: 
   - Checks edge cache
   - If miss, forwards to ALB via HTTP
4. **ALB**: 
   - Receives request on port 80
   - Load balances to healthy EC2 instance
5. **EC2 Instance**:
   - nginx receives request on port 80
   - Proxies to gunicorn on port 5000
   - Flask processes request
   - Returns HTML response
6. **Response Path**: EC2 → ALB → CloudFront → User

### Static Files (CSS/JS):
1. **Request**: https://domain.com/static/script.js
2. **CloudFront**: Caches static files with long TTL
3. **First Request**: CloudFront → ALB → EC2 → nginx serves static file
4. **Subsequent Requests**: Served directly from CloudFront cache

## 📈 Performance Optimizations

### CloudFront Features:
- **Global Edge Locations**: Faster content delivery
- **Static File Caching**: CSS/JS cached for 1 year
- **Compression**: Automatic gzip compression
- **HTTP/2**: Modern protocol support

### Auto Scaling Benefits:
- **High Availability**: Multi-instance deployment
- **Cost Optimization**: Scales down during low traffic
- **Performance**: Scales up during traffic spikes
- **Fault Tolerance**: Unhealthy instances replaced automatically

## 🛠️ Management & Deployment

### Infrastructure as Code:
```
Packer: AMI building (build/packer-template.json)
Scripts: Automated deployment (build/deploy.sh)
Configuration: Nginx + systemd service files
```

### Monitoring Tools:
```
CloudWatch: Metrics and alarms
Custom Scripts: monitor_scaling.sh
Load Testing: testing/aggressive_stress_test.sh
```

This architecture provides a robust, scalable, and highly available web application with automatic scaling, SSL termination, and global content delivery.
