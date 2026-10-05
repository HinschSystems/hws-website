# Hinsch Web Systems — marketing site

Static single-page site. No build step, no dependencies. Deploys as-is on Vercel.

```
index.html            page (content + SEO/OG meta + JSON-LD)
404.html              branded not-found page (Vercel serves it automatically)
robots.txt  sitemap.xml
vercel.json           security headers (strict CSP) + font caching
assets/css/styles.css
assets/js/main.js     mobile menu only
assets/fonts/         Archivo (variable, latin) — self-hosted, SIL OFL
assets/img/           logo-lockup.png (nav/footer), icon-512.png, apple-touch-icon.png, favicon-32.png
home-social-preview.png  social/OG preview retained from the prior site
scripts/set-domain.sh rewrites the site URL everywhere in one command
```

## 1. Set the domain (do this first)

The canonical URL, Open Graph tags, sitemap and robots.txt are pre-filled with
`https://hinschsystems.com` (taken from the contact email). If the live domain differs:

```bash
./scripts/set-domain.sh https://your-real-domain.com
```

The `mailto:` address in `index.html` is not touched by that script.

## 2. Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(`vercel.json` headers/CSP only apply on Vercel, not locally.)

## 3. Push to GitHub

```bash
git init -b main
git add .
git commit -m "Initial site"
# with the GitHub CLI:
gh repo create hinsch-web-systems-site --private --source=. --push
# or create an empty repo on github.com, then:
# git remote add origin git@github.com:<you>/hinsch-web-systems-site.git && git push -u origin main
```

## 4. Deploy on Vercel

1. vercel.com/new → import the GitHub repo.
2. Framework Preset: **Other**. Leave Build Command and Output Directory **empty**. Deploy.
3. Project → Settings → Domains → add your domain and create the DNS records Vercel shows.
4. Every push to `main` redeploys; every PR gets a preview URL.

CLI alternative: `npx vercel --prod`

## 5. Pre-launch checklist

- [ ] Domain in `index.html`, `robots.txt`, `sitemap.xml` is correct
- [ ] `alex@hinschsystems.com` is a working inbox
- [ ] Written OK to name each client in the Proof section (Frankart Power Line Services, IRHIS, Bigfoot Studios) and to describe their systems
- [ ] Status badges (Live / Pilot / In Build) are accurate today
- [ ] Hero panel is a conceptual illustration (labeled "Illustrative"); the 3 of 4 verified / approval examples are not client data
- [ ] Open the Vercel preview on a real phone; test the Menu button
- [ ] Paste the live URL into a social-preview checker (LinkedIn Post Inspector) to confirm the OG image
- [ ] Submit `/sitemap.xml` in Google Search Console

## Notes

- **CSP is strict** (`self` only: no inline scripts/styles, no third-party hosts). If you add analytics,
  a booking widget, or a form service, add its origin to the matching directive in `vercel.json`.
  Vercel Web Analytics (`/_vercel/insights/*`) works without changes.
- **Cache:** fonts are cached for a year (`immutable`). CSS/JS use Vercel's default revalidation, so edits go live on deploy.
- **Founder photo:** none is shown. When ready, add it to `assets/img/` and place an `<img>` inside `.founder-visual`.

## IP / confidentiality note

The public site should show **what HWS does and the shape of the method**, not the mechanics. Keep out of the
page, repo and any screenshots: mapping schemas, decision rules, AI prompts/agent instructions, pattern-library
contents, validation logic, and any client-specific values (form IDs, locations, assignments, pricing).
The hero panel uses generic labels only. Review the Proof section against this before launch.
