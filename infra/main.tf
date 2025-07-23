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

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  # we only need a student id to find an item in the table; therefore, we 
  # don't need a sort key here
  hash_key = "id"

  # the hash_key data type is string
  attribute {
    name = "id"
    type = "S"
  }
}