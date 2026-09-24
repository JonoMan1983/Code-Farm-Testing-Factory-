"""Hand-built SVG illustrations for the AI Practice stages (Dig Site palette).
Strokes marked class="draw" animate in when the section is revealed."""

B = '#EDE4D3'   # bone
O = '#E8A33D'   # ochre
M = '#6B5440'   # muted strata
D = '#15110E'   # basalt
F = "font-family=\"JetBrains Mono, monospace\""

BRIEF = f"""<svg class="stage-art" viewBox="0 0 240 150" role="img" aria-label="A brief is drilled like a core sample, pulling out goals, edge cases and context">
<rect x="18" y="16" width="92" height="118" rx="3" fill="none" stroke="{B}" stroke-width="2" class="draw" pathLength="1"/>
<line x1="30" y1="34" x2="84" y2="34" stroke="{M}" stroke-width="3"/>
<line x1="30" y1="46" x2="96" y2="46" stroke="{M}" stroke-width="3"/>
<line x1="30" y1="58" x2="78" y2="58" stroke="{M}" stroke-width="3"/>
<line x1="30" y1="104" x2="92" y2="104" stroke="{M}" stroke-width="3"/>
<line x1="30" y1="116" x2="70" y2="116" stroke="{M}" stroke-width="3"/>
<rect x="56" y="4" width="16" height="44" fill="{O}"/>
<path d="M56 48 L64 88 L72 48 Z" fill="{O}"/>
<line x1="64" y1="52" x2="64" y2="84" stroke="{D}" stroke-width="2" stroke-dasharray="3 3"/>
<path d="M76 76 C110 76 112 34 142 34" fill="none" stroke="{O}" stroke-width="1.5" class="draw" pathLength="1"/>
<path d="M76 80 C112 80 112 76 142 76" fill="none" stroke="{O}" stroke-width="1.5" class="draw" pathLength="1"/>
<path d="M76 84 C110 84 112 118 142 118" fill="none" stroke="{O}" stroke-width="1.5" class="draw" pathLength="1"/>
<rect x="142" y="24" width="86" height="20" fill="#2E231B" stroke="{M}"/><text x="150" y="38" {F} font-size="9" fill="{B}">GOALS</text>
<rect x="142" y="66" width="86" height="20" fill="#3A2C21" stroke="{O}"/><text x="150" y="80" {F} font-size="9" fill="{O}">EDGE CASES</text>
<rect x="142" y="108" width="86" height="20" fill="#4A3827" stroke="{M}"/><text x="150" y="122" {F} font-size="9" fill="{B}">CONTEXT</text>
</svg>"""

EXPLORE = f"""<svg class="stage-art" viewBox="0 0 240 150" role="img" aria-label="Claude, ChatGPT and Gemini branch into several directions; one is kept, the rest are cut">
<circle cx="26" cy="40" r="14" fill="{O}"/><text x="26" y="44" {F} font-size="10" font-weight="700" fill="{D}" text-anchor="middle">C</text>
<circle cx="26" cy="82" r="10" fill="none" stroke="{B}" stroke-width="2"/><text x="26" y="86" {F} font-size="8" fill="{B}" text-anchor="middle">GPT</text>
<circle cx="26" cy="116" r="10" fill="none" stroke="{B}" stroke-width="2"/><text x="26" y="119" {F} font-size="6.5" fill="{B}" text-anchor="middle">GEM</text>
<path d="M40 40 C80 40 90 22 134 22" fill="none" stroke="{M}" stroke-width="1.5" class="draw" pathLength="1"/>
<path d="M40 40 C84 40 92 60 134 60" fill="none" stroke="{O}" stroke-width="2.5" class="draw" pathLength="1"/>
<path d="M36 82 C80 82 92 60 134 60" fill="none" stroke="{B}" stroke-width="1.5" class="draw" pathLength="1"/>
<path d="M36 82 C84 82 92 98 134 98" fill="none" stroke="{M}" stroke-width="1.5" class="draw" pathLength="1"/>
<path d="M36 116 C84 116 92 134 134 134" fill="none" stroke="{M}" stroke-width="1.5" class="draw" pathLength="1"/>
<g opacity=".5"><rect x="136" y="12" width="50" height="22" fill="none" stroke="{M}" stroke-width="1.5"/><line x1="132" y1="36" x2="190" y2="10" stroke="#FF3D6E" stroke-width="1.5"/></g>
<rect x="136" y="44" width="72" height="34" fill="#3A2C21" stroke="{O}" stroke-width="2"/>
<rect x="143" y="51" width="22" height="20" fill="{O}"/><line x1="170" y1="54" x2="200" y2="54" stroke="{B}" stroke-width="3"/><line x1="170" y1="62" x2="194" y2="62" stroke="{M}" stroke-width="3"/>
<circle cx="216" cy="46" r="9" fill="{O}"/><path d="M211 46 L215 50 L221 42" fill="none" stroke="{D}" stroke-width="2"/>
<g opacity=".5"><rect x="136" y="88" width="50" height="22" fill="none" stroke="{M}" stroke-width="1.5"/><line x1="132" y1="112" x2="190" y2="86" stroke="#FF3D6E" stroke-width="1.5"/></g>
<g opacity=".5"><rect x="136" y="124" width="50" height="22" fill="none" stroke="{M}" stroke-width="1.5"/><line x1="132" y1="148" x2="190" y2="122" stroke="#FF3D6E" stroke-width="1.5"/></g>
</svg>"""

BUILD = f"""<svg class="stage-art" viewBox="0 0 240 150" role="img" aria-label="A Figma flow passes through Claude Code and comes out as a working prototype with live states">
<rect x="8" y="30" width="62" height="90" rx="4" fill="none" stroke="{B}" stroke-width="1.5" stroke-dasharray="4 3"/>
<rect x="16" y="40" width="46" height="16" fill="{M}"/><rect x="16" y="62" width="30" height="6" fill="{M}"/><rect x="16" y="74" width="40" height="6" fill="{M}"/><rect x="16" y="100" width="46" height="12" fill="none" stroke="{M}" stroke-width="1.5"/>
<text x="39" y="24" {F} font-size="8" fill="{B}" text-anchor="middle">FIGMA</text>
<line x1="72" y1="75" x2="96" y2="75" stroke="{O}" stroke-width="2" class="draw" pathLength="1"/>
<circle cx="120" cy="75" r="23" fill="#2E231B" stroke="{O}" stroke-width="2"/>
<path d="M112 67 L104 75 L112 83 M128 67 L136 75 L128 83 M123 63 L117 87" fill="none" stroke="{O}" stroke-width="2.5" stroke-linecap="round"/>
<text x="120" y="116" {F} font-size="8" fill="{O}" text-anchor="middle">CLAUDE CODE</text>
<line x1="144" y1="75" x2="166" y2="75" stroke="{O}" stroke-width="2" class="draw" pathLength="1"/><path d="M162 70 L168 75 L162 80" fill="none" stroke="{O}" stroke-width="2"/>
<rect x="170" y="16" width="62" height="118" rx="10" fill="{B}"/>
<text x="178" y="34" {F} font-size="6" fill="{M}">NEXT DRAW</text>
<text x="178" y="50" {F} font-size="14" font-weight="700" fill="{D}">02:14</text>
<rect x="178" y="58" width="46" height="30" rx="3" fill="#2E231B"/>
<circle cx="189" cy="100" r="4" fill="{O}"/><circle cx="201" cy="100" r="4" fill="none" stroke="{M}" stroke-width="1.5"/><circle cx="213" cy="100" r="4" fill="none" stroke="{M}" stroke-width="1.5"/>
<rect x="170" y="116" width="21" height="18" fill="{O}"/><line x1="170" y1="116" x2="232" y2="116" stroke="#C9BBA5"/>
</svg>"""

HANDOFF = f"""<svg class="stage-art" viewBox="0 0 240 150" role="img" aria-label="Annotated screens become a dev-ready spec, every line checked before handoff">
<rect x="8" y="14" width="104" height="122" rx="4" fill="none" stroke="{B}" stroke-width="1.5"/>
<rect x="18" y="26" width="84" height="22" fill="{M}"/><rect x="18" y="56" width="52" height="8" fill="{M}"/><rect x="18" y="72" width="70" height="8" fill="{M}"/><rect x="18" y="108" width="84" height="18" fill="none" stroke="{M}" stroke-width="1.5"/>
<circle cx="100" cy="30" r="7" fill="{O}"/><text x="100" y="33" {F} font-size="8" font-weight="700" fill="{D}" text-anchor="middle">1</text>
<circle cx="86" cy="76" r="7" fill="{O}"/><text x="86" y="79" {F} font-size="8" font-weight="700" fill="{D}" text-anchor="middle">2</text>
<circle cx="100" cy="117" r="7" fill="{O}"/><text x="100" y="120" {F} font-size="8" font-weight="700" fill="{D}" text-anchor="middle">3</text>
<path d="M107 30 L138 31 M93 76 L138 57 M107 117 L138 83" stroke="{O}" stroke-width="1" stroke-dasharray="3 2" class="draw" pathLength="1"/>
<rect x="138" y="20" width="94" height="108" fill="#2E231B" stroke="{M}"/>
<g {F} font-size="7" fill="{B}"><text x="158" y="34">SPACING 16</text><text x="158" y="60">STATE: CLAIM</text><text x="158" y="86">TIMER 00:00</text></g>
<g fill="none" stroke="{O}" stroke-width="2"><path d="M144 30 L147 33 L152 27"/><path d="M144 56 L147 59 L152 53"/><path d="M144 82 L147 85 L152 79"/></g>
<g transform="rotate(-10 188 116)"><rect x="151" y="105" width="74" height="22" fill="{D}" stroke="{O}" stroke-width="2"/><text x="188" y="120" {F} font-size="9" font-weight="700" fill="{O}" text-anchor="middle">REVIEWED</text></g>
</svg>"""

ICON_TALK = f'<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M4 6h16v11H10l-5 4v-4H4z" fill="none" stroke="#FF3D6E" stroke-width="2" stroke-linejoin="round"/><path d="M14 20v3h8l5 4v-4h1V12h-5" fill="none" stroke="#FF3D6E" stroke-width="2" stroke-linejoin="round"/></svg>'
ICON_PRIORITY = f'<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><rect x="4" y="5" width="24" height="5" fill="#FF3D6E"/><rect x="4" y="14" width="17" height="5" fill="none" stroke="#FF3D6E" stroke-width="2"/><rect x="4" y="23" width="10" height="5" fill="none" stroke="#FF3D6E" stroke-width="2"/></svg>'
ICON_EYE = f'<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16z" fill="none" stroke="#FF3D6E" stroke-width="2"/><circle cx="16" cy="16" r="4.5" fill="#FF3D6E"/></svg>'


# ---- Icons for "Tools I've built with Claude" (64x64, bone line + ochre accent) ----
def _icon(label, body):
    return f'<svg class="tool-icon" viewBox="0 0 64 64" role="img" aria-label="{label}">{body}</svg>'

ICON_SITE = _icon('Portfolio site: a browser window cut through rock layers', f"""
<rect x="4" y="8" width="56" height="48" rx="4" fill="none" stroke="{B}" stroke-width="2.5" class="draw" pathLength="1"/>
<line x1="4" y1="18" x2="60" y2="18" stroke="{B}" stroke-width="2.5"/>
<circle cx="11" cy="13" r="1.8" fill="{O}"/><circle cx="17" cy="13" r="1.8" fill="{M}"/><circle cx="23" cy="13" r="1.8" fill="{M}"/>
<rect x="9" y="24" width="46" height="7" fill="#3A2C21"/><rect x="9" y="34" width="46" height="7" fill="#4A3827"/><rect x="9" y="44" width="46" height="7" fill="{M}"/>
<path d="M36 26 L36 46 L41 41 L45 50 L48.5 48.5 L44.5 39.5 L51 39.5 Z" fill="{O}" stroke="{D}" stroke-width="1.5" stroke-linejoin="round"/>""")

ICON_HUNTER = _icon('The Hunter: job applications targeted from the inbox', f"""
<rect x="4" y="14" width="40" height="30" rx="3" fill="none" stroke="{B}" stroke-width="2.5" class="draw" pathLength="1"/>
<path d="M4 17 L24 32 L44 17" fill="none" stroke="{B}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="44" cy="42" r="13" fill="{D}" stroke="{O}" stroke-width="2.5" class="draw" pathLength="1"/>
<circle cx="44" cy="42" r="4" fill="{O}"/>
<line x1="44" y1="25" x2="44" y2="32" stroke="{O}" stroke-width="2.5"/><line x1="44" y1="52" x2="44" y2="59" stroke="{O}" stroke-width="2.5"/>
<line x1="27" y1="42" x2="34" y2="42" stroke="{O}" stroke-width="2.5"/><line x1="54" y1="42" x2="61" y2="42" stroke="{O}" stroke-width="2.5"/>""")

ICON_CENTRAL = _icon('Central: emails triaged into a task list', f"""
<rect x="3" y="18" width="24" height="18" rx="2" fill="none" stroke="{B}" stroke-width="2.5"/>
<path d="M3 20 L15 29 L27 20" fill="none" stroke="{B}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M28 27 L36 27" stroke="{O}" stroke-width="2.5" class="draw" pathLength="1"/><path d="M33 23 L37 27 L33 31" fill="none" stroke="{O}" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="40" y="8" width="21" height="48" rx="3" fill="none" stroke="{B}" stroke-width="2.5" class="draw" pathLength="1"/>
<path d="M44 18 L46.5 20.5 L50 16" fill="none" stroke="{O}" stroke-width="2.5"/><line x1="52" y1="18" x2="57" y2="18" stroke="{M}" stroke-width="2.5"/>
<path d="M44 30 L46.5 32.5 L50 28" fill="none" stroke="{O}" stroke-width="2.5"/><line x1="52" y1="30" x2="57" y2="30" stroke="{M}" stroke-width="2.5"/>
<rect x="44" y="40" width="5" height="5" fill="none" stroke="{M}" stroke-width="2"/><line x1="52" y1="42.5" x2="57" y2="42.5" stroke="{M}" stroke-width="2.5"/>""")

ICON_STUDIO = _icon('Studio: custom skills scripting Figma vector work', f"""
<path d="M10 11 C4 11 7 20 3 22 C7 24 4 33 10 33" fill="none" stroke="{O}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M54 31 C60 31 57 40 61 42 C57 44 60 53 54 53" fill="none" stroke="{O}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M16 50 C22 22 42 42 48 14" fill="none" stroke="{B}" stroke-width="2.5" class="draw" pathLength="1"/>
<line x1="16" y1="50" x2="30" y2="38" stroke="{M}" stroke-width="1.5"/><line x1="48" y1="14" x2="36" y2="24" stroke="{M}" stroke-width="1.5"/>
<rect x="12.5" y="46.5" width="7" height="7" fill="{D}" stroke="{B}" stroke-width="2"/><rect x="44.5" y="10.5" width="7" height="7" fill="{D}" stroke="{B}" stroke-width="2"/>
<circle cx="30" cy="38" r="3" fill="{O}"/><circle cx="36" cy="24" r="3" fill="{O}"/>""")
