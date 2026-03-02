# Swanson SEO

SEO consulting website for [swansonseo.com](https://www.swansonseo.com) — Stanford Swanson's AI-fluent SEO and paid marketing consulting practice.

## Tech Stack

Plain HTML, CSS, and JavaScript. No build tools or frameworks required.

## Structure

```
├── index.html          Single-page site
├── css/styles.css      Responsive stylesheet
├── js/main.js          Mobile nav, scroll behavior, form handling
├── images/             Assets (headshot, logo, favicon, OG image)
├── robots.txt          Crawl directives
├── sitemap.xml         XML sitemap
├── site.webmanifest    Web app manifest
```

## Setup

1. Clone the repo
2. Open `index.html` in a browser — no build step needed
3. For the contact form, sign up at [formspree.io](https://formspree.io) and replace `YOUR_FORM_ID` in `index.html`

## Deployment

Host as a static site on any platform:
- **Netlify** (recommended) — connect repo, auto-deploy, free SSL and form handling
- **GitHub Pages** — enable Pages, point domain via DNS
- **Cloudflare Pages** — connect repo, excellent CDN performance

Point the GoDaddy domain to whichever host via CNAME/A records.

## Before Launch

- [ ] Add professional headshot as `images/stanford-swanson.jpg`
- [ ] Replace `YOUR_FORM_ID` in `index.html` with your Formspree endpoint
- [ ] Replace placeholder testimonials with real ones
- [ ] Review and update stats in the Results section
- [ ] Add favicon files to `images/`
- [ ] Create an OG share image as `images/og-image.jpg` (1200x630px)
- [ ] Set up Google Business Profile for local SEO
