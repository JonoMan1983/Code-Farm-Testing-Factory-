"""Render resume.html to the downloadable A4 PDF and stamp ATS-friendly metadata."""
import asyncio, threading, functools, os, sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.async_api import async_playwright
from pypdf import PdfReader, PdfWriter
SITE = '/tmp/site'
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'documents', 'Jonathan_Nestler_Resume_2026.pdf')
class Q(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Q, directory=SITE)); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
FONTCSS = open('/tmp/shot.py').read().split('FONTCSS="""')[1].split('"""')[0].replace('localhost:8765', f'127.0.0.1:{port}')
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/home/claude/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome', args=['--no-sandbox'])
        pg = await b.new_page()
        await pg.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, content_type='text/css', body=FONTCSS))
        await pg.goto(f'http://127.0.0.1:{port}/resume.html'); await asyncio.sleep(1.5)
        await pg.emulate_media(media='print')
        await pg.pdf(path='/tmp/cv_raw.pdf', format='A4', print_background=True, prefer_css_page_size=True)
        await b.close()
asyncio.run(main())
r = PdfReader('/tmp/cv_raw.pdf'); w = PdfWriter()
for pg in r.pages: w.add_page(pg)
w.add_metadata({
    '/Title': 'Jonathan Edward Nestler — Senior Product Designer, UX/UI Designer, Product Owner — Resume 2026',
    '/Author': 'Jonathan Edward Nestler',
    '/Subject': 'Resume: Senior Product Designer and UX/UI Designer with product ownership and AI-integrated product design (Claude, Claude Code, Figma MCP). Jeffreys Bay, South Africa; remote; open to relocate in South Africa.',
    '/Keywords': 'Senior Product Designer, UX Designer, UI Designer, UX/UI, Product Owner, Product Design, AI integration, Claude, Claude Code, Figma MCP, Figma, user research, usability testing, prototyping, design systems, accessibility, WCAG, iGaming, South Africa, remote',
    '/Creator': 'Jonathan Edward Nestler — www.designasaurus.co.za'})
with open(OUT, 'wb') as f: w.write(f)
print('pages', len(r.pages))
