#!/bin/bash
# Aggressive CPU stress test for autoscaling
# This will hit the /stress endpoint to generate real CPU load

ALB_URL="http://follicle-force-1-1793883685.us-east-1.elb.amazonaws.com"
STRESS_URL="${ALB_URL}/stress"

echo "🔥 AGGRESSIVE CPU STRESS TEST FOR AUTOSCALING 🔥"
echo "================================================="
echo "Target URL: $STRESS_URL"
echo "This will generate REAL CPU load to trigger autoscaling"
echo "Expected: CPU will spike > 70% and trigger new instances"
echo "Press Ctrl+C to stop"
echo ""

# Function to make stress requests
stress_worker() {
    local worker_id=$1
    local count=0
    
    while true; do
        curl -s "$STRESS_URL" > /dev/null
        count=$((count + 1))
        if (( count % 10 == 0 )); then
            echo "Worker $worker_id: $count stress requests completed"
        fi
        sleep 0.1  # Small delay between requests
    done
}

echo "Starting 20 concurrent stress workers..."
echo "Each worker hits the CPU-intensive /stress endpoint"

# Start background workers
for i in {1..20}; do
    stress_worker $i &
done

# Keep the script running
echo "All workers started! Monitor your AWS console for scaling activity."
echo "Expected timeline:"
echo "  - 2-3 minutes: CPU usage rises above 70%"
echo "  - 3-5 minutes: CloudWatch alarm triggers"
echo "  - 5-8 minutes: New instances start launching"
echo ""
echo "Press Ctrl+C to stop all workers"

# Wait for user interrupt
trap 'echo -e "\n🛑 Stopping all workers..."; kill $(jobs -p); exit' INT
wait
