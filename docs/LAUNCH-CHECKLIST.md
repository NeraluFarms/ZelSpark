# ZelSpark public launch checklist

The website is a working prelaunch frontend. The following details must come from ZelSpark before it can represent live services.

## Company and identity

- Confirm legal entity name, operating address, country/jurisdiction, and any required registration disclosures.
- Supply the approved logo/monogram files (SVG preferred). Approve or replace the proposed spark identity, palette, and typography.
- Confirm the final public domain, official email, phone/WhatsApp, and social URLs. No guessed contact details or social links are used.
- Provide approved founder/team/mentor names, roles, bios, portraits, and profile links if they should be published.

## Real program offers

For each program, confirm title, subject, eligibility, age range, prerequisites, language, dates, duration, schedule, delivery mode, tools/device requirements, capacity, fees/currency/taxes, and what the learner receives.

Replace or approve the four sample concepts and their modules, outcomes, project briefs, and proposed assessment approach. Confirm whether mentoring, feedback, recordings, accessibility accommodations, support, or progress reporting is included. State certificate criteria and issuing details only if a real certificate offer exists.

No enrollment is open in this version. If programs are still being developed, keep the preview labels and invite enquiries instead.

## Claims and people

- Add testimonials, student projects, and results only after verification and permission.
- Add partner logos or names only after authorization, with exact collaboration scope.
- Confirm internships separately from placement assistance or employment; state eligibility and terms accurately.
- Verify any accreditation, recognition, affiliation, or certification before displaying it. None is currently claimed.

## Enquiries and operations

- Choose the responsible person/team, enquiry inbox or CRM, response process, and escalation rules.
- Provide a secure HTTPS submission endpoint following `INTEGRATIONS.md`.
- Implement server-side validation, abuse prevention, rate limiting, safe logging, retention/deletion, and notification delivery. The frontend honeypot is not sufficient spam protection.
- Test a real student enquiry and partner enquiry end to end, including notifications, retry behavior, and acknowledgement.
- If learners may be minors, define appropriate guardian consent and safeguarding processes before collecting their data.

## Policies and optional future integrations

- Supply an approved privacy notice with the actual controller, contact, purposes, providers, retention, rights process, and any guardian requirements.
- Supply terms, and cancellation/refund policies if paid programs are offered.
- LMS/student accounts, payments, certificates, and parent progress views require separately scoped secure systems. They are not hidden behind fake buttons in this site.
- If desired, choose analytics and consent controls. Track confirmed successful submissions as conversions, not clicks or locally prepared drafts.

## Public release settings

- Set the correct production `SITE_URL`, rebuild, and verify canonicals and sitemap.
- Replace prelaunch-only copy where appropriate; keep unconfirmed items clearly labelled.
- Update metadata from `noindex,nofollow` to approved index settings and remove `Disallow: /` only when ready to be public.
- Configure the public domain, HTTPS, and a true missing-page response on the chosen host.
- Verify WebGL animation on a GPU-capable desktop and phone; confirm reduced-motion and fallback behavior.
- Complete final content, form delivery, privacy, keyboard, and device checks.
