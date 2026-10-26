"""Build fixed-song Halo3 font subsets, retaining upstream family names/metrics."""
from pathlib import Path
from urllib.request import urlopen
from fontTools import subset
import argparse, re, shutil, json

site = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--source', type=Path, default=site.parent / 'Lyrscape')
parser.add_argument('--lyrics', type=Path)
args = parser.parse_args()
url = 'https://web.hycdn.cn/siren/lyric/20250430/cfd84e70b19dc9a47fdf3d4c00341a63.lrc'
lyrics = args.lyrics.read_text(encoding='utf-8-sig') if args.lyrics else urlopen(url, timeout=20).read().decode('utf8')
chars = set(map(ord, lyrics + 'Lyrics No.0123456789+Heavenly MeABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz: /-'))
dest = site / 'public/fonts/halo3'
dest.mkdir(exist_ok=True)
css = []
for package, weights in {'noto-sans-jp': [500, 700, 900], 'fusion-pixel-12px-proportional-jp': [400], 'share-tech-mono': [400]}.items():
    source = args.source / 'node_modules/@fontsource' / package
    for weight in weights:
        for rule in re.findall(r'@font-face\s*\{[^}]+\}', (source / f'{weight}.css').read_text(encoding='utf8')):
            ranges = re.search(r'unicode-range:\s*([^;]+)', rule)
            spans = [(int(lo,16), int(hi or lo,16)) for lo,hi in re.findall(r'U\+([0-9a-fA-F]+)(?:-([0-9a-fA-F]+))?', ranges[1])] if ranges else [(0,0x10FFFF)]
            points = {c for c in chars if any(lo <= c <= hi for lo,hi in spans)}
            if not points: continue
            filename = re.search(r'url\(\./files/([^)]*)\)', rule)[1]
            options = subset.Options(); options.flavor = 'woff2'; options.recalc_timestamp = False
            font = subset.load_font(str(source / 'files' / filename), options)
            sub = subset.Subsetter(options=options); sub.populate(unicodes=points); sub.subset(font)
            subset.save_font(font, str(dest / filename), options)
            replacement = 'unicode-range:' + ','.join('U+'+format(c,'X') for c in sorted(points)) + ';'
            rule = re.sub(r'unicode-range:[^;]+;', replacement, rule) if ranges else rule[:-1] + replacement + '}'
            css.append(rule.replace('url(./files/', 'url(/fonts/halo3/'))
    shutil.copy2(source / 'LICENSE', dest / f'{package}-OFL.txt')
(site / 'src/halo3-fonts.css').write_text('\n'.join(css), encoding='utf8')
print(json.dumps({'subsets':len(css), 'bytes':sum(p.stat().st_size for p in dest.glob('*.woff2'))}))
