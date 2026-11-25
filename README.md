# Kareem Zaghloul — Mechanical CAD Portfolio (`kareemzaghloul.github.io`)

Minimal, light-themed static portfolio built with pure HTML, CSS, and JavaScript for GitHub Pages (no build tools, no npm, no backend).

---

## Deploying to GitHub Pages (Important: Clean Up Old Files First)

If your repository currently holds files from an earlier version (`assets/`, `projects/`, `site.webmanifest`, etc.), **remove the old files first** so no unused files remain on GitHub.

### Option A — GitHub Web Interface

1. Open `https://github.com/kareemzaghloul/kareemzaghloul.github.io` and delete any old folders/files (`assets/`, `projects/`, `404.html`, `README.md`, `robots.txt`, `sitemap.xml`, `site.webmanifest`) if present.
2. Extract `kareemzaghloul.github.io.zip` locally.
3. Click **Add file → Upload files**, select **all extracted files and folders** (`index.html`, `.nojekyll`, `404.html`, `robots.txt`, `sitemap.xml`, `README.md`, `assets/`, `projects/`), and drag them into the upload box.
4. Commit the changes directly to `main`.
5. Go to **Settings → Pages**, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, wait 1–3 minutes, and hard-refresh `https://kareemzaghloul.github.io` (`Ctrl + Shift + R`).

### Option B — Git CLI

```bash
git clone https://github.com/kareemzaghloul/kareemzaghloul.github.io.git
cd kareemzaghloul.github.io
git rm -r .
# Copy all extracted contents from kareemzaghloul.github.io.zip into this folder
git add -A
git commit -m "Deploy redesigned mechanical CAD portfolio"
git push origin main
```

> طريقة النشر السريعة: احذف المجلدات القديمة من المستودع أولاً (`assets/`، `projects/`، `site.webmanifest`)، ثم فك ضغط ملف الـ ZIP وارفع جميع الملفات والمجلدات الجديدة إلى فرع `main` وانتظر 1–3 دقائق.

---

## Adding Future Projects (Projects 02–07)

1. Export clean SOLIDWORKS renders (recommended widths `2400px` and `1200px`, compressed under `450 KB` as progressive JPEG).
2. Place them inside `assets/projects/<project-slug>/`.
3. Duplicate `projects/proximity-sensor-bracket.html` as `projects/<project-slug>.html`, update the copy, tables, and image paths.
4. In `index.html`, move the project out of the **In development** `<ol>` list and add a featured link block under **Selected Work**.

---

## Enabling Your Email Address (Optional)

In `index.html` inside the `#contact` section, find the commented-out `<!-- <a href="mailto:YOUR_EMAIL@domain.com">...</a> -->` line, remove the HTML comment tags, and replace `YOUR_EMAIL@domain.com` with your actual email address.
