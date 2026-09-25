"""Recolour the bundled Three Portals system-map app into the Dig Site palette (hue-mapped, lightness kept)."""
import re, json, colorsys, os
SRC = '/mnt/user-data/uploads/Arilo_System_Map__1_.html'
OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'three-portals', 'system-map.html')


def warm(r, g, b):
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    deg = h * 360
    if s < .02:
        nh, ns = 30, s
    elif 170 <= deg < 205:      # cyan -> ochre
        nh, ns = 36, min(1, s * .95)
    elif 205 <= deg < 245:      # slate / blue greys -> warm greys
        nh, ns = 28, s * .55 if s < .45 else s * .5
    elif 245 <= deg < 290:      # violet -> tag pink
        nh, ns = 345, s
    elif 140 <= deg < 170:      # green -> moss
        nh, ns = 95, s * .55
    elif 20 <= deg < 60:        # amber -> sticky yellow
        nh, ns = 45, s * .9
    elif deg >= 330 or deg < 20:  # red -> rust
        nh, ns = 12, s * .85
    else:
        nh, ns = deg, s
    if l < .09:                  # near-black backgrounds -> basalt family
        nh, ns = 25, .2
    rr, gg, bb = colorsys.hls_to_rgb(nh / 360, l, ns)
    return round(rr * 255), round(gg * 255), round(bb * 255)


def hexsub(m):
    h = m.group(0)[1:]
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return '#%02X%02X%02X' % warm(r, g, b)


def rgbsub(m):
    r, g, b = int(m.group(2)), int(m.group(3)), int(m.group(4))
    w = warm(r, g, b)
    return f'{m.group(1)}({w[0]},{w[1]},{w[2]}'


def recolour(t):
    t = re.sub(r'#[0-9a-fA-F]{6}\b', hexsub, t)
    t = re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', rgbsub, t)
    return t.replace('ARILO · ', '').replace('Arilo', 'the platform')


s = open(SRC, encoding='utf-8').read()
m = re.search(r'(<script type="__bundler/template">)(.*?)(</script>)', s, re.S)
tpl = json.loads(m.group(2))
tpl = recolour(tpl)
tpl = tpl.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
new = m.group(1) + '\n' + json.dumps(tpl).replace('</', '<\\/') + '\n  ' + m.group(3)
s = s[:m.start()] + new + s[m.end():]
s = re.sub(r'(<div id="__bundler_thumbnail">.*?</div>)', lambda mm: recolour(mm.group(1)), s, count=1, flags=re.S)
s = s.replace('background: #06080F', 'background: #15110E')
s = s.replace('<title>Bundled Page</title>', '<title>One Platform, Three Portals — system map</title>')
open(OUT, 'w', encoding='utf-8').write(s)
print('wrote', len(s))
