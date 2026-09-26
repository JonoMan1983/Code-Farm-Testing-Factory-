#!/usr/bin/env python3
"""Generate the V2 Dig Site pages. Run: python3 _build/build.py from the v2 folder (writes pages into v2/)."""
import html, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from case_art import CASE_ART
from stage_art import BRIEF, EXPLORE, BUILD, HANDOFF, ICON_TALK, ICON_PRIORITY, ICON_EYE, ICON_SITE, ICON_HUNTER, ICON_CENTRAL, ICON_STUDIO

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
A = '/Code-Farm-Testing-Factory-/assets'
EMAIL = 'jonathanedwardnestler@gmail.com'
LINKEDIN = 'https://www.linkedin.com/in/jonoman1983'
CDN = 'https://res.cloudinary.com/dksariyyz'
DATA = json.load(open(os.path.join(HERE, 'v1data.json')))

GA = """<script async src="https://www.googletagmanager.com/gtag/js?id=G-VR87BLZQG1"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VR87BLZQG1',{site_version:'v2'});</script>"""


DINO_NAMES = {
    '04': 'Designasaurus rex',
    '02': 'Tyrannosaurus codex', '03': 'Vestigium metricum', '05': 'Stegosaurus systema', '06': 'Tyrannosaurus personae',
    '07': 'Unguis intentus', '08': 'Triceratops annotata', '09': 'Velociraptor designii', '10': 'Pterodactylus promptus', '11': 'Ankylosaurus archivum',
}


def guide(n, pre, variant='fossil', left=False):
    cls = 'guide guide--left' if left else 'guide'
    return (f'<figure class="{cls}" aria-hidden="true"><img src="{pre}assets/dino/dino{n}-{variant}.svg" alt="" width="176" height="138">'
            f'<figcaption>Specimen {n} · {DINO_NAMES[n]}</figcaption></figure>')


def dino_img(n, pre, cls, variant='fossil', alt=''):
    return f'<img class="{cls}" src="{pre}assets/dino/dino{n}-{variant}.svg" alt="{alt}">'


SHOVEL = '<svg class="shovel" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><rect x="8.2" y="1.4" width="7.6" height="3.4" rx="1.7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4.8V12.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M7.4 12.4h9.2v3.9c0 3.1-2 5.6-4.6 6.6-2.6-1-4.6-3.5-4.6-6.6z" fill="currentColor"/></svg>'

def head(title, desc, pre):
    return f"""<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<!-- V2 STAGING: remove the robots line at swap time -->
<meta name="robots" content="noindex, nofollow">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://jonoman1983.github.io{A}/brand/logo/og-image.png">
<meta name="theme-color" content="#15110E">
<link rel="icon" href="{pre}assets/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="{pre}assets/brand/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="{pre}assets/brand/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100..900&family=Archivo:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{pre}assets/css/dig.css">
{GA}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""


def header(pre, active, home=False, crumbs=None):
    h = '' if home else f'{pre}index.html'
    arc = f'{pre}archive.html'

    def cur(k):
        return ' aria-current="page"' if k == active else ''

    menu = [
        ('about', 'About the Dino', f'{h}#about', [('The specimen', f'{h}#about'), ('Clients', f'{h}#clients'), ('Tools of the trade', f'{h}#toolkit'), ('Career timeline', f'{h}#timeline'), ('Certifications', f'{h}#certs'), ('References', f'{h}#proof')]),
        ('work', 'Work', f'{h}#work', [('One Platform, Three Portals', f'{pre}work/three-portals.html'), ('The Recycling Lottery', f'{pre}work/pantelotteriet.html'), ('iGaming', f'{pre}work/astria-platform.html'), ('Indiemode', f'{pre}work/indiemode.html')]),
        ('ai', 'AI Practice', f'{h}#ai', [('How AI fits each stage', f'{h}#ai'), ('Tool strata', f'{h}#ai-tools'), ('Built with Claude', f'{h}#ai-builds')]),
        ('archive', 'Creative Archive', arc, [('Motion reel', f'{arc}#reel'), ('Video', f'{arc}#videos'), ('Animation', f'{arc}#anims'), ('Artistic expression', f'{arc}#art'), ('Brand &amp; legacy', f'{arc}#docs')]),
    ]
    items = []
    for key, label, href, subs in menu:
        sub = ''.join(f'<li><a href="{u}">{t}</a></li>' for t, u in subs)
        items.append(f'<li class="has-drop"><a class="nav-top" href="{href}"{cur(key)}>{label}</a>'
                     f'<button class="drop-toggle" type="button" aria-expanded="false" aria-controls="drop-{key}" aria-label="{label} submenu">'
                     f'<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>'
                     f'<ul class="drop" id="drop-{key}">{sub}</ul></li>')
    items.append(f'<li><a class="nav-top" href="{pre}resume.html"{cur("cv")}>Field Notes (Resume)</a></li>')
    items.append(f'<li><a class="btn btn--fill" href="{h}#contact">Hire the raptor</a></li>')

    trail = [f'<li><a href="{pre}index.html">{SHOVEL}<span>Dig site</span></a></li>']
    for label, href in (crumbs or []):
        trail.append(f'<li><a href="{href}">{label}</a></li>' if href else f'<li><span aria-current="page">{label}</span></li>')
    trail.append('<li class="crumb-live" hidden><span data-crumb-live></span></li>')
    return f"""<header class="site-header">
<a class="brand" href="{pre}index.html" aria-label="Designasaurus Rex — home">
<img class="brand-logo" src="{pre}assets/brand/jen-logo.svg" alt="" width="84" height="52">
<span class="brand-name"><b>DESIGNASAURUS REX</b><span>FIELD SITE · PORTFOLIO v2.0</span></span>
</a>
<button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Menu"><span></span><span></span><span></span></button>
<nav class="nav" id="site-nav" aria-label="Main"><ul class="nav-list">{''.join(items)}</ul></nav>
</header>
<nav class="crumbs" aria-label="Breadcrumb"><ol>{''.join(trail)}</ol><span class="crumbs-hint mono" aria-hidden="true">You are here</span></nav>
<div class="rail" aria-hidden="true"><span class="rail-fill"></span><span class="rail-read"></span></div>
<div class="progress" aria-hidden="true"></div>
"""


def _plain(t):
    import re as _r
    return _r.sub(r'<[^>]+>', '', t)


def footer(pre):
    return f"""<footer class="site-footer">
<span class="foot-brand"><img src="{pre}assets/brand/jen-logo.svg" alt="" width="58" height="36"><span>© <span data-year>2026</span> Jonathan Edward Nestler · Designasaurus Rex</span></span>
<span>Jeffreys Bay, ZA · Remote worldwide · Open to relocate anywhere in South Africa</span>
</footer>
<script src="{pre}assets/js/dig.js" defer></script>
</body>
</html>
"""


def phone():
    return """<div class="phone" aria-hidden="true">
<div class="phone-top"><span class="mono">NEXT DRAW IN</span><span class="count" data-countdown>02:14:36</span></div>
<div class="phone-card"></div><div class="phone-line" style="width:120px"></div><div class="phone-line" style="width:150px"></div>
<div class="phone-tabs"><span>DRAWS</span><span>CLAIM</span><span>PROFILE</span></div>
</div>"""


SLOTS = [
    ('Samurai', f'{CDN}/video/upload/f_jpg,q_auto,w_600,h_380,c_fill,so_1/v1780033052/Samurai_Reelframe_ke6sbp.jpg'),
    ('Geisha', f'{CDN}/video/upload/f_jpg,q_auto,w_600,h_380,c_fill,so_1/v1780033056/Geisha_Reelframe_cxusil.jpg'),
    ('Cupcake Space Unicorn', f'{CDN}/video/upload/f_jpg,q_auto,w_600,h_380,c_fill,so_1/v1780033058/Cupcake_Space_Unicorn_Reelframe_mzqgqy.jpg'),
    ('Mayan Madness', f'{CDN}/video/upload/f_jpg,q_auto,w_600,h_380,c_fill,so_1/v1780033054/Mayan_Madness_Wild_j7x05p.jpg'),
    ('Atlantis', f'{CDN}/video/upload/f_jpg,q_auto,w_600,h_380,c_fill,so_1/v1780033062/Atlantis_King_xcp1co.jpg'),
    ('Vote-Betting App', f'{CDN}/image/upload/q_auto,w_600,h_380,c_fill/v1780042689/Vote-Betting_lypghr.jpg'),
]
UI_SHOTS = ['v1780042536/UI_Portfolio_2022-02_dh0wod', 'v1780042536/UI_Portfolio_2022-03_xcjkn6', 'v1780042538/UI_Portfolio_2022-04_hxksrx',
            'v1780042654/UI_Portfolio_2022-07_gfwpyt', 'v1780042654/UI_Portfolio_2022-08_i9r9dc', 'v1780042655/UI_Portfolio_2022-09_gvww35']


SHELL_GAMES = [
    ('Samurai', 'samurai', 'Mega Samurai Legend slot: torii-gate reel frame over a cherry-blossom valley'),
    ('Big Sexy City', 'big-sexy-city', 'Big Sexy City slot: marquee-bulb reel frame over a night skyline, big-win state'),
    ('Rose of the West', 'rose-of-the-west', 'Rose of the West slot: wooden saloon reel frame in a desert town, expanded wild'),
]
IGAMING = [
    ('Bellas Bachelorette', 'bellas-bachelorette', "Bella's Bachelorette slot: neon pink reel frame over a party crowd, wild and scatter"),
    ('Americana', 'americana', 'Americana Road Trip slot: chrome reel frame over the US flag, expanding Liberty wild'),
]
ALL_GAMES = IGAMING + SHELL_GAMES


MINI_MAP = """<svg viewBox="0 0 420 260" role="presentation">
<g font-family="JetBrains Mono, monospace" font-size="9" fill="#A8998A"><text x="8" y="20">ORDER LIFECYCLE</text><text x="8" y="92">CUSTOMER</text><text x="8" y="128">STORE</text><text x="8" y="164">PLATFORM</text><text x="8" y="214">MONEY</text></g>
<path d="M20 40 L400 40" stroke="#E8A33D" stroke-width="3"/>
<g fill="#15110E" stroke="#E8A33D" stroke-width="2.5">""" + ''.join(f'<circle cx="{20 + i * 54.3:.1f}" cy="40" r="7"/>' for i in range(8)) + """</g>
<g fill="#3A2C21"><rect x="80" y="80" width="330" height="18"/><rect x="80" y="116" width="330" height="18"/><rect x="80" y="152" width="330" height="18"/></g>
<rect x="80" y="200" width="330" height="20" fill="#E8A33D" opacity=".22"/>
<g class="mm-lanes" stroke="#EDE4D3" stroke-width="1.2" stroke-dasharray="3 3" fill="none">
<path class="mm-l" style="--d:0s" d="M20 47 L20 89 L80 89"/><path class="mm-l" style="--d:.6s" d="M183 47 L183 125 L240 125"/><path class="mm-l" style="--d:1.2s" d="M129 47 L129 161 L180 161"/><path class="mm-l" style="--d:1.8s" d="M129 47 L129 210 L150 210"/></g>
<g fill="#EDE4D3"><rect x="90" y="83" width="54" height="12" rx="2"/><rect x="250" y="119" width="70" height="12" rx="2"/><rect x="190" y="155" width="64" height="12" rx="2"/></g>
<g fill="#E8A33D"><rect x="158" y="204" width="46" height="12"/><rect x="214" y="204" width="46" height="12"/><rect x="270" y="204" width="46" height="12"/><rect x="326" y="204" width="70" height="12"/></g>
<circle class="mm-order" r="9" cy="40" cx="20" fill="#FF3D6E"/>
<text x="210" y="248" font-family="JetBrains Mono, monospace" font-size="9" fill="#E8A33D" text-anchor="middle">THREE VIEWS · ONE ORDER</text>
</svg>"""


def slabs(pre='', items=None):
    tiles = []
    for n, stem, alt in (items or IGAMING):
        img = f'{pre}assets/images/igaming/{stem}.jpg'
        full = f'{pre}assets/images/igaming/{stem}-full.jpg'
        tiles.append(f'<button type="button" class="slab" data-gal-item data-gal-title="{n}" data-gal-type="image" data-gal-src="{full}" data-gal-alt="{html.escape(alt)}" aria-label="View {n} larger">'
                     f'<img src="{img}" alt="{html.escape(alt)}" width="1200" height="622" loading="lazy"><span class="slab-view mono" aria-hidden="true">View ↗</span><span class="slab-name">{n}</span></button>')
    return f'<div class="slabs slabs--{len(tiles)}" data-gal>' + ''.join(tiles) + '</div>'


IGAMING_HEAD = ('<div class="ig-caption reveal"><h3 class="h-l">iGaming UI implementation</h3>'
                '<p class="lede">Reel frames, win states, wild and scatter animations designed, built and handed off for live slot titles — '
                'shipped to regulated markets in Scandinavia, South Africa and the UK. Tap any title to see the full game screen.</p></div>')


def gal_dialog():
    return """<dialog class="gal-dialog" aria-label="Game preview">
<div class="gal-box">
<header class="gal-head"><span class="mono" data-gal-count></span><h3 data-gal-name></h3><button class="gal-x" type="button" data-gal-close aria-label="Close preview">×</button></header>
<div class="gal-media" data-gal-media></div>
<footer class="gal-foot"><button class="gal-nav" type="button" data-gal-prev>← Previous</button><button class="gal-nav" type="button" data-gal-next>Next →</button></footer>
</div>
</dialog>"""


# ---------------------------------------------------------------- REFERENCES
import re as _re
ORDER = ['nicolaas-du-plessis', 'anne-jacobson', 'hendrik-groenewald', 'justin-gieselbach', 'riaan-roetz',
         'elizabeth-joss-bethlehem', 'vanessa-bohling', 'phillip-van-coller', 'warren-raysdorf', 'darryl-smith']
VERBATIM = {
    'vanessa-bohling': 'A calm and dependable team member',
    'riaan-roetz': 'An amazing designer but also a great manager',
    'phillip-van-coller': 'Highly skilled and very experienced',
}
_raw = {r['id']: r for r in json.load(open(os.path.join(HERE, 'references.json'), encoding='utf-8'))}
REFS = []
for k in ORDER:
    r = _raw[k]
    m = _re.search(r'^(.*?)<strong>(.*?)</strong>', r['summary'], _re.S)
    pull = (m.group(1) + m.group(2)).strip().rstrip('.') if m else r['summary'][:80]
    phrase = m.group(2).strip().rstrip('.') if m else ''
    if k in VERBATIM:  # tag must quote the reference word-for-word
        pull = phrase = VERBATIM[k]
    body = html.escape(r['text'])
    if phrase:
        body = _re.sub('(' + _re.escape(html.escape(phrase)) + ')', r'<mark>\1</mark>', body, count=1, flags=_re.I)
    REFS.append({'id': k, 'name': r['name'], 'role': r['role'], 'pull': pull, 'body': body})


def _tag(i, r, dup=False):
    extra = ' aria-hidden="true" tabindex="-1"' if dup else ' aria-haspopup="dialog"'
    return (f'<button class="ref-tag ref-tag--{i % 3}" type="button" data-ref-index="{i}"{extra}>'
            f'<span class="ref-hole" aria-hidden="true"></span>'
            f'<span class="ref-no">FR-{i + 1:02d}</span>'
            f'<span class="ref-quote">“{html.escape(r["pull"])}.”</span>'
            f'<span class="ref-who"><b>{html.escape(r["name"])}</b><span>{html.escape(r["role"])}</span></span>'
            f'<span class="ref-read">Read full report →</span></button>')


def ref_belts():
    rows = [list(enumerate(REFS))[:5], list(enumerate(REFS))[5:]]
    out = []
    for n, row in enumerate(rows):
        one = ''.join(_tag(i, r) for i, r in row)
        two = ''.join(_tag(i, r, dup=True) for i, r in row)
        out.append(f'<div class="ref-belt{" ref-belt--rev" if n else ""}"><div class="ref-track">'
                   f'<div class="ref-set">{one}</div><div class="ref-set ref-set--dup" aria-hidden="true">{two}</div></div></div>')
    return '<div class="ref-belts reveal">' + ''.join(out) + '</div>'


def ref_dialog():
    data = json.dumps([{'n': f'FR-{i + 1:02d}', 'name': r['name'], 'role': r['role'], 'body': r['body']} for i, r in enumerate(REFS)], ensure_ascii=False).replace('</', '<\\/')
    return f"""<dialog class="ref-dialog" aria-labelledby="ref-d-name">
<article class="ref-paper">
<header class="ref-paper-head"><span class="mono" data-ref-no>FR-01</span><span class="mono">Field report · verified</span><button class="ref-x" type="button" data-ref-close aria-label="Close report">×</button></header>
<h3 class="ref-d-name" id="ref-d-name" data-ref-name></h3>
<p class="ref-d-role mono" data-ref-role></p>
<div class="ref-d-body" data-ref-body></div>
<footer class="ref-paper-foot"><button class="ref-nav" type="button" data-ref-prev>← Previous</button><span class="mono" data-ref-count></span><button class="ref-nav" type="button" data-ref-next>Next →</button></footer>
</article>
</dialog>
<script type="application/json" id="refs-data">{data}</script>"""


# ---------------------------------------------------------------- ABOUT (V1 content, V2 style)
_LOGOS = json.load(open(os.path.join(HERE, 'v1logos.json'), encoding='utf-8'))['logos']
_TOOLS = json.load(open(os.path.join(HERE, 'v1tools.json'), encoding='utf-8'))
_TIMELINE = json.load(open(os.path.join(HERE, 'v1timeline.json'), encoding='utf-8'))
_TIMELINE[0]['dates'] = 'Nov 2023 – Present'
CERTS_MORE = [  # verified from the certificates in Google Drive
    ('UX Design for Developers', 'LinkedIn Learning · Nov 2023'),
    ('Using Style Guides to Bridge Design and Development', 'LinkedIn Learning · Nov 2023'),
    ('Lithium Features', 'Udemy · Feb 2023'),
    ('AI Video Production: Create Videos 100% with AI', 'Udemy · Mar 2025'),
]
CERTS = ['UX Experience Design Fundamentals', 'Become a Product Manager', 'Gamification &amp; Motivation Psychology', 'Adobe XD Masterclass',
         'Product Management Frameworks', 'Ultimate AI Art &amp; Content Creation', 'Web Accessibility &amp; Inclusive Design (WCAG Principles)']


def _tools_v2():
    cats = {c['cat']: c['items'] for c in _TOOLS}
    by = {i['name']: i for c in _TOOLS for i in c['items']}
    figma_icon = by['Figma']['icon']
    ai = [by['Claude AI'], by['Claude Code'], {'name': 'Figma MCP', 'icon': figma_icon}, by['ChatGPT'], by['Gemini'], by['Figma AI'], by['Midjourney'], by['DALL·E']]
    order = [
        ('AI &amp; emerging tools', ai, ['Claude AI', 'Claude Code', 'Figma MCP']),
        ('Design &amp; prototyping', [i for i in cats['Design & Prototyping'] if i['name'] not in ('Claude AI', 'Gemini')], []),
        ('Adobe Creative Suite', cats['Adobe Creative Suite'], []),
        ('Web &amp; front-end', cats['Web & Front-End'], []),
        ('Productivity &amp; project management', cats['Productivity & Project Management'], []),
    ]
    rows = []
    for label, items, primary in order:
        tiles = ''.join(
            f'<li class="tool-chip{" tool-chip--primary" if it["name"] in primary else ""}{" tool-chip--low" if it["name"] in ("Midjourney", "DALL·E") else ""}">'
            f'<span class="tool-chip-icon" aria-hidden="true">{it["icon"]}</span><span>{it["name"].replace("draw. io", "draw.io")}</span></li>' for it in items)
        rows.append(f'<div class="toolkit-row"><h4>{label}</h4><ul>{tiles}</ul></div>')
    return ''.join(rows)


def _timeline():
    def row(t, i):
        return (f'<li class="tl-row tl-row--{i % 4}"><span class="tl-date">{html.escape(t["dates"])}</span>'
                f'<div class="tl-role"><b>{html.escape(t["role"])}</b><span>{html.escape(t["org"])}</span></div>'
                f'<p>{html.escape(t["desc"])}</p></li>')
    top = ''.join(row(t, i) for i, t in enumerate(_TIMELINE[:6]))
    deep = ''.join(row(t, i + 6) for i, t in enumerate(_TIMELINE[6:]))
    return (f'<ol class="tl">{top}</ol>'
            f'<details class="tl-more"><summary><span>Dig deeper</span> — {len(_TIMELINE) - 6} earlier roles, 2007–2013</summary><ol class="tl">{deep}</ol></details>')


def about_more():
    logos = ''.join(f'<img src="{u}" alt="{html.escape(a)}" loading="lazy">' for u, a in _LOGOS)
    logos_dup = ''.join(f'<img src="{u}" alt="" loading="lazy">' for u, a in _LOGOS)
    certs = ''.join(f'<li>{c}</li>' for c in CERTS)
    ticks = ''.join(f'<span class="{"on" if i < 7 else ""}"></span>' for i in range(27))
    return f"""<div class="about-more">
<div class="sub-block reveal" id="clients">
<div class="sec-head"><div><p class="eyebrow">Clients &amp; employers</p><h3 class="h-l" style="margin-top:10px">Companies this Dino worked with</h3></div></div>
<div class="logo-belt" role="region" aria-label="Clients and employers"><div class="logo-track"><div class="logo-set">{logos}</div><div class="logo-set" aria-hidden="true">{logos_dup}</div></div></div>
</div>
<div class="sub-block reveal" id="toolkit">
<div class="sec-head"><div><p class="eyebrow">Software proficiency</p><h3 class="h-l" style="margin-top:10px">Tools of the trade</h3><p class="lede" style="margin-top:12px">The armoury. Wielded, not just installed — Claude first.</p></div>{guide('02', '')}</div>
<div class="toolkit">{_tools_v2()}</div>
</div>
<div class="sub-block reveal" id="timeline">
<div class="sec-head"><div><p class="eyebrow">Career timeline · {len(_TIMELINE)} roles</p><h3 class="h-l" style="margin-top:10px">Two decades. No two projects alike.</h3></div>{guide('05', '')}</div>
{_timeline()}
</div>
<div class="sub-block reveal" id="certs">
<div class="certs">
<div class="certs-count"><b>27</b><span class="h-m">Certifications<br>&amp; counting</span><div class="cert-ticks" aria-hidden="true">{ticks}</div></div>
<div><p class="eyebrow">Continuous learning</p><p class="lede" style="margin-top:12px">Still learning. Still hungry. Still Rex. Beyond the diploma — a standing habit of structured upskilling across UX research, product management, AI tooling and accessibility.</p>
<ul class="cert-list">{certs}<li class="cert-more"><button type="button" class="cert-toggle" aria-expanded="false" aria-controls="cert-extra" data-cert-toggle>+ 20 more</button></li></ul><div class="cert-extra" id="cert-extra" hidden><ul class="cert-list">{"".join(f'<li>{n}<span class="cert-src">{src}</span></li>' for n, src in CERTS_MORE)}</ul><p class="cert-rest">The rest of the 27 are listed on <a href="https://www.linkedin.com/in/jonoman1983/details/certifications/" target="_blank" rel="noopener">LinkedIn → Licenses &amp; certifications ↗</a></p></div></div>
</div>
</div>
</div>"""


# ------------------------------------------------------------------ HOME
def home():
    return head('Jonathan Nestler — Senior Product Designer · UX/UI · AI integration',
                'Senior Product Designer and Jr. Product Owner. UX/UI, product and AI-integrated workflows. Jeffreys Bay, remote worldwide, open to relocate anywhere in South Africa.', '') + header('', '', home=True) + f"""
<main id="main">

<section class="section hero" data-crumb="Welcome" data-depth="0.0m" data-era="2026" aria-labelledby="hero-title">
<p class="hero-welcome">Welcome to the <span class="nw">Designasaurus</span> <span class="dig-stamp"><svg class="shovel" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><rect x="8.2" y="1.4" width="7.6" height="3.4" rx="1.7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4.8V12.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M7.4 12.4h9.2v3.9c0 3.1-2 5.6-4.6 6.6-2.6-1-4.6-3.5-4.6-6.6z" fill="currentColor"/></svg>Dig Site</span></p>
<h1 class="h-mega hero-title hero-title--strata" id="hero-title"><span class="t-line t-years"><span class="t-count" data-count="20">20</span>+ years <span class="t-small">in the strata</span></span><span class="t-line t-craft"><span class="t-box outline">Adobe craft<i class="t-h t-h1" aria-hidden="true"></i><i class="t-h t-h2" aria-hidden="true"></i><i class="t-h t-h3" aria-hidden="true"></i><i class="t-h t-h4" aria-hidden="true"></i></span> <span class="t-meets">meets</span></span><span class="t-line t-velocity"><span class="ochre t-fast">Claude-first velocity.</span><i class="t-streak" aria-hidden="true"></i><i class="t-streak" aria-hidden="true"></i><i class="t-streak" aria-hidden="true"></i></span></h1>
<blockquote class="hero-quote"><p><span class="q-w">From</span> <span class="q-vec">vector-level Illustrator accuracy</span> <span class="q-w">to</span> <span class="q-ai">AI-accelerated system architecture</span><span class="q-w">—built to deliver at</span> <span class="q-epoch">epoch-shifting speed</span>.</p></blockquote>
<div class="hero-meta">
<div class="hero-intro">
<figure class="hero-mark"><img src="assets/brand/jen-logo.svg" alt="JEN Designasaurus logo — a code-bracketed T-rex monogram" width="520" height="320"><figcaption class="tag tag--hot">TAG 04 · STILL ROARING</figcaption></figure>
<div>
<p class="lede"><strong class="hero-name">Jonathan Edward <span>“Designasaurus”</span> Nestler</strong> Senior Product Designer &amp; Jr. Product Owner. UX/UI, product and AI integration, twenty years deep. The newest layer is AI-native.</p>
<div class="btn-row" style="margin-top:28px"><a class="btn btn--bone" href="#work">Dig into the work ↓</a><a class="btn" href="resume.html">Field Notes (Resume)</a></div>
</div>
</div>
<div class="hero-data"><span>LAT 34.05°S · LON 24.91°E</span><span>DEPTH&nbsp;&nbsp;20+ YEARS</span><span>RANGE&nbsp;&nbsp;REMOTE · ANYWHERE IN RSA</span><span>STACK&nbsp;&nbsp;CLAUDE-FIRST</span><span class="hot">STATUS&nbsp;&nbsp;STILL EVOLVING</span></div>
</div>
<div class="hero-ground" aria-hidden="true">
<div class="strata"><i></i><i></i><i></i><i></i></div>
</div>
</section>

<section class="section" id="about" data-crumb="About the Dino" data-depth="0.4m" data-era="2007–now" aria-labelledby="about-title">
<div class="about reveal">
<div><img class="portrait" src="assets/images/portrait.jpg" alt="Jonathan Nestler in a navy jacket and headphones, hand to chin, under a green-gold sky" width="900" height="900" loading="lazy"><div style="margin-top:28px">{guide('06', '', left=True)}</div></div>
<div>
<p class="eyebrow">Topsoil — The specimen</p>
<h2 class="h-xl" id="about-title" style="margin-top:10px">Twenty years.<br>Every era left a mark.</h2>
<p class="lede" style="margin-top:24px">I started in print and brand, moved into web and motion, spent six years shipping iGaming products, and now own product decisions at Astria Systems. I design with the whole system in view, then use AI to prove it works before anyone builds it.</p>
<p class="mono small" style="margin-top:18px;color:var(--muted)">Professional Diploma in UX Design — UX Design Institute, Dublin · 27 certifications</p>
<div class="facts facts--9"><div><b data-fact="20">20+</b><span>years shipping design</span></div><div><b data-fact="15">15</b><span>roles, from die-cut packaging to Jr. Product Owner</span></div><div><b data-fact="8">8</b><span>years at one studio — Wonderlabz to Astria, promoted to PO</span></div><div><b data-fact="12">12</b><span>blue-chip brands — Coca-Cola, Vodacom, MTN, Telkom, GSK, SARS…</span></div><div><b data-fact="3">3</b><span>markets shipped to: Scandinavia, SA, UK</span></div><div><b data-fact="5">5</b><span>cities across 3 provinces — now fully remote</span></div><div><b data-fact="6">6</b><span>eras: print → Flash → web → motion → product → AI</span></div><div><b data-fact="29">29</b><span>tools in the kit, Claude-first</span></div><div><b data-fact="27">27</b><span>certifications — and counting</span></div></div>
</div>
</div>
{about_more()}
</section>
<section class="section refs" id="proof" data-crumb="Field reports" data-depth="0.7m" data-era="reports" aria-labelledby="proof-title">
<div class="sec-head reveal"><div><p class="eyebrow">Field reports · {len(REFS)} verified</p><h2 class="h-l" id="proof-title" style="margin-top:10px">From the people who dug with me</h2></div>{guide('03', '')}</div>
<p class="lede reveal" style="margin-top:-12px;margin-bottom:8px">Managers, founders, mentors and teammates — tagged and hung out to read. Tap any tag for the full report.</p>
{ref_belts()}
<div class="ref-bar reveal"><span class="mono">Every reference is genuine · full conversations on <a href="{LINKEDIN}">LinkedIn</a></span><button class="btn ref-pause" type="button" aria-pressed="false" data-ref-pause>Pause the line</button></div>
{ref_dialog()}
</section>
<section class="section" id="work" data-crumb="Selected work" data-depth="0.9m" data-era="2024–26" aria-labelledby="work-title">
<div class="sec-head reveal"><div><p class="eyebrow">Layer 00 — Surface</p><h2 class="h-xl" id="work-title">Specimens recovered</h2></div>
<p class="lede">Four flagship digs. Each one logged: the brief, what AI proposed, what I kept and what came out of the ground.</p>{guide('02', '')}</div>

<a class="spec spec-feature spec-feature--map reveal" href="work/three-portals.html">
<div class="copy">
<p class="eyebrow">Specimen 00 · Newest find · System map</p>
<h3 class="h-xl">One Platform, Three Portals</h3>
<p class="body-2">A food-ordering platform mapped around the one thing its customer, store and platform portals all share: the order. Lifecycle spine, portal lanes and a money band of its own — built in FigJam with Claude and Figma MCP.</p>
<div class="tags"><span class="tag">SYSTEMS</span><span class="tag">SERVICE DESIGN</span><span class="tag tag--fill">FIGJAM + MCP</span></div>
<span class="spec-cta">How I approach a problem →</span>
</div>
<div class="mini-map" aria-hidden="true">{MINI_MAP}</div>
</a>

<a class="spec spec-feature reveal" href="work/pantelotteriet.html">
<div class="copy">
<p class="eyebrow">Specimen 01 · Scandinavia · Mobile app + raffle site</p>
<h3 class="h-xl">The Recycling Lottery</h3>
<p class="body-2">A recycling lottery where every return is a ticket. Every flow was journey-mapped, then proven in a Claude Code prototype before engineering wrote a line.</p>
<div class="tags"><span class="tag">UX/UI</span><span class="tag">PRODUCT</span><span class="tag tag--fill">AI PROTOTYPE</span></div>
<span class="spec-cta">Read the dig report →</span>
</div>
<div style="display:flex;align-items:center;gap:20px;justify-content:center">{phone()}<p class="phone-note">↙ live logic: tabs, countdown and state changes — built with Claude Code</p></div>
</a>

<div class="spec-grid">
<a class="spec spec-card reveal" href="work/astria-platform.html">
<p class="eyebrow">Specimen 02 · Astria Systems · 2018–now</p>
<h3 class="h-l">iGaming platform, product-owned</h3>
<p class="body-2">Promoted from Product Designer to Jr. Product Owner. UX/UI across Wonderlabz, Playsafe and Pantelotteriet — backlog, flows and design system in one pair of claws.</p>
<div class="spec-thumbs spec-thumbs--5">{''.join(f'<img src="assets/images/igaming/{stem}.jpg" alt="{n} slot game reel frame" width="1200" height="622" loading="lazy">' for n, stem, _ in ALL_GAMES)}</div>
<span class="spec-cta">Read the dig report →</span>
</a>
<a class="spec spec-card reveal" href="work/indiemode.html">
<img src="{A}/images/indiemode-after.jpg" alt="Indiemode homepage after the redesign" loading="lazy">
<p class="eyebrow">Specimen 03 · Indiemode · Fashion</p>
<h3 class="h-l">A week of build in two days</h3>
<p class="body-2">Full-site redesign with Claude as build partner. I directed hierarchy and brand; Claude wrote the code.</p>
<span class="spec-cta">Read the dig report →</span>
</a>
</div>
</section>

<section class="section section--alt" id="ai" data-crumb="AI Practice" data-depth="2.1m" data-era="AI layer" aria-labelledby="ai-title">
<div class="sec-head reveal"><div><p class="eyebrow">Layer 01 — The AI stratum</p><h2 class="h-xl" id="ai-title">AI is bedded in.<br><span class="ochre">Judgment is mine.</span></h2></div>
<p class="lede">Claude runs through every stage — chat, Claude Code, Figma MCP and custom skills — with ChatGPT and Gemini in the daily rotation. Here is exactly where AI sits, and where it doesn't.</p>{guide('10', '')}</div>
<div class="stratum reveal" role="table" aria-label="What AI does and what I decide at each stage">
<div class="col col--corner" role="columnheader"><span class="sr-only">Role</span></div><div class="col" role="columnheader">{BRIEF}<span><small>01</small>Brief</span></div><div class="col" role="columnheader">{EXPLORE}<span><small>02</small>Explore</span></div><div class="col" role="columnheader">{BUILD}<span><small>03</small>Build</span></div><div class="col" role="columnheader">{HANDOFF}<span><small>04</small>Handoff</span></div>
<div class="row-ai" role="rowheader">AI DOES</div>
<div class="ai" role="cell" data-stage="Brief">Claude interrogates the brief — edge cases, user goals, competitor context.</div>
<div class="ai" role="cell" data-stage="Explore">Claude leads; ChatGPT and Gemini add second and third takes on each direction.</div>
<div class="ai" role="cell" data-stage="Build">Claude Code turns Figma flows into working HTML prototypes with real states and timing.</div>
<div class="ai" role="cell" data-stage="Handoff">Figma MCP and Claude draft annotations and dev-ready specs.</div>
<div class="row-me" role="rowheader">I DECIDE</div>
<div class="me" role="cell" data-stage="Brief">What the problem actually is — and what's out of scope.</div>
<div class="me" role="cell" data-stage="Explore">Which direction fits the brand and the user. The rest get cut.</div>
<div class="me" role="cell" data-stage="Build">Every state, every edge case, and what “done” means.</div>
<div class="me" role="cell" data-stage="Handoff">Every spec, before engineering sees it.</div>
</div>
<div class="nodig reveal"><span class="mono">NO-DIG ZONE<br>never automated</span><ul class="nodig-list"><li>{ICON_TALK}<span class="h-m">User interviews</span></li><li>{ICON_PRIORITY}<span class="h-m">Prioritisation</span></li><li>{ICON_EYE}<span class="h-m">Final visual judgment</span></li></ul></div>
<div class="toolstrata reveal" id="ai-tools" aria-label="AI tools by how much of my work they touch">
<p class="eyebrow" style="color:var(--muted)">Tool strata — thickness = how much of the work it touches</p>
<div class="ts-row ts-1"><span class="h-m">Claude</span><span class="ts-bar"><i></i></span><span class="ts-note">Primary · every stage<br><b>Chat · Claude Code · Figma MCP · custom skills</b></span></div>
<div class="ts-row ts-2"><span class="h-m">ChatGPT</span><span class="ts-bar"><i></i></span><span class="ts-note">Daily rotation</span></div>
<div class="ts-row ts-2"><span class="h-m">Gemini</span><span class="ts-bar"><i></i></span><span class="ts-note">Daily rotation</span></div>
<div class="ts-row ts-3"><span class="h-m">Midjourney · DALL·E</span><span class="ts-bar"><i></i></span><span class="ts-note">Occasional · mood reference</span></div>
</div>
<p class="eyebrow reveal" style="margin-top:48px;color:var(--muted)">Tools I've built with Claude</p>
<div class="tools reveal" id="ai-builds">
<div class="tool">{ICON_SITE}<span class="h-m">This site</span><p>Designer-directed, Claude-built, shipped to GitHub Pages in push sessions.</p></div>
<div class="tool">{ICON_HUNTER}<span class="h-m">The Hunter</span><p>A React command centre wired to Gmail through MCP.</p></div>
<div class="tool">{ICON_CENTRAL}<span class="h-m">Central</span><p>Inbox triage that turns email into ClickUp tasks with Claude.</p></div>
<div class="tool">{ICON_STUDIO}<span class="h-m">Studio</span><p>Custom Claude skills for Figma scripting and production.</p></div>
</div>
</section>

<section class="section section--deep" id="craft" data-crumb="iGaming bedrock" data-depth="3.4m" data-era="2018–25" aria-labelledby="craft-title">
<div class="sec-head reveal"><div><p class="eyebrow">Layer 02 — iGaming bedrock · 2018–2025</p><h2 class="h-xl" id="craft-title">Six years of high-stakes pixels</h2></div>
<p class="lede">Live products for lottery and gaming audiences in Scandinavia, South Africa and the UK. Plus the motion, brand and personal work underneath.</p>{guide('05', '')}</div>
<div class="reveal">{slabs()}</div>
{IGAMING_HEAD}
{gal_dialog()}
<div class="btn-row reveal" style="margin-top:40px"><a class="btn btn--bone" href="archive.html">Open the Creative Archive →</a><a class="btn" href="archive.html#reel">Motion reel</a><a class="btn" href="archive.html#art">Artistic expression</a></div>
</section>

<section class="section contact" id="contact" data-crumb="Contact" data-depth="5.1m" data-era="bedrock" aria-labelledby="contact-title">
<p class="eyebrow" style="color:var(--tag)">Bedrock</p>
<h2 class="h-mega" id="contact-title" style="margin-top:10px">You've hit bedrock.<br><span class="ochre">Let's build on it.</span></h2>
<div class="btn-row" style="margin-top:40px"><a class="btn btn--fill" href="mailto:{EMAIL}">Start a conversation</a><a class="btn" href="resume.html">Field Notes (Resume)</a><a class="btn" href="{LINKEDIN}">LinkedIn</a></div>
<p class="mono">Jeffreys Bay, South Africa · Remote worldwide · Open to relocate anywhere in South Africa</p>
{dino_img('07', '', 'contact-dino', variant='amber')}
</section>
</main>
""" + footer('')


# ------------------------------------------------------------ CASE TEMPLATE
def case(slug, title, eyebrow, name, lede, meta, problem, log, ai_step, notes, extra, metrics, next_href, next_name):
    pre = '../'
    meta_html = ''.join(f'<div><span class="mono">{k}</span><b>{v}</b></div>' for k, v in meta)
    arts = CASE_ART.get(slug, [''] * len(log))
    log_html = ''.join(
        f'<div class="log-row{" is-ai" if i == ai_step else ""}"><span class="n">0{i+1}</span><span class="h-m">{t}</span><p>{d}</p><figure class="log-tray">{arts[i]}</figure></div>'
        for i, (t, d) in enumerate(log))
    notes_html = ''.join(
        f'<div class="note"><div class="note-ai"><span class="mono">AI proposed</span>{a}</div><div class="note-me"><span class="note-me-label"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#E8A33D"/><path d="M6.5 12.5l3.5 3.5 7.5-8" fill="none" stroke="#15110E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>I decided</span><p>{b}</p></div></div>' for a, b in notes)
    met_html = ''.join(f'<div><b>{a}</b><span>{b}</span></div>' for a, b in metrics)
    return head(title, lede, pre) + header(pre, 'work', crumbs=[('Work', '../index.html#work'), (_plain(name), None)]) + f"""
<main id="main">
<section class="section cs-hero" data-crumb="Overview" data-depth="0.0m" data-era="{slug}">
<a class="mono small" href="../index.html#work">← Back to the dig site</a>
<p class="eyebrow" style="margin-top:36px">{eyebrow}</p>
<h1 class="h-mega">{name}</h1>
<p class="lede">{lede}</p>
<div class="strata" aria-hidden="true"><i></i><i></i><i></i></div>
</section>
<div class="cs-meta">{meta_html}</div>

<section class="section" data-depth="0.6m" data-era="the problem">
<div class="cs-split reveal"><div><p class="eyebrow">The surface problem</p><div style="margin-top:28px">{guide('07', pre, left=True)}</div></div><p class="h-l">{problem}</p></div>
</section>

<section class="section section--alt" data-depth="1.2m" data-era="excavation log">
<div class="sec-head reveal"><div><p class="eyebrow">Excavation log</p><h2 class="h-l">Four layers, top to bottom</h2></div>{guide('05', pre)}</div>
<div class="log reveal">{log_html}</div>
</section>

{extra}

<section class="section" data-depth="2.4m" data-era="field notes">
<div class="sec-head reveal"><div><p class="eyebrow">Field notes — AI proposed / I decided</p><h2 class="h-l">Where the judgment happened</h2></div>{guide('08', pre)}</div>
<div class="notes reveal">{notes_html}</div>
</section>

<div class="next-wrap"><a class="next" href="{next_href}">Next specimen: {next_name} →</a></div>
</main>
""" + footer(pre)


def nda_veil(title, subject):
    """NDA overlay card for a live embed that sits blurred behind it."""
    subj = subject.replace(' ', '%20').replace('—', '%E2%80%94')
    return f'''<div class="nda-tape" aria-hidden="true"><span>PROTECTED UNDER NDA · PROTECTED UNDER NDA · PROTECTED UNDER NDA · PROTECTED UNDER NDA · PROTECTED UNDER NDA</span></div>
<div class="nda-card">
<span class="nda-lock" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30"><rect x="4.5" y="10.5" width="15" height="11" rx="2" fill="currentColor"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.6" fill="#15110E"/></svg></span>
<p class="eyebrow">Sealed layer</p>
<h3 class="h-l">{title}</h3>
<p class="nda-sub">Protected under NDA</p>
<a class="btn btn--fill nda-cta" href="mailto:{EMAIL}?subject={subj}">Reach out for more info…</a>
</div>'''


def pantelotteriet():
    extra = f"""<section class="section" id="research" data-depth="1.8m" data-era="journey research">
<div class="sec-head reveal"><div><p class="eyebrow">Journey research</p><h2 class="h-l">Every journey, mapped before a screen</h2></div>
<p class="lede">Registration → claim, profile, support and history — each scoped with its happy path and every edge case.</p>{guide('06', '../')}</div>
<!-- PENDING: journey research boards from RLI Mobile App.fig (needs Figma link) -->
<div class="nda reveal">
<svg class="nda-board" viewBox="0 0 940 360" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><g><rect x="30" y="40" width="130" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="180" y="40" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="330" y="40" width="110" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="480" y="40" width="130" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="630" y="40" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="780" y="40" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="30" y="102" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="180" y="102" width="110" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="330" y="102" width="130" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="480" y="102" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="630" y="102" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="780" y="102" width="130" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="30" y="164" width="110" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="180" y="164" width="130" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="330" y="164" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="480" y="164" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="630" y="164" width="130" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="780" y="164" width="110" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="30" y="226" width="130" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="180" y="226" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="330" y="226" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="480" y="226" width="130" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="630" y="226" width="110" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="780" y="226" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="30" y="288" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="180" y="288" width="110" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><rect x="330" y="288" width="130" height="44" rx="4" fill="#6B5440" opacity="0.8"/><rect x="480" y="288" width="110" height="44" rx="4" fill="#F2D06B" opacity="0.55"/><rect x="630" y="288" width="110" height="44" rx="4" fill="#E8A33D" opacity="0.8"/><rect x="780" y="288" width="130" height="44" rx="4" fill="#EDE4D3" opacity="0.55"/><path d="M140 62 L180 62" stroke="#A8998A" stroke-width="2"/><path d="M290 62 L330 62" stroke="#A8998A" stroke-width="2"/><path d="M440 62 L480 62" stroke="#A8998A" stroke-width="2"/><path d="M590 62 L630 62" stroke="#A8998A" stroke-width="2"/><path d="M740 62 L780 62" stroke="#A8998A" stroke-width="2"/><path d="M140 124 L180 124" stroke="#A8998A" stroke-width="2"/><path d="M290 124 L330 124" stroke="#A8998A" stroke-width="2"/><path d="M440 124 L480 124" stroke="#A8998A" stroke-width="2"/><path d="M590 124 L630 124" stroke="#A8998A" stroke-width="2"/><path d="M740 124 L780 124" stroke="#A8998A" stroke-width="2"/><path d="M140 186 L180 186" stroke="#A8998A" stroke-width="2"/><path d="M290 186 L330 186" stroke="#A8998A" stroke-width="2"/><path d="M440 186 L480 186" stroke="#A8998A" stroke-width="2"/><path d="M590 186 L630 186" stroke="#A8998A" stroke-width="2"/><path d="M740 186 L780 186" stroke="#A8998A" stroke-width="2"/><path d="M140 248 L180 248" stroke="#A8998A" stroke-width="2"/><path d="M290 248 L330 248" stroke="#A8998A" stroke-width="2"/><path d="M440 248 L480 248" stroke="#A8998A" stroke-width="2"/><path d="M590 248 L630 248" stroke="#A8998A" stroke-width="2"/><path d="M740 248 L780 248" stroke="#A8998A" stroke-width="2"/><path d="M140 310 L180 310" stroke="#A8998A" stroke-width="2"/><path d="M290 310 L330 310" stroke="#A8998A" stroke-width="2"/><path d="M440 310 L480 310" stroke="#A8998A" stroke-width="2"/><path d="M590 310 L630 310" stroke="#A8998A" stroke-width="2"/><path d="M740 310 L780 310" stroke="#A8998A" stroke-width="2"/></g></svg>
<div class="nda-tape" aria-hidden="true"><span>PROTECTED UNDER NDA · PROTECTED UNDER NDA · PROTECTED UNDER NDA · PROTECTED UNDER NDA · PROTECTED UNDER NDA</span></div>
<div class="nda-card">
<span class="nda-lock" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30"><rect x="4.5" y="10.5" width="15" height="11" rx="2" fill="currentColor"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.6" fill="#15110E"/></svg></span>
<p class="eyebrow">Sealed layer</p>
<h3 class="h-l">Journey research boards</h3>
<p class="nda-sub">Protected under NDA</p>
<a class="btn btn--fill nda-cta" href="mailto:{EMAIL}?subject=Journey%20research%20boards%20%E2%80%94%20The%20Recycling%20Lottery">Reach out for more info…</a>
</div>
</div>
</section>
<section class="section section--deep" id="prototype" data-depth="2.0m" data-era="live specimen">
<div class="sec-head reveal"><div><p class="eyebrow">The specimen, alive</p><h2 class="h-l" style="margin-top:10px">Try the prototype, not a screenshot</h2></div>
<p class="lede">The RLI mobile app, live from Figma — registration, draws and claims, click-through complete. It sits under NDA, so it runs behind the glass.</p></div>
<div class="figma-frame nda-veiled reveal"><iframe tabindex="-1" aria-hidden="true" title="RLI Mobile App — interactive Figma prototype" src="https://embed.figma.com/proto/VkJSL5Ws1PEOHm2IoHiewG/RLI-Mobile-App?node-id=3926-5359&amp;viewport=-10617%2C-2590%2C0.31&amp;scaling=min-zoom&amp;content-scaling=fixed&amp;starting-point-node-id=3926%3A5359&amp;page-id=3926%3A1641&amp;embed-host=share" loading="lazy" allowfullscreen></iframe>{nda_veil('The RLI mobile app prototype', 'RLI mobile app prototype — The Recycling Lottery')}</div>
<div class="edge-study reveal">
<div><p class="eyebrow">Edge case interactive study</p><h3 class="h-m" style="margin-top:8px">Built with Claude Code to break the flows on purpose</h3>
<p class="body-2" style="margin-top:10px">A self-contained HTML prototype that runs the timing-heavy states Figma can't: countdowns hitting zero, closed claim windows and state changes.</p></div>
</div>
<div class="walk-frame map-frame proto-frame nda-veiled reveal" data-fit-w="1440"><iframe title="The Recycling Lottery — edge case interactive study" src="pantelotteriet/edge-case-study.html" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>{nda_veil('Edge case interactive study', 'Edge case interactive study — The Recycling Lottery')}</div>
</section>"""
    return case('pantelotteriet', 'The Recycling Lottery — dig report · Jonathan Nestler', 'Specimen 01 · Pantelotteriet · Mobile app + raffle site · Scandinavia', 'The Recycling Lottery',
                'A recycling lottery where every return is a ticket. I scoped the journeys, built the Figma system, and proved the timing-heavy flows in a Claude Code prototype before handoff.',
                [('ROLE', 'Product Designer → Jr. PO'), ('CLIENT', 'Astria Systems'), ('SURFACES', 'Mobile app, web raffle'), ('AI STACK', 'Claude Code · Figma MCP'), ('YEAR', '[YEAR]')],
                "Static Figma frames couldn't show a countdown, a claim window or a state change. Engineering would have found the timing bugs — late and expensively.",
                [('Figma structure', 'One cover page indexes every flow. Rows, fields and dropdowns are built once as slot-variant components and reused everywhere.'),
                 ('Journey mapping', 'Registration → claim, profile, support, history. Each journey scoped in one line — happy path and every edge case — before a screen is drawn.'),
                 ('AI prototype', 'A self-contained HTML prototype built with Claude Code: real tab switching, live countdown logic and state transitions to pressure-test timing.'),
                 ('Dev handoff', 'Flows, edge cases and timing logic shipped to engineering already proven against real interaction.')], 2,
                [('Claude Code generated the countdown and tab logic from my journey notes.', 'Which states exist, what happens at zero, and every edge case it had to survive.'),
                 ('[Add a specific suggestion you rejected]', '[Why it was cut — user, brand or technical reason]'),
                 ('Dev-ready annotations drafted from Figma via MCP.', 'Reviewed every spec before engineering saw it.')],
                extra, [('[X]', 'journeys scoped before build'), ('[X%]', 'fewer timing issues in QA'), ('[X]', 'days from flow to testable prototype')],
                'astria-platform.html', 'iGaming')


def astria():
    shots = ''.join(f'<img src="{CDN}/image/upload/q_auto,w_640/{s}.jpg" alt="Astria / Wonderlabz UI screen" loading="lazy">' for s in UI_SHOTS)
    extra = f"""<section class="section section--deep" id="games" data-depth="1.8m" data-era="bedrock">
<div class="sec-head reveal"><div><p class="eyebrow">The bedrock</p><h2 class="h-l">Shipped, live, regulated</h2></div>
<p class="lede">Five live titles for regulated markets in Scandinavia, South Africa and the UK. Samurai, Big Sexy City and Rose of the West share one game shell — the theme lives in the frame, so players learn the controls, the result and the settle step once. Tap any title to see the full game screen.</p></div>
<div class="reveal">{slabs('../', ALL_GAMES)}</div>
<div class="game-notes reveal">
<div><span class="mono">01 · Same controls, every world</span><p>Settings, total play − / +, Max play, Balance and Result sit in one fixed bar across every title, however loud the theme gets.</p></div>
<div><span class="mono">02 · Result, then decision</span><p>The result is shown as a figure; one large circular button asks the player to <b>See it for free</b> or <b>Take it</b>, and the message bar prompts them to settle.</p></div>
<div><span class="mono">03 · States in one bar</span><p>A single message bar carries every state — <b>Big win!</b>, <b>Please settle your result</b> — and Big Sexy City adds a Hot-O-Meter with a running session clock.</p></div>
</div>
</section>
{gal_dialog()}"""
    return case('astria', 'iGaming — dig report · Jonathan Nestler', 'Specimen 02 · Astria Systems (formerly Wonderlabz) · 2018–now', 'iGaming',
                'Six years across Wonderlabz, Playsafe and Pantelotteriet — from slot-game UI and VFX to owning product decisions as Jr. Product Owner.',
                [('ROLE', 'Product Designer → Jr. PO'), ('BRANDS', 'Wonderlabz · Playsafe · Pantelotteriet'), ('MARKETS', 'Scandinavia · SA · UK'), ('AI STACK', 'Claude · Claude Code · Figma MCP'), ('YEARS', '2018 – present')],
                'Producing world-class, top-quality, revenue-generating iGaming products in record time.',
                [('Game UI & VFX', 'Slot interfaces, character animation and win-state VFX for Samurai, Geisha, Atlantis, Mayan Madness and more.'),
                 ('Identity systems', 'Corporate identity and brand guides for Wonderlabz and The Recycling Lottery.'),
                 ('Product ownership', 'Promoted to Jr. Product Owner: backlog, journey scoping and stakeholder alignment across three brands.'),
                 ('AI in the workflow', 'Brought Claude, Claude Code and Figma MCP into the team process for faster, proven handoffs.')], 3,
                [('[An AI-assisted idea on the platform]', '[What you kept or cut, and why]'),
                 ('Claude Code prototypes for timing-heavy flows.', 'Which flows needed proving before build — and which didn’t.'),
                 ('[AI-drafted backlog or spec content]', '[How you reshaped it as PO]')],
                extra, [('[X]', 'brands on one design system'), ('[X]', 'live titles shipped'), ('[X%]', 'outcome metric')],
                'indiemode.html', 'Indiemode')


def indiemode():
    extra = f"""<section class="section section--deep" data-depth="1.8m" data-era="before / after">
<div class="sec-head reveal"><div><p class="eyebrow">Before / after</p><h2 class="h-l">Flat, to editorial</h2></div>
<a class="btn btn--bone" href="https://jonoman1983.github.io/indiemode/index.html">View live site →</a></div>
<div class="ba reveal">
<figure><img src="{A}/images/indiemode-before.jpg" alt="Indiemode homepage before the redesign" loading="lazy"><figcaption><b>BEFORE</b>Functional, but flat — no visual identity to match the brand's ambition.</figcaption></figure>
<figure><img src="{A}/images/indiemode-after.jpg" alt="Indiemode homepage after the redesign" loading="lazy"><figcaption><b>AFTER · CLAUDE SPRINT</b>Editorial dark mode, bold serif type, neon palette. Two-day sprint.</figcaption></figure>
</div>
</section>"""
    return case('indiemode', 'Indiemode — dig report · Jonathan Nestler', 'Specimen 03 · Web design · Fashion & lifestyle · South Africa', 'Indiemode',
                'A full-site redesign for an independent South African fashion label — and the first build in this portfolio made end-to-end with Claude as a deliberate creative and technical partner.',
                [('ROLE', 'Designer & art director'), ('CLIENT', 'Indiemode'), ('SURFACE', 'Responsive website'), ('AI STACK', 'Claude'), ('TIMELINE', 'Two-day sprint')],
                'The brief: elevate the brand, modernise the layout, and ship fast — without the result looking like every other AI-generated site.',
                [('Structure & copy', 'Page architecture, navigation hierarchy and UX copy generated through structured Claude prompts, iterated until the tone matched the brand.'),
                 ('Visual direction', 'Editorial dark mode, bold serif type and a neon palette — set by me before a line of code.'),
                 ('Claude wrote the code', 'HTML, CSS and interaction logic authored by Claude, with me directing layout, hierarchy and brand fidelity at every step.'),
                 ('Live deployment', 'Structure, visual design and live deployment — a typical week of build compressed into two days.')], 2,
                [('Structured prompts produced the page architecture and copy.', 'Iterated until the tone matched the brand.'),
                 ('Claude generated layouts and interaction code.', 'Visual decisions, brand accuracy and UX intent were never outsourced.'),
                 ('[A generated pattern you rejected]', '[Why]')],
                extra, [('2', 'days, brief to live site'), ('1', 'week of typical build time saved'), ('[X]', 'outcome metric')],
                'three-portals.html', 'One Platform, Three Portals')


# ---------------------------------------------------------------- ARCHIVE
def archive():
    vids = ''.join(
        f'<figure><video controls preload="none" poster="{u.replace("q_auto,vc_auto", "f_jpg,q_auto,so_1").replace(".mp4", ".jpg")}" src="{u}"></video><figcaption>{html.escape(t)}</figcaption></figure>'
        for t, u in DATA['vids'])
    anims = ''.join(
        f'<figure tabindex="0"><video data-hover-play muted loop playsinline preload="none" poster="{CDN}/video/upload/f_jpg,q_auto,w_480,so_1/{i}.jpg" src="{CDN}/video/upload/q_auto,vc_auto,w_720/{i}.mp4"></video><figcaption>{html.escape(l)}</figcaption></figure>'
        for i, l in DATA['anims'])
    art = ''.join(
        f'<button type="button" data-full="{f}" data-alt="{html.escape(a)}" aria-label="Open {html.escape(a)}"><img src="{t}" alt="{html.escape(a)}" loading="lazy"></button>'
        for f, a, t in DATA['art'])
    docs = [('Brand guide', 'Wonderlabz', 'brand-guide-wonderlabz.pdf'), ('Brand guide', 'The Recycling Lottery', 'brand-guide-recycling-lottery.pdf'),
            ('Legacy', 'Portfolio 2010', 'legacy-portfolio-2010.pdf'), ('Legacy', 'Site designs', 'legacy-site-design.pdf'), ('Legacy', 'Logo designs', 'legacy-logo-design.pdf'),
            ('UXDI deliverable', 'Flow diagram', 'project-8-flow-diagram.pdf'), ('UXDI deliverable', 'Interaction design', 'project-10-interaction-design.pdf'),
            ('Credential', 'UX Design Institute diploma', 'UXDI_diploma.pdf')]
    pages = {'brand-guide-wonderlabz.pdf': 30, 'brand-guide-recycling-lottery.pdf': 27, 'legacy-portfolio-2010.pdf': 10, 'legacy-site-design.pdf': 42,
             'legacy-logo-design.pdf': 10, 'project-8-flow-diagram.pdf': 1, 'project-10-interaction-design.pdf': 1, 'UXDI_diploma.pdf': 1}
    def doc_card(k, n, f):
        pg = pages.get(f, 1)
        stack = ' doc-thumb--stack' if pg > 1 else ''
        stem = f[:-4]
        return (f'<a class="doc" href="{A}/docs/{f}" aria-label="{n} — {k}, PDF, {pg} page{"s" if pg > 1 else ""}">'
                f'<span class="doc-thumb{stack}"><span class="doc-img"><img src="assets/images/docs/{stem}.jpg" alt="" width="640" height="480" loading="lazy"></span></span>'
                f'<span class="mono">{k.upper()} · PDF · {pg} PAGE{"S" if pg > 1 else ""}</span><span class="h-m">{n}</span><span class="doc-open">Open PDF →</span></a>')
    docs_html = ''.join(doc_card(k, n, f) for k, n, f in docs)
    reel = f'{CDN}/video/upload/q_auto,vc_auto/v1780040211/Wonderlabz-3D-Photo-Animation-With-Sound_1_1_1_smyj3i.mp4'
    return head('Creative Archive — motion, brand, legacy and personal work · Jonathan Nestler',
                'Motion reel, 32 animations, brand guides, legacy work and artistic expression by Jonathan Nestler.', '') + header('', 'archive', crumbs=[('Creative Archive', None)]) + f"""
<main id="main">
<section class="section cs-hero" data-depth="0.0m" data-era="creative archive" style="position:relative">
<p class="eyebrow">Layer 04 — The fossil record</p>
<h1 class="h-mega">Creative<br>Archive</h1>
<p class="lede">Everything under the product work: motion, VFX, brand systems, twenty years of legacy files — and the stuff I make just because I can.</p>
{dino_img('11', '', 'hero-guide')}
<div class="strata" aria-hidden="true"><i></i><i></i><i></i></div>
</section>
<nav class="subnav" aria-label="Creative Archive sections"><a href="#reel">Motion reel</a><a href="#videos">Video</a><a href="#anims">Animation ×32</a><a href="#art">Artistic expression</a><a href="#docs">Brand &amp; legacy</a></nav>

<section class="section" id="reel" data-depth="0.4m" data-era="motion">
<div class="sec-head reveal"><div><p class="eyebrow">Motion reel</p><h2 class="h-l">Frame by frame. Bone by bone.</h2></div></div>
<div class="reel reveal"><video controls preload="none" poster="{reel.replace('q_auto,vc_auto', 'f_jpg,q_auto,so_1').replace('.mp4', '.jpg')}" src="{reel}"></video></div>
</section>

<section class="section section--alt" id="videos" data-depth="1.0m" data-era="video">
<div class="sec-head reveal"><div><p class="eyebrow">Video</p><h2 class="h-l">Brand &amp; product films</h2></div></div>
<div class="vids reveal">{vids}</div>
</section>

<section class="section" id="anims" data-depth="1.8m" data-era="animation">
<div class="sec-head reveal"><div><p class="eyebrow">Animation · 32 pieces</p><h2 class="h-l">iGaming, UI motion &amp; VFX</h2></div><p class="lede">Hover or focus a tile to play.</p></div>
<div class="anims reveal">{anims}</div>
</section>

<section class="section section--deep" id="art" data-depth="2.8m" data-era="personal">
<div class="sec-head reveal"><div><p class="eyebrow">Artistic expression</p><h2 class="h-l">No brief. No client.<br>Just because I can.</h2></div></div>
<div class="art reveal">{art}</div>
</section>

<section class="section" id="docs" data-depth="3.6m" data-era="2007–2023">
<div class="sec-head reveal"><div><p class="eyebrow">Brand guides &amp; legacy</p><h2 class="h-l">The deep layers</h2></div></div>
<div class="docs reveal">{docs_html}</div>
</section>
</main>
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Artwork viewer"><button type="button" aria-label="Close">×</button><img alt=""></div>
""" + footer('')


# ------------------------------------------------------------ ONE PLATFORM, THREE PORTALS
PORTALS_STAGES = ['Browse / Discovery', 'Cart', 'Checkout / Payment UI', 'Order Confirmation', 'Preparation', 'Dispatch / Driver Assign', 'Delivery', 'Completion']
PORTALS_MAP = {  # stage index -> lane -> nodes (from the FigJam board's connectors)
    0: {'Customer': ['Search &amp; Filters'], 'Store': ['Store Onboarding', 'Menu / Item Management', 'Stock &amp; Availability', 'Opening Hours / Online Status'], 'Platform': ['Store Directory', 'Customer Account Mgmt'], 'Money': [], 'Infra': []},
    1: {'Customer': [], 'Store': [], 'Platform': [], 'Money': [], 'Infra': []},
    2: {'Customer': ['Address Management', 'Promotions / Vouchers'], 'Store': [], 'Platform': ['Fraud Detection'], 'Money': ['Payment Capture'], 'Infra': []},
    3: {'Customer': [], 'Store': ['Order Queue'], 'Platform': ['Commission / Fee Config', 'Notification Engine'], 'Money': ['Payment Gateway'], 'Infra': ['Order Record (System of Record)']},
    4: {'Customer': [], 'Store': ['Accept / Reject', 'Prep Timer / Ready Signal'], 'Platform': [], 'Money': ['Authorisation Hold', 'Refund Processing'], 'Infra': []},
    5: {'Customer': [], 'Store': [], 'Platform': ['Driver Assignment Engine'], 'Money': [], 'Infra': []},
    6: {'Customer': ['Live Order Tracking', 'Dispute / Refund Request'], 'Store': [], 'Platform': [], 'Money': [], 'Infra': ['Proof of Delivery']},
    7: {'Customer': ['Reviews &amp; Ratings', 'Order History'], 'Store': ['Payout Dashboard'], 'Platform': ['Dispute Resolution', 'Financial Reporting', 'Analytics Dashboard'], 'Money': ['Settlement Calculation', 'Commission Deduction', 'Store Payout', 'Dispute → Chargeback'], 'Infra': []},
}


INFRA_ALWAYS = '<p class="px-always">Always underneath: Identity &amp; Auth × 3 portals · Product Catalogue → Search Index · Pricing Engine</p>'


STRUCT_ROWS = [
    ('Completeness signal', (3, 'Hard to show what’s shared'), (4, 'Every step visible'), (5, 'Everything + context')),
    ('Portal connection clarity', (3, 'Arrows get messy'), (3, 'Ownership unclear'), (5, 'Both dimensions clear')),
    ('Money flow visibility', (2, 'Buried in the platform column'), (3, 'In-flow but mixed'), (5, 'Dedicated section')),
    ('Live walkthrough traceability', (2, 'Jump columns to trace'), (5, 'Left-to-right finger trace'), (5, 'Spine + clear lanes')),
    ('Structural “because” quality', (2, 'Default choice — weak signal'), (4, 'Clear argument'), (5, 'Strongest design argument')),
]


def structure_matrix():
    def cell(v):
        n, note = v
        pips = ''.join(f'<i class="{"on" if k < n else ""}"></i>' for k in range(5))
        return f'<td><span class="pips" role="img" aria-label="{n} out of 5">{pips}</span><span class="struct-note">{note}</span></td>'
    rows = ''.join(f'<tr><th scope="row">{c}</th>{cell(a)}{cell(b)}{cell(cc)}</tr>' for c, a, b, cc in STRUCT_ROWS)
    risk = '<tr><th scope="row">Execution risk</th><td><b>Low</b><span class="struct-note">Simple to build</span></td><td><b>Medium</b><span class="struct-note">Ownership ambiguous</span></td><td><b>Medium</b><span class="struct-note">More sections, more planning</span></td></tr>'
    return f"""<div class="struct-wrap reveal"><table class="struct">
<thead><tr><th scope="col">Criterion</th><th scope="col">A · Portal-centric</th><th scope="col">B · Lifecycle-centric</th><th scope="col" class="is-pick">C · Hybrid <span>✓ chosen</span></th></tr></thead>
<tbody>{rows}{risk}</tbody></table></div>"""


def portals_explorer():
    steps = ''.join(f'<li><button type="button" class="px-step" data-px="{i}" aria-pressed="{"true" if i == 3 else "false"}"><span class="px-dot"></span><span class="px-n mono">{i + 1:02d}</span><span class="px-label">{t}</span></button></li>' for i, t in enumerate(PORTALS_STAGES))
    lanes = ''.join(f'<div class="px-lane px-lane--{k.lower()}"><h4>{lbl}</h4><ul data-px-lane="{k}"></ul>{INFRA_ALWAYS if k == 'Infra' else ''}</div>'
                    for k, lbl in [('Customer', 'Customer portal'), ('Store', 'Store portal'), ('Platform', 'Platform portal'), ('Money', 'Money flow'), ('Infra', 'Shared infrastructure')])
    data = json.dumps({'stages': PORTALS_STAGES, 'map': {str(k): v for k, v in PORTALS_MAP.items()}}, ensure_ascii=False).replace('</', '<\\/')
    return f"""<div class="px reveal" data-px-root>
<ol class="px-spine" aria-label="Order lifecycle — pick a state">{steps}</ol>
<p class="px-now" aria-live="polite"><span class="mono">At this moment</span> <b data-px-name></b></p>
<div class="px-lanes">{lanes}</div>
<script type="application/json" id="px-data">{data}</script>
</div>"""


def three_portals():
    figjam = ('https://embed.figma.com/board/Cq6TPchRK5RPn9kF96QylB/One-Platform-Three-Portals-%E2%80%94-System-Map'
              '?node-id=22-1817&amp;embed-host=share')
    extra = f"""<section class="section section--alt" id="structures" data-depth="1.6m" data-era="three structures">
<div class="sec-head reveal"><div><p class="eyebrow">Phase 2 · Structure decision</p><h2 class="h-l" style="margin-top:10px">Three ways to structure the map</h2></div>
<p class="lede">The brief said how you structure the map is a big part of what gets read. So each option was scored as a mental model of the platform, not a layout preference.</p></div>
{structure_matrix()}
<a class="btn" href="three-portals/structure-options.html" style="margin-top:22px">Open the full decision page ↗</a>
</section>
<section class="section section--deep" id="map" data-depth="1.8m" data-era="the map">
<div class="sec-head reveal"><div><p class="eyebrow">The artefact · interactive</p><h2 class="h-l" style="margin-top:10px">Walk the whole map</h2></div>
<p class="lede">All 41 nodes in one working system map. Pick a portal, step the lifecycle or press play, and click any node to see what it does and what it connects to.</p></div>
<div class="walk-frame map-frame reveal" data-fit-w="1920"><iframe title="One Platform, Three Portals — interactive system map" src="three-portals/system-map.html" loading="lazy"></iframe></div>
<p class="map-links reveal"><a class="btn btn--fill" href="three-portals/system-map.html">Open the map full screen ↗</a><a class="btn" href="https://www.figma.com/board/Cq6TPchRK5RPn9kF96QylB/One-Platform-Three-Portals-%E2%80%94-System-Map?node-id=22-1817" target="_blank" rel="noopener">View the original FigJam board ↗</a></p>
</section>
<section class="section" id="explore" data-depth="2.0m" data-era="one order">
<div class="sec-head reveal"><div><p class="eyebrow">Interactive · built from the board</p><h2 class="h-l" style="margin-top:10px">Pick a moment. See all three portals at once.</h2></div>
<p class="lede">Every portal is watching the same order. Choose a state on the spine and the lanes below show what the customer, the store and the platform each touch — and what the money is doing underneath.</p></div>
{portals_explorer()}
</section>
<section class="section section--alt" id="edges" data-depth="2.2m" data-era="edge cases">
<div class="sec-head reveal"><div><p class="eyebrow">Written on the map</p><h2 class="h-l" style="margin-top:10px">Where the system breaks</h2></div></div>
<div class="edge-notes reveal">
<div class="edge-sticky"><span class="mono">Authorisation hold</span><p>The hold expires after 24–48 hours. If the store accepts but delivery fails before capture converts, the hold lapses and the platform must re-request payment — rare, but real.</p></div>
<div class="edge-sticky"><span class="mono">Commission deduction</span><p>A rate changed mid-cycle only applies to orders placed after the change. Orders already in flight settle at the rate captured when they were placed.</p></div>
<div class="edge-sticky edge-sticky--grey"><span class="mono">Search index</span><p>Index updates are async. A store going offline isn't instantly invisible — for a few seconds a customer can still add its items. Cart validation at checkout is the safety net.</p></div>
</div>
</section>
<section class="section section--deep" id="walkthrough" data-depth="2.3m" data-era="walkthrough">
<div class="sec-head reveal"><div><p class="eyebrow">Rehearsal tool · built with Claude</p><h2 class="h-l" style="margin-top:10px">Eight scenarios, one finger-trace</h2></div>
<p class="lede">A walkthrough trainer for presenting the map live. Pick a scenario and its path lights up across the board; click a node for its annotation, its “because” and the line to say out loud.</p></div>
<ul class="scenario-chips reveal">{''.join(f'<li><span class="mono">{i + 1:02d}</span>{n}</li>' for i, n in enumerate(['Happy path', 'Failed payment', 'Store rejects', 'Refund dispute', 'Store goes offline', 'Item out of stock', 'Driver cancels', 'Store onboarding']))}</ul>
<div class="walk-frame reveal"><iframe title="Three Portals — walkthrough trainer" src="three-portals/walkthrough.html" loading="lazy"></iframe></div>
<p class="walk-mobile reveal"><a class="btn btn--fill" href="three-portals/walkthrough.html">Open the walkthrough trainer ↗</a> <span class="mono small" style="color:var(--muted)">Best on a laptop or larger screen.</span></p>
</section>
<section class="section" id="artefacts" data-depth="2.35m" data-era="artefacts">
<div class="sec-head reveal"><div><p class="eyebrow">The full dig</p><h2 class="h-l" style="margin-top:10px">Every artefact, open to read</h2></div></div>
<div class="artefacts reveal">
<a class="artefact" href="three-portals/structure-options.html"><span class="mono">Phase 2</span><b>Structure decision</b><p>Portal-centric vs lifecycle-centric vs hybrid, scored side by side, with the written “because”.</p><span class="artefact-go">Open ↗</span></a>
<a class="artefact" href="three-portals/annotations.html"><span class="mono">Phase 3</span><b>Board annotations</b><p>Every node on the board with a written rationale — what it is, why it’s there, what moves through it.</p><span class="artefact-go">Open ↗</span></a>
<a class="artefact" href="three-portals/system-map.html"><span class="mono">The map</span><b>Interactive system map</b><p>All 41 nodes across three portals, the lifecycle spine, money flow and shared services — steppable and clickable.</p><span class="artefact-go">Open ↗</span></a>
<a class="artefact" href="three-portals/walkthrough.html"><span class="mono">Rehearsal</span><b>Walkthrough trainer</b><p>Eight scenario paths with talking points for presenting the map live.</p><span class="artefact-go">Open ↗</span></a>
<a class="artefact" href="three-portals/skills-registry.html"><span class="mono">Phase 0</span><b>Skills registry &amp; system design</b><p>The AI set-up behind the build: 8 Claude skills assigned, 18 Figma MCP tools mapped, trigger rules and the component inventory.</p><span class="artefact-go">Open ↗</span></a>
</div>
</section>"""
    return case('three-portals', 'One Platform, Three Portals — system map · Jonathan Nestler',
                'Specimen 00 · System map · Food-ordering platform · Design exercise', 'One Platform, Three Portals',
                'A Senior Product Designer take-home: map a food-ordering platform with customer, store and platform portals — information and money flows both. I built the map around the one thing all three share: the order.',
                [('ROLE', 'Senior Product Designer (exercise)'), ('FORMAT', 'Take-home system map'), ('SURFACES', 'Customer · Store · Platform'), ('AI STACK', 'Claude · Figma MCP · FigJam'), ('YEAR', '2026')],
                'Three portals, three logins, three sets of screens. The obvious map draws three columns and hides how they connect — and buries the money inside the admin column.',
                [('Structure decision', 'Compared three structures side by side, then chose the hybrid: a lifecycle spine, portal lanes beneath it and a separate money band.'),
                 ('Built in FigJam with Claude', 'Eight Claude skills were read and assigned and 18 Figma MCP tools mapped before a single node was drawn. Every node hangs off the order state it belongs to.'),
                 ('Money as its own system', 'Capture, gateway, authorisation hold, settlement, commission and payout run beneath every order — with refunds and chargebacks feeding back in.'),
                 ('Edge cases &amp; walkthrough', 'The failure modes are annotated on the board itself, and an HTML walkthrough trainer rehearsed the presentation stop by stop.')],
                1,
                [('Three structures scored on six criteria — portal-centric, lifecycle-centric and a hybrid — with the hybrid marked as recommended.', 'Confirmed Option C and wrote its “because”: the lifecycle is the only object all three portals share at the same time.'),
                 ('Drew the board node by node in FigJam through Figma MCP.', 'Money gets its own band. The brief asked for money flows, and most maps bury them in the platform column.'),
                 ('A walkthrough trainer with eight scenario paths, from the happy path to a driver cancelling mid-delivery.', 'Which failure modes earned a sticky on the board: hold expiry, mid-cycle commission changes and search-index lag.')],
                extra,
                [('8', 'order states on one lifecycle spine'), ('3', 'portals as views of one event stream'), ('6', 'zones, colour-keyed on the board'), ('3', 'edge cases written on the map')],
                'pantelotteriet.html', 'The Recycling Lottery')


# ----------------------------------------------------------------- RESUME
# Two A4 pages. Single reading order (label column, then content) so ATS / AI
# parsers read it top-to-bottom. All text is real text; standard section names.

CV_PDF = 'assets/documents/Jonathan_Nestler_Resume_2026.pdf'

CV_SKILLS = [
    ('UX &amp; UI design', 'User research, usability testing, heuristic evaluation, benchmarking, information architecture, journey mapping, wireframing, prototyping, interaction design, UI design, design systems, responsive design, accessibility (WCAG)'),
    ('Product', 'Product ownership, backlog prioritisation, journey scoping, stakeholder alignment, developer handoff and design QA'),
    ('AI integration', 'Claude (extensive, daily), Claude Code, Figma MCP, AI-assisted prototyping, prompt design for UX copy, custom Claude skills, ChatGPT, Gemini; occasionally Midjourney and DALL·E'),
    ('Visual &amp; motion', 'Brand and corporate identity, brand guidelines, illustration, motion graphics, VFX, slot-game UI and animation, video production'),
    ('Tools', 'Figma, Adobe Creative Cloud (After Effects, Photoshop, Illustrator, Premiere Pro, XD), Miro, Jira, Notion, HTML5, CSS3, JavaScript, GitHub'),
    ('Industries', 'iGaming, lottery, telecoms, EdTech, fashion e-commerce, brand and advertising agencies'),
]

CV_JOBS_P1 = [
    ('Jr. Product Owner <span>(promoted from Product Designer)</span>', 'Astria Systems (formerly Wonderlabz)', 'Remote', 'Nov 2023 – Present', [
        'Lead UX/UI product design across three portfolio brands: Wonderlabz, Playsafe and Pantelotteriet.',
        'Integrated Claude, Claude Code and Figma MCP into the design workflow; AI-assisted HTML prototypes validate timing-heavy flows before engineering builds them.',
        'Scope user journeys, prioritise the backlog and align product, design and engineering.',
        'Drive CI development, slot-game animation and cross-platform UI prototyping.']),
    ('Product Designer — VFX · UX &amp; UI', 'Wonderlabz SA (now Livescore SA)', 'Table View, Cape Town', 'Oct 2018 – Nov 2023', [
        'Led design collateral across multiple portfolio brands for live Scandinavian, South African and UK audiences.',
        'UI/UX prototyping, corporate identity, illustration and animation for online slot games (Samurai, Geisha, Atlantis, Mayan Madness).',
        'Authored brand guides for Wonderlabz and The Recycling Lottery.']),
]

CV_JOBS_P2 = [
    ('Multimedia Consultant', 'EduBoard Interactive Classroom Solutions', 'East London', 'Aug 2017 – Sep 2018', [
        'Websites, print and interactive media, video production, social media marketing and SEO for a classroom EdTech product.']),
    ('Owner — Freelance Designer', 'jonathanedwardnestler.com', 'Jeffreys Bay', 'Sep 2015 – May 2016', [
        'Graphic and web design, illustration, photography and video production for a range of clients; concurrently Graphic Artist at Thinklocal.']),
    ('Web &amp; Graphic Designer', 'Falcorp Technologies · Telkom SA', 'Pretoria', 'Aug 2013 – Jun 2015', [
        'All design for Telkom\'s brand identity; responsive websites in Bootstrap, HTML5/CSS3 and JavaScript.']),
]

CV_EARLY = ('Brand, new media &amp; print designer', '2007 – 2015',
            'Kashan Advertising (RAF, SABS, SARS) · Betelgeuse Advertising · Xcellent Media · Digineering (GSK, BASF) · Global Designs · 44 Stanley (stadium LED motion, IPL) · '
            '8 Image Brand Consulting (Coca-Cola, Vodacom, MTN, 2010 FIFA World Cup) · Peermont Global (Emperors Palace) · Shocking Pink')


def _job(title, org, place, dates, bullets):
    lis = ''.join(f'<li>{b}</li>' for b in bullets)
    return (f'<div class="cv-job"><div class="cv-job-head"><h3>{title}</h3><span class="cv-date">{dates}</span></div>'
            f'<p class="cv-org">{org} · {place}</p><ul>{lis}</ul></div>')


def _sec(title, depth, body, cls=''):
    return (f'<section class="cv-sec {cls}"><div class="cv-label"><span class="cv-depth" aria-hidden="true">{depth}</span>'
            f'<h2>{title}</h2></div><div class="cv-content">{body}</div></section>')


PERSON_LD = {
    '@context': 'https://schema.org', '@type': 'Person',
    'name': 'Jonathan Edward Nestler', 'alternateName': 'Jonno Nestler',
    'jobTitle': 'Senior Product Designer',
    'description': 'Senior Product Designer, UX/UI Designer and Jr. Product Owner with 20+ years of design experience, specialising in AI-integrated product design with Claude, Claude Code and Figma MCP.',
    'worksFor': {'@type': 'Organization', 'name': 'Astria Systems'},
    'hasOccupation': [{'@type': 'Occupation', 'name': t} for t in ['Senior Product Designer', 'UX/UI Designer', 'Product Owner']],
    'knowsAbout': ['Product design', 'UX design', 'UI design', 'User research', 'Usability testing', 'Information architecture', 'Journey mapping',
                   'Prototyping', 'Design systems', 'Accessibility (WCAG)', 'Product ownership', 'AI integration', 'Claude', 'Claude Code', 'Figma MCP',
                   'ChatGPT', 'Gemini', 'Figma', 'Brand identity', 'Motion graphics', 'iGaming'],
    'alumniOf': {'@type': 'EducationalOrganization', 'name': 'UX Design Institute'},
    'hasCredential': {'@type': 'EducationalOccupationalCredential', 'name': 'Professional Diploma in UX Design', 'recognizedBy': {'@type': 'Organization', 'name': 'UX Design Institute'}},
    'address': {'@type': 'PostalAddress', 'addressLocality': 'Jeffreys Bay', 'addressRegion': 'Eastern Cape', 'addressCountry': 'ZA'},
    'email': 'mailto:' + EMAIL, 'url': 'https://jonoman1983.github.io/Code-Farm-Testing-Factory-/',
    'sameAs': [LINKEDIN, 'https://github.com/JonoMan1983'],
}


def person_ld():
    return '<script type="application/ld+json">' + json.dumps(PERSON_LD, ensure_ascii=False).replace('</', '<\\/') + '</script>'


CV_CSS = """<style>
.cv-wrap{padding:48px var(--pad-x) 72px var(--pad-l)}
.cv-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.cv-pages{display:grid;grid-template-columns:minmax(0,max-content);gap:40px;justify-items:start}
.paper{width:210mm;height:297mm;max-width:100%;background:#EDE4D3;color:#15110E;display:flex;flex-direction:column;overflow:hidden;
  font-family:var(--f-body);font-size:9.6pt;line-height:1.5;box-shadow:0 30px 80px rgba(0,0,0,.5);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.paper a{color:#15110E;text-decoration:none}
.cv-head{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:22px;align-items:center;background:#15110E;color:#EDE4D3;padding:26px 40px 24px}
.cv-photo{width:112px;height:112px;border-radius:50%;object-fit:cover;border:4px solid #E8A33D}
.cv-kicker{font-family:var(--f-mono);font-size:8pt;letter-spacing:.14em;text-transform:uppercase;color:#E8A33D}
.cv-name{margin:6px 0 0;font-family:var(--f-disp);font-weight:900;font-size:31pt;line-height:.9;text-transform:uppercase;letter-spacing:.01em}
.cv-title{margin-top:10px;font-size:12pt;font-weight:600;color:#EDE4D3}
.cv-tag{margin-top:4px;font-size:9.4pt;color:#D9CDB9}
.cv-raptor{align-self:end;width:104px;margin:0 -10px -8px 0;opacity:.95}
.cv-strip{display:flex;height:14px}.cv-strip i{flex:1;background:#3A2C21}.cv-strip i:nth-child(2){flex:2;background:#4A3827}.cv-strip i:nth-child(3){background:#E8A33D}
.cv-contact{list-style:none;margin:0;padding:12px 40px;display:flex;flex-wrap:wrap;gap:6px 22px;font-family:var(--f-mono);font-size:8.2pt;border-bottom:1px solid #C9BBA5}
.cv-contact b{font-weight:500;color:#9A5F12}
.cv-body{flex:1;padding:20px 40px 0;display:flex;flex-direction:column;gap:17px}
.cv-sec{display:grid;grid-template-columns:118px minmax(0,1fr);gap:22px}
.cv-label{border-top:2px solid #15110E;padding-top:7px}
.cv-depth{display:block;font-family:var(--f-mono);font-size:7pt;color:#9A5F12;letter-spacing:0}
.cv-label h2{margin:3px 0 0;font-family:var(--f-disp);font-weight:800;font-size:12.5pt;line-height:1;text-transform:uppercase;letter-spacing:0}
.cv-content{border-top:1px solid #C9BBA5;padding-top:8px}
.cv-content>p+p{margin-top:8px}
.cv-skills{display:grid;gap:6px}
.cv-skills p b{font-weight:600}
.cv-job+.cv-job{margin-top:13px;padding-top:12px;border-top:1px dashed #C9BBA5}
.cv-job-head{display:flex;justify-content:space-between;align-items:baseline;gap:14px}
.cv-job h3{margin:0;font-size:11.5pt;font-weight:600;line-height:1.3}
.cv-job h3 span{font-weight:400;font-size:9.5pt;color:#5B4A3A}
.cv-date{flex-shrink:0;font-family:var(--f-mono);font-size:8pt;color:#9A5F12;white-space:nowrap}
.cv-org{margin-top:2px;font-size:9.5pt;color:#5B4A3A}
.cv-job ul{margin:7px 0 0;padding-left:16px}
.cv-job li+li{margin-top:4px}
.cv-job li::marker{color:#E8A33D}
.cv-ai{background:#15110E;color:#EDE4D3;padding:14px 16px}
.cv-ai p+p{margin-top:6px}
.cv-ai b{color:#E8A33D;font-weight:600}
.cv-ai .muted{color:#BCAE99}
.cv-run{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 40px;background:#15110E;color:#EDE4D3}
.cv-run b{font-family:var(--f-disp);font-weight:900;font-size:15pt;text-transform:uppercase}
.cv-run span{font-family:var(--f-mono);font-size:8pt;color:#E8A33D}
.cv-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 40px 14px;margin-top:14px;font-family:var(--f-mono);font-size:7.5pt;color:#5B4A3A;border-top:1px solid #C9BBA5}
.cv-foot img{width:56px}
@media screen and (max-width:860px){.cv-pages{grid-template-columns:minmax(0,1fr)}.paper{width:100%}}
@media screen and (max-width:760px){.paper{height:auto;font-size:15px}.cv-head{padding:24px 20px}.cv-body,.cv-contact,.cv-foot,.cv-run{padding-left:20px;padding-right:20px}.cv-head{grid-template-columns:1fr}.cv-raptor{display:none}.cv-sec{grid-template-columns:1fr;gap:8px}.cv-name{font-size:40px}}
@page{size:A4;margin:0}
@media print{
  html,body{background:#EDE4D3!important}
  .cv-wrap{padding:0!important}.cv-pages{display:block}
  .paper{box-shadow:none;width:210mm;height:297mm;page-break-after:always;break-after:page}
  .paper:last-child{page-break-after:auto;break-after:auto}
}
</style>"""


def resume():
    skills = ''.join(f'<p><b>{k}:</b> {v}</p>' for k, v in CV_SKILLS)
    p1 = ''.join(_job(*j) for j in CV_JOBS_P1)
    p2 = ''.join(_job(*j) for j in CV_JOBS_P2)
    early = f'<div class="cv-job"><div class="cv-job-head"><h3>{CV_EARLY[0]}</h3><span class="cv-date">{CV_EARLY[1]}</span></div><p class="cv-org">{CV_EARLY[2]}</p></div>'
    contact = (f'<ul class="cv-contact"><li>Jeffreys Bay, Eastern Cape, South Africa</li><li><b>Remote worldwide</b></li>'
               f'<li><b>Open to relocate anywhere in South Africa</b></li><li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li>[PHONE]</li>'
               f'<li><a href="{LINKEDIN}">linkedin.com/in/jonoman1983</a></li><li><a href="https://jonoman1983.github.io/Code-Farm-Testing-Factory-/">jonoman1983.github.io/Code-Farm-Testing-Factory-</a></li></ul>')
    page1 = f"""<article class="paper" aria-label="Resume page 1">
<header class="cv-head">
<img class="cv-photo" src="assets/images/portrait.jpg" alt="Jonathan Nestler">
<div>
<p class="cv-kicker">Designasaurus Rex · Curriculum vitae 2026</p>
<h1 class="cv-name">Jonathan Edward Nestler</h1>
<p class="cv-title">Senior Product Designer · UX/UI Designer · Jr. Product Owner</p>
<p class="cv-tag">20+ years · AI-integrated product design with Claude, Claude Code and Figma MCP</p>
</div>
<img class="cv-raptor" src="assets/dino/dino09-fossil.svg" alt="">
</header>
<div class="cv-strip" aria-hidden="true"><i></i><i></i><i></i></div>
{contact}
<div class="cv-body">
{_sec('Professional summary', '0.0m · SURFACE', '<p>Senior Product Designer and Jr. Product Owner with 20+ years across iGaming, lottery, telecoms, EdTech and brand. I design the system before the screen, then use Claude, Claude Code and Figma MCP to prove flows in working prototypes before engineering builds them.</p><p>Promoted from Product Designer to Jr. Product Owner at Astria Systems, leading UX/UI across three live brands. Professional Diploma in UX Design (UX Design Institute, Dublin).</p>')}
{_sec('Core skills', '0.9m · TOOLKIT', f'<div class="cv-skills">{skills}</div>')}
{_sec('Experience', '1.8m · LAYERS', p1)}
</div>
<footer class="cv-foot"><span>Jonathan Edward Nestler — Senior Product Designer</span><span>Page 1 of 2</span></footer>
</article>"""
    page2 = f"""<article class="paper" aria-label="Resume page 2">
<div class="cv-run"><b>Jonathan Edward Nestler</b><span>Senior Product Designer · UX/UI · AI integration</span></div>
<div class="cv-body">
{_sec('Experience <span class="sr-only">(continued)</span>', '2.6m · DEEPER', p2 + early)}
{_sec('AI toolkit', '3.2m · AI STRATUM', '<div class="cv-ai"><p><b>Claude — extensive, every stage:</b> chat, Claude Code, Figma MCP, custom skills, AI prototyping, prompt-driven UX copy. <b>Daily:</b> ChatGPT · Gemini. <span class="muted">Occasional: Midjourney · DALL·E. Never automated: user interviews, prioritisation, final visual judgment.</span></p><p><b>Built with Claude:</b> this portfolio (GitHub Pages) · The Hunter, a React job-search command centre wired to Gmail via MCP · Central, Gmail-to-ClickUp triage · Studio, custom Claude skills for Figma scripting.</p></div>')}
{_sec('Selected work', '4.0m · SPECIMENS', '<p><b>The Recycling Lottery (Pantelotteriet)</b> — mobile app and raffle site; timing-heavy flows proven in a Claude Code prototype before handoff. <b>Indiemode</b> — full redesign for an independent SA fashion label, built with Claude in two days. <b>Wonderlabz.com</b> — stakeholder research, IA and hi-fi redesign to launch.</p>')}
{_sec('Education', '4.6m · BEDROCK', '<p><b>Professional Diploma in UX Design</b> — UX Design Institute, Dublin (SCQF Level 8) · 2023</p><p><b>Visual Communication (first year)</b> — The Open Window, Pretoria · 2008–2010</p><p><b>Live Design &amp; Progressive Media</b> — Damelin, Vaal · 2003–2005</p><p>27 certifications, including Product Management Frameworks, WCAG Accessibility and Gamification Psychology.</p>')}
{_sec('References', '5.1m · FIELD REPORTS', '<p>Nicolaas Du Plessis (Head of Product) · Anne Jacobson (General Manager) · Hendrik Groenewald (Art Director). Contact details on request; ten written references on the portfolio.</p>')}
</div>
<footer class="cv-foot"><img src="assets/dino/dino06-ink.svg" alt=""><span>Page 2 of 2</span></footer>
</article>"""
    page_head = head('Jonathan Edward Nestler — Senior Product Designer, UX/UI, AI integration — Resume',
                     'Resume of Jonathan Edward Nestler: Senior Product Designer, UX/UI Designer and Jr. Product Owner. AI-integrated product design with Claude, Claude Code and Figma MCP. Jeffreys Bay, South Africa; remote; open to relocate in South Africa.', '')
    page_head = page_head.replace('</head>', CV_CSS + '\n' + person_ld() + '\n</head>')
    return page_head + header('', 'cv', crumbs=[('Field Notes (Resume)', None)]) + f"""
<main id="main" class="cv-wrap" data-depth="0.0m" data-era="field notes">
<div class="cv-actions no-print"><a class="btn btn--fill" href="{CV_PDF}" download>Download PDF (2 pages)</a><button class="btn" type="button" data-print>Print</button><a class="btn" href="index.html">Back to the dig site</a></div>
<div class="cv-pages">
{page1}
{page2}
</div>
</main>
""" + footer('')


PAGES = {
    'index.html': home, 'archive.html': archive, 'resume.html': resume,
    'work/pantelotteriet.html': pantelotteriet, 'work/astria-platform.html': astria, 'work/indiemode.html': indiemode,
    'work/three-portals.html': three_portals,
}

if __name__ == '__main__':
    for path, fn in PAGES.items():
        full = os.path.join(ROOT, path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        out = fn()
        if path == 'index.html':
            out = out.replace('</head>', person_ld() + '\n</head>', 1)
        with open(full, 'w', encoding='utf-8') as f:
            f.write(out)
        print('wrote', path)
