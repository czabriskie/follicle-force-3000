#!/bin/bash
# CPU stress test script to trigger autoscaling
# This will max out CPU cores to trigger scaling policies

echo "Starting CPU stress test..."
echo "This will run for 5 minutes or until you press Ctrl+C"

# Install stress tool if not available
if ! command -v stress &> /dev/null; then
    echo "Installing stress tool..."
    sudo apt-get update -qq
    sudo apt-get install -y stress
fi

# Get number of CPU cores
CORES=$(nproc)
echo "Detected $CORES CPU cores"

# Run stress test
echo "Starting stress test on all $CORES cores..."
stress --cpu $CORES --timeout 300s --verbose

echo "Stress test completed!"
