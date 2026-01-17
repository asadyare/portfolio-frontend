variable "bucket_name" {}
variable "environment" { default = "prod" }
variable "local_path" {}
variable "domain_name" {}
variable "cf_account_id" {}
variable "cloudflare_api_token" { sensitive = true }
