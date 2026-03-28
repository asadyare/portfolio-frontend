/**
 * Generates docs/cv/Asad-Ali-Hassan-CV.docx with Calibri + Word heading styles.
 * Run from portfolio-frontend: npm run cv:docx
 */
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  TextRun,
  convertInchesToTwip,
} from 'docx'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', '..', 'docs', 'cv', 'Asad-Ali-Hassan-CV.docx')

const FONT = 'Calibri'
/** @param {number} pt */
const sz = (pt) => pt * 2 // docx uses half-points

const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 160, line: 276 },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: sz(11),
        ...opts.run,
      }),
    ],
  })

const boldLine = (text) =>
  new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: sz(11),
        bold: true,
      }),
    ],
  })

const bullet = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 120 },
    indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.18) },
    children: [
      new TextRun({
        text: `• ${text}`,
        font: FONT,
        size: sz(11),
      }),
    ],
  })

const sectionHeading = (text) =>
  new Paragraph({
    spacing: { before: 280, after: 160 },
    outlineLevel: 1,
    children: [
      new TextRun({
        text,
        font: FONT,
        bold: true,
        size: sz(13),
        color: '1F4E79',
      }),
    ],
  })

const children = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: 'ASAD ALI HASSAN',
        font: FONT,
        bold: true,
        size: sz(22),
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 320 },
    children: [
      new TextRun({
        text: 'Location: Small Heath, Birmingham, United Kingdom',
        font: FONT,
        size: sz(11),
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: 'Email: ', font: FONT, size: sz(11) }),
      new TextRun({ text: 'walasaqo@gmail.com', font: FONT, size: sz(11), color: '0563C1' }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: 'GitHub: ', font: FONT, size: sz(11) }),
      new TextRun({ text: 'https://github.com/asadyare', font: FONT, size: sz(11), color: '0563C1' }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [
      new TextRun({ text: 'LinkedIn: ', font: FONT, size: sz(11) }),
      new TextRun({
        text: 'https://www.linkedin.com/in/asad-hassan-20b540313/',
        font: FONT,
        size: sz(11),
        color: '0563C1',
      }),
    ],
  }),

  sectionHeading('Professional summary'),
  body(
    'DevSecOps engineer with a public, auditable portfolio of CI/CD security, container and Kubernetes hardening, infrastructure as code, and threat modelling. Currently DevSecOps Apprentice at Cyber Agoge, focusing on shifting security left in the SDLC and securing production-style infrastructure. Previously spent approximately 2.5 years in manufacturing quality control, which strengthened discipline around standards, defect prevention, and evidence-based checks—directly applicable to security gates and compliance-style workflows.'
  ),
  body(
    'Comfortable with GitHub Actions (reusable workflows, SARIF to GitHub Advanced Security), Docker, Kubernetes (ingress, network policy, Falco), Terraform (Cloudflare), and observability (Prometheus/Grafana patterns, GET /metrics at the edge and in-cluster). Interested in secure AI innovation and practical application of threat modelling (STRIDE, documented mitigations).',
    { after: 240 }
  ),

  sectionHeading('Core skills'),
  boldLine('Cloud & edge'),
  body(
    'AWS (Certified Cloud Practitioner); Cloudflare (Pages, Terraform for DNS/zone, Pages Functions)'
  ),
  boldLine('Containers & orchestration'),
  body(
    'Docker (including non-root, nginx-based images); Kubernetes manifests, ingress/TLS, NetworkPolicy'
  ),
  boldLine('Infrastructure as code'),
  body('Terraform (HashiCorp Certified: Terraform Associate); Cloudflare provider'),
  boldLine('CI/CD & supply chain'),
  body(
    'GitHub Actions (Microsoft-certified); reusable workflows; Gitleaks, Semgrep, npm audit, Trivy (image and filesystem), SARIF uploads'
  ),
  boldLine('Runtime & detection'),
  body('Falco (Kubernetes); syscall-based detection (as code in repo)'),
  boldLine('Observability'),
  body('Prometheus/Grafana (dashboards as code); edge GET /metrics (Cloudflare Workers/Pages Functions)'),
  boldLine('Application stack'),
  body('JavaScript, Node.js, React, Vite'),
  boldLine('Security practices'),
  body('Threat modelling, vulnerability management, secure defaults, runtime security'),
  boldLine('Other'),
  body('Linux, Git, REST APIs'),
  body(
    'Tools above reflect repositories under github.com/asadyare (portfolio-frontend, portfolio-ci-cd-security, portfolio-k8s-security, portfolio-daily-security, portfolio-threat-model).',
    { after: 240 }
  ),

  sectionHeading('Professional experience'),
  boldLine('DevSecOps Apprentice — Cyber Agoge'),
  body('November 2024 – present · United Kingdom (remote/hybrid)', { after: 120 }),
  bullet(
    'Supporting delivery of secure software lifecycle practices: shifting security left, hardening production-style infrastructure, and promoting secure AI innovation in line with organisational goals.'
  ),
  bullet('Engineering / technical track; department: Engineering & Technical (specialist level).'),
  boldLine('Quality Checker — Sertec Group Ltd (Sertec Auto Structures)'),
  body('May 2022 – December 2024 · United Kingdom', { after: 120 }),
  bullet(
    'Inspected automotive components for defects (e.g. splits, distortion, surface issues) against strict standards before release.'
  ),
  bullet(
    'Helped reduce defective output through consistent inspection and communication of recurring issues.'
  ),
  bullet(
    'Strengthened habits around precision, compliance, traceability, and risk reduction—foundational for later security and quality-gate work.',
    { after: 240 }
  ),

  sectionHeading('Portfolio & projects (public GitHub)'),
  body(
    'Cross-repo work is documented in devsecops-portfolio-asad and related repositories. Highlights:'
  ),
  boldLine('DevSecOps portfolio (multi-repository platform)'),
  bullet(
    'portfolio-frontend: React (Vite) site; Cloudflare Pages deployment via Wrangler (static assets + Pages Functions, e.g. GET /metrics); Terraform for Cloudflare DNS/zone.'
  ),
  bullet(
    'portfolio-ci-cd-security: Reusable GitHub Actions — npm audit, Gitleaks (secrets, SARIF), Semgrep (SAST), Docker build, Trivy image scan with fail-on-severity behaviour.'
  ),
  bullet(
    'portfolio-k8s-security: Kubernetes deployment patterns, ingress/TLS, NetworkPolicy, Falco runtime configs, Grafana dashboard ConfigMaps; Docker image (nginx) for the app.'
  ),
  bullet(
    'portfolio-daily-security: Scheduled workflows (Gitleaks, npm audit, Trivy filesystem, SBOM, SARIF, GitHub Issues on critical findings).'
  ),
  bullet(
    'portfolio-threat-model: Threat modelling artefacts (e.g. STRIDE-aligned lanes, CI/Kubernetes/frontend threats, diagrams, risk register).'
  ),
  body(
    'Outcomes (qualitative): repeatable security checks in CI, traceable scan results (SARIF), infrastructure and monitoring defined as code, and a single narrative from code to pipeline to cluster to risk documentation.'
  ),
  boldLine('Threat modelling & architecture'),
  bullet(
    'Ongoing work on structured threat analysis and alignment of mitigations to concrete controls (pipelines, Cloudflare, cluster). Portfolio includes markdown/diagram packs; any separate tool build should be described only when shipped.',
    { after: 240 }
  ),

  sectionHeading('Education'),
  bullet(
    'Secondary education: Narvik videregående skole, avdeling Oscarsborg (2014 – 2016)'
  ),
  bullet(
    'Self-directed learning — cloud security & DevSecOps: online platforms, hands-on labs, and project-driven learning via public GitHub portfolios.',
    { after: 240 }
  ),

  sectionHeading('Certifications'),
  boldLine('CompTIA Security+'),
  body('Issuer: CompTIA    Issued: Mar 2025    Expires: Mar 2028'),
  boldLine('AWS Certified Cloud Practitioner'),
  body('Issuer: AWS    Issued: Apr 2025    Expires: Apr 2028'),
  boldLine('HashiCorp Terraform Associate (003)'),
  body('Issuer: HashiCorp    Issued: Apr 2025    Expires: Apr 2027'),
  boldLine('GitHub Actions (certification)'),
  body('Issuer: Microsoft Learn    Issued: Oct 2025    Expires: Oct 2027'),
  boldLine('Certified in Cybersecurity (CC)'),
  body('Issuer: ISC2    Issued: Jun 2024    Expires: Jun 2027'),
  boldLine('Google Cybersecurity Specialization'),
  body('Issuer: Coursera    Issued: Jun 2024'),
  boldLine('Mastercard Cybersecurity Job Simulation'),
  body('Issuer: Forage    Issued: Jun 2024'),
  boldLine('DevSecOps Certified'),
  body('Issuer: Cyber Agoge    Issued: Dec 2024'),
  body(
    'Verify live credentials on Credly, AWS, HashiCorp, and LinkedIn as needed.'
  ),
  body(
    'Professional development (stated intent): progress toward AWS Certified Security – Specialty (align CV dates when achieved).',
    { after: 240 }
  ),

  sectionHeading('Additional information'),
  bullet(
    'Languages: English (professional working proficiency; adjust if you speak additional languages).'
  ),
  bullet(
    'Work authorisation: [Add: e.g. UK citizen / right to work — required for UK roles]',
    { after: 240 }
  ),

  new Paragraph({
    spacing: { before: 400 },
    children: [
      new TextRun({
        text: 'Generated from portfolio repo — not published on the public portfolio site. Regenerate: npm run cv:docx (from portfolio-frontend).',
        font: FONT,
        size: sz(9),
        italics: true,
        color: '666666',
      }),
    ],
  }),
]

const doc = new Document({
  creator: 'Asad Ali Hassan',
  title: 'CV - Asad Ali Hassan',
  description: 'Curriculum Vitae',
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
          },
        },
      },
      children,
    },
  ],
})

const buffer = await Packer.toBuffer(doc)
writeFileSync(outPath, buffer)
console.log(`Wrote ${outPath}`)
