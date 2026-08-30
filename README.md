# Ritul Kumar — Personal Portfolio

A static, responsive personal portfolio built with plain HTML, CSS, and JavaScript — no backend, no build step, ready for GitHub Pages.

## Files

```
index.html    → all page content and structure
style.css     → design system, layout, animations, responsive rules
script.js     → background animation, typing effect, nav, scroll reveal, FAQ, form
README.md     → this file
```

There are no other required files. Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts via `<link>` tags in `index.html`, so no local font files are needed.

## What still needs your input

Search `index.html` for the bracketed placeholders below and replace them with real information. Nothing was invented — every placeholder marks information the original brief didn't provide.

| Placeholder | Where it appears |
|---|---|
| `[ADD FACEBOOK LINK]` | Hero socials, Contact page, Footer |
| `[ADD LEETCODE LINK]` | Hero socials, Contact page, Footer |
| `[ADD RESUME FILE/LINK]` (via `data-resume-link` buttons) | Nav, Hero, Works, Footer |
| `[ADD EMAIL]` | Contact page |
| `[ADD SCHOOL NAME]` | Education section (Class 10th / 12th) |
| `[ADD EXACT COURSE NAME]`, `[ADD ORGANIZATION]`, `[ADD DATE]`, `[ADD CERTIFICATE LINK]` | Courses & Certifications cards (×4) |
| `[ADD TECHNOLOGIES]`, `[ADD ROLE]`, `[ADD PROJECT GITHUB LINK]`, `[ADD LIVE DEMO LINK]` | Finance Management Application project card |
| `[ADD SPORT / COMPETITION DETAILS]` | Beyond Technology section |
| `[ADD PROJECTS LINK]`, `[ADD WORKS LINK]`, `[ADD CERTIFICATE FOLDER LINK]` | Works & Resources cards |

**Tip:** open `index.html` in a text editor and use "Find" to jump to each `[ADD ...]` marker.

### Adding the resume

1. Add your resume PDF to the project, e.g. `assets/resume.pdf` (create the `assets` folder).
2. In `index.html`, find every element with `data-resume-link` (there are four: nav, hero, works, footer) and change `href="#"` to `href="assets/resume.pdf"`.
3. Optionally remove the `data-resume-link` attribute once the real link is in place — it currently triggers a reminder popup (see `script.js`, section 8) so unfinished links don't silently do nothing.

### Adding social/placeholder links

Same pattern: find `data-placeholder-link` attributes, replace the `href="#"` with the real URL, and remove the attribute so the reminder popup no longer fires.

### The contact form

The form in the Contact section is a real, styled HTML form, but this is a static site with no server, so submitting it currently just shows a note explaining that nothing was sent (see `script.js`, section 9). To make it actually deliver messages without a backend, the easiest options are:

- **Formspree** (or a similar form-backend service): sign up, get a form endpoint URL, and set the `<form>` tag's `action` to that URL with `method="POST"`, then remove the `e.preventDefault()` demo handler in `script.js`.
- **mailto fallback**: change the submit button to a link styled like a button with `href="mailto:[ADD EMAIL]"` — simpler, but opens the user's email client instead of submitting in-page.

## How to deploy on GitHub Pages

1. **Create a repository.** On GitHub, create a new public repository (e.g. `ritul-portfolio`).
2. **Add the files.** Upload `index.html`, `style.css`, `script.js`, and this `README.md` to the repository root (use "Add file → Upload files" on GitHub, or `git add` / `git commit` / `git push` if using Git locally). Keep `index.html` at the repository root — GitHub Pages looks for it there by default.
3. **Enable Pages.** In the repository, go to **Settings → Pages**. Under "Build and deployment," set **Source** to **Deploy from a branch**. Choose the branch (usually `main`) and folder `/ (root)`, then click **Save**.
4. **Wait for the build.** GitHub will show a message that the site is being built; refresh after a minute or two.
5. **Visit your site.** The URL will look like `https://<your-github-username>.github.io/<repository-name>/`. GitHub also shows this URL at the top of the Pages settings page once it's live.
6. **Push updates any time.** Every time you edit the files and push to the same branch, GitHub Pages redeploys automatically within a minute or two.

No environment variables, build tools, or backend setup are required — the three files are the entire deployed site.
