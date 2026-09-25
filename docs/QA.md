# Verification record

Checked 23 September 2026 against the supplied ZelSpark SOP and the implemented frontend.

## Completed checks

- Production build and JavaScript syntax validation.
- A repeatable static output check (`npm run check`) for page structure, unique IDs, metadata, image alt attributes, and local page/asset references across all 13 HTML pages.
- Desktop visual review at a 1363px browser viewport: homepage, program catalog, course detail, and enquiry flow.
- Responsive visual review using actual same-origin iframe viewports, including 390px phone, 320px narrow phone, and 768px tablet frames. The test browser uses 15px scrollbars, so available content widths were 375, 305, and 753px. These are layout tests, not physical-device or mobile-user-agent tests.
- Mobile homepage, program filters, course layout, studio, enquiry fields/errors, company story, and partner layout; tablet learning approach.
- Mobile navigation open/close and Escape return; learning-stage button selection and arrow-key navigation.
- Program subject filter, keyword search, empty result state, and reset.
- Course module accordion and program-specific enquiry prefill.
- Studio challenge switching, checkbox progress, reset, and download initiation.
- Empty enquiry validation, conditional partner organization requirement, invalid optional phone, corrected form, explicitly unsent success summary, and edit-back behavior.
- No page-level horizontal overflow in inspected layouts, with visible layout diagnostics in a temporary local QA harness. The harness is not part of production.

## Graphics

The inspection browser has WebGL disabled. The site successfully renders the same Three.js scene through its static SVG fallback and updates that scene when a learning stage changes. If JavaScript itself is unavailable, a plain spark symbol and readable content remain.

The GPU renderer is implemented and bundled, but GPU animation, physical-device performance, and context-loss recovery could not be visually verified in this browser. Check these on a WebGL2-capable desktop and phone before launch. Reduced-motion preference handling, animation pause/resume, visibility suspension, pixel-ratio limits, resource cleanup, and static fallback behavior are present in source; not all device-specific paths were exercised.

## Boundaries

This is not a full WCAG conformance audit or cross-browser certification. Keyboard and form behavior were checked in the available Chrome environment. Run a final Safari/Firefox, screen-reader, 200% zoom, and physical-device review before a public launch.

The endpoint is deliberately empty. No personal data was submitted to ZelSpark, no real account was created, and no email or payment was sent. Live success/error/timeout handling is implemented but must be tested with the chosen backend. Enquiries are currently drafts, not conversions.

Search-engine indexing is deliberately disabled for this private prelaunch version. All programs and associated learning outlines are labelled sample concepts. No testimonials, instructors, partner relationships, credentials, certificates, internship offers, or placement results have been invented.

## Cinematic homepage redesign

The home page now contains four original narrative sections driven by one procedural Three.js scene. No Kage code, images, or fonts are included. The local build and static checks pass. Verify the live WebGL appearance on a GPU-enabled device; a gradient background and complete text journey remain when WebGL is unavailable.
