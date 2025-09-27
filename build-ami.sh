#!/bin/bash
# Build and Package FOLLICLE FORCE 3000™ for AWS Deployment

echo "🚨 PACKAGING FOLLICLE FORCE 3000™ FOR AWS! 🚨"
echo "============================================="

# Check if packer is installed
if ! command -v packer &> /dev/null; then
    echo "❌ Packer is not installed. Please install Packer first:"
    echo "   https://www.packer.io/downloads"
    exit 1
fi

# Check AWS credentials
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "⚠️  AWS credentials not found in environment variables."
    echo "   Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
    echo "   Or update packer-vars.json with your credentials"
fi

# Validate Packer template
echo "🔍 Validating Packer template..."
if packer validate packer-template.json; then
    echo "✅ Packer template is valid!"
else
    echo "❌ Packer template validation failed!"
    exit 1
fi

# Build AMI
echo "🏗️ Building AMI with Packer..."
echo "This may take 10-15 minutes..."

if [ -f "packer-vars.json" ]; then
    packer build -var-file=packer-vars.json packer-template.json
else
    packer build packer-template.json
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your FOLLICLE FORCE 3000™ AMI has been created!"
    echo "=============================================="
    echo ""
    echo "Next steps:"
    echo "1. Launch an EC2 instance using the AMI ID shown above"
    echo "2. Ensure your security group allows HTTP traffic (port 80)"
    echo "3. Access your website at http://your-instance-public-ip"
    echo ""
    echo "🦁 Your hair growth empire is ready to scale! 🦁"
else
    echo "❌ AMI build failed. Check the output above for errors."
    exit 1
fi
