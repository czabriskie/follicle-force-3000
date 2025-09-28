#!/bin/bash
# Build the AMI using Packer from the organized directory structure

echo "🏗️  Building Follicle Force 3000 AMI"
echo "====================================="

# Change to build directory
cd "$(dirname "$0")"

# Verify required files exist
if [[ ! -f "packer-template.json" ]]; then
    echo "❌ Error: packer-template.json not found in build directory"
    exit 1
fi

if [[ ! -f "packer-vars.json" ]]; then
    echo "❌ Error: packer-vars.json not found in build directory"
    exit 1
fi

if [[ ! -d "../app" ]]; then
    echo "❌ Error: app directory not found"
    exit 1
fi

if [[ ! -d "../deployment" ]]; then
    echo "❌ Error: deployment directory not found"
    exit 1
fi

echo "✅ All required files and directories found"
echo ""
echo "📦 App files:"
ls -la ../app/

echo ""
echo "⚙️  Deployment configs:"
ls -la ../deployment/

echo ""
echo "🚀 Starting Packer build..."
packer build -var-file=packer-vars.json packer-template.json

if [[ $? -eq 0 ]]; then
    echo ""
    echo "🎉 AMI build completed successfully!"
    echo "Next steps:"
    echo "1. Update your Launch Template with the new AMI ID"
    echo "2. Refresh your Auto Scaling Group instances"
    echo "3. Test autoscaling with: cd ../testing && ./aggressive_stress_test.sh"
else
    echo ""
    echo "❌ AMI build failed. Check the output above for errors."
    exit 1
fi
