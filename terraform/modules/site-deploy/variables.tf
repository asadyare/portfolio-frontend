variable "bucket_name" {}
variable "environment" { default = "prod" }
variable "local_path" {}
variable "domain_name" {}
variable "cf_account_id" {}
variable "cloudflare_api_token" { sensitive = true }
variable "mime_types" {
  type = map(string)
  default = {
    html = "text/html"
    htm  = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    png  = "image/png"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    svg  = "image/svg+xml"
    json = "application/json"
  }
}
