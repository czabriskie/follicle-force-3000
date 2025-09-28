#!/bin/bash
# Quick autoscaling test script
# This will generate enough load to trigger your autoscaling policies

ALB_URL="http://follicle-force-1-1793883685.us-east-1.elb.amazonaws.com"

echo "🚀 Starting Follicle Force 3000 Autoscaling Test"
echo "================================================"
echo "ALB URL: $ALB_URL"
echo "This will run for 10 minutes with high load to trigger autoscaling"
echo "Press Ctrl+C to stop early"
echo ""

# Check if requests is installed
if ! python3 -c "import requests" 2>/dev/null; then
    echo "Installing requests module..."
    pip3 install requests
fi

echo "Starting load test in 3 seconds..."
sleep 3

# Run load test with aggressive settings to trigger autoscaling
python3 load_test.py \
    --threads 50 \
    --duration 600 \
    --rps 15

echo ""
echo "✅ Load test completed!"
echo "Check your AWS console to see if new instances were launched."
