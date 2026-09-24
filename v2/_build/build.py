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
    '02': 'Tyrannosaurus codex', '03': 'Vestigium metricum', '05': 'Stegosaurus systema', '06': 'Tyrannosaurus personae',
    '07': 'Unguis intentus', '08': 'Triceratops annotata', '09': 'Velociraptor designii', '10': 'Pterodactylus promptus', '11': 'Ankylosaurus archivum',
}


def guide(n, pre, variant='fossil', left=False):
    cls = 'guide guide--left' if left else 'guide'
    return (f'<figure class="{cls}" aria-hidden="true"><img src="{pre}assets/dino/dino{n}-{variant}.svg" alt="" width="176" height="138">'
            f'<figcaption>Specimen {n} · {DINO_NAMES[n]}</figcaption></figure>')


def dino_img(n, pre, cls, variant='fossil', alt=''):
    return f'<img class="{cls}" src="{pre}assets/dino/dino{n}-{variant}.svg" alt="{alt}">'


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
<link rel="icon" href="{A}/brand/logo/favicon.ico">
<link rel="apple-touch-icon" href="{A}/brand/logo/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100..900&family=Archivo:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{pre}assets/css/dig.css">
{GA}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""


def header(pre, active, home=False):
    h = '' if home else f'{pre}index.html'
    def cur(k):
        return ' aria-current="page"' if k == active else ''
    return f"""<header class="site-header">
<a class="brand" href="{pre}index.html" aria-label="Designasaurus Rex — home">
<span class="brand-mark" aria-hidden="true">DR</span>
<span class="brand-name"><b>DESIGNASAURUS REX</b><span>FIELD SITE · PORTFOLIO v2.0</span></span>
</a>
<button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Menu"><span></span><span></span><span></span></button>
<nav class="nav" id="site-nav" aria-label="Main">
<a href="{h}#work"{cur('work')}>Work</a>
<a href="{h}#ai"{cur('ai')}>AI Practice</a>
<a href="{pre}archive.html"{cur('archive')}>Archive</a>
<a href="{h}#about"{cur('about')}>About</a>
<a href="{pre}resume.html"{cur('cv')}>Field notes (CV)</a>
<a class="btn btn--fill" href="{h}#contact">Hire the raptor</a>
</nav>
</header>
<div class="rail" aria-hidden="true"><span class="rail-fill"></span><span class="rail-read"></span></div>
<div class="progress" aria-hidden="true"></div>
"""


def footer(pre):
    return f"""<footer class="site-footer">
<span>© <span data-year>2026</span> Jonathan Edward Nestler · Designasaurus Rex</span>
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


def slabs():
    return '\n'.join(f'<div class="slab"><img src="{u}" alt="{n} — game UI" loading="lazy"><span>{n}</span></div>' for n, u in SLOTS)


# ---------------------------------------------------------------- REFERENCES
import re as _re
ORDER = ['nicolaas-du-plessis', 'anne-jacobson', 'hendrik-groenewald', 'justin-gieselbach', 'riaan-roetz',
         'elizabeth-joss-bethlehem', 'vanessa-bohling', 'phillip-van-coller', 'warren-raysdorf', 'darryl-smith']
_raw = {r['id']: r for r in json.load(open(os.path.join(HERE, 'references.json'), encoding='utf-8'))}
REFS = []
for k in ORDER:
    r = _raw[k]
    m = _re.search(r'^(.*?)<strong>(.*?)</strong>', r['summary'], _re.S)
    pull = (m.group(1) + m.group(2)).strip().rstrip('.') if m else r['summary'][:80]
    phrase = m.group(2).strip().rstrip('.') if m else ''
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


# ------------------------------------------------------------------ HOME
def home():
    return head('Jonathan Nestler — Senior Product Designer · UX/UI · AI integration',
                'Senior Product Designer and Jr. Product Owner. UX/UI, product and AI-integrated workflows. Jeffreys Bay, remote worldwide, open to relocate anywhere in South Africa.', '') + header('', '', home=True) + f"""
<main id="main">

<section class="section hero" data-depth="0.0m" data-era="2026" aria-labelledby="hero-title">
<p class="eyebrow">Specimen 09 · Velociraptor designii · excavated Jeffreys Bay, ZA</p>
<h1 class="h-mega hero-title" id="hero-title">I design<br><span class="outline">the system</span><br><span class="ochre">before the screen.</span></h1>
<div class="hero-meta">
<div>
<p class="lede">Jonathan “Jonno” Nestler — Senior Product Designer &amp; Jr. Product Owner. UX/UI, product and AI integration, twenty years deep. The newest layer is AI-native.</p>
<div class="btn-row" style="margin-top:28px"><a class="btn btn--bone" href="#work">Dig into the work ↓</a><a class="btn" href="resume.html">Field notes (CV)</a></div>
</div>
<div class="hero-data"><span>LAT 34.05°S · LON 24.91°E</span><span>DEPTH&nbsp;&nbsp;20+ YEARS</span><span>RANGE&nbsp;&nbsp;REMOTE · ANYWHERE IN RSA</span><span>STACK&nbsp;&nbsp;CLAUDE-FIRST</span><span class="hot">STATUS&nbsp;&nbsp;STILL EVOLVING</span></div>
</div>
<div class="hero-ground" aria-hidden="true">
<div class="strata"><i></i><i></i><i></i><i></i></div>
{dino_img('09', '', 'hero-dino', alt='')}
<span class="tag tag--hot">TAG 09 · INTACT</span>
</div>
</section>

<section class="section" id="work" data-depth="0.9m" data-era="2024–26" aria-labelledby="work-title">
<div class="sec-head reveal"><div><p class="eyebrow">Layer 00 — Surface</p><h2 class="h-xl" id="work-title">Specimens recovered</h2></div>
<p class="lede">Three flagship digs. Each one logged: the brief, what AI proposed, what I kept and what shipped.</p>{guide('02', '')}</div>

<a class="spec spec-feature reveal" href="work/pantelotteriet.html">
<div class="copy">
<p class="eyebrow">Specimen 01 · Scandinavia · Mobile app + raffle site</p>
<h3 class="h-xl">Pantelotteriet</h3>
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
<div class="spec-thumbs">{''.join(f'<img src="{u}" alt="" loading="lazy">' for _, u in SLOTS[:3])}</div>
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
<div class="spec spec-small reveal">
<span class="eyebrow">Also recovered</span>
<span><b>Wonderlabz.com redesign</b> <span class="body-2">— stakeholder research, IA and hi-fi Figma design, partnered through to launch.</span></span>
<span class="mono small" style="color:var(--muted)">Employer-owned · scope &amp; role only</span>
</div>
</section>

<section class="section section--alt" id="ai" data-depth="2.1m" data-era="AI layer" aria-labelledby="ai-title">
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
<div class="toolstrata reveal" aria-label="AI tools by how much of my work they touch">
<p class="eyebrow" style="color:var(--muted)">Tool strata — thickness = how much of the work it touches</p>
<div class="ts-row ts-1"><span class="h-m">Claude</span><span class="ts-bar"><i></i></span><span class="ts-note">Primary · every stage<br><b>Chat · Claude Code · Figma MCP · custom skills</b></span></div>
<div class="ts-row ts-2"><span class="h-m">ChatGPT</span><span class="ts-bar"><i></i></span><span class="ts-note">Daily rotation</span></div>
<div class="ts-row ts-2"><span class="h-m">Gemini</span><span class="ts-bar"><i></i></span><span class="ts-note">Daily rotation</span></div>
<div class="ts-row ts-3"><span class="h-m">Midjourney · DALL·E</span><span class="ts-bar"><i></i></span><span class="ts-note">Occasional · mood reference</span></div>
</div>
<p class="eyebrow reveal" style="margin-top:48px;color:var(--muted)">Tools I've built with Claude</p>
<div class="tools reveal">
<div class="tool">{ICON_SITE}<span class="h-m">This site</span><p>Designer-directed, Claude-built, shipped to GitHub Pages in push sessions.</p></div>
<div class="tool">{ICON_HUNTER}<span class="h-m">The Hunter</span><p>A React command centre wired to Gmail through MCP.</p></div>
<div class="tool">{ICON_CENTRAL}<span class="h-m">Central</span><p>Inbox triage that turns email into ClickUp tasks with Claude.</p></div>
<div class="tool">{ICON_STUDIO}<span class="h-m">Studio</span><p>Custom Claude skills for Figma scripting and production.</p></div>
</div>
</section>

<section class="section refs" id="proof" data-depth="3.0m" data-era="reports" aria-labelledby="proof-title">
<div class="sec-head reveal"><div><p class="eyebrow">Field reports · {len(REFS)} verified</p><h2 class="h-l" id="proof-title" style="margin-top:10px">From the people who dug with me</h2></div>{guide('03', '')}</div>
<p class="lede reveal" style="margin-top:-12px;margin-bottom:8px">Managers, founders, mentors and teammates — tagged and hung out to read. Tap any tag for the full report.</p>
{ref_belts()}
<div class="ref-bar reveal"><span class="mono">Every reference is genuine · full conversations on <a href="{LINKEDIN}">LinkedIn</a></span><button class="btn ref-pause" type="button" aria-pressed="false" data-ref-pause>Pause the line</button></div>
{ref_dialog()}
</section>

<section class="section section--deep" id="craft" data-depth="3.4m" data-era="2018–25" aria-labelledby="craft-title">
<div class="sec-head reveal"><div><p class="eyebrow">Layer 02 — iGaming bedrock · 2018–2025</p><h2 class="h-xl" id="craft-title">Six years of high-stakes pixels</h2></div>
<p class="lede">Live products for lottery and gaming audiences in Scandinavia, South Africa and the UK. Plus the motion, brand and personal work underneath.</p>{guide('05', '')}</div>
<div class="slabs reveal">{slabs()}</div>
<div class="btn-row reveal" style="margin-top:40px"><a class="btn btn--bone" href="archive.html">Open the archive →</a><a class="btn" href="archive.html#reel">Motion reel</a><a class="btn" href="archive.html#art">Artistic expression</a></div>
</section>

<section class="section" id="about" data-depth="4.6m" data-era="2007–now" aria-labelledby="about-title">
<div class="about reveal">
<div><img class="portrait" src="assets/images/portrait.jpg" alt="Jonathan Nestler in a navy jacket and headphones, hand to chin, under a green-gold sky" width="900" height="900" loading="lazy"><div style="margin-top:28px">{guide('06', '', left=True)}</div></div>
<div>
<p class="eyebrow">Layer 03 — The specimen</p>
<h2 class="h-xl" id="about-title" style="margin-top:10px">Twenty years.<br>Every era left a mark.</h2>
<p class="lede" style="margin-top:24px">I started in print and brand, moved into web and motion, spent six years shipping iGaming products, and now own product decisions at Astria Systems. I design with the whole system in view, then use AI to prove it works before anyone builds it.</p>
<p class="mono small" style="margin-top:18px;color:var(--muted)">Professional Diploma in UX Design — UX Design Institute, Dublin · 27 certifications</p>
<div class="facts"><div><b>20+</b><span>years shipping design</span></div><div><b>3</b><span>markets: Scandinavia, SA, UK</span></div><div><b>27</b><span>certifications</span></div></div>
</div>
</div>
<div class="fossils reveal" style="margin-top:64px">
<div><span class="mono">2007</span><b>Peermont</b><span>Casino promo, Emperors Palace</span></div>
<div><span class="mono">2008</span><b>8 Image</b><span>Coca-Cola, Vodacom, MTN</span></div>
<div><span class="mono">2010</span><b>Digineering</b><span>GSK, BASF — new media</span></div>
<div><span class="mono">2013</span><b>Telkom SA</b><span>Brand + responsive web</span></div>
<div><span class="mono">2017</span><b>EduBoard</b><span>EdTech web and video</span></div>
<div><span class="mono">2018→</span><b>Astria Systems</b><span>Product Designer → Jr. PO</span></div>
</div>
</section>

<section class="section contact" id="contact" data-depth="5.1m" data-era="bedrock" aria-labelledby="contact-title">
<p class="eyebrow" style="color:var(--tag)">Bedrock</p>
<h2 class="h-mega" id="contact-title" style="margin-top:10px">You've hit bedrock.<br><span class="ochre">Let's build on it.</span></h2>
<div class="btn-row" style="margin-top:40px"><a class="btn btn--fill" href="mailto:{EMAIL}">Start a conversation</a><a class="btn" href="resume.html">Field notes (CV)</a><a class="btn" href="{LINKEDIN}">LinkedIn</a></div>
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
        f'<div class="note"><div><span class="mono">AI PROPOSED</span>{a}</div><div><span class="mono">I DECIDED</span>{b}</div></div>' for a, b in notes)
    met_html = ''.join(f'<div><b>{a}</b><span>{b}</span></div>' for a, b in metrics)
    return head(title, lede, pre) + header(pre, 'work') + f"""
<main id="main">
<section class="section cs-hero" data-depth="0.0m" data-era="{slug}">
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

<section class="section section--alt" data-depth="3.0m" data-era="outcomes">
<div class="sec-head reveal"><div><p class="eyebrow">Outcomes</p><h2 class="h-l" style="margin-top:10px">What came out of the ground</h2></div>{guide('03', pre)}</div>
<div class="metrics reveal">{met_html}</div>
<a class="next" href="{next_href}">Next specimen: {next_name} →</a>
</section>
</main>
""" + footer(pre)


def pantelotteriet():
    extra = f"""<section class="section" id="research" data-depth="1.8m" data-era="journey research">
<div class="sec-head reveal"><div><p class="eyebrow">Journey research</p><h2 class="h-l">Every journey, mapped before a screen</h2></div>
<p class="lede">Registration → claim, profile, support and history — each scoped with its happy path and every edge case.</p>{guide('06', '../')}</div>
<!-- PENDING: journey research boards from RLI Mobile App.fig (needs Figma link) -->
<div class="embed reveal">[ Journey research boards — pending Figma import ]</div>
</section>
<section class="section section--deep" data-depth="2.1m" data-era="live specimen">
<div class="cs-split reveal">
<div><p class="eyebrow">The specimen, alive</p><h2 class="h-l" style="margin-top:10px">Try the prototype, not a screenshot</h2>
<p class="body-2" style="margin-top:16px">The Claude Code prototype, embedded. Tap between draws, claims and profile; watch the countdown hit zero.</p></div>
<!-- PENDING: embed the Claude Code prototype here as <iframe src="pantelotteriet-prototype.html"> -->
<div style="display:flex;justify-content:center">{phone()}</div>
</div>
</section>"""
    return case('pantelotteriet', 'Pantelotteriet — dig report · Jonathan Nestler', 'Specimen 01 · Mobile app + raffle site · Scandinavia', 'Pantelotteriet',
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
                'astria-platform.html', 'Astria platform')


def astria():
    shots = ''.join(f'<img src="{CDN}/image/upload/q_auto,w_640/{s}.jpg" alt="Astria / Wonderlabz UI screen" loading="lazy">' for s in UI_SHOTS)
    extra = f"""<section class="section section--deep" data-depth="1.8m" data-era="bedrock">
<div class="sec-head reveal"><div><p class="eyebrow">The bedrock</p><h2 class="h-l">Shipped, live, regulated</h2></div>
<p class="lede">Slot UI, VFX and product screens for live audiences — plus the identity systems holding it together.</p></div>
<div class="slabs reveal">{slabs()}</div>
<div class="gallery reveal" style="margin-top:24px">{shots}</div>
<div class="btn-row reveal" style="margin-top:32px"><a class="btn" href="{A}/docs/brand-guide-wonderlabz.pdf">Wonderlabz brand guide (PDF)</a><a class="btn" href="{A}/docs/brand-guide-recycling-lottery.pdf">Recycling Lottery brand guide (PDF)</a></div>
</section>"""
    return case('astria', 'Astria iGaming platform — dig report · Jonathan Nestler', 'Specimen 02 · Astria Systems (formerly Wonderlabz) · 2018–now', 'Astria platform',
                'Six years across Wonderlabz, Playsafe and Pantelotteriet — from slot-game UI and VFX to owning product decisions as Jr. Product Owner.',
                [('ROLE', 'Product Designer → Jr. PO'), ('BRANDS', 'Wonderlabz · Playsafe · Pantelotteriet'), ('MARKETS', 'Scandinavia · SA · UK'), ('AI STACK', 'Claude · Claude Code · Figma MCP'), ('YEARS', '2018 – present')],
                '[The core product problem you owned as Jr. PO — one sentence, written as the user or business pain.]',
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
                'pantelotteriet.html', 'Pantelotteriet')


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
    docs_html = ''.join(f'<a class="doc" href="{A}/docs/{f}"><span class="mono">{k.upper()} · PDF</span><span class="h-m">{n}</span></a>' for k, n, f in docs)
    reel = f'{CDN}/video/upload/q_auto,vc_auto/v1780040211/Wonderlabz-3D-Photo-Animation-With-Sound_1_1_1_smyj3i.mp4'
    return head('The archive — motion, brand, legacy and personal work · Jonathan Nestler',
                'Motion reel, 32 animations, brand guides, legacy work and artistic expression by Jonathan Nestler.', '') + header('', 'archive') + f"""
<main id="main">
<section class="section cs-hero" data-depth="0.0m" data-era="archive" style="position:relative">
<p class="eyebrow">Layer 04 — The fossil record</p>
<h1 class="h-mega">The archive</h1>
<p class="lede">Everything under the product work: motion, VFX, brand systems, twenty years of legacy files — and the stuff I make just because I can.</p>
{dino_img('11', '', 'hero-guide')}
<div class="strata" aria-hidden="true"><i></i><i></i><i></i></div>
</section>
<nav class="subnav" aria-label="Archive sections"><a href="#reel">Motion reel</a><a href="#videos">Video</a><a href="#anims">Animation ×32</a><a href="#art">Artistic expression</a><a href="#docs">Brand &amp; legacy</a></nav>

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


# ----------------------------------------------------------------- RESUME
def resume():
    css = """<style>
.paper-wrap{padding:48px var(--pad-x) 64px var(--pad-l)}
.paper-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}
.paper{width:210mm;min-height:297mm;max-width:100%;background:#EDE4D3;color:#15110E;font-size:12.5px;line-height:1.45;display:flex;flex-direction:column;box-shadow:0 30px 80px rgba(0,0,0,.5);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.paper a{color:#15110E}
.p-head{background:#15110E;color:#EDE4D3;padding:28px 36px 20px;position:relative;overflow:hidden}
.p-head .dino-cv{position:absolute;right:26px;top:14px;width:150px}
.p-name{font-family:var(--f-disp);font-weight:900;font-size:46px;line-height:.9;margin-top:6px;text-transform:uppercase}
.p-strip{display:flex;height:18px}.p-strip i{flex:1;background:#3A2C21}.p-strip i:nth-child(2){flex:2;background:#4A3827}.p-strip i:nth-child(3){background:#E8A33D}
.p-contact{padding:9px 36px;font-family:var(--f-mono);font-size:10px;display:flex;flex-wrap:wrap;gap:4px 16px;border-bottom:1px solid #C9BBA5}
.p-body{display:grid;grid-template-columns:1fr 210px;gap:26px;padding:18px 36px 16px;flex:1}
.p-h{font-family:var(--f-mono);font-size:10px;letter-spacing:.12em;color:#9A5F12;border-bottom:1px solid #15110E;padding-bottom:3px;margin:0 0 7px}
.p-col{display:flex;flex-direction:column;gap:14px}
.job{margin-bottom:8px}.job div:first-child{display:flex;justify-content:space-between;gap:12px}.job .mono{font-size:10px;white-space:nowrap}
.p-ai{background:#15110E;color:#EDE4D3;padding:14px}
.p-foot{display:flex;height:12px}.p-foot i{flex:2;background:#4A3827}.p-foot i:nth-child(2){flex:1;background:#3A2C21}.p-foot i:nth-child(3){flex:3;background:#231B16}
@media (max-width:760px){.p-body{grid-template-columns:1fr}.p-name{font-size:34px}.p-head .dino-cv{display:none}}
@page{size:A4;margin:0}
@media print{body{background:#EDE4D3}.paper-wrap{padding:0}.paper{box-shadow:none;width:210mm;height:297mm}}
</style>"""
    return head('Field notes (CV) — Jonathan Edward Nestler', 'Resume of Jonathan Edward Nestler, Senior Product Designer and Jr. Product Owner.', '').replace('</head>', css + '\n</head>') + header('', 'cv') + f"""
<main id="main" class="paper-wrap" data-depth="0.0m" data-era="field notes">
<div class="paper-actions no-print"><button class="btn btn--fill" type="button" data-print>Download as PDF</button><a class="btn" href="index.html">Back to the dig site</a></div>
<article class="paper" aria-label="Resume">
<header class="p-head">
<p class="eyebrow" style="font-size:10px">Field notes · curriculum vitae · 2026</p>
<h1 class="p-name">Jonathan Edward Nestler</h1>
<p style="font-size:14px;margin-top:6px;color:#D9CDB9">Senior Product Designer · Jr. Product Owner — UX/UI · Product · AI integration</p>
{dino_img('09', '', 'dino-cv')}
</header>
<div class="p-strip" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="p-contact"><span>Jeffreys Bay, ZA</span><span>Remote worldwide</span><b>Open to relocate anywhere in RSA</b><a href="mailto:{EMAIL}">{EMAIL}</a><span>[PHONE]</span><a href="{LINKEDIN}">linkedin.com/in/jonoman1983</a><span>jonoman1983.github.io/Code-Farm-Testing-Factory-</span></div>
<div class="p-body">
<div class="p-col">
<section><h2 class="p-h">SURFACE — PROFILE</h2><p>Product designer with 20+ years across iGaming, lottery, enterprise and edtech. I design the system before the screen, then use Claude, Claude Code and Figma MCP to prove flows in working prototypes before engineering builds them. Promoted to Jr. Product Owner at Astria Systems.</p></section>
<section><h2 class="p-h">LAYERS — EXPERIENCE</h2>
<div class="job"><div><b>Jr. Product Owner — Astria Systems (formerly Wonderlabz)</b><span class="mono">2023–PRESENT</span></div><div>Lead UX/UI across Wonderlabz, Playsafe and Pantelotteriet. Brought Claude, Claude Code and Figma MCP into the design workflow; built AI-assisted HTML prototypes to validate timing-heavy flows before handoff. Own CI development and cross-platform UI prototyping.</div></div>
<div class="job"><div><b>Product Designer, VFX · UX &amp; UI — Wonderlabz SA</b><span class="mono">2018–2023</span></div><div>UI/UX prototyping, corporate identity, illustration and slot-game animation (Samurai, Geisha, Atlantis, Mayan Madness) for live Scandinavian, SA and UK audiences.</div></div>
<div class="job"><div><b>Multimedia Consultant — EduBoard Interactive</b><span class="mono">2017–2018</span></div><div>Websites, interactive media, video production and SEO for a classroom EdTech product.</div></div>
<div class="job"><div><b>Freelance Designer · Graphic Artist, Thinklocal</b><span class="mono">2015–2016</span></div></div>
<div class="job"><div><b>Web &amp; Graphic Designer — Falcorp · Telkom SA</b><span class="mono">2013–2015</span></div><div>Telkom brand design and responsive sites (Bootstrap, HTML5/CSS3, JS).</div></div>
<div class="job"><div><b>Brand, new media &amp; print — agency roles</b><span class="mono">2007–2013</span></div><div>8 Image (Coca-Cola, Vodacom, MTN), Digineering (GSK, BASF), 44 Stanley, Xcellent Media, Betelgeuse, Global Designs, Peermont, Kashan.</div></div>
</section>
<section><h2 class="p-h">TOOLS I'VE BUILT WITH CLAUDE</h2><p><b>This portfolio</b> — designer-directed, Claude-built. <b>The Hunter</b> — React command centre wired to Gmail via MCP. <b>Central</b> — Gmail-to-ClickUp triage with Claude. <b>Studio</b> — custom Claude skills for Figma scripting.</p></section>
<section><h2 class="p-h">SPECIMENS — SELECTED WORK</h2><p><b>Pantelotteriet</b> — recycling-lottery app + raffle site; journeys proven in a Claude Code prototype. <b>Indiemode</b> — full redesign with Claude, a week of build in two days. <b>Wonderlabz.com</b> — research, IA and hi-fi redesign.</p></section>
</div>
<div class="p-col">
<section class="p-ai"><h2 class="p-h" style="color:#E8A33D;border-color:#4A3827">AI STRATUM</h2><p><b>Claude — extensive, every stage:</b> chat, Claude Code, Figma MCP, custom skills, AI prototyping, prompt-driven UX copy</p><p style="margin-top:6px"><b>Daily:</b> ChatGPT · Gemini</p><p style="margin-top:6px;opacity:.75">Occasional: Midjourney · DALL·E</p><p class="mono" style="font-size:10px;margin-top:8px;color:#FF3D6E">NEVER AUTOMATED: interviews, prioritisation, final visual calls</p></section>
<section><h2 class="p-h">CORE</h2><p>UX research · IA · interaction design · design systems · usability testing · WCAG · journey mapping · product ownership · motion &amp; VFX · brand identity</p></section>
<section><h2 class="p-h">TOOLS</h2><p>Figma · Adobe CC (AE, PS, AI, PR, XD) · Miro · Jira · Notion · HTML/CSS/JS · GitHub</p></section>
<section><h2 class="p-h">EDUCATION</h2><p><b>Professional Diploma in UX Design</b><br>UX Design Institute, Dublin · SCQF L8 · 2023</p><p style="margin-top:6px">27 certifications incl. Product Management Frameworks, WCAG Accessibility, Gamification Psychology</p></section>
<section><h2 class="p-h">REFERENCES</h2><p>Nicolaas Du Plessis, Head of Product · Hendrik Groenewald, Art Director — on request</p></section>
</div>
</div>
<div class="p-foot" aria-hidden="true"><i></i><i></i><i></i></div>
</article>
</main>
""" + footer('')


PAGES = {
    'index.html': home, 'archive.html': archive, 'resume.html': resume,
    'work/pantelotteriet.html': pantelotteriet, 'work/astria-platform.html': astria, 'work/indiemode.html': indiemode,
}

if __name__ == '__main__':
    for path, fn in PAGES.items():
        full = os.path.join(ROOT, path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, 'w', encoding='utf-8') as f:
            f.write(fn())
        print('wrote', path)
