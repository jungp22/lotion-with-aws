terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source = "hashicorp/aws"
    }
  }
}

# specify the provider region
provider "aws" {
  region = "ca-central-1"
}

resource "aws_dynamodb_table" "lotion-30146353-revisited" {
  name         = "lotion-30146353-revisited"
  billing_mode = "PROVISIONED"

  read_capacity = 1
  write_capacity = 1

  hash_key = "email"
  range_key = "id"

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_iam_role" "lambda_role" {
  name  = "lambda-execution-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


# create a policy for publishing logs to CloudWatch
resource "aws_iam_policy" "iam_policy_for_lambda" {
  name        = "iam-lambda-logging"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

# attach the above policy to the function role
resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_role" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.iam_policy_for_lambda.arn
}

# Zipping python code
data "archive_file" "zip_delete"{
  type = "zip"
  source_dir = "${path.module}/../functions/delete-note"
  output_path = "${path.module}/../functions/zip/delete.zip"
}

data "archive_file" "zip_get"{
  type = "zip"
  source_dir = "${path.module}/../functions/get-notes"
  output_path = "${path.module}/../functions/zip/get.zip"
}

data "archive_file" "zip_save"{
  type = "zip"
  source_dir = "${path.module}/../functions/save-note"
  output_path = "${path.module}/../functions/zip/save.zip"
}
resource "aws_lambda_function" "get" {
  filename         = data.archive_file.zip_get.output_path
  function_name    = "get-notes-30146353-revisited" 
  role             = aws_iam_role.lambda_role.arn
  handler          = "get_handler"
  source_code_hash = data.archive_file.zip_get.output_base64sha256
  runtime = "python3.9"
}

resource "aws_lambda_function" "delete" {
  filename         = data.archive_file.zip_delete.output_path
  function_name    = "delete-note-30146353-revisited"
  role             = aws_iam_role.lambda_role.arn
  handler          = "delete.delete_handler"
  source_code_hash = data.archive_file.zip_delete.output_base64sha256
  runtime = "python3.9"
}

resource "aws_lambda_function" "save" {
  filename         = data.archive_file.zip_save.output_path
  function_name    = "save-note-30146353-revisited"
  role             = aws_iam_role.lambda_role.arn
  handler          = "save.save_handler"
  source_code_hash = data.archive_file.zip_save.output_base64sha256
  runtime = "python3.9"
}

resource "aws_lambda_function_url" "save-url" {
  function_name      = aws_lambda_function.save.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "get-url" {
  function_name      = aws_lambda_function.get.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "delete-url" {
  function_name      = aws_lambda_function.delete.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# show the Function URL after creation
output "lambda_url1" {
  value = aws_lambda_function_url.get-url.function_url
}
output "lambda_url2" {
  value = aws_lambda_function_url.delete-url.function_url
}
output "lambda_url3" {
  value = aws_lambda_function_url.save-url.function_url
}