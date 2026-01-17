# Cloudflare Free Static Site Template

This repo deploys a static site to Cloudflare R2 with CDN, DNS, and cache purge via Terraform and GitHub Actions.

- Multi-environment support (prod, staging)
- Automatic HTML/HTM cache purge
- DNS + DNSSEC fully configured
- CI/CD deployment with GitHub Actions

## Usage

1. Set GitHub secrets: CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID
2. Update terraform variables
3. Push to main (production) or staging branch
