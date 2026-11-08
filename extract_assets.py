import fitz  # PyMuPDF
from PIL import Image
import io
import os

os.makedirs("public/images/club", exist_ok=True)
os.makedirs("public/images/kits", exist_ok=True)
os.makedirs("public/images/stadiums", exist_ok=True)
os.makedirs("public/images/players", exist_ok=True)
os.makedirs("public/images/news", exist_ok=True)

doc = fitz.open("WhatsApp Image 2026-11-08 at 9.14.19 AM (1).pdf")
print("Extracting images from PDF...")

# Render each page at high resolution (300 DPI -> matrix zoom ~ 3)
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=200)
    page_img_path = f"public/images/pdf_page_{i+1}.png"
    pix.save(page_img_path)
    print(f"Saved {page_img_path} ({pix.width}x{pix.height})")

# Let's crop specific regions from the rendered pages:
# Page 5 has the Wikipedia infobox with the clear Churchill Brothers crest
page5 = Image.open("public/images/pdf_page_5.png")
w5, h5 = page5.size

# In page 5, the infobox is in the middle-right. Let's find and crop the crest
# Let's inspect where the crest is located:
# Crop candidate for crest:
# Typically in infobox header: x around 60% to 75%, y around 38% to 55%
crest_crop = page5.crop((int(w5 * 0.61), int(h5 * 0.38), int(w5 * 0.77), int(h5 * 0.54)))
crest_crop.save("public/images/club/crest_raw.png")
print("Saved crest_raw.png")

# Page 4 has the kits and branding
page4 = Image.open("public/images/pdf_page_4.png")
w4, h4 = page4.size

# Home jersey crop ("HOME, IN EVERY LINE"):
home_jersey = page4.crop((int(w4 * 0.39), int(h4 * 0.43), int(w4 * 0.58), int(h4 * 0.57)))
home_jersey.save("public/images/kits/home_jersey_promo.png")

# Home kit players launch ("Red looks good in RED"):
kit_launch = page4.crop((int(w4 * 0.20), int(h4 * 0.43), int(w4 * 0.40), int(h4 * 0.57)))
kit_launch.save("public/images/kits/kit_launch.png")

# Kit folded:
kit_folded = page4.crop((int(w4 * 0.58), int(h4 * 0.43), int(w4 * 0.77), int(h4 * 0.57)))
kit_folded.save("public/images/kits/kit_detail.png")

# Stars we earned banner:
stars_earned = page4.crop((int(w4 * 0.39), int(h4 * 0.57), int(w4 * 0.58), int(h4 * 0.69)))
stars_earned.save("public/images/club/stars_earned.png")

# Page 1 has Fatorda Stadium and Tilak Maidan:
page1 = Image.open("public/images/pdf_page_1.png")
w1, h1 = page1.size
fatorda = page1.crop((int(w1 * 0.61), int(h1 * 0.40), int(w1 * 0.79), int(h1 * 0.48)))
fatorda.save("public/images/stadiums/fatorda_stadium.png")

tilak = page1.crop((int(w1 * 0.61), int(h1 * 0.48), int(w1 * 0.79), int(h1 * 0.58)))
tilak.save("public/images/stadiums/tilak_maidan.png")

print("All base asset crops extracted successfully!")
