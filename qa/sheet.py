"""Contact sheet: python3 qa/sheet.py <prefix> <vp> <thumbW> <thumbH> <cols> <out.jpg> [maxStops]"""
import sys, glob, re
from PIL import Image
prefix, vp, w, h, cols, out = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), sys.argv[6]
mx = int(sys.argv[7]) if len(sys.argv) > 7 else 99
files = sorted(glob.glob(f"qa/out/{prefix}-{vp}-[0-9]*.png"), key=lambda f: int(re.findall(r"-(\d+)\.png$", f)[0]))[:mx]
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (w + 6), rows * (h + 6)), "white")
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB").resize((w, h))
    sheet.paste(im, ((i % cols) * (w + 6), (i // cols) * (h + 6)))
sheet.save(out, quality=82)
print(out, len(files))
