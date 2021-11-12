terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-west-1"
}

# EC2
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "workshop" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = "t3.micro"
  security_groups = [aws_security_group.workshop.name]
  key_name        = aws_key_pair.workshop.key_name

  tags = {
    Name = "workshop-server"
  }
}

resource "aws_key_pair" "workshop" {
  key_name   = "workshop"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCu+a+2mqU1WtcU7JSs6Ek74iZrWxWEyy3ecmx5Xe3A4itVnSCnuKMCNsJXNQLiWBaQr9kI9jfNI20j4iHXQdVqC4RWFNQNsgLzYCapdI4544NaX4fjDxscf91fwZl4gCALchbgDQdim3v2Jfzx4RgY5JoMPY7ycXau8OA9BzksXfEIweMzWB2VEJaTZrSrUQK9CmCpUNFs+YL5C6YGP3dwPGgNYZVHd83UBWuYFHr5uwmUc7bqFKE8gEmWLx8Zy96KwH2JwGse0mVtI92swvDfnNvUCrDfFdoDvuhR/BlJTzm9U+v4smjrosPPCWF+Ouyalz/icVN6eOL+NGc2RPycCc8n/QVZO6ILIYQkoaujYZaE8vpkt7BdLM8R6BeclCYBsxvZ9JLW6qxTDr7OO9ZSsjQl9kNnaVfDz2uJ/+6O5NM08sK9OkGp3LBzB6lU5q9+pmN6o8SRdFDhF9Phh/UZLwSmYa01rWZt4Y8YthE3ve2C0QsAOEx+3sa0KHDI768= workshop"
}

resource "aws_security_group" "workshop" {
  name        = "workshop"
  description = "Allow SSH into our new VM"

  ingress {
    description = "SSH from the whole world"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Postgres from the whole world"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Hasura from anywhere"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "workshop"
  }
}

# RDS
resource "aws_db_instance" "workshop" {
  allocated_storage         = 10
  engine                    = "postgres"
  password                  = var.db_password
  username                  = "postgres"
  publicly_accessible       = true
  instance_class            = "db.t3.micro"
  backup_window             = "09:46-10:16"
  backup_retention_period   = 10
  skip_final_snapshot       = true
  final_snapshot_identifier = "hello"
}
resource "aws_db_instance" "workshop_replica" {
  publicly_accessible     = true
  instance_class          = "db.t3.micro"
  replicate_source_db     = aws_db_instance.workshop.identifier
  backup_window           = "09:46-10:16"
  backup_retention_period = 10
}

variable "db_password" {
  description = "A password for your database"
  sensitive   = true
}

output "server_endpoint" {
  value = aws_instance.workshop.public_dns
}

output "database_url" {
  value = aws_db_instance.workshop.endpoint
}
