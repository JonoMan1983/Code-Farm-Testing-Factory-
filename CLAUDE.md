# Project Notes

## Logo / asset generation

- Whenever generating a logo, always produce an SVG **and** an exact JPEG export of it (same name, `.jpg`).
- Convert with cairosvg + Pillow, rendered at 1024px, flattened onto a white background, quality 95.
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
