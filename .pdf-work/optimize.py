"""Build optimized web assets from extracted catalog crops."""
import os, shutil
from PIL import Image, ImageDraw, ImageFilter

WORK = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(WORK)
A = os.path.join(ROOT, "src", "assets")
PUB = os.path.join(ROOT, "public")

for d in ["brand", "products", "catalog", "crops"]:
    os.makedirs(os.path.join(A, d), exist_ok=True)
os.makedirs(os.path.join(PUB, "downloads"), exist_ok=True)

def webp(src, dst, max_side=800, q=82):
    im = Image.open(src).convert("RGB")
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(dst, "WEBP", quality=q, method=6)
    return im.size

# ---------- 1. Logo ----------
logo = Image.open(os.path.join(WORK, "zenviro-logo-raw.png")).convert("RGBA")
bbox = logo.getchannel("A").getbbox()
logo = logo.crop(bbox)
logo.save(os.path.join(A, "brand", "zenviro-logo.png"))

# cream monochrome version for dark surfaces
cream = Image.new("RGBA", logo.size, (250, 248, 241, 0))
cream.paste((250, 248, 241, 255), mask=logo.getchannel("A"))
cream.save(os.path.join(A, "brand", "zenviro-logo-light.png"))
print("logo:", logo.size)

# ---------- 2. Favicon / touch icon from Z mark ----------
w, h = logo.size
zmark = logo.crop((0, 0, w, int(h * 0.62)))
zb = zmark.getchannel("A").getbbox()
zmark = zmark.crop(zb)
side = max(zmark.size) + 24
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(zmark, ((side - zmark.width) // 2, (side - zmark.height) // 2), zmark)
sq.resize((512, 512), Image.LANCZOS).save(os.path.join(PUB, "favicon.png"))
# apple touch icon: cream Z on deep green
ati = Image.new("RGBA", (side, side), (11, 61, 46, 255))
zc = Image.new("RGBA", zmark.size, (250, 248, 241, 0))
zc.paste((250, 248, 241, 255), mask=zmark.getchannel("A"))
ati.paste(zc, ((side - zmark.width) // 2, (side - zmark.height) // 2), zc)
ati.convert("RGB").resize((180, 180), Image.LANCZOS).save(os.path.join(PUB, "apple-touch-icon.png"))

# ---------- 3. Product images ----------
PRODUCTS = [
    "titanic", "spider", "zennutri", "zenvi-max", "zenvi-pro", "zenvi-rhiza",
    "yieldora", "zenvi-plus", "roxcin", "toxxic", "doom-x", "tom-jerry",
    "revox", "redox", "black-roock", "rang-rover", "lenin",
    "terminal", "inflowis", "invidea", "exozen", "predator",
    # catalog-only visuals
    "boron-20", "zinc-edta-12", "ferro-eddha-6", "magnesium-sulphate",
    "fulvic-power", "amino-power", "seaweed-extract", "humic-power",
    "roottex", "terando", "pushpa-2",
]
for p in PRODUCTS:
    size = webp(os.path.join(WORK, "crops", f"{p}.jpg"),
                os.path.join(A, "products", f"{p}-product.webp"), 800, 82)
    print(f"product {p}: {size}")

# ---------- 4. Catalog gallery pages ----------
for i in range(1, 9):
    im = Image.open(os.path.join(WORK, f"catalog-{i:02d}.jpg")).convert("RGB")
    im.thumbnail((1100, 1556), Image.LANCZOS)
    im.save(os.path.join(A, "catalog", f"catalog-page-{i:02d}.webp"), "WEBP", quality=76, method=6)

webp(os.path.join(WORK, "crops", "hero-basket.jpg"), os.path.join(A, "catalog", "hero-basket.webp"), 1200, 84)
webp(os.path.join(WORK, "crops", "collage-full.jpg"), os.path.join(A, "catalog", "crops-collage.webp"), 1200, 80)
webp(os.path.join(WORK, "crops", "micronutrients-group.jpg"), os.path.join(A, "catalog", "micronutrients-group.webp"), 1600, 80)

# ---------- 5. Crop solution tiles ----------
CROPTILES = {
    "chilli": "tile-chilli", "cotton": "tile-cotton", "rice": "tile-paddy",
    "maize": "tile-maize", "sugarcane": "tile-sugarcane", "groundnut": "petal-groundnut",
    "vegetables": "tile-leafy", "fruits": "tile-fruits",
}
for crop, src in CROPTILES.items():
    webp(os.path.join(WORK, "crops", f"{src}.jpg"), os.path.join(A, "crops", f"crop-{crop}.webp"), 640, 80)

# ---------- 6. OG image 1200x630 ----------
bg = Image.open(os.path.join(WORK, "crops", "hero-basket.jpg")).convert("RGB")
tw, th = 1200, 630
scale = max(tw / bg.width, th / bg.height)
bg = bg.resize((int(bg.width * scale), int(bg.height * scale)), Image.LANCZOS)
bg = bg.crop(((bg.width - tw) // 2, int((bg.height - th) * 0.45), (bg.width - tw) // 2 + tw, int((bg.height - th) * 0.45) + th))
shade = Image.new("L", (tw, th), 0)
ds = ImageDraw.Draw(shade)
for y in range(th):
    ds.line([(0, y), (tw, y)], fill=int(110 * (1 - y / th) + 20))
dark = Image.new("RGB", (tw, th), (7, 28, 20))
bg = Image.composite(dark, bg, shade.point(lambda v: v))
lg = Image.new("RGBA", logo.size, (255, 255, 255, 0))
lg.paste(logo, (0, 0), logo)
lgc = Image.new("RGBA", logo.size, (250, 248, 241, 0))
lgc.paste((250, 248, 241, 255), mask=logo.getchannel("A"))
lw = 420
lgc = lgc.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
bg.paste(lgc, ((tw - lw) // 2, 48), lgc)
bg.save(os.path.join(PUB, "og-image.jpg"), quality=85)

# ---------- 7. Web-optimized catalog PDF + price list copy ----------
pages = []
for i in range(1, 9):
    im = Image.open(os.path.join(WORK, f"catalog-{i:02d}.jpg")).convert("RGB")
    im.thumbnail((1000, 1414), Image.LANCZOS)
    pages.append(im)
pages[0].save(os.path.join(PUB, "downloads", "zenviro-product-catalog.pdf"),
              save_all=True, append_images=pages[1:], resolution=120, quality=70)
shutil.copy(r"C:\Users\gogin\Downloads\zenvirooffers\Zenviro_Price_List_Updated (1).pdf",
            os.path.join(PUB, "downloads", "zenviro-price-list.pdf"))

print("\n-- sizes --")
for root, _, files in os.walk(A):
    for f in files:
        if f.endswith((".webp", ".png")):
            p = os.path.join(root, f)
            print(f"{os.path.relpath(p, A):45s} {os.path.getsize(p)//1024:5d} KB")
for f in ["og-image.jpg", "favicon.png", "apple-touch-icon.png", "downloads/zenviro-product-catalog.pdf", "downloads/zenviro-price-list.pdf"]:
    p = os.path.join(PUB, f)
    print(f"public/{f:42s} {os.path.getsize(p)//1024:5d} KB")
