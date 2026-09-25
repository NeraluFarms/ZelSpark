# Enquiry integration contract

The frontend is intentionally fully usable without a backend: it produces an explicitly unsent draft. To enable sending, provide an HTTPS endpoint and put its URL in `src/config.js`, then rebuild.

## Request

`POST` with `Content-Type: application/json`. Browser credentials are omitted. The endpoint must allow the final site origin if cross-origin.

```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "phone": "",
  "type": "student",
  "organization": "",
  "program": "build-for-the-web",
  "message": "I would like to learn more about this direction.",
  "consent": true,
  "source": "zelspark-website"
}
```

Valid types: `student`, `parent`, `institution`, `industry`, `mentor`, `other`. Organization is required for `institution` and `industry`. Program values are the slugs in `src/data.js`, plus `undecided` and `collaboration`.

## Response

Return a 2xx HTTP status and JSON `{"ok":true}` only after durable acceptance. An optional `reference` can be stored server-side; the current frontend does not display it. Other responses, invalid JSON, network errors, and timeouts produce a truthful unconfirmed state and retain the entered data. A timeout cannot prove the server rejected the request; the user is told that receipt is unconfirmed.

The default timeout is 12 seconds. Do not put private API keys in this static frontend.

## Backend responsibilities

Validate every field independently of the browser. Normalize and cap field lengths, validate email and phone, enforce the allowed inquiry/program values, and handle consent appropriately. Implement rate limiting and abuse protection, and add CAPTCHA only if your chosen service and threat model require it. Treat the browser honeypot as a convenience, not a security boundary.

Use safe database writes, avoid logging full personal enquiry bodies, and implement your approved retention/deletion rules. Protect the endpoint against abuse, configure CORS for your actual site, and add CSRF defenses if you introduce cookie authentication. Plan duplicate handling and an idempotency strategy when adding automatic retries.

Send notifications and acknowledgements from the server. Confirm SPF/DKIM/DMARC and delivery monitoring with the chosen email service. A 2xx response should mean accepted into the operational workflow, not merely that an email-send attempt started.

## Content updates required when enabling

Update the privacy page, contact page metadata, confirmation wording, and all prelaunch contact statements to match actual data flows and available channels. The form switches its primary labels when an endpoint is set; it does not automatically produce a legally complete privacy notice.

## Future systems

A CMS can replace `src/data.js` while keeping the same content model. LMS, accounts, progress, payments, certificates, and partner workflows should have separate contracts and server-side authorization. No student records or payment details should be stored in localStorage or client-side configuration.

Analytics is intentionally absent. If added, track a successful confirmed server response separately from an enquiry draft, and obtain any applicable consent first.
