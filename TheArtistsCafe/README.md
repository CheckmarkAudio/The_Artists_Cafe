# Artist Cafe

## Replace background media
- Update the hero background video URL in `index.html` and `apply.html` (`<source src="...">`).
- The global page background is a CSS gradient in `styles.css` (no local poster image required).

## Edit copy
- All copy lives in `content.js` inside `window.SiteContent`.
- Update headlines, bullets, and FAQ items there and the pages will render the new text.

## EmailJS setup
- Open `mail.js` and replace:
  - `EMAILJS_SERVICE_ID`
  - `EMAILJS_TEMPLATE_ID`
  - `EMAILJS_PUBLIC_KEY`
  - (Optional) `EMAILJS_AUTOREPLY_TEMPLATE_ID`
- The form submits a JSON payload to `artistscafe@hallpassinternational.com`.

## Assets
- SVG image-link kit lives in `/assets/` and is used for all anchors.
- Swap any SVG with your branded versions as needed.
