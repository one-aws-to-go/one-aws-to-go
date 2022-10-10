resource "random_string" "db_username" {
  length = 10
  numeric = false
  special = false
}

resource "random_password" "db_password" {
  length = 20
  special = false
}

resource "aws_security_group" "db_security_group" {
  name = "${var.appName}-db-security-group"
  ingress {
    protocol = "icmp"
    from_port = 80
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "db" {
  identifier = "${var.appName}-db"
  allocated_storage = 10
  db_name = "backend"
  engine = "postgres"
  instance_class = "db.t3.micro"
  username = random_string.db_username.result
  password = random_password.db_password.result
  port = 5432
  publicly_accessible = true
  vpc_security_group_ids = [aws_security_group.db_security_group.id]
  apply_immediately = true
  skip_final_snapshot = true
  backup_retention_period = 0
}
