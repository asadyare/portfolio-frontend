# npm audit remediation (critical vulnerabilities)

## Issue (CI failure)

GitHub Actions runs **`npm audit`** as part of the shared security workflow. The pipeline failed with:

```text
6 critical severity vulnerabilities
To address all issues, run: npm audit fix
Error: Process completed with exit code 1
```

### Root cause

| Field | Detail |
|--------|--------|
| **Advisory** | [GHSA-xq3m-2v4x-88gg](https://github.com/advisories/GHSA-xq3m-2v4x-88gg) — arbitrary code execution in **protobufjs** (affected range `>=8.0.0 <8.0.1`) |
| **Dependency path** | `@grafana/faro-web-sdk` / `@grafana/faro-web-tracing` → `@grafana/faro-core` → OpenTelemetry OTLP packages → `@opentelemetry/otlp-transformer` → **protobufjs** |
| **Scope** | Transitive dependency (not a direct `package.json` entry). The portfolio bundles Grafana Faro packages for optional RUM/tracing; the vulnerable protobufjs build was pulled in through that chain. |

## Fix applied

1. Ran **`npm audit fix`** in the repository root (`portfolio-frontend/`).
2. npm resolved the tree by upgrading nested packages so **protobufjs** is no longer in the vulnerable range.
3. Verified locally:
   - **`npm audit`** → **0 vulnerabilities**
   - **`npm run build`** and **`npm run lint`** succeed

Lockfile (`package-lock.json`) reflects the updated dependency graph; no application source changes were required.

## Prevention

- Keep **`npm audit`** / shared-security CI enabled so regressions fail the pipeline.
- After adding or bumping dependencies, run **`npm audit`** locally before pushing.
- If **`npm audit fix`** cannot resolve without a breaking change, use **`npm audit fix --force`** only after review, or add a targeted **`overrides`** in `package.json` for the patched sub-dependency (document the rationale in this file).

## References

- [protobufjs advisory GHSA-xq3m-2v4x-88gg](https://github.com/advisories/GHSA-xq3m-2v4x-88gg)
- Shared workflow: `portfolio-ci-cd-security` → `shared-security.yml` (includes `npm audit` at configured severity)
