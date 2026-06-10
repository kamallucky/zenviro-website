"""Crop product/crop/brand visuals from extracted catalog pages (fractional boxes)."""
import os
from PIL import Image

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SRC, "crops")
os.makedirs(OUT, exist_ok=True)

# name: (source page file number, x0, y0, x1, y1) as fractions of page size
CROPS = {
    # --- brand / hero ---
    "hero-basket":        (1, 0.14, 0.33, 0.90, 0.84),
    # --- page 3: nutrition packs + micronutrient bottles ---
    "micronutrients-group": (3, 0.02, 0.28, 0.98, 0.51),
    "boron-20":           (3, 0.030, 0.290, 0.155, 0.505),
    "zinc-edta-12":       (3, 0.148, 0.290, 0.272, 0.505),
    "ferro-eddha-6":      (3, 0.265, 0.290, 0.390, 0.505),
    "magnesium-sulphate": (3, 0.382, 0.290, 0.507, 0.505),
    "fulvic-power":       (3, 0.522, 0.290, 0.645, 0.505),
    "amino-power":        (3, 0.638, 0.290, 0.760, 0.505),
    "seaweed-extract":    (3, 0.738, 0.290, 0.860, 0.505),
    "humic-power":        (3, 0.848, 0.290, 0.970, 0.505),
    "zenvi-max":          (3, 0.155, 0.520, 0.350, 0.750),
    "zenvi-pro":          (3, 0.342, 0.520, 0.500, 0.755),
    "zenvi-rhiza":        (3, 0.490, 0.518, 0.655, 0.745),
    "zennutri":           (3, 0.640, 0.518, 0.885, 0.748),
    "tile-fruits":        (3, 0.005, 0.762, 0.330, 0.905),
    "tile-carrots":       (3, 0.342, 0.762, 0.615, 0.905),
    "tile-leafy":         (3, 0.625, 0.762, 0.995, 0.905),
    # --- page 4: growth promoters ---
    "yieldora":           (4, 0.150, 0.280, 0.510, 0.605),
    "zenvi-plus":         (4, 0.490, 0.280, 0.915, 0.605),
    "roottex":            (4, 0.360, 0.455, 0.655, 0.765),
    # --- page 5: combo boxes ---
    "lenin":              (5, 0.045, 0.300, 0.475, 0.670),
    "titanic":            (5, 0.465, 0.295, 0.905, 0.665),
    "spider":             (5, 0.275, 0.548, 0.720, 0.952),
    # --- page 6: chilli special ---
    "exozen":             (6, 0.205, 0.243, 0.480, 0.500),
    "predator":           (6, 0.462, 0.238, 0.682, 0.490),
    "terando":            (6, 0.662, 0.245, 0.900, 0.505),
    "doom-x":             (6, 0.175, 0.480, 0.585, 0.762),
    "tom-jerry":          (6, 0.548, 0.480, 0.957, 0.762),
    # --- page 7: all crops ---
    "roxcin":             (7, 0.230, 0.255, 0.520, 0.630),
    "toxxic":             (7, 0.503, 0.250, 0.805, 0.628),
    "pushpa-2":           (7, 0.130, 0.498, 0.535, 0.785),
    "black-roock":        (7, 0.540, 0.492, 0.875, 0.790),
    "tile-sugarcane":     (7, 0.082, 0.790, 0.347, 0.932),
    "tile-maize":         (7, 0.358, 0.790, 0.642, 0.932),
    "tile-pods":          (7, 0.648, 0.790, 0.932, 0.932),
    # --- page 8: chilli & cotton special ---
    "terminal":           (8, 0.215, 0.298, 0.435, 0.540),
    "inflowis":           (8, 0.415, 0.293, 0.628, 0.535),
    "invidea":            (8, 0.608, 0.298, 0.835, 0.540),
    "rang-rover":         (8, 0.158, 0.515, 0.442, 0.797),
    "redox":              (8, 0.415, 0.510, 0.662, 0.792),
    "revox":              (8, 0.630, 0.505, 0.935, 0.797),
    "tile-cotton":        (8, 0.082, 0.795, 0.347, 0.937),
    "tile-paddy":         (8, 0.358, 0.795, 0.642, 0.937),
    "tile-chilli":        (8, 0.648, 0.795, 0.932, 0.937),
    # --- page 2: crop collage petals ---
    "petal-groundnut":    (2, 0.505, 0.195, 0.750, 0.343),
    "petal-chilli":       (2, 0.108, 0.290, 0.330, 0.442),
    "petal-maize":        (2, 0.075, 0.485, 0.255, 0.630),
    "petal-cotton":       (2, 0.705, 0.302, 0.875, 0.455),
    "petal-sugarcane":    (2, 0.240, 0.188, 0.465, 0.340),
    "petal-fruits":       (2, 0.700, 0.477, 0.875, 0.625),
    "collage-full":       (2, 0.030, 0.110, 0.970, 0.730),
}

pages = {}
def page(n):
    if n not in pages:
        pages[n] = Image.open(os.path.join(SRC, f"catalog-{n:02d}.jpg"))
    return pages[n]

for name, (p, x0, y0, x1, y1) in CROPS.items():
    im = page(p)
    W, H = im.size
    box = (int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H))
    crop = im.crop(box)
    crop.save(os.path.join(OUT, f"{name}.jpg"), quality=90)

# contact sheets: 6 columns, labeled
from PIL import ImageDraw
names = list(CROPS.keys())
COLS, CELL = 6, 240
import math
rows = math.ceil(len(names) / COLS)
sheet = Image.new("RGB", (COLS * CELL, rows * (CELL + 22)), "white")
d = ImageDraw.Draw(sheet)
for i, name in enumerate(names):
    im = Image.open(os.path.join(OUT, f"{name}.jpg"))
    im.thumbnail((CELL - 10, CELL - 10))
    cx, cy = (i % COLS) * CELL, (i // COLS) * (CELL + 22)
    sheet.paste(im, (cx + (CELL - im.width) // 2, cy + (CELL - im.height) // 2))
    d.text((cx + 6, cy + CELL + 2), name, fill="black")
sheet.save(os.path.join(SRC, "contact-sheet.jpg"), quality=85)
print("done", len(names), "crops")
