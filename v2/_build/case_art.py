"""Illustrations for the 'Four layers, top to bottom' excavation log on each case study.
Each sits in a basalt tray so it reads on every strata-coloured row."""
from stage_art import B, O, M, D, F, BUILD, HANDOFF

R = '#FF3D6E'   # tag pink, used only for 'cut' / edge cases
S2 = '#2E231B'
S3 = '#3A2C21'
MU = '#A8998A'   # readable muted text on basalt


def art(label, body):
    return f'<svg class="log-art" viewBox="0 0 240 150" role="img" aria-label="{label}">{body}</svg>'


# ---------------- Pantelotteriet ----------------
P_FIGMA = art('One cover page indexes every flow; one master component feeds every screen', f"""
<rect x="10" y="20" width="62" height="110" rx="3" fill="{S2}" stroke="{B}" stroke-width="2"/>
<text x="41" y="36" {F} font-size="7" fill="{O}" text-anchor="middle">COVER</text>
<rect x="18" y="44" width="46" height="10" fill="{M}"/><rect x="18" y="60" width="46" height="10" fill="{M}"/><rect x="18" y="76" width="46" height="10" fill="{M}"/><rect x="18" y="92" width="46" height="10" fill="{M}"/>
<path d="M64 49 L92 30 M64 65 L92 58 M64 81 L92 86 M64 97 L92 114" stroke="{M}" stroke-width="1.5" class="draw" pathLength="1"/>
<rect x="92" y="22" width="28" height="16" fill="none" stroke="{B}" stroke-width="1.5"/><rect x="92" y="50" width="28" height="16" fill="none" stroke="{B}" stroke-width="1.5"/><rect x="92" y="78" width="28" height="16" fill="none" stroke="{B}" stroke-width="1.5"/><rect x="92" y="106" width="28" height="16" fill="none" stroke="{B}" stroke-width="1.5"/>
<path d="M178 18 L190 30 L178 42 L166 30 Z" fill="{O}"/>
<text x="178" y="56" {F} font-size="7" fill="{O}" text-anchor="middle">MASTER</text>
<path d="M178 62 L178 76 M178 76 L140 96 M178 76 L178 96 M178 76 L216 96" stroke="{O}" stroke-width="1.5" fill="none" class="draw" pathLength="1"/>
<g fill="none" stroke="{O}" stroke-width="2"><path d="M140 98 L148 106 L140 114 L132 106 Z"/><path d="M178 98 L186 106 L178 114 L170 106 Z"/><path d="M216 98 L224 106 L216 114 L208 106 Z"/></g>
<text x="178" y="134" {F} font-size="7" fill="{B}" text-anchor="middle">BUILT ONCE · REUSED</text>""")

P_JOURNEY = art('A journey from register to claim, with edge cases branching below the happy path', f"""
<path d="M22 50 L218 50" stroke="{O}" stroke-width="2.5" class="draw" pathLength="1"/>
<g fill="{D}" stroke="{O}" stroke-width="2.5"><circle cx="22" cy="50" r="8"/><circle cx="87" cy="50" r="8"/><circle cx="153" cy="50" r="8"/></g>
<circle cx="218" cy="50" r="10" fill="{O}"/><path d="M213 50 L217 54 L223 46" fill="none" stroke="{D}" stroke-width="2"/>
<g {F} font-size="7" fill="{B}" text-anchor="middle"><text x="22" y="30">REGISTER</text><text x="87" y="30">RETURN</text><text x="153" y="30">DRAW</text><text x="218" y="30">CLAIM</text></g>
<path d="M87 58 L87 84" fill="none" stroke="{R}" stroke-width="1.5" stroke-dasharray="4 3"/>
<path d="M153 58 L153 104" fill="none" stroke="{R}" stroke-width="1.5" stroke-dasharray="4 3"/>
<rect x="62" y="84" width="50" height="16" fill="{D}" stroke="{R}" stroke-width="1.5"/><text x="87" y="95" {F} font-size="7" fill="{R}" text-anchor="middle">EDGE CASE</text>
<rect x="121" y="104" width="64" height="16" fill="{D}" stroke="{R}" stroke-width="1.5"/><text x="153" y="115" {F} font-size="7" fill="{R}" text-anchor="middle">WINDOW CLOSED</text>
<text x="12" y="140" {F} font-size="7" fill="{MU}">HAPPY PATH + EVERY EDGE CASE</text>""")

# ---------------- Astria ----------------
A_GAME = art('Slot reels with a winning line and a VFX burst', f"""
<rect x="20" y="18" width="200" height="104" rx="6" fill="{S2}" stroke="{B}" stroke-width="2"/>
<line x1="86" y1="24" x2="86" y2="116" stroke="{M}"/><line x1="153" y1="24" x2="153" y2="116" stroke="{M}"/>
<g fill="none" stroke="{M}" stroke-width="2"><circle cx="53" cy="38" r="9"/><path d="M120 30 L129 46 L111 46 Z"/><rect x="178" y="30" width="16" height="16"/><rect x="45" y="94" width="16" height="16"/><circle cx="120" cy="102" r="9"/><path d="M186 94 L195 110 L177 110 Z"/></g>
<g fill="{O}"><path d="M53 58 L57 67 L67 68 L59 74 L62 84 L53 78 L44 84 L47 74 L39 68 L49 67 Z"/><path d="M120 58 L124 67 L134 68 L126 74 L129 84 L120 78 L111 84 L114 74 L106 68 L116 67 Z"/><path d="M186 58 L190 67 L200 68 L192 74 L195 84 L186 78 L177 84 L180 74 L172 68 L182 67 Z"/></g>
<line x1="24" y1="71" x2="216" y2="71" stroke="{O}" stroke-width="2" class="draw" pathLength="1"/>
<g stroke="{O}" stroke-width="2" stroke-linecap="round"><path d="M214 12 L220 4"/><path d="M226 18 L234 14"/><path d="M226 8 L230 2"/></g>
<text x="120" y="140" {F} font-size="7" fill="{B}" text-anchor="middle">UI · ANIMATION · WIN-STATE VFX</text>""")

A_BRAND = art('A brand guide open on swatches, a logo mark and type specimen', f"""
<path d="M20 26 L118 20 L118 128 L20 134 Z" fill="{S2}" stroke="{B}" stroke-width="2"/>
<path d="M118 20 L216 26 L216 134 L118 128 Z" fill="{S3}" stroke="{B}" stroke-width="2"/>
<rect x="34" y="40" width="22" height="22" fill="{O}"/><rect x="60" y="40" width="22" height="22" fill="{B}"/><rect x="86" y="40" width="22" height="22" fill="{M}"/>
<g {F} font-size="6" fill="{B}"><text x="34" y="72">#E8A33D</text><text x="72" y="72">#EDE4D3</text></g>
<rect x="34" y="84" width="74" height="4" fill="{M}"/><rect x="34" y="94" width="60" height="4" fill="{M}"/><rect x="34" y="104" width="68" height="4" fill="{M}"/>
<circle cx="152" cy="54" r="18" fill="none" stroke="{O}" stroke-width="3" class="draw" pathLength="1"/><path d="M144 54 L152 44 L160 54 L152 64 Z" fill="{O}"/>
<text x="136" y="104" font-family="Big Shoulders Display, sans-serif" font-size="30" font-weight="900" fill="{B}">Aa</text>
<text x="176" y="100" {F} font-size="6" fill="{MU}">DISPLAY</text><text x="176" y="110" {F} font-size="6" fill="{MU}">BODY</text>""")

A_PO = art('Three brands feed one prioritised backlog; the top item is flagged', f"""
<g {F} font-size="7"><rect x="8" y="22" width="52" height="18" fill="none" stroke="{B}" stroke-width="1.5"/><text x="34" y="34" fill="{B}" text-anchor="middle">WONDERLABZ</text>
<rect x="8" y="64" width="52" height="18" fill="none" stroke="{B}" stroke-width="1.5"/><text x="34" y="76" fill="{B}" text-anchor="middle">PLAYSAFE</text>
<rect x="8" y="106" width="52" height="18" fill="none" stroke="{B}" stroke-width="1.5"/><text x="34" y="118" fill="{B}" text-anchor="middle">PANTELOT.</text></g>
<path d="M60 31 C90 31 90 73 118 73 M60 73 L118 73 M60 115 C90 115 90 73 118 73" fill="none" stroke="{M}" stroke-width="1.5" class="draw" pathLength="1"/>
<rect x="126" y="16" width="96" height="22" fill="{O}"/><text x="134" y="30" {F} font-size="7" fill="{D}">P1 · SHIP NEXT</text>
<rect x="126" y="44" width="96" height="18" fill="{S3}" stroke="{M}"/><rect x="126" y="68" width="96" height="18" fill="{S3}" stroke="{M}"/><rect x="126" y="92" width="96" height="18" fill="{S3}" stroke="{M}"/>
<path d="M232 108 L232 24" stroke="{O}" stroke-width="2"/><path d="M227 30 L232 22 L237 30" fill="none" stroke="{O}" stroke-width="2"/>
<text x="174" y="132" {F} font-size="7" fill="{B}" text-anchor="middle">BACKLOG · PRIORITY</text>""")

A_AI = art('The team gathered around Claude, feeding designs to code and back', f"""
<circle cx="120" cy="70" r="22" fill="{O}"/><text x="120" y="75" {F} font-size="13" font-weight="700" fill="{D}" text-anchor="middle">C</text>
<g fill="none" stroke="{B}" stroke-width="2"><circle cx="40" cy="30" r="8"/><path d="M26 56 C26 42 54 42 54 56"/><circle cx="200" cy="30" r="8"/><path d="M186 56 C186 42 214 42 214 56"/><circle cx="40" cy="104" r="8"/><path d="M26 130 C26 116 54 116 54 130"/></g>
<rect x="182" y="100" width="36" height="26" rx="2" fill="none" stroke="{B}" stroke-width="2"/><text x="200" y="117" {F} font-size="8" fill="{O}" text-anchor="middle">&lt;/&gt;</text>
<path d="M58 44 L100 60 M182 44 L140 60 M58 114 L100 82 M182 110 L140 82" stroke="{O}" stroke-width="1.5" stroke-dasharray="4 3" class="draw" pathLength="1"/>
<g {F} font-size="6" fill="{MU}" text-anchor="middle"><text x="40" y="68">DESIGN</text><text x="200" y="68">PRODUCT</text><text x="40" y="142">QA</text><text x="200" y="142">DEV</text></g>
<text x="120" y="108" {F} font-size="6" fill="{O}" text-anchor="middle">FIGMA MCP</text>""")

# ---------------- Indiemode ----------------
I_STRUCTURE = art('A prompt produces the sitemap and the copy', f"""
<rect x="8" y="16" width="86" height="34" rx="3" fill="{S2}" stroke="{B}" stroke-width="1.5"/>
<text x="16" y="31" {F} font-size="7" fill="{O}">&gt; prompt:</text><text x="16" y="42" {F} font-size="7" fill="{B}">match the brand_</text>
<path d="M94 33 L118 33" stroke="{O}" stroke-width="2" class="draw" pathLength="1"/><path d="M113 28 L119 33 L113 38" fill="none" stroke="{O}" stroke-width="2"/>
<rect x="150" y="14" width="44" height="18" fill="{O}"/><text x="172" y="26" {F} font-size="7" fill="{D}" text-anchor="middle">HOME</text>
<path d="M172 32 L172 44 M130 44 L214 44 M130 44 L130 56 M172 44 L172 56 M214 44 L214 56" fill="none" stroke="{B}" stroke-width="1.5"/>
<g {F} font-size="6" fill="{B}" text-anchor="middle"><rect x="112" y="56" width="36" height="16" fill="none" stroke="{B}" stroke-width="1.5"/><text x="130" y="67">BRANDS</text>
<rect x="154" y="56" width="36" height="16" fill="none" stroke="{B}" stroke-width="1.5"/><text x="172" y="67">NEW IN</text>
<rect x="194" y="56" width="42" height="16" fill="none" stroke="{B}" stroke-width="1.5"/><text x="214" y="67">CATEGORY</text></g>
<rect x="112" y="90" width="120" height="8" fill="{B}"/><rect x="112" y="104" width="100" height="5" fill="{M}"/><rect x="112" y="114" width="110" height="5" fill="{M}"/><rect x="112" y="124" width="80" height="5" fill="{M}"/>
<text x="8" y="122" {F} font-size="7" fill="{MU}">IA + UX COPY</text><text x="8" y="134" {F} font-size="7" fill="{MU}">ITERATED TO TONE</text>""")

I_VISUAL = art('Dark editorial page with a bold serif and a neon palette, chosen before any code', f"""
<rect x="14" y="14" width="140" height="122" fill="#0A0806" stroke="{B}" stroke-width="2"/>
<text x="26" y="62" font-family="Georgia, serif" font-size="34" font-weight="700" fill="{B}">Wear</text>
<text x="26" y="96" font-family="Georgia, serif" font-size="34" font-style="italic" font-weight="700" fill="#FF3D9A">made.</text>
<rect x="26" y="110" width="50" height="4" fill="{M}"/><rect x="26" y="118" width="36" height="4" fill="{M}"/>
<g><circle cx="186" cy="34" r="12" fill="#FF3D9A"/><circle cx="186" cy="66" r="12" fill="#3DE8FF"/><circle cx="186" cy="98" r="12" fill="{B}"/></g>
<text x="206" y="37" {F} font-size="6" fill="{B}">NEON</text><text x="206" y="69" {F} font-size="6" fill="{B}">GLOW</text><text x="206" y="101" {F} font-size="6" fill="{B}">BONE</text>
<text x="186" y="134" {F} font-size="7" fill="{O}" text-anchor="middle">SET BY ME</text>""")

I_CODE = art('I direct in plain language; Claude returns working code', f"""
<rect x="8" y="24" width="96" height="46" rx="8" fill="{S2}" stroke="{B}" stroke-width="1.5"/>
<path d="M28 70 L22 84 L40 70" fill="{S2}" stroke="{B}" stroke-width="1.5" stroke-linejoin="round"/>
<text x="18" y="42" {F} font-size="7" fill="{B}">Bigger hero.</text><text x="18" y="54" {F} font-size="7" fill="{B}">Tighter grid.</text><text x="18" y="64" {F} font-size="7" fill="{O}">Keep the brand.</text>
<path d="M108 56 L128 56" stroke="{O}" stroke-width="2" class="draw" pathLength="1"/><path d="M123 51 L129 56 L123 61" fill="none" stroke="{O}" stroke-width="2"/>
<rect x="134" y="20" width="98" height="104" rx="3" fill="{D}" stroke="{B}" stroke-width="1.5"/>
<circle cx="142" cy="28" r="2" fill="{O}"/><circle cx="149" cy="28" r="2" fill="{M}"/>
<g {F} font-size="7"><text x="142" y="48" fill="{O}">&lt;section&gt;</text><text x="150" y="60" fill="{B}">.hero {{</text><text x="158" y="72" fill="{MU}">font: 96px</text><text x="150" y="84" fill="{B}">}}</text><text x="142" y="96" fill="{O}">&lt;/section&gt;</text></g>
<text x="56" y="112" {F} font-size="7" fill="{MU}" text-anchor="middle">I DIRECT</text><text x="183" y="138" {F} font-size="7" fill="{MU}" text-anchor="middle">CLAUDE WRITES</text>""")

I_LIVE = art('A seven-day build compressed into two days, then live', f"""
<text x="14" y="30" {F} font-size="7" fill="{MU}">TYPICAL BUILD</text>
<g fill="{S3}" stroke="{M}"><rect x="14" y="38" width="24" height="18"/><rect x="38" y="38" width="24" height="18"/><rect x="62" y="38" width="24" height="18"/><rect x="86" y="38" width="24" height="18"/><rect x="110" y="38" width="24" height="18"/><rect x="134" y="38" width="24" height="18"/><rect x="158" y="38" width="24" height="18"/></g>
<line x1="10" y1="47" x2="186" y2="47" stroke="{R}" stroke-width="1.5"/>
<text x="192" y="51" {F} font-size="8" fill="{B}">7 DAYS</text>
<text x="14" y="84" {F} font-size="7" fill="{O}">WITH CLAUDE</text>
<rect x="14" y="92" width="56" height="18" fill="{O}" class="draw" pathLength="1" stroke="{O}"/><text x="42" y="105" {F} font-size="7" fill="{D}" text-anchor="middle">2 DAYS</text>
<path d="M76 101 L150 101" stroke="{O}" stroke-width="2" stroke-dasharray="4 3"/>
<circle cx="170" cy="101" r="7" fill="{O}"/><circle cx="170" cy="101" r="13" fill="none" stroke="{O}" stroke-width="1.5" opacity=".5"/>
<text x="188" y="105" {F} font-size="9" font-weight="700" fill="{B}">LIVE</text>""")


def _scaled(svg):
    return svg.replace('class="stage-art"', 'class="log-art"')


CASE_ART = {
    'pantelotteriet': [P_FIGMA, P_JOURNEY, _scaled(BUILD), _scaled(HANDOFF)],
    'astria': [A_GAME, A_BRAND, A_PO, A_AI],
    'indiemode': [I_STRUCTURE, I_VISUAL, I_CODE, I_LIVE],
}


# ---------------- One Platform, Three Portals ----------------
T_OPTIONS = art('Three structures compared; the hybrid option C is kept', f"""
<g {F} font-size="8" text-anchor="middle">
<rect x="10" y="22" width="66" height="84" fill="none" stroke="{MU}" stroke-width="1.5"/><text x="43" y="16" fill="{MU}">OPTION A</text>
<rect x="18" y="34" width="50" height="8" fill="{S3}"/><rect x="18" y="50" width="40" height="8" fill="{S3}"/><rect x="18" y="66" width="46" height="8" fill="{S3}"/><rect x="18" y="82" width="34" height="8" fill="{S3}"/>
<rect x="87" y="22" width="66" height="84" fill="none" stroke="{MU}" stroke-width="1.5"/><text x="120" y="16" fill="{MU}">OPTION B</text>
<rect x="95" y="34" width="50" height="8" fill="{S3}"/><rect x="95" y="50" width="36" height="8" fill="{S3}"/><rect x="95" y="66" width="48" height="8" fill="{S3}"/><rect x="95" y="82" width="42" height="8" fill="{S3}"/>
<rect x="164" y="22" width="66" height="84" fill="{S2}" stroke="{O}" stroke-width="2.5"/><text x="197" y="16" fill="{O}">OPTION C</text>
<path d="M170 34 L224 34" stroke="{O}" stroke-width="3"/><rect x="170" y="44" width="54" height="10" fill="{B}"/><rect x="170" y="58" width="54" height="10" fill="{B}" opacity=".75"/><rect x="170" y="72" width="54" height="10" fill="{B}" opacity=".5"/><rect x="170" y="88" width="54" height="10" fill="{O}" opacity=".6"/>
</g>
<path d="M58 122 L90 140" stroke="{R}" stroke-width="2"/><path d="M90 122 L58 140" stroke="{R}" stroke-width="2"/>
<path d="M135 122 L167 140" stroke="{R}" stroke-width="2"/><path d="M167 122 L135 140" stroke="{R}" stroke-width="2"/>
<circle cx="197" cy="131" r="10" fill="{O}"/><path d="M191 131 L195 135 L203 126" fill="none" stroke="{D}" stroke-width="2.5"/>""")

T_SPINE = art('Eight order states on one spine, with three portal lanes hanging off it', f"""
<path d="M18 30 L222 30" stroke="{O}" stroke-width="3" class="draw" pathLength="1"/>
<g fill="{D}" stroke="{O}" stroke-width="2.5">{''.join(f'<circle cx="{18 + i * 29.1:.1f}" cy="30" r="6"/>' for i in range(8))}</g>
<g {F} font-size="7" fill="{MU}"><text x="12" y="14">BROWSE</text><text x="200" y="14">DONE</text></g>
<g stroke="{MU}" stroke-width="1.2" stroke-dasharray="3 3"><path d="M18 36 L18 62"/><path d="M76 36 L76 84"/><path d="M134 36 L134 106"/><path d="M222 36 L222 62"/></g>
<rect x="10" y="62" width="220" height="16" fill="{S3}"/><rect x="10" y="84" width="220" height="16" fill="{S3}" opacity=".8"/><rect x="10" y="106" width="220" height="16" fill="{S3}" opacity=".6"/>
<g {F} font-size="7" fill="{B}"><text x="16" y="73">CUSTOMER</text><text x="16" y="95">STORE</text><text x="16" y="117">PLATFORM</text></g>
<text x="120" y="142" {F} font-size="7" fill="{O}" text-anchor="middle">THREE VIEWS · ONE ORDER</text>""")

T_MONEY = art('Money flow: capture, gateway, hold, settlement, commission, payout', f"""
<g {F} font-size="6.5" text-anchor="middle" fill="{B}">
<rect x="6" y="40" width="44" height="22" fill="none" stroke="{O}" stroke-width="1.5"/><text x="28" y="54">CAPTURE</text>
<rect x="60" y="40" width="44" height="22" fill="none" stroke="{O}" stroke-width="1.5"/><text x="82" y="54">GATEWAY</text>
<rect x="114" y="40" width="44" height="22" fill="{O}"/><text x="136" y="54" fill="{D}">HOLD</text>
<rect x="168" y="40" width="66" height="22" fill="none" stroke="{O}" stroke-width="1.5"/><text x="201" y="54">SETTLEMENT</text>
<rect x="168" y="80" width="66" height="22" fill="none" stroke="{O}" stroke-width="1.5"/><text x="201" y="94">COMMISSION</text>
<rect x="168" y="118" width="66" height="22" fill="{O}"/><text x="201" y="132" fill="{D}">STORE PAYOUT</text>
<rect x="104" y="96" width="54" height="22" fill="none" stroke="{R}" stroke-width="1.5" stroke-dasharray="3 2"/><text x="131" y="110" fill="{R}">REFUND</text>
</g>
<path d="M50 51 L60 51 M104 51 L114 51 M158 51 L168 51 M201 62 L201 80 M201 102 L201 118" stroke="{O}" stroke-width="2" class="draw" pathLength="1"/>
<path d="M131 96 L136 62" stroke="{R}" stroke-width="1.5"/>
<text x="6" y="24" {F} font-size="7" fill="{MU}">A PARALLEL SYSTEM · ITS OWN BAND</text>""")

T_EDGE = art('Three yellow edge-case stickies pinned to the map', f"""
<g transform="rotate(-4 50 70)"><rect x="12" y="30" width="72" height="72" fill="#F2D06B"/><text x="20" y="48" {F} font-size="7" fill="{D}">EDGE CASE</text><rect x="20" y="56" width="54" height="3" fill="{D}" opacity=".5"/><rect x="20" y="64" width="46" height="3" fill="{D}" opacity=".5"/><text x="20" y="90" {F} font-size="7" font-weight="700" fill="{D}">HOLD EXPIRES</text></g>
<g transform="rotate(3 122 70)"><rect x="86" y="36" width="72" height="72" fill="#F2D06B"/><text x="94" y="54" {F} font-size="7" fill="{D}">EDGE CASE</text><rect x="94" y="62" width="54" height="3" fill="{D}" opacity=".5"/><rect x="94" y="70" width="40" height="3" fill="{D}" opacity=".5"/><text x="94" y="96" {F} font-size="7" font-weight="700" fill="{D}">RATE CHANGE</text></g>
<g transform="rotate(-2 196 70)"><rect x="160" y="30" width="72" height="72" fill="{S3}" stroke="{B}"/><text x="168" y="48" {F} font-size="7" fill="{B}">EDGE CASE</text><rect x="168" y="56" width="54" height="3" fill="{MU}"/><rect x="168" y="64" width="44" height="3" fill="{MU}"/><text x="168" y="90" {F} font-size="7" font-weight="700" fill="{B}">INDEX LAG</text></g>
<text x="120" y="136" {F} font-size="7" fill="{O}" text-anchor="middle">WHERE THE SYSTEM BREAKS, WRITTEN ON THE MAP</text>""")

CASE_ART['three-portals'] = [T_OPTIONS, T_SPINE, T_MONEY, T_EDGE]
