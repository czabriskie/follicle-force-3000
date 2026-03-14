# FOLLICLE FORCE 3000™ 💇‍♂️

A satirical infomercial website parody showcasing over-the-top marketing tactics for a fictional hair growth product.

## 🎭 Project Overview

**FOLLICLE FORCE 3000™** is a humorous web project that parodies the classic late-night infomercial format. This single-page website mimics the exaggerated claims, testimonials, and urgent sales tactics commonly found in "As Seen on TV" products, specifically targeting hair loss solutions.

## ✨ Features

### 🎪 Classic Infomercial Elements
- **Flashing urgency banners** with animated text
- **Before/after transformations** (bald emoji → lion emoji)
- **Fake testimonials** from "satisfied customers"
- **Pseudo-scientific claims** and fake statistics
- **Limited time offers** with countdown timers
- **Money-back guarantees** with ridiculous conditions

### 🎨 Visual Design
- **Rainbow gradient backgrounds** that constantly shift
- **Animated elements** including bouncing titles and shaking text
- **Over-the-top color schemes** (reds, yellows, gradients)
- **Emoji-heavy design** for maximum visual impact
- **Responsive layout** that works on all devices

### 🎮 Interactive Elements
- **Dynamic countdown timer** that randomly changes numbers
- **Animated order button** with hover effects
- **Clickable testimonials** with wobble animations
- **Floating hair emojis** that appear randomly
- **Sound effect simulation** through alerts

## 🛠️ Technical Stack

- **Flask** - Python web framework serving dynamic HTML via Jinja2 templates
- **SQLite** - Lightweight database for customer order storage
- **Packer** - Automates AMI creation for EC2 deployment
- **HTML5 / CSS3 / JavaScript** - Frontend with animations and interactive elements

## 🚀 Running Locally

### Prerequisites
- Python 3.8+
- `pip`

### Setup

```bash
# Clone the repo
git clone https://github.com/czabriskie/follicle-force-3000.git
cd follicle-force-3000

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r app/requirements.txt

# Run the Flask development server
python app/app.py
```

Visit **http://localhost:5000** in your browser.

> The SQLite database (`customers.db`) is created automatically on first run.

---

## 🚢 Deploying to EC2

Deployment uses a Packer-built AMI that pre-installs all dependencies. Flask runs directly on port 80 and is managed by **systemd**.

### Step 1 — Build the AMI with Packer

Fill in your AWS credentials in `infra/packer-vars.json`, then run:

```bash
cd infra
./build.sh
```

This produces an AMI ID you'll use in your EC2 Launch Template.

### Step 2 — Launch an EC2 Instance

1. In the AWS Console, create a **Launch Template** using the AMI built above.
2. Use instance type `t3.micro` (or as configured in `packer-vars.json`).
3. Attach a security group that allows inbound **HTTP (port 80)** and **SSH (port 22)**.
4. Launch the instance.

### Step 3 — Verify the App

Once the instance is running, visit its **public IP** in a browser. Flask listens directly on port 80.

You can also SSH in to check service status:

```bash
ssh -i your-key.pem ubuntu@<ec2-public-ip>

sudo systemctl status follicle-force   # Flask app
```

---

## 📁 Project Structure

```
follicle-force-3000/
│
├── app/
│   ├── app.py              # Flask application & routes
│   ├── requirements.txt    # Python dependencies
│   ├── static/             # CSS, JS, and other static assets
│   └── templates/          # Jinja2 HTML templates
│
├── infra/
│   ├── build.sh                    # Runs the Packer build
│   ├── packer-template.pkr.hcl    # Packer build definition
│   ├── packer-vars.json           # AWS credentials & region (fill in before building)
│   └── files/
│       └── follicle-force.service # systemd unit for Flask
│
└── testing/
    ├── load_test.py                # Python load testing script
    └── aggressive_stress_test.sh   # Shell stress test for autoscaling demos
```

## 🎯 Key Components

### Flask Routes (`app/app.py`)

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Main infomercial landing page |
| `/order` | GET/POST | Order form; saves customer to SQLite |
| `/thank-you` | GET | Order confirmation page |
| `/customers` | GET | Admin view of all submitted orders |
| `/api/customers` | GET | Same data as JSON |
| `/health` | GET | Health check endpoint (used by Load Balancer) |
| `/stress` | GET | CPU stress endpoint for autoscaling demos |

### systemd (`infra/files/follicle-force.service`)
- Runs Flask directly on port 80 as root
- Auto-restarts on failure
- Starts automatically on instance boot

### Frontend (`app/static/`, `app/templates/`)
- Jinja2 templates for server-rendered HTML
- CSS animations: rainbow gradient, flashing banners, bouncing title
- JS: countdown timer, floating emoji, order button interactions

## 🎨 Design Philosophy

This project employs deliberate "bad design" principles to achieve its comedic effect:

- **Excessive use of bright colors** to overwhelm the senses
- **Multiple competing animations** for chaotic visual experience
- **Comic Sans alternatives** for that "amateur" feel
- **Overuse of emojis** for emphasis
- **Intentionally ridiculous claims** for humor

## 🎓 Educational Value

This project demonstrates:
- **CSS animation techniques** and keyframe usage
- **Responsive web design** principles
- **JavaScript DOM manipulation** and event handling
- **Satire in web design** and marketing psychology
- **User experience anti-patterns** (what NOT to do)

## 🚨 Disclaimer

This is a **parody project** created for educational and entertainment purposes. 

- FOLLICLE FORCE 3000™ is not a real product
- No actual hair growth is guaranteed (or possible)
- Side effects may include uncontrollable laughter
- Results may vary from nonexistent to imaginary

## 🤝 Contributing

Feel free to contribute more ridiculous features:
- Additional fake testimonials
- More outrageous product claims
- Enhanced animations and effects
- Mobile-specific interactions
- Additional parody sections

## 📞 Support

For technical support, please don't call 1-800-HAIR-NOW (it's not real).

Instead, feel free to:
- Open an issue for bugs or improvements
- Submit pull requests for enhancements
- Share your own infomercial parody ideas

## 📜 License

This project is released under the "Use for Good (and Laughs)" license. 

Feel free to use, modify, and share this code for educational purposes, portfolio demonstrations, or just to make people smile.

---

**Remember**: Hair today, gone tomorrow! 🦲➡️🦁

*© 2025 Follicle Force Industries. All rights reserved (in our imagination).*
