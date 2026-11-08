import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs("public/images/hero", exist_ok=True)
os.makedirs("public/images/stadiums", exist_ok=True)
os.makedirs("public/images/club", exist_ok=True)
os.makedirs("public/images/players", exist_ok=True)
os.makedirs("public/images/products", exist_ok=True)
os.makedirs("public/images/news", exist_ok=True)
os.makedirs("public/images/media", exist_ok=True)

# TrueType font paths on Windows
FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_REGULAR = "C:/Windows/Fonts/arial.ttf"
FONT_HEAVY = "C:/Windows/Fonts/impact.ttf"
FONT_SEGOE = "C:/Windows/Fonts/segoeuib.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        try:
            return ImageFont.truetype(FONT_BOLD, size)
        except Exception:
            return ImageFont.load_default()

# Colors
PRIMARY_RED = (200, 16, 46)
DEEP_RED = (143, 11, 35)
BRAND_GOLD = (212, 167, 44)
DARK_SURFACE = (27, 27, 29)
BRAND_BLACK = (17, 17, 19)
PITCH_GREEN = (22, 70, 36)
PITCH_DARK = (15, 48, 25)

# Load Crest for overlay
crest_img = None
try:
    if os.path.exists("public/images/club/crest_transparent.png"):
        crest_img = Image.open("public/images/club/crest_transparent.png").convert("RGBA")
    elif os.path.exists("public/images/club/crest.png"):
        crest_img = Image.open("public/images/club/crest.png").convert("RGBA")
except Exception as e:
    print("Notice: could not load crest image:", e)

# ==============================================================================
# 1. HOMEPAGE HERO BACKGROUND (2560 x 1440 2K/4K CRISP STADIUM ATMOSPHERE)
# ==============================================================================
def generate_hero_image():
    W, H = 2560, 1440
    im = Image.new("RGB", (W, H), (12, 12, 15))
    d = ImageDraw.Draw(im, "RGBA")

    # Sky gradient - deep midnight red & black
    for y in range(H):
        ratio = y / H
        r = int(12 + (30 - 12) * ratio)
        g = int(12 + (14 - 12) * ratio)
        b = int(15 + (18 - 15) * ratio)
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # Stadium Floodlight Beams from top corners
    for i in range(12):
        # Left pylon beams
        alpha = int(25 * (1 - i / 12))
        beam_x = 400 + i * 150
        d.polygon([(180, 80), (beam_x, H), (beam_x + 120, H)], fill=(255, 235, 190, alpha))
        
        # Right pylon beams
        beam_rx = W - (400 + i * 150)
        d.polygon([(W - 180, 80), (beam_rx - 120, H), (beam_rx, H)], fill=(255, 235, 190, alpha))

    # Pylon Light Flare Glows
    for glow_r in range(160, 0, -10):
        g_alpha = int(20 * (1 - glow_r / 160))
        d.ellipse([180 - glow_r, 80 - glow_r, 180 + glow_r, 80 + glow_r], fill=(255, 245, 220, g_alpha))
        d.ellipse([W - 180 - glow_r, 80 - glow_r, W - 180 + glow_r, 80 + glow_r], fill=(255, 245, 220, g_alpha))

    # Stadium Grandstand Silhouette (Fatorda Stadium)
    # Upper Tier Roof Truss
    d.polygon([(0, 680), (W * 0.25, 580), (W * 0.75, 580), (W, 680), (W, 750), (0, 750)], fill=(22, 22, 26, 255))
    d.line([(0, 680), (W * 0.25, 580), (W * 0.75, 580), (W, 680)], fill=(50, 50, 58, 255), width=4)

    # Crowd tiers with red machine supporter texture
    for row in range(14):
        tier_y = 660 + row * 24
        for col in range(80):
            cx = col * 32 + (row % 2) * 16
            dot_color = (
                int(PRIMARY_RED[0] * (0.4 + 0.6 * ((col + row) % 3) / 2)),
                int(PRIMARY_RED[1] * 0.5),
                int(PRIMARY_RED[2] * 0.5),
                int(80 + 120 * (row / 14))
            )
            d.ellipse([cx, tier_y, cx + 18, tier_y + 16], fill=dot_color)

    # Red flare celebration haze along crowd curve
    for flare_x in [W * 0.22, W * 0.5, W * 0.78]:
        for r in range(240, 0, -20):
            f_alpha = int(22 * (1 - r / 240))
            d.ellipse([flare_x - r, 780 - r, flare_x + r, 780 + r], fill=(200, 16, 46, f_alpha))

    # Stadium Pitch (Emerald Grass Turf)
    pitch_y = 960
    for y in range(pitch_y, H):
        ratio = (y - pitch_y) / (H - pitch_y)
        # Alternate lawn mower stripes
        stripe = int(math.sin((y - pitch_y) / 25) * 12)
        pr = max(10, min(35, int(PITCH_GREEN[0] + stripe)))
        pg = max(35, min(95, int(PITCH_GREEN[1] + stripe + ratio * 20)))
        pb = max(15, min(45, int(PITCH_GREEN[2] + stripe)))
        d.line([(0, y), (W, y)], fill=(pr, pg, pb, 255))

    # Crisp Pitch Markings (Center circle, touchline, penalty box)
    line_alpha = 180
    d.line([(0, pitch_y), (W, pitch_y)], fill=(255, 255, 255, line_alpha), width=3)
    d.line([(W * 0.5, pitch_y), (W * 0.5, H)], fill=(255, 255, 255, line_alpha), width=3)
    # Center circle ellipse
    d.ellipse([W * 0.5 - 320, pitch_y - 80, W * 0.5 + 320, pitch_y + 240], outline=(255, 255, 255, line_alpha), width=3)

    # Player silhouettes in action on pitch
    player_positions = [(W * 0.42, 1080), (W * 0.48, 1020), (W * 0.54, 1060), (W * 0.62, 1120)]
    for px, py in player_positions:
        # Shadow
        d.ellipse([px - 40, py + 110, px + 40, py + 130], fill=(0, 0, 0, 140))
        # Head
        d.ellipse([px - 14, py - 40, px + 14, py - 12], fill=(20, 20, 24, 255))
        # Torso (Churchill Red kit)
        d.polygon([(px - 28, py - 10), (px + 28, py - 10), (px + 22, py + 55), (px - 22, py + 55)], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 255))
        # Gold collar / sash detail
        d.line([(px - 8, py - 10), (px, py + 15), (px + 8, py - 10)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255), width=3)
        # Shorts (White)
        d.polygon([(px - 22, py + 55), (px + 22, py + 55), (px + 20, py + 85), (px - 20, py + 85)], fill=(235, 235, 240, 255))
        # Legs
        d.line([(px - 12, py + 85), (px - 16, py + 120)], fill=(30, 30, 35, 255), width=7)
        d.line([(px + 12, py + 85), (px + 16, py + 120)], fill=(30, 30, 35, 255), width=7)

    # Supporter Banners on Grandstand Wall
    d.rectangle([W * 0.32, 915, W * 0.68, 955], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 240), outline=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255), width=2)
    font_banner = get_font(FONT_HEAVY, 28)
    d.text((W * 0.5, 935), "THE RED MACHINES  •  CHURCHILL BROTHERS FC GOA", fill=(255, 255, 255, 255), anchor="mm", font=font_banner)

    # Vignette & contrast layers
    for v in range(300):
        valpha = int(120 * (1 - v / 300))
        d.line([(0, v), (W, v)], fill=(10, 10, 12, valpha))
        d.line([(0, H - 1 - v), (W, H - 1 - v)], fill=(10, 10, 12, valpha))

    path = "public/images/hero/hero-matchday-floodlights.jpg"
    im.save(path, quality=95)
    print(f"Generated ultra-crisp hero image at {path} ({W}x{H})")

# ==============================================================================
# 2. STADIUM PHOTOGRAPHY (1600 x 1000 ARCHITECTURAL RENDERS)
# ==============================================================================
def generate_stadium_images():
    # Fatorda Stadium (Jawaharlal Nehru Stadium, Margao)
    W, H = 1600, 1000
    im = Image.new("RGB", (W, H), (14, 16, 22))
    d = ImageDraw.Draw(im, "RGBA")

    # Sky gradient - evening twilight
    for y in range(500):
        r = int(18 + (35 - 18) * (y / 500))
        g = int(22 + (40 - 22) * (y / 500))
        b = int(35 + (60 - 35) * (y / 500))
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # Palm trees silhouette along the stadium perimeter (iconic Goan landscape)
    for px in range(0, W, 80):
        py = 460 + int(math.sin(px) * 20)
        d.line([(px, py), (px + 6, py - 70)], fill=(10, 15, 12, 220), width=4)
        for angle in range(-60, 70, 20):
            rad = math.radians(angle)
            lx = px + 6 + math.sin(rad) * 45
            ly = py - 70 - math.cos(rad) * 35
            d.line([(px + 6, py - 70), (lx, ly)], fill=(12, 18, 14, 200), width=2)

    # Curved Fatorda Stadium Roof Truss
    d.polygon([(100, 480), (W * 0.5, 340), (W - 100, 480), (W - 100, 520), (W * 0.5, 380), (100, 520)], fill=(40, 44, 52, 255))
    d.line([(100, 480), (W * 0.5, 340), (W - 100, 480)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255), width=3)

    # Red Seating Tiers (Fatorda Stadium 19,000 capacity)
    for tier in range(12):
        ty = 510 + tier * 18
        row_w = int(W * 0.85 + tier * 20)
        start_x = (W - row_w) // 2
        d.rectangle([start_x, ty, start_x + row_w, ty + 12], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 230), outline=(DEEP_RED[0], DEEP_RED[1], DEEP_RED[2], 255))

    # Pristine Green Pitch
    d.polygon([(150, 740), (W - 150, 740), (W, H), (0, H)], fill=(22, 75, 35, 255))
    d.line([(150, 740), (W - 150, 740)], fill=(255, 255, 255, 220), width=3)
    d.line([(W * 0.5, 740), (W * 0.5, H)], fill=(255, 255, 255, 220), width=3)
    d.ellipse([W * 0.5 - 220, 680, W * 0.5 + 220, 840], outline=(255, 255, 255, 220), width=3)

    # Overlay Title Card Plaque
    d.rectangle([60, H - 120, W - 60, H - 40], fill=(17, 17, 19, 235), outline=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 200), width=1)
    f_title = get_font(FONT_BOLD, 26)
    f_sub = get_font(FONT_REGULAR, 15)
    d.text((90, H - 98), "JAWAHARLAL NEHRU STADIUM (FATORDA STADIUM)", fill=(255, 255, 255), font=f_title)
    d.text((90, H - 68), "MARGAO, SOUTH GOA  •  CAPACITY: 19,000  •  HOME OF THE RED MACHINES", fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]), font=f_sub)

    im.save("public/images/stadiums/fatorda_stadium.png", quality=95)
    print("Saved high-res fatorda_stadium.png")

    # Tilak Maidan Stadium (Vasco da Gama)
    im2 = Image.new("RGB", (W, H), (14, 18, 20))
    d2 = ImageDraw.Draw(im2, "RGBA")

    # Afternoon Goan sun sky
    for y in range(480):
        r = int(30 + (50 - 30) * (y / 480))
        g = int(35 + (55 - 35) * (y / 480))
        b = int(45 + (70 - 45) * (y / 480))
        d2.line([(0, y), (W, y)], fill=(r, g, b))

    # Dense coastal Goan coconut palms behind grandstand
    for px in range(0, W, 60):
        py = 440 + int(math.cos(px * 0.05) * 15)
        d2.line([(px, py), (px + 4, py - 85)], fill=(12, 22, 14, 240), width=5)
        for angle in range(-70, 80, 25):
            rad = math.radians(angle)
            lx = px + 4 + math.sin(rad) * 55
            ly = py - 85 - math.cos(rad) * 40
            d2.line([(px + 4, py - 85), (lx, ly)], fill=(15, 28, 18, 220), width=3)

    # Historic Tilak Maidan Grandstand
    d2.polygon([(80, 480), (W - 80, 480), (W - 120, 710), (120, 710)], fill=(32, 34, 40, 255), outline=(50, 52, 60, 255))
    # Bleachers
    for b_row in range(9):
        by = 500 + b_row * 22
        bw = int((W - 200) - b_row * 15)
        bx = (W - bw) // 2
        d2.rectangle([bx, by, bx + bw, by + 16], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 220), outline=(20, 20, 24, 255))

    # Pitch
    d2.polygon([(100, 710), (W - 100, 710), (W, H), (0, H)], fill=(25, 82, 38, 255))
    d2.line([(100, 710), (W - 100, 710)], fill=(255, 255, 255, 200), width=3)
    d2.line([(W * 0.5, 710), (W * 0.5, H)], fill=(255, 255, 255, 200), width=3)

    # Info plaque
    d2.rectangle([60, H - 120, W - 60, H - 40], fill=(17, 17, 19, 235), outline=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 200), width=1)
    d2.text((90, H - 98), "TILAK MAIDAN STADIUM", fill=(255, 255, 255), font=f_title)
    d2.text((90, H - 68), "VASCO DA GAMA, GOA  •  CAPACITY: 5,000  •  HISTORIC SECONDARY HOME", fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]), font=f_sub)

    im2.save("public/images/stadiums/tilak_maidan.png", quality=95)
    print("Saved high-res tilak_maidan.png")

# ==============================================================================
# 3. CLUB HISTORY & TROPHY MILESTONES (1200 x 800 EDITORIAL BANNERS)
# ==============================================================================
def generate_club_history_images():
    milestones = [
        {
            "filename": "history-1988-founding.jpg",
            "year": "1988",
            "title": "THE FOUNDATION IN VARCA",
            "subtitle": "Established by Churchill Alemao to champion Goan football heritage",
            "accent": BRAND_GOLD,
            "badge_text": "ESTD 1988"
        },
        {
            "filename": "history-2008-champions.jpg",
            "year": "2008-09",
            "title": "FIRST I-LEAGUE CHAMPIONSHIP",
            "subtitle": "Crowned Champions of India under coach Zoran Đorđević",
            "accent": (230, 180, 50),
            "badge_text": "1ST STAR"
        },
        {
            "filename": "history-2012-second-star.jpg",
            "year": "2012-13",
            "title": "SECOND NATIONAL TITLE & DUAL STARS",
            "subtitle": "Dominant championship campaign earning the second gold star on the crest",
            "accent": BRAND_GOLD,
            "badge_text": "2ND STAR"
        },
        {
            "filename": "history-2014-federation-cup.jpg",
            "year": "2014",
            "title": "FEDERATION CUP & DURAND CUP GLORY",
            "subtitle": "Treble cup legacy cementing Churchill Brothers among India's elite",
            "accent": (PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2]),
            "badge_text": "CUP KINGS"
        }
    ]

    W, H = 1200, 800
    f_year = get_font(FONT_HEAVY, 96)
    f_title = get_font(FONT_BOLD, 36)
    f_sub = get_font(FONT_REGULAR, 18)
    f_badge = get_font(FONT_SEGOE, 16)

    for m in milestones:
        im = Image.new("RGB", (W, H), (18, 18, 22))
        d = ImageDraw.Draw(im, "RGBA")

        # Dark textured background with radial red/gold glow
        for r in range(450, 0, -25):
            alpha = int(35 * (1 - r / 450))
            d.ellipse([W * 0.5 - r, H * 0.45 - r, W * 0.5 + r, H * 0.45 + r], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], alpha))

        # Geometric accent lines
        d.line([(80, 120), (W - 80, 120)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 120), width=2)
        d.line([(80, H - 160), (W - 80, H - 160)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 120), width=2)

        # Huge watermark year in background
        d.text((W * 0.5, H * 0.42), m["year"], fill=(35, 35, 42, 220), anchor="mm", font=f_year)

        # Draw Silverware / Trophy Silhouette
        tx, ty = W * 0.5, H * 0.44
        # Trophy cup body
        d.polygon([
            (tx - 65, ty - 80), (tx + 65, ty - 80),
            (tx + 50, ty + 20), (tx - 50, ty + 20)
        ], fill=(m["accent"][0], m["accent"][1], m["accent"][2], 240), outline=(255, 255, 255, 220))
        # Trophy handles
        d.arc([tx - 105, ty - 75, tx - 45, ty - 10], 90, 270, fill=(m["accent"][0], m["accent"][1], m["accent"][2], 255), width=8)
        d.arc([tx + 45, ty - 75, tx + 105, ty - 10], 270, 90, fill=(m["accent"][0], m["accent"][1], m["accent"][2], 255), width=8)
        # Trophy stem & base
        d.rectangle([tx - 16, ty + 20, tx + 16, ty + 65], fill=(m["accent"][0], m["accent"][1], m["accent"][2], 255))
        d.rectangle([tx - 60, ty + 65, tx + 60, ty + 90], fill=(24, 24, 28, 255), outline=(m["accent"][0], m["accent"][1], m["accent"][2], 255), width=2)

        # Two Stars for I-League titles
        if "STAR" in m["badge_text"] or "2012" in m["year"] or "2008" in m["year"]:
            star_font = get_font(FONT_BOLD, 32)
            d.text((tx, ty - 110), "★  ★", fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255), anchor="mm", font=star_font)

        # Badge pill
        d.rectangle([W * 0.5 - 70, 70, W * 0.5 + 70, 105], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 255))
        d.text((W * 0.5, 87), m["badge_text"], fill=(255, 255, 255), anchor="mm", font=f_badge)

        # Title & Subtitle
        d.text((W * 0.5, H - 115), m["title"], fill=(255, 255, 255), anchor="mm", font=f_title)
        d.text((W * 0.5, H - 75), m["subtitle"], fill=(190, 190, 195), anchor="mm", font=f_sub)

        im.save(f"public/images/club/{m['filename']}", quality=95)
        print(f"Saved {m['filename']}")

# ==============================================================================
# 4. PLAYER PORTRAITS (26 PLAYERS - 800 x 1067 HIGH DEFINITION)
# ==============================================================================
def generate_player_cards():
    players = [
        ("1", "Sayad Bin Abdul Kadir", "GK", "IND"),
        ("3", "Joseph Okoro", "MF", "NGR"),
        ("5", "Dramane Salou", "MF", "BFA"),
        ("6", "Angousana Wahengbam", "MF", "IND"),
        ("7", "Stendly Fernandes", "MF", "IND"),
        ("8", "Kingslee Fernandes", "MF", "IND"),
        ("9", "Wayde Lekay", "FW", "RSA"),
        ("10", "Sebastián Gutiérrez", "MF", "COL"),
        ("12", "Provat Lakra", "DF", "IND"),
        ("15", "Alexandre Yeoule", "DF", "CIV"),
        ("17", "Lalremruata", "DF", "IND"),
        ("18", "Gaurav Kankonkar", "MF", "IND"),
        ("19", "John Okoli", "FW", "NGR"),
        ("20", "Maibam Deny Singh", "DF", "IND"),
        ("21", "Melroy Assisi", "DF", "IND"),
        ("23", "Trijoy Savio Dias", "FW", "IND"),
        ("24", "Parag Shrivas", "DF", "IND"),
        ("25", "Anuj Kumar", "GK", "IND"),
        ("26", "Phijam Sanathoi Meetei", "MF", "IND"),
        ("33", "Richard Costa", "MF", "IND"),
        ("44", "Gaurav Bora", "DF", "IND"),
        ("47", "Vincy Barretto", "FW", "IND"),
        ("49", "Lalbiakhlua", "DF", "IND"),
        ("57", "Anil Rama Gaonkar", "FW", "IND"),
        ("90", "Freddy Lallawmawma", "FW", "IND"),
        ("92", "Pasang Dorjee Tamang", "MF", "IND")
    ]

    W, H = 800, 1067
    f_num_bg = get_font(FONT_HEAVY, 360)
    f_num_chest = get_font(FONT_HEAVY, 78)
    f_name = get_font(FONT_BOLD, 36)
    f_meta = get_font(FONT_BOLD, 22)
    f_club = get_font(FONT_SEGOE, 16)
    f_badge = get_font(FONT_BOLD, 14)

    for num, name, pos, nat in players:
        im = Image.new("RGB", (W, H), (18, 18, 22))
        d = ImageDraw.Draw(im, "RGBA")

        # Subtle card carbon-texture diagonal stripes
        for i in range(0, W + H, 24):
            d.line([(i, 0), (i - H, H)], fill=(24, 24, 28, 120), width=6)

        # Radial stadium red lighting glow
        for r in range(400, 0, -25):
            alpha = int(40 * (1 - r / 400))
            d.ellipse([W * 0.5 - r, 380 - r, W * 0.5 + r, 380 + r], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], alpha))

        # Big squad number watermark in upper background
        d.text((W * 0.5, 340), num, fill=(28, 28, 34, 180), anchor="mm", font=f_num_bg)

        # Athletic Player Silhouette Bust
        # Head & neck
        d.ellipse([W * 0.5 - 80, 220, W * 0.5 + 80, 390], fill=(42, 42, 48, 255))
        d.rectangle([W * 0.5 - 35, 360, W * 0.5 + 35, 420], fill=(36, 36, 42, 255))

        # Jersey Torso (Official Churchill Red Home Kit)
        is_gk = (pos == "GK")
        kit_color = (20, 120, 70) if is_gk else (PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2])
        sec_color = (15, 80, 48) if is_gk else (DEEP_RED[0], DEEP_RED[1], DEEP_RED[2])

        # Shoulders & Body
        d.polygon([
            (W * 0.5 - 180, 730),
            (W * 0.5 - 160, 430),
            (W * 0.5 - 75, 400),
            (W * 0.5 + 75, 400),
            (W * 0.5 + 160, 430),
            (W * 0.5 + 180, 730)
        ], fill=kit_color)

        # V-Neck collar & gold trim
        d.polygon([
            (W * 0.5 - 55, 400),
            (W * 0.5 + 55, 400),
            (W * 0.5, 470)
        ], fill=(18, 18, 22, 255), outline=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255))

        # Dynamic sash / chevron accents across jersey
        d.line([(W * 0.5 - 150, 520), (W * 0.5 + 150, 600)], fill=sec_color, width=20)
        d.line([(W * 0.5 - 150, 550), (W * 0.5 + 150, 630)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255), width=6)
        d.line([(W * 0.5 - 150, 580), (W * 0.5 + 150, 660)], fill=sec_color, width=20)

        # Number on Chest
        d.text((W * 0.5, 620), num, fill=(255, 255, 255, 255), anchor="mm", font=f_num_chest)

        # Sponsor watermark on kit
        d.text((W * 0.5, 690), "THE RED MACHINES", fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 240), anchor="mm", font=f_badge)

        # Paste club crest thumbnail on top left if available
        if crest_img:
            c_thumb = crest_img.resize((70, 95), Image.Resampling.LANCZOS)
            im.paste(c_thumb, (40, 40), c_thumb)

        # Top Right Badges (Position & Nationality)
        d.rectangle([W - 160, 40, W - 40, 85], fill=(28, 28, 34, 240), outline=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 200), width=2)
        d.text((W - 100, 62), f"{pos}  •  {nat}", fill=(255, 255, 255), anchor="mm", font=f_meta)

        # Bottom Information Placard
        d.rectangle([40, 780, W - 40, H - 40], fill=(24, 24, 28, 245), outline=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 255), width=2)
        d.rectangle([40, 780, W - 40, 788], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255))

        # Player Full Name
        d.text((W * 0.5, 835), name.upper(), fill=(255, 255, 255), anchor="mm", font=f_name)

        # Number, Position, Country Details
        d.text((W * 0.5, 890), f"SQUAD #{num}   |   {pos}   |   {nat}", fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]), anchor="mm", font=f_meta)

        # Club brand tagline
        d.text((W * 0.5, 940), "CHURCHILL BROTHERS FC GOA  •  I-LEAGUE", fill=(160, 160, 168), anchor="mm", font=f_club)

        slug = name.lower().replace(" ", "-").replace("á", "a").replace("í", "i").replace("é", "e")
        im.save(f"public/images/players/{slug}.jpg", quality=95)

    print(f"Generated {len(players)} ultra-sharp player profile cards.")

# ==============================================================================
# 5. MERCHANDISE PRODUCTS (8 ITEMS - 1200 x 1200 HIGH DEFINITION)
# ==============================================================================
def generate_product_images():
    products = [
        {
            "slug": "home-jersey-2026-27",
            "title": "HOME JERSEY 2026/27",
            "sub": "OFFICIAL MATCH KIT  •  THE RED MACHINES",
            "bg": PRIMARY_RED,
            "sec": DEEP_RED,
            "gold": BRAND_GOLD,
            "num": "10",
            "type": "jersey"
        },
        {
            "slug": "away-jersey-2026-27",
            "title": "AWAY JERSEY 2026/27",
            "sub": "OFFICIAL MATCH KIT  •  IVORY & RED SASH",
            "bg": (245, 243, 239),
            "sec": PRIMARY_RED,
            "gold": BRAND_GOLD,
            "num": "7",
            "type": "jersey"
        },
        {
            "slug": "third-jersey-2026-27",
            "title": "THIRD JERSEY 2026/27",
            "sub": "OFFICIAL MATCH KIT  •  STEALTH CARBON & GOLD",
            "bg": (22, 22, 26),
            "sec": BRAND_GOLD,
            "gold": BRAND_GOLD,
            "num": "9",
            "type": "jersey"
        },
        {
            "slug": "anthem-jacket-red",
            "title": "ANTHEM PRESENTATION JACKET",
            "sub": "WATER RESISTANT ATHLETIC TECH FABRIC",
            "bg": DEEP_RED,
            "sec": PRIMARY_RED,
            "gold": BRAND_GOLD,
            "num": "CBFC",
            "type": "jacket"
        },
        {
            "slug": "supporter-scarf",
            "title": "RED MACHINES SUPPORTER SCARF",
            "sub": "DOUBLE-KNIT JACQUARD ACRYLIC WITH GOLD FRINGE",
            "bg": PRIMARY_RED,
            "sec": (20, 20, 24),
            "gold": BRAND_GOLD,
            "num": "GOA",
            "type": "scarf"
        },
        {
            "slug": "matchday-snapback-cap",
            "title": "MATCHDAY SNAPBACK CAP",
            "sub": "STRUCTURED 6-PANEL CAP WITH 3D EMBROIDERED CREST",
            "bg": (26, 26, 30),
            "sec": PRIMARY_RED,
            "gold": BRAND_GOLD,
            "num": "1988",
            "type": "cap"
        },
        {
            "slug": "training-tee-red",
            "title": "PRE-MATCH TRAINING TEE",
            "sub": "BREATHABLE DRY-FIT POLYESTER",
            "bg": (35, 15, 22),
            "sec": PRIMARY_RED,
            "gold": BRAND_GOLD,
            "num": "TECH",
            "type": "jersey"
        },
        {
            "slug": "heritage-leather-football",
            "title": "HERITAGE LEATHER FOOTBALL",
            "sub": "HAND-STITCHED 18-PANEL VINTAGE COLLECTOR BALL",
            "bg": (120, 45, 30),
            "sec": (80, 25, 18),
            "gold": BRAND_GOLD,
            "num": "SIZE 5",
            "type": "ball"
        }
    ]

    W, H = 1200, 1200
    f_title = get_font(FONT_BOLD, 42)
    f_sub = get_font(FONT_BOLD, 22)
    f_badge = get_font(FONT_SEGOE, 18)
    f_big = get_font(FONT_HEAVY, 120)

    for p in products:
        im = Image.new("RGB", (W, H), (18, 18, 22))
        d = ImageDraw.Draw(im, "RGBA")

        # Subtle card studio lighting radial gradient
        for r in range(550, 0, -30):
            alpha = int(35 * (1 - r / 550))
            d.ellipse([W * 0.5 - r, H * 0.44 - r, W * 0.5 + r, H * 0.44 + r], fill=(p["bg"][0], p["bg"][1], p["bg"][2], alpha))

        # Pedestal / Studio shadow
        d.ellipse([W * 0.5 - 280, 840, W * 0.5 + 280, 920], fill=(0, 0, 0, 160))

        # Draw Product Visual
        if p["type"] in ["jersey", "jacket"]:
            # Torso body
            d.polygon([
                (420, 260), (780, 260), # Neckline
                (1010, 390), (920, 520), # Right sleeve
                (820, 460),              # Right armpit
                (820, 840),              # Right waist
                (380, 840),              # Left waist
                (380, 460),              # Left armpit
                (280, 520), (190, 390)   # Left sleeve
            ], fill=p["bg"], outline=p["sec"])

            # Collar
            d.polygon([(510, 260), (690, 260), (600, 370)], fill=(20, 20, 24), outline=p["gold"])

            # Dynamic Red Machine Sash / Stripes
            d.line([(380, 550), (820, 680)], fill=p["sec"], width=28)
            d.line([(380, 590), (820, 720)], fill=p["gold"], width=8)
            d.line([(380, 630), (820, 760)], fill=p["sec"], width=28)

            # Center Number / Text
            d.text((600, 720), p["num"], fill=(255, 255, 255), anchor="mm", font=f_big)

            # Sleeve cuffs
            d.polygon([(190, 390), (280, 520), (260, 535), (170, 405)], fill=p["gold"])
            d.polygon([(1010, 390), (920, 520), (940, 535), (1030, 405)], fill=p["gold"])

        elif p["type"] == "scarf":
            # Flowing supporter scarf
            d.polygon([(260, 380), (940, 380), (920, 640), (240, 640)], fill=p["bg"], outline=p["sec"])
            # Scarf stripes
            for sx in range(280, 920, 110):
                d.rectangle([sx, 380, sx + 45, 640], fill=p["sec"])
            # Scarf fringes
            for fx in range(240, 940, 16):
                d.line([(fx, 640), (fx, 710)], fill=p["gold"], width=4)
            d.text((590, 510), "THE RED MACHINES", fill=(255, 255, 255), anchor="mm", font=get_font(FONT_HEAVY, 56))

        elif p["type"] == "cap":
            # Cap crown
            d.ellipse([380, 360, 820, 680], fill=p["bg"], outline=p["sec"], width=4)
            # Cap bill / visor
            d.polygon([(320, 640), (880, 640), (840, 730), (360, 730)], fill=(18, 18, 22), outline=p["gold"])
            d.text((600, 520), "CBFC", fill=p["gold"], anchor="mm", font=get_font(FONT_HEAVY, 72))

        elif p["type"] == "ball":
            # Vintage 18-panel leather football
            d.ellipse([390, 320, 810, 740], fill=p["bg"], outline=(40, 15, 10), width=5)
            # Stitched panel arcs
            d.arc([390, 320, 810, 740], 30, 150, fill=p["gold"], width=4)
            d.arc([390, 320, 810, 740], 210, 330, fill=p["gold"], width=4)
            d.line([(390, 530), (810, 530)], fill=p["gold"], width=4)
            d.text((600, 530), "ESTD 1988", fill=(255, 255, 255), anchor="mm", font=get_font(FONT_BOLD, 32))

        # Bottom Product Information Placard
        d.rectangle([80, 960, W - 80, H - 70], fill=(24, 24, 28, 250), outline=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 220), width=2)
        d.rectangle([80, 960, W - 80, 968], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2]))

        d.text((W * 0.5, 1020), p["title"], fill=(255, 255, 255), anchor="mm", font=f_title)
        d.text((W * 0.5, 1075), p["sub"], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]), anchor="mm", font=f_sub)

        im.save(f"public/images/products/{p['slug']}.jpg", quality=95)

    print(f"Generated {len(products)} ultra-sharp merchandise showcase images.")

# ==============================================================================
# 6. NEWS EDITORIAL BANNERS (1200 x 675 16:9 HIGH DEFINITION)
# ==============================================================================
def generate_news_images():
    news_items = [
        {
            "filename": "news-kit-launch.jpg",
            "tag": "MERCHANDISE & KITS",
            "headline": "CHURCHILL BROTHERS UNVEIL NEW SEASON HOME KIT",
            "sub": "Official 2026/27 Nivia kit collection celebrates 38 years of Goan heritage"
        },
        {
            "filename": "news-goan-derby.jpg",
            "tag": "MATCH PREVIEW",
            "headline": "THE GOAN DERBY: RED MACHINES READY FOR DEMPO SC",
            "sub": "Historic rivalry reignites under the lights at Fatorda Stadium"
        },
        {
            "filename": "news-squad-announcement.jpg",
            "tag": "SQUAD UPDATE",
            "headline": "HEAD COACH CONFIRMS 26-MAN I-LEAGUE ROSTER",
            "sub": "Balanced blend of Goan homegrown talent and proven international stars"
        },
        {
            "filename": "news-ticketing-open.jpg",
            "tag": "MATCHDAY TICKETING",
            "headline": "TICKET SALES OPEN FOR FATORDA HOME FIXTURES",
            "sub": "Digital booking with instant QR boarding passes for all upcoming fixtures"
        }
    ]

    W, H = 1200, 675
    f_tag = get_font(FONT_SEGOE, 16)
    f_head = get_font(FONT_BOLD, 38)
    f_sub = get_font(FONT_REGULAR, 18)

    for item in news_items:
        im = Image.new("RGB", (W, H), (18, 18, 22))
        d = ImageDraw.Draw(im, "RGBA")

        # Atmospheric red/dark stadium lighting
        for r in range(400, 0, -25):
            alpha = int(40 * (1 - r / 400))
            d.ellipse([W * 0.7 - r, H * 0.4 - r, W * 0.7 + r, H * 0.4 + r], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], alpha))

        # Diagonal dynamic speed stripes
        d.polygon([(W * 0.6, 0), (W * 0.8, 0), (W * 0.5, H), (W * 0.3, H)], fill=(25, 25, 30, 200))
        d.polygon([(W * 0.75, 0), (W * 0.85, 0), (W * 0.65, H), (W * 0.55, H)], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 90))

        # News Tag Pill
        d.rectangle([80, 80, 320, 120], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 255))
        d.text((200, 100), item["tag"], fill=(255, 255, 255), anchor="mm", font=f_tag)

        # Bottom Headline Container with Gradient Dark Overlay
        d.rectangle([0, H - 240, W, H], fill=(12, 12, 14, 235))
        d.line([(0, H - 240), (W, H - 240)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 255), width=3)

        d.text((80, H - 160), item["headline"], fill=(255, 255, 255), font=f_head)
        d.text((80, H - 90), item["sub"], fill=(190, 190, 195), font=f_sub)

        im.save(f"public/images/news/{item['filename']}", quality=95)

    print(f"Generated {len(news_items)} high-res news editorial banners.")

# ==============================================================================
# 7. MEDIA GALLERY (6 ITEMS - 1600 x 1000 HIGH DEFINITION)
# ==============================================================================
def generate_media_gallery():
    gallery_items = [
        {"filename": "gallery-derby-celebration.jpg", "title": "GOAN DERBY VICTORY CELEBRATION", "sub": "Post-match elation at Fatorda Stadium"},
        {"filename": "gallery-fatorda-floodlights.jpg", "title": "FATORDA UNDER THE FLOODLIGHTS", "sub": "The cathedral of Goan football at night"},
        {"filename": "gallery-red-machine-army.jpg", "title": "RED MACHINE SUPPORTER TIFO", "sub": "North Stand roar echoing across Margao"},
        {"filename": "gallery-champions-silverware.jpg", "title": "DUAL I-LEAGUE SILVERWARE", "sub": "Two historic national championship trophies"},
        {"filename": "gallery-training-session.jpg", "title": "TACTICAL SQUAD DRILLS", "sub": "Intense pre-match preparation in Betalbatim"},
        {"filename": "gallery-kit-heritage-crest.jpg", "title": "EMBROIDERED CLUB CREST", "sub": "Two gold championship stars on official red fabric"}
    ]

    W, H = 1600, 1000
    f_title = get_font(FONT_BOLD, 44)
    f_sub = get_font(FONT_REGULAR, 22)

    for g in gallery_items:
        im = Image.new("RGB", (W, H), (16, 16, 20))
        d = ImageDraw.Draw(im, "RGBA")

        # Atmospheric stadium lighting
        for r in range(500, 0, -30):
            alpha = int(45 * (1 - r / 500))
            d.ellipse([W * 0.5 - r, H * 0.45 - r, W * 0.5 + r, H * 0.45 + r], fill=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], alpha))

        # Geometric artistic lines
        d.line([(100, 120), (W - 100, 120)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 140), width=3)
        d.line([(100, H - 180), (W - 100, H - 180)], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2], 140), width=3)

        # Central Crest Badge if available
        if crest_img:
            c_center = crest_img.resize((240, 330), Image.Resampling.LANCZOS)
            im.paste(c_center, ((W - 240) // 2, (H - 330) // 2 - 30), c_center)

        # Bottom Caption Bar
        d.rectangle([100, H - 160, W - 100, H - 50], fill=(22, 22, 26, 240), outline=(PRIMARY_RED[0], PRIMARY_RED[1], PRIMARY_RED[2], 255), width=2)
        d.text((W * 0.5, H - 120), g["title"], fill=(255, 255, 255), anchor="mm", font=f_title)
        d.text((W * 0.5, H - 75), g["sub"], fill=(BRAND_GOLD[0], BRAND_GOLD[1], BRAND_GOLD[2]), anchor="mm", font=f_sub)

        im.save(f"public/images/media/{g['filename']}", quality=95)

    print(f"Generated {len(gallery_items)} high-res media gallery photos.")

# Run all generators
if __name__ == "__main__":
    generate_hero_image()
    generate_stadium_images()
    generate_club_history_images()
    generate_player_cards()
    generate_product_images()
    generate_news_images()
    generate_media_gallery()
    print("ALL HIGH-RESOLUTION ASSETS GENERATED SUCCESSFULLY!")
