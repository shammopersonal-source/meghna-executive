"""Original vs redesign strips: python3 qa/side-by-side.py <origPrefix> <newPrefix> <vp> <stops> <thumbW> <out.jpg> <title>"""
import sys, glob, re
from PIL import Image, ImageDraw, ImageFont
op, np_, vp, stops, w, out, title = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5]), sys.argv[6], sys.argv[7]
def files(prefix):
    fs = glob.glob(f"qa/out/{prefix}-{vp}-[0-9]*.png")
    return sorted(fs, key=lambda f: int(re.findall(r"-(\d+)\.png$", f)[0]))[:stops]
rows = [("ORIGINAL  meghna-executive.com", files(op)), ("REDESIGN  local preview", files(np_))]
first = Image.open(rows[0][1][0]); h = round(first.height * w / first.width)
pad, label = 8, 34
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
    tfont = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
except OSError:
    font = tfont = ImageFont.load_default()
W = stops * (w + pad) + pad
H = 48 + 2 * (label + h + pad)
sheet = Image.new("RGB", (W, H), "#f1f0ee")
d = ImageDraw.Draw(sheet)
d.text((pad, 12), title, fill="#191d1c", font=tfont)
y = 48
for name, fs in rows:
    d.text((pad, y + 8), name, fill="#735f3e", font=font)
    y += label
    for i, f in enumerate(fs):
        sheet.paste(Image.open(f).convert("RGB").resize((w, h)), (pad + i * (w + pad), y))
    y += h + pad
sheet.save(out, quality=82)
print(out, sheet.size)
