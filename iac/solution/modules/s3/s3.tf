locals {
  frontend_name      = "${var.appName}-frontend"
  frontend_build_dir = "${path.cwd}/../frontend/build"
}

resource "aws_s3_bucket" "backend" {
  bucket = "${var.appName}-backend"
}

data "archive_file" "backend" {
  type = "zip"

  source_dir  = "${path.cwd}/../backend/build"
  output_path = "${path.cwd}/../backend.zip"
}

resource "aws_s3_object" "backend" {
  bucket = aws_s3_bucket.backend.id

  key    = "nodejs.zip"
  source = data.archive_file.backend.output_path
  source_hash = data.archive_file.backend.output_base64sha256
  etag   = filemd5(data.archive_file.backend.output_path)
}

resource "aws_s3_bucket" "frontend" {
  bucket = local.frontend_name

  acl    = "public-read"
  policy = data.aws_iam_policy_document.frontend_policy.json
  website {
    index_document = "index.html"
  }
}

resource "aws_s3_object" "frontend" {
  for_each = module.template_files.files

  bucket       = aws_s3_bucket.frontend.id
  key          = each.key
  source       = each.value.source_path
  content      = each.value.content
  acl          = "public-read"
  content_type = each.value.content_type
  source_hash  = filemd5(each.value.source_path)
  etag         = each.value.digests.md5
}

data "aws_iam_policy_document" "frontend_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = ["*"]
      type        = "AWS"
    }
    resources = [
      "arn:aws:s3:::${local.frontend_name}/*"
    ]
  }
}

module "template_files" {
  source = "hashicorp/dir/template"

  base_dir = local.frontend_build_dir
  template_vars = {}
}
