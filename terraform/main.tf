module "site_deploy" {
  source               = "./modules/site-deploy"
  bucket_name          = var.bucket_name
  environment          = var.environment
  local_path           = var.local_path
  domain_name          = var.domain_name
  cf_account_id        = var.cf_account_id
  cloudflare_api_token = var.cloudflare_api_token
}
