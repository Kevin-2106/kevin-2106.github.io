from pathlib import Path
import argparse,re,json,shutil
from fontTools import subset
site=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser()
parser.add_argument('--source',type=Path,default=site.parent/'Lyrscape')
parser.add_argument('--lyrics',type=Path,default=site/'public/demo/arrow.lrc')
args=parser.parse_args()
source=args.source.resolve()
lyric=args.lyrics.read_text(encoding='utf-8-sig')
licenses=site/'public/licenses'

font_source=source/'node_modules/@fontsource/noto-sans-jp'
font_dest=site/'public/fonts/lyrscape-jp';font_dest.mkdir(exist_ok=True)
characters=set(map(ord,lyric+'arrowトゲナシトゲアリTOGENASHI TOGEARI♪'))
css=[];font_count=font_bytes=0
for weight in [400,700]:
    sheet=(font_source/f'{weight}.css').read_text(encoding='utf-8')
    for block in re.findall(r'@font-face\s*\{(.*?)\}',sheet,re.S):
        filename=re.search(r'url\(\./files/([^)]*\.woff2)\)',block)[1]
        ranges=re.search(r'unicode-range:\s*([^;]+);',block)
        if not ranges:continue
        covered=set()
        for part in ranges[1].split(','):
            bounds=part.strip()[2:].split('-');lo=int(bounds[0],16);hi=int(bounds[-1],16)
            covered.update(c for c in characters if lo<=c<=hi)
        if not covered:continue
        opts=subset.Options();opts.flavor='woff2';opts.recalc_timestamp=False
        font=subset.load_font(str(font_source/'files'/filename),opts)
        sub=subset.Subsetter(options=opts);sub.populate(unicodes=covered);sub.subset(font)
        subset.save_font(font,str(font_dest/filename),opts)
        font_count+=1;font_bytes+=(font_dest/filename).stat().st_size
        css.append("@font-face{font-family:WorkshopJP;font-style:normal;font-display:swap;font-weight:"+str(weight)+";src:url('/fonts/lyrscape-jp/"+filename+"') format('woff2');unicode-range:"+','.join('U+'+format(c,'X') for c in sorted(covered))+';}')
(site/'src/lyrscape-jp.css').write_text('\n'.join(css),encoding='utf-8')
shutil.copy2(font_source/'LICENSE',licenses/'NotoSansJP-OFL.txt')

print(json.dumps({'font_subsets':font_count,'font_bytes':font_bytes}))
