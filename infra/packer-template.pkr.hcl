packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_access_key" { default = "" }
variable "aws_secret_key" { default = "" }
variable "region"         { default = "us-east-1" }
variable "instance_type"  { default = "t3.micro" }
variable "ami_name_prefix" { default = "follicle-force-3000" }

source "amazon-ebs" "follicle_force" {
  access_key    = var.aws_access_key
  secret_key    = var.aws_secret_key
  region        = var.region
  source_ami    = "ami-01abb3b5c93add95c"
  instance_type = var.instance_type
  ssh_username  = "ubuntu"
  ami_name      = "${var.ami_name_prefix}-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  ami_description = "FOLLICLE FORCE 3000 - Flask app on Ubuntu 24.04 LTS"

  tags = {
    Name        = "follicle-force-3000"
    Project     = "FollicleForce3000"
    Environment = "production"
  }
}

build {
  sources = ["source.amazon-ebs.follicle_force"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y python3 python3-pip python3-venv",
      "python3 -m venv /home/ubuntu/follicle-force-env",
      "mkdir -p /home/ubuntu/follicle-force-3000"
    ]
  }

  provisioner "file" {
    source      = "../app/"
    destination = "/home/ubuntu/follicle-force-3000/"
  }

  provisioner "file" {
    source      = "files/follicle-force.service"
    destination = "/home/ubuntu/follicle-force.service"
  }

  provisioner "shell" {
    execute_command = "sudo -S sh -c '{{ .Vars }} {{ .Path }}'"
    inline = [
      "cd /home/ubuntu/follicle-force-3000",
      "echo 'Installing Python packages...'",
      "/home/ubuntu/follicle-force-env/bin/pip install -r requirements.txt",
      "echo 'Initializing database...'",
      "/home/ubuntu/follicle-force-env/bin/python3 -c \"from app import init_db; init_db()\"",
      "echo 'Setting permissions...'",
      "chown -R ubuntu:ubuntu /home/ubuntu/follicle-force-3000",
      "chmod -R 755 /home/ubuntu/follicle-force-3000/",
      "echo 'Installing systemd service...'",
      "cp /home/ubuntu/follicle-force.service /etc/systemd/system/",
      "systemctl daemon-reload",
      "systemctl enable follicle-force",
      "echo 'Done!'"
    ]
  }
}
