# Kareem Zaghloul — Mechanical CAD Portfolio (`kareemzaghloul.github.io`)

100% static HTML, CSS, and JavaScript engineering portfolio ready for GitHub Pages (zero build tools, zero npm, zero backend).

---

## Deploying to GitHub Pages (Web Upload — 5 Steps)

> طريقة الرفع عبر المتصفح (GitHub Web):

1. Open your repository: `https://github.com/kareemzaghloul/kareemzaghloul.github.io` and click **Add file → Upload files**.
2. Extract `kareemzaghloul.github.io.zip`, select **all extracted files and folders** (`index.html`, `.nojekyll`, `404.html`, `assets/`, `projects/`, etc.), and drag them into the upload area (this replaces your old `index.html`).
3. Scroll down, enter a commit message (e.g., `Deploy engineering portfolio`), and click **Commit changes** to `main`.
4. Go to **Settings → Pages** and confirm **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**.
5. Wait **1–3 minutes**, then open `https://kareemzaghloul.github.io` and hard-refresh (`Ctrl + Shift + R`).

### Git CLI Alternative

```bash
git clone https://github.com/kareemzaghloul/kareemzaghloul.github.io.git
cd kareemzaghloul.github.io
# Copy all extracted contents into this folder (overwriting index.html)
git add -A
git commit -m "Deploy updated mechanical CAD portfolio"
git push origin main
```

---

## Replacing Placeholders with Your Real Files

All placeholder images are blueprint `.svg` files with the exact recommended dimensions printed inside them. To replace any image:
1. Export your real render or drawing from SOLIDWORKS as `.jpg` or `.webp` (or `.png` for crisp 2D drawings).
2. Compress images under **400 KB** using [squoosh.app](https://squoosh.app) so pages load fast.
3. Put the file in the matching folder below and update the `.svg` extension to `.jpg` / `.webp` / `.png` in that project's HTML file (`src` and `data-src` for gallery images).
4. For PDFs, keep the exact filename so all links work immediately without HTML edits.

### Placeholder Replacement Table

| File Path | What to Export | Recommended Size / Format |
|---|---|---|
| `assets/docs/Kareem-Zaghloul-CV.pdf` | Your up-to-date CV | PDF (same filename) |
| `assets/docs/Kareem-Zaghloul-Portfolio.pdf` | Compiled PDF portfolio packet | PDF (same filename) |
| `assets/projects/proximity-sensor-bracket/cover.svg` | Project 01 hero assembly render | `2400×1500` JPG/WebP (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/01-assembly-iso.svg` | Complete SOLIDWORKS 3D isometric assembly | `2400×1500` JPG/WebP (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/02-exploded-view.svg` | Exploded assembly view | `2400×1500` JPG/WebP (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/03-adjustment-range.svg` | 25 mm linear slot adjustment view | `2400×1500` JPG/WebP (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/04-interference-check.svg` | SOLIDWORKS Interference Detection screenshot | `2400×1500` JPG/WebP (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/05-sensor-detail.svg` | M12 proximity sensor mounting detail | `2400×1500` JPG/WebP (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/drawing-base-plate.svg` | Base Plate 2D drawing sheet preview | `1600×1131` PNG/JPG (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/drawing-l-bracket.svg` | L-Bracket 2D drawing sheet preview | `1600×1131` PNG/JPG (< 400 KB) |
| `assets/projects/proximity-sensor-bracket/drawing-base-plate.pdf` | Exported SOLIDWORKS Base Plate drawing | PDF (same filename) |
| `assets/projects/proximity-sensor-bracket/drawing-l-bracket.pdf` | Exported SOLIDWORKS L-Bracket drawing | PDF (same filename) |
| `assets/projects/<slug>/cover.svg`, `01-concept.svg`, `02-assembly.svg` | Future project renders for Projects 02–07 | `2400×1500` JPG/WebP (< 400 KB) |

---

## Enabling Your Email Card (Optional)

In `index.html` inside the `#contact` section, look for the `<!-- EMAIL CARD TEMPLATE ... -->` HTML comment block. Remove the `<!--` and `-->` comment markers and replace `YOUR_EMAIL@domain.com` with your actual email address.

When you finish Projects 02–07, update their status badge (`status-badge--completed`) and `data-status="completed"` in `index.html` and the corresponding file in `projects/`.
