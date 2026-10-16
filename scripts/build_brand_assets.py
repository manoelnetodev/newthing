"""Build the Newthing identity as portable SVGs with outlined Inter lettering.

Requires fonttools and brotli. Uses the project's existing OFL Inter font.
"""
from pathlib import Path
from math import ceil
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'brand'
OUT.mkdir(parents=True, exist_ok=True)
FONT = ROOT / 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'
font = instantiateVariableFont(TTFont(FONT), {'wght': 650}, inplace=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm
arrow = 'M21 6 62 34 70 10 111 70 36 65 54 48 13 20Z'
ring = 'M24.4 75H49.5A26 26 0 1 0 84.5 75H109.6A48 48 0 1 1 24.4 75Z'
blue = '#087CFF'

def symbol(ink):
    return f'<path fill="{blue}" d="{arrow}"/><path fill="{ink}" d="{ring}"/>'

def lettering(text, size, tracking, x, y, color):
    scale = size / units
    result = []
    for char in text:
        name = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, y)))
        if pen.getCommands():
            result.append(f'<path fill="{color}" d="{pen.getCommands()}"/>')
        x += font['hmtx'][name][0] * scale + tracking
    return ''.join(result), x - tracking

def svg(width, height, content, title):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img"><title>{title}</title>{content}</svg>\n'

for variant, ink in [('dark', '#F4F7FB'), ('light', '#10151D')]:
    (OUT / f'newthing-symbol-{variant}.svg').write_text(svg(128, 160, symbol(ink), 'New Thing Apps — símbolo'), encoding='utf8')
    word, end = lettering('NEWTHING', 42, -0.8, 77, 49, ink)
    dot, end = lettering('.', 42, 0, end + 1.5, 49, blue)
    subtitle, _ = lettering('APPS', 10, 6, 80, 77, ink)
    horizontal = f'<g transform="translate(3 1) scale(.5)">{symbol(ink)}</g>{word}{dot}{subtitle}'
    (OUT / f'newthing-horizontal-{variant}.svg').write_text(svg(ceil(end + 6), 86, horizontal, 'Newthing Apps'), encoding='utf8')
    word_only, word_end = lettering('NEWTHING', 42, -0.8, 0, 37, ink)
    word_dot, word_end = lettering('.', 42, 0, word_end + 1.5, 37, blue)
    descriptor, _ = lettering('APPS', 10, 6, 3, 64, ink)
    (OUT / f'newthing-wordmark-{variant}.svg').write_text(svg(ceil(word_end + 5), 70, word_only + word_dot + descriptor, 'Newthing Apps'), encoding='utf8')
    word, end = lettering('NEWTHING', 47, -0.9, 0, 0, ink)
    dot, end = lettering('.', 47, 0, end + 1.5, 0, blue)
    word += dot
    sub, sub_width = lettering('APPS', 17, 10, 0, 0, ink)
    vertical = f'<g transform="translate({(380 - 128) / 2} 8)">{symbol(ink)}</g><g transform="translate({(380 - end) / 2} 214)">{word}</g><g transform="translate({(380 - sub_width) / 2} 249)">{sub}</g>'
    (OUT / f'newthing-stacked-{variant}.svg').write_text(svg(380, 275, vertical, 'New Thing Apps'), encoding='utf8')

favicon = '<rect width="64" height="64" rx="15" fill="#0A0D12"/><g transform="translate(6 0) scale(.4)">' + symbol('#F4F7FB') + '</g>'
(ROOT / 'public' / 'favicon.svg').write_text(svg(64, 64, favicon, 'Newthing'), encoding='utf8')
print('Created six portable SVG logo variants and favicon.')
