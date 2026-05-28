# Project Notes

## Logo / asset generation rules

### 1 — Always export a JPEG
Whenever generating a logo or graphic, always produce an SVG **and** an exact JPEG export of it (same base name, `.jpg`).
Convert with cairosvg + Pillow, rendered at 1024px minimum, flattened onto a white background, quality 95.

```bash
python3 - <<'PY'
import cairosvg, io, os
from PIL import Image
svg = "FILENAME.svg"
png = cairosvg.svg2png(url=svg, output_width=1024, output_height=1024)
img = Image.open(io.BytesIO(png)).convert("RGBA")
bg = Image.new("RGB", img.size, (255, 255, 255))
bg.paste(img, mask=img.split()[3])
bg.save(os.path.splitext(svg)[0] + ".jpg", "JPEG", quality=95, subsampling=0)
PY
```

### 2 — Always show a visual preview at the end
After every logo or graphic generation, render a preview JPEG and send it to the user with `SendUserFile` so they can see the result immediately without downloading the file manually.
