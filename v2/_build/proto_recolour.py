"""Recolour the Recycling Lottery edge-case prototype into the Dig Site palette."""
import re, colorsys, os
SRC = '/mnt/user-data/uploads/lottery-interactive-prototype_10.html'
OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'pantelotteriet', 'edge-case-study.html')


def warm(r, g, b):
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    deg = h * 360
    if s < .06:
        return r, g, b                      # neutrals (white, greys, near-black) stay as they are
    if 160 <= deg < 215:                    # teal / cyan brand -> ochre family
        if l < .22:                         # dark teal page chrome -> basalt / strata
            nh, ns, nl = 25, .22, max(l * .85, .06)
        else:
            nh, ns, nl = 34, min(1, s * 1.05), l
    elif 130 <= deg < 160:                  # greens -> moss
        nh, ns, nl = 95, s * .55, l
    else:
        return r, g, b                      # reds / oranges (errors, warnings) keep their meaning
    rr, gg, bb = colorsys.hls_to_rgb(nh / 360, nl, ns)
    return round(rr * 255), round(gg * 255), round(bb * 255)


def hexsub(m):
    h = m.group(0)[1:]
    return '#%02X%02X%02X' % warm(*(int(h[i:i + 2], 16) for i in (0, 2, 4)))


def rgbsub(m):
    w = warm(int(m.group(2)), int(m.group(3)), int(m.group(4)))
    return f'{m.group(1)}({w[0]},{w[1]},{w[2]}'


t = open(SRC, encoding='utf-8').read()
t = re.sub(r'#[0-9a-fA-F]{6}\b', hexsub, t)
t = re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', rgbsub, t)
t = t.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
back = ('<a href="../pantelotteriet.html#prototype" target="_top" style="position:fixed;right:12px;bottom:12px;z-index:9999;'
        'font:500 12px/1 monospace;letter-spacing:.06em;padding:9px 12px;background:#E8A33D;color:#15110E;text-decoration:none;'
        'box-shadow:0 6px 18px rgba(0,0,0,.4)">← THE RECYCLING LOTTERY</a>'
        '<script>if (window.self !== window.top) document.currentScript.previousElementSibling.remove();</script>')
t = re.sub(r'(<body[^>]*>)', lambda m: m.group(1) + back, t, count=1)
open(OUT, 'w', encoding='utf-8').write(t)
print('wrote', len(t))
