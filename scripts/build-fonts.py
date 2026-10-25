from pathlib import Path
from fontTools import subset
import shutil,hashlib,json

SITE=Path(__file__).resolve().parent.parent
import argparse
parser=argparse.ArgumentParser()
parser.add_argument('--source',type=Path,default=SITE.parent/'ReEndfield')
LIB=parser.parse_args().source.resolve()
fonts=SITE/'public'/'fonts'; fonts.mkdir(parents=True,exist_ok=True)
license_dir=SITE/'public'/'licenses';license_dir.mkdir(parents=True,exist_ok=True)
texts=[p for p in (SITE/'src').glob('*') if p.suffix in ('.ts','.css')]
texts.extend([SITE/'index.html',SITE/'public'/'credits.html'])
chars=set(''.join(p.read_text(encoding='utf-8') for p in texts))
chars.update(chr(i) for i in range(32,256))
chars.update('设置关闭开启已复制选择命令手动复制作品档案使用平台步骤查看源码在线打开暂无公开下载关于返回探索字体确认取消')
specs=[('SpaceGrotesk','spacegrotesk/SpaceGrotesk[wght].ttf','spacegrotesk',None),('NotoSansSC','notosanssc/NotoSansSC[wght].ttf','notosanssc',chars),('IBMPlexMono','ibmplexmono/IBMPlexMono-Regular.ttf','ibmplexmono',None)]
records=[]
for name,rel,family,cs in specs:
    src=LIB/'assets'/'fonts'/'open'/rel
    options=subset.Options(); options.flavor='woff2';options.desubroutinize=True;options.recalc_timestamp=False
    font=subset.load_font(str(src),options)
    if cs:
        sub=subset.Subsetter(options=options);sub.populate(text=''.join(sorted(cs)));sub.subset(font)
    dest=fonts/(name+'.woff2');subset.save_font(font,str(dest),options)
    shutil.copy2(LIB/'assets'/'fonts'/'open'/family/'OFL.txt',license_dir/(name+'-OFL.txt'))
    records.append({'font':name,'source_sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'output_bytes':dest.stat().st_size,'subset':bool(cs),'license':'SIL OFL 1.1'})
shutil.copy2(LIB/'LICENSE.md',license_dir/'ReEndfield-LICENSE.md')
(fonts/'manifest.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
print(json.dumps(records))
