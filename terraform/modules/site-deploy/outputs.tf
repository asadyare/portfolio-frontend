output "bucket_name" { value = cloudflare_r2_bucket.site.name }
output "zone_id" { value = cloudflare_zone.dns.id }
output "name_servers" { value = cloudflare_zone.dns.name_servers }
output "uploaded_files" { value = keys(cloudflare_r2_bucket_object.site_files) }
output "environment_subdomain" { value = local.env_subdomain }
