# Alan Bush Tiling — website

Static one-page site for Alan Bush Tiling (Tauranga, NZ). Plain HTML/CSS/JS, no build step, no framework — built to be served as-is by GitHub Pages.

## What's here

- `index.html` — the whole site (Home / Tiling Services / About / Tiling Gallery, all on one page with anchor navigation)
- `css/style.css` — styles
- `js/script.js` — mobile menu, testimonial carousel, services accordion, contact modal, contact form (Formspree), gallery carousels + lightbox
- `assets/` — logo, service icons, supplier logos, favicon
- `images/` — hero photo, service photos, gallery photos (resized/compressed from the original design export — see below)
- `vendor/swiper/` — [Swiper](https://swiperjs.com/) v11, vendored locally (MIT licensed, `vendor/swiper/LICENSE`) rather than pulled from a CDN, so the gallery carousels don't depend on a third party at runtime

This was built from a design handoff exported by Claude Design (`claude.ai/design`) — see the original prototype and chat transcripts if you want the full design history.

### Notes on the build

- All photos were re-compressed (resized to a max of 1920px, JPEG quality 80) — the originals totalled ~87MB, which would make the site painfully slow to load; the site now weighs about 9.5MB.
- The contact form posts to Formspree (`https://formspree.io/f/mrpzkloe`) — that endpoint was already set up as part of the design, not something this build created.
- One bug in the original exported HTML is fixed here: the "Tiling Gallery" nav link didn't actually point at anything (missing section id). It does now.

## Push this to GitHub

From this directory:

```bash
git init -b main            # if not already a repo
git add -A
git commit -m "Alan Bush Tiling website"
gh repo create alan-bush-tiling --public --source=. --remote=origin --push
```

(No `gh`? Create the repo at https://github.com/new instead, then:)

```bash
git remote add origin https://github.com/<your-username>/alan-bush-tiling.git
git push -u origin main
```

## Turn on GitHub Pages

1. On GitHub, go to the repo's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Save.
4. GitHub will publish the site at `https://<your-username>.github.io/alan-bush-tiling/` within a minute or two.

No build step, no GitHub Actions workflow needed — it's static files served straight from the branch.

### Optional: a custom domain

If Alan has (or wants) a domain, add it under **Settings → Pages → Custom domain**, then point the domain's DNS at GitHub Pages (an `A` record to GitHub's IPs, or a `CNAME` record to `<your-username>.github.io` for a subdomain). GitHub's docs walk through this: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Local preview

No build tooling required — any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
