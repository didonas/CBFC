from PIL import Image, ImageDraw, ImageFont
import os

# Create product images
products = [
    {
        "slug": "home-jersey-2026-27",
        "title": "CHURCHILL BROTHERS HOME JERSEY 2026/27",
        "type": "jersey",
        "bg": (200, 16, 46),       # Primary Red
        "secondary": (143, 11, 35), # Deep Red
        "gold": (212, 167, 44),
        "number": "10",
        "pattern": "THE RED MACHINES"
    },
    {
        "slug": "away-jersey-2026-27",
        "title": "CHURCHILL BROTHERS AWAY JERSEY 2026/27",
        "type": "jersey",
        "bg": (245, 243, 239),     # Off white
        "secondary": (200, 16, 46), # Red accents
        "gold": (212, 167, 44),
        "number": "7",
        "pattern": "IVORY & RED"
    },
    {
        "slug": "third-jersey-2026-27",
        "title": "CHURCHILL BROTHERS THIRD JERSEY 2026/27",
        "type": "jersey",
        "bg": (20, 20, 22),        # Dark charcoal
        "secondary": (212, 167, 44),# Gold accents
        "gold": (212, 167, 44),
        "number": "9",
        "pattern": "BLACK & GOLD"
    },
    {
        "slug": "anthem-jacket-red",
        "title": "CBFC ANTHEM PRESENTATION JACKET",
        "type": "jacket",
        "bg": (143, 11, 35),
        "secondary": (200, 16, 46),
        "gold": (212, 167, 44),
        "number": "CBFC",
        "pattern": "WATER RESISTANT TECH"
    },
    {
        "slug": "supporter-scarf",
        "title": "THE RED MACHINES SUPPORTER SCARF",
        "type": "scarf",
        "bg": (200, 16, 46),
        "secondary": (17, 17, 17),
        "gold": (212, 167, 44),
        "number": "GOA",
        "pattern": "WOVEN ACRYLIC"
    },
    {
        "slug": "matchday-snapback-cap",
        "title": "CHURCHILL BROTHERS SNAPBACK CAP",
        "type": "cap",
        "bg": (27, 27, 29),
        "secondary": (200, 16, 46),
        "gold": (212, 167, 44),
        "number": "1988",
        "pattern": "EMBROIDERED 3D CREST"
    },
    {
        "slug": "training-tee-red",
        "title": "CBFC PERFORMANCE TRAINING TEE",
        "type": "tee",
        "bg": (27, 27, 29),
        "secondary": (200, 16, 46),
        "gold": (212, 167, 44),
        "number": "PRO",
        "pattern": "BREATHABLE DRY-FIT"
    },
    {
        "slug": "heritage-leather-football",
        "title": "CBFC HERITAGE COMMEMORATIVE BALL",
        "type": "ball",
        "bg": (180, 130, 70),
        "secondary": (200, 16, 46),
        "gold": (212, 167, 44),
        "number": "1988",
        "pattern": "VINTAGE LEATHER STITCH"
    }
]

for p in products:
    im = Image.new("RGB", (800, 800), (18, 18, 20))
    d = ImageDraw.Draw(im)
    
    # Outer luxury card border
    d.rectangle([20, 20, 780, 780], outline=(40, 40, 44), width=2)
    d.rectangle([30, 30, 770, 770], outline=(30, 30, 34), width=1)
    
    # Top brand bar
    d.rectangle([30, 30, 770, 75], fill=(25, 25, 28))
    d.rectangle([30, 73, 770, 76], fill=(200, 16, 46))
    
    # Draw athletic apparel representation
    bg = p["bg"]
    sec = p["secondary"]
    gold = p["gold"]
    
    # Central garment silhouette
    # Body
    d.polygon([
        (280, 180), (520, 180), # Neck/shoulders
        (660, 270), (600, 350), # Right sleeve
        (540, 310),             # Right armpit
        (540, 640),             # Right torso
        (260, 640),             # Bottom hem
        (260, 310),             # Left armpit
        (200, 350), (140, 270)  # Left sleeve
    ], fill=bg, outline=sec)
    
    # Collar V-neck
    d.polygon([(340, 180), (460, 180), (400, 250)], fill=(18, 18, 20), outline=gold)
    
    # Dynamic chevron / sash stripes (Red Machines identity)
    d.line([(260, 380), (540, 460)], fill=sec, width=16)
    d.line([(260, 410), (540, 490)], fill=gold, width=4)
    d.line([(260, 440), (540, 520)], fill=sec, width=16)
    
    # Center text / Number
    # Watermark text
    d.text((400, 480), p["number"], fill=(255, 255, 255), anchor="mm")
    d.text((400, 550), "THE RED MACHINES", fill=gold, anchor="mm")
    
    # Sleeve cuffs
    d.polygon([(140, 270), (200, 350), (185, 360), (125, 280)], fill=gold)
    d.polygon([(660, 270), (600, 350), (615, 360), (675, 280)], fill=gold)
    
    # Bottom information plaque
    d.rectangle([60, 670, 740, 750], fill=(24, 24, 27), outline=(45, 45, 50))
    d.text((400, 695), p["title"], fill=(255, 255, 255), anchor="mm")
    d.text((400, 725), f"OFFICIAL CLUB MERCHANDISE  •  {p['pattern']}", fill=gold, anchor="mm")
    
    # Save
    path = f"public/images/products/{p['slug']}.jpg"
    im.save(path, quality=92)

print(f"Generated {len(products)} product showcase images.")

# Generate player silhouette portraits with authentic shirt numbers
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

for num, name, pos, nat in players:
    im = Image.new("RGB", (600, 800), (17, 17, 19))
    d = ImageDraw.Draw(im)
    
    # Background stadium atmosphere lighting
    for y in range(400):
        alpha = int(35 * (1 - y/400))
        d.line([(0, y), (600, y)], fill=(200, 16, 46))
        
    # Dark card base
    d.rectangle([20, 20, 580, 780], outline=(35, 35, 38), width=2)
    
    # Large shirt number watermark in background
    d.text((300, 280), num, fill=(35, 35, 40), anchor="mm")
    
    # Athletic silhouette head & shoulders
    # Head
    d.ellipse([240, 210, 360, 350], fill=(45, 45, 50))
    # Shoulders and torso
    d.polygon([(110, 600), (220, 370), (380, 370), (490, 600)], fill=(200, 16, 46))
    d.polygon([(260, 370), (340, 370), (300, 430)], fill=(17, 17, 19)) # Collar
    d.line([(180, 480), (420, 480)], fill=(212, 167, 44), width=8) # Gold kit stripe
    
    # Number on chest
    d.text((300, 520), num, fill=(255, 255, 255), anchor="mm")
    
    # Bottom player info placard
    d.rectangle([30, 640, 570, 770], fill=(24, 24, 27), outline=(200, 16, 46), width=1)
    d.rectangle([30, 640, 570, 644], fill=(212, 167, 44))
    
    # Name, Position, Nation
    d.text((300, 675), name.upper(), fill=(255, 255, 255), anchor="mm")
    d.text((300, 715), f"#{num}  |  {pos}  |  {nat}", fill=(212, 167, 44), anchor="mm")
    d.text((300, 745), "CHURCHILL BROTHERS FC GOA", fill=(150, 150, 155), anchor="mm")
    
    slug = name.lower().replace(" ", "-").replace("á", "a").replace("í", "i").replace("é", "e")
    im.save(f"public/images/players/{slug}.jpg", quality=90)

print(f"Generated {len(players)} player profile cards.")
