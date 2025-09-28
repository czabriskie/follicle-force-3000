# Follicle Force 3000 - Organized Project Structure

## 📁 Directory Structure

```
follicle-force-3000/
├── app/                    # Flask Application
│   ├── app.py             # Main Flask app with /stress endpoint
│   ├── requirements.txt   # Python dependencies
│   ├── templates/         # Jinja2 templates
│   │   ├── base.html     # Base template
│   │   ├── index.html    # Home page
│   │   ├── order.html    # Order form
│   │   ├── thank_you.html# Thank you page
│   │   └── customers.html# Admin customer list
│   └── static/           # Static assets
│       ├── styles.css    # CSS styles
│       └── script.js     # JavaScript
├── deployment/           # Production deployment configs
│   ├── follicle-force.service    # Systemd service
│   └── nginx-follicle-force.conf # Nginx configuration
├── build/               # AMI build tools
│   ├── packer-template.json     # Packer AMI template
│   ├── packer-vars.json         # Packer variables
│   ├── build.sh                 # Build script
│   ├── build-ami.sh            # Legacy build script
│   └── deploy.sh               # Legacy deploy script
└── testing/            # Load testing and autoscaling tools
    ├── aggressive_stress_test.sh # CPU stress test (recommended)
    ├── load_test.py             # Python load tester
    ├── test_autoscaling.sh      # Simple autoscaling test
    └── cpu_stress.sh            # Direct CPU stress tool
```

## 🚀 Quick Start

### Build New AMI
```bash
cd build/
./build.sh
```

### Test Autoscaling (after deploying new AMI)
```bash
cd testing/
./aggressive_stress_test.sh
```

### Run Flask App Locally
```bash
cd app/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

## 🔧 Key Features

- **Flask Web App**: Complete hair growth infomercial website
- **Database**: SQLite customer order database
- **Autoscaling**: CPU stress endpoint at `/stress` for testing
- **Production Ready**: Nginx + Gunicorn + Systemd
- **Load Balancer**: ALB integration with health checks
- **Clean Structure**: Organized by function (app, deployment, build, testing)

## 🎯 Endpoints

- `/` - Home page
- `/order` - Order form
- `/customers` - Admin customer list
- `/health` - Load balancer health check
- `/stress` - CPU stress test for autoscaling

## 📈 Autoscaling

The project includes a target tracking scaling policy:
- **Target**: 70% CPU utilization
- **Scale Out**: When CPU > 70% for 2+ data points
- **Scale In**: When CPU < 70% for sustained period
- **Test**: Use `/stress` endpoint to generate CPU load
