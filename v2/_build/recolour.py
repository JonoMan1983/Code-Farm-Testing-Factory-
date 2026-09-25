"""Recolour the Three Portals HTML artefacts into the Dig Site palette and fonts."""
import re, os
SRC = '/mnt/user-data/uploads'
OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'three-portals')
FILES = {'structure-options__2_.html': 'structure-options.html', 'annotations__1_.html': 'annotations.html',
         'walkthrough-dashboard__2_.html': 'walkthrough.html', 'project-skills-registry__2_.html': 'skills-registry.html'}
HEX = {
 '#06080f': '#15110E', '#0c1018': '#1C1612', '#111827': '#231B16', '#111927': '#231B16', '#0f1520': '#1F1813',
 '#1a2333': '#2E231B', '#18243a': '#2E231B', '#1f2d3d': '#3A2C21', '#273547': '#4A3827', '#2d3f55': '#5A4633',
 '#475569': '#6B5440', '#64748b': '#8C7358', '#94a3b8': '#A8998A', '#cbd5e1': '#D9CDB9', '#e2e8f0': '#EDE4D3',
 '#22d3ee': '#E8A33D', '#67e8f9': '#F2C27A', '#8b5cf6': '#FF3D6E', '#a78bfa': '#FF7A99', '#10b981': '#8FB573',
 '#34d399': '#AFCB8F', '#f59e0b': '#F2D06B', '#fcd34d': '#F7E09B', '#f43f5e': '#E4572E', '#fb7185': '#EE8260',
 '#0b3a44': '#4A3217', '#071e26': '#2A1D0E', '#061a10': '#1E2616', '#1c1202': '#2A2208', '#110a22': '#2A1018',
}
RGB = {'34,211,238': '232,163,61', '139,92,246': '255,61,110', '16,185,129': '143,181,115', '245,158,11': '242,208,107',
       '244,63,94': '228,87,46', '31,45,61': '58,44,33', '12,16,24': '28,22,18'}
FONT_URL = "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Archivo:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
BACK = ('<a href="../three-portals.html" target="_top" style="position:fixed;right:12px;bottom:12px;z-index:9999;'
        'font:500 12px/1 \'JetBrains Mono\',monospace;letter-spacing:.06em;padding:9px 12px;background:#E8A33D;'
        'color:#15110E;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.4)">← ONE PLATFORM, THREE PORTALS</a>')


def recolour(t):
    t = re.sub(r'#[0-9a-fA-F]{6}\b', lambda m: HEX.get(m.group(0).lower(), m.group(0)), t)
    t = re.sub(r'rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,', lambda m: 'rgba(' + RGB.get(f'{m.group(1)},{m.group(2)},{m.group(3)}', f'{m.group(1)},{m.group(2)},{m.group(3)}') + ',', t)
    t = re.sub(r"@import url\('https://fonts\.googleapis\.com/[^']*'\);?", f"@import url('{FONT_URL}');", t)
    t = t.replace("'Syne'", "'Big Shoulders Display'").replace("'DM Mono'", "'JetBrains Mono'").replace("'Inter'", "'Archivo'")
    t = t.replace('the Arilo Senior', 'the Senior').replace('Arilo Senior', 'Senior').replace('Arilo', 'the hiring team')
    if "fonts.googleapis.com" not in t:
        t = t.replace('<head>', f'<head>\n<link rel="stylesheet" href="{FONT_URL}">', 1)
    t = t.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
    t = t.replace('</head>', '<style>@media (max-width:640px){table{display:block;max-width:100%;overflow-x:auto}.score-row,.scores,.hdr-stats,[class*="score-grid"]{flex-wrap:wrap}.hdr-stats{max-width:100%}html,body{overflow-x:hidden}}</style>\n</head>', 1)
    t = re.sub(r'(<body[^>]*>)', lambda m: m.group(1) + BACK + '<script>if (window.self !== window.top) document.currentScript.previousElementSibling.remove();</script>', t, count=1)
    return t


for src, dst in FILES.items():
    t = open(os.path.join(SRC, src), encoding='utf-8').read()
    out = recolour(t)
    open(os.path.join(OUT, dst), 'w', encoding='utf-8').write(out)
    left = sorted(set(m.lower() for m in re.findall(r'#[0-9a-fA-F]{6}\b', out)) - {v.lower() for v in HEX.values()} - {'#15110e'})
    print(dst, len(out), 'unmapped:', left)
