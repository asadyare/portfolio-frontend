# System overview

A Node application runs inside a Docker container.
Source code lives in GitHub.
CI CD runs in GitHub Actions.
Infrastructure uses Terraform.
DNS and edge security use Cloudflare.

## Request flow

User sends HTTPS request to the domain.
Cloudflare receives the request at the edge.
Cloudflare enforces TLS and HTTPS only settings.
Request forwards to the application origin.
The Node app processes the request and returns a response.

## CI CD flow

Developer opens a pull request.
GitHub Actions runs security checks.
Secrets scanning blocks leaked tokens.
Static analysis scans JavaScript code.
Dependency audit checks npm packages.
Docker image builds locally in CI.
Container scan checks OS and Node packages.
Merge to main triggers full re validation.
Terraform applies only after policy checks pass.

## Trust boundaries

Developer workstation to GitHub repository.
GitHub Actions runner to Cloudflare API.
Public internet to Cloudflare edge.
Cloudflare edge to application origin.

## Security controls per layer

Source control uses branch protection and required checks.
CI enforces security gates before merge.
Docker image runs as non root user.
Terraform enforces HTTPS and TLS policies.
Cloudflare limits access with scoped API token.

## Out of scope

User authentication.
Application level authorization.
Data storage encryption.

## Purpose

This document explains how traffic flows and where security controls apply.
Each control maps to an automated CI CD check.
