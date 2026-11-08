import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/images/opponents", exist_ok=True)
os.makedirs("public/images/sponsors", exist_ok=True)
os.makedirs("public/images/players", exist_ok=True)
os.makedirs("public/images/products", exist_ok=True)

# 1. Opponent Crest SVGs
opponents = [
    {
        "slug": "dempo-sc",
        "name": "Dempo SC",
        "colors": ["#1A365D", "#FFFFFF", "#3182CE"],
        "text": "DEMPO",
        "sub": "GOA"
    },
    {
        "slug": "sporting-clube-de-goa",
        "name": "Sporting Clube de Goa",
        "colors": ["#C53030", "#ED8936", "#FFFFFF"],
        "text": "SPORTING",
        "sub": "GOA"
    },
    {
        "slug": "salgaocar-fc",
        "name": "Salgaocar FC",
        "colors": ["#22543D", "#FFFFFF", "#38A169"],
        "text": "SALGAOCAR",
        "sub": "GOA"
    },
    {
        "slug": "gokulam-kerala",
        "name": "Gokulam Kerala FC",
        "colors": ["#742A2A", "#D69E2E", "#FFFFFF"],
        "text": "GOKULAM",
        "sub": "KERALA"
    },
    {
        "slug": "mohammedan-sc",
        "name": "Mohammedan SC",
        "colors": ["#111111", "#FFFFFF", "#4A5568"],
        "text": "MSC",
        "sub": "KOLKATA"
    },
    {
        "slug": "real-kashmir",
        "name": "Real Kashmir FC",
        "colors": ["#2B6CB0", "#E2E8F0", "#CBD5E0"],
        "text": "KASHMIR",
        "sub": "SNOW LEOPARDS"
    },
    {
        "slug": "sreenidi-deccan",
        "name": "Sreenidi Deccan FC",
        "colors": ["#2C5282", "#DD6B20", "#FFFFFF"],
        "text": "SREENIDI",
        "sub": "DECCAN"
    },
    {
        "slug": "inter-kashi",
        "name": "Inter Kashi",
        "colors": ["#822727", "#ED8936", "#F6E05E"],
        "text": "INTER",
        "sub": "KASHI"
    }
]

for opp in opponents:
    c1, c2, c3 = opp["colors"]
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_{opp['slug']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c1}" />
      <stop offset="100%" stop-color="{c3}" />
    </linearGradient>
  </defs>
  <circle cx="80" cy="80" r="74" fill="url(#grad_{opp['slug']})" stroke="{c2}" stroke-width="4"/>
  <circle cx="80" cy="80" r="62" fill="none" stroke="{c2}" stroke-width="1.5" stroke-dasharray="3,3"/>
  <path d="M 40,55 L 120,55 C 120,110 80,128 80,128 C 80,128 40,110 40,55 Z" fill="{c1}" stroke="{c2}" stroke-width="2.5" />
  <text x="80" y="85" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="{c2}" letter-spacing="1" text-anchor="middle">
    {opp['text']}
  </text>
  <text x="80" y="105" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="{c2}" letter-spacing="2" text-anchor="middle">
    {opp['sub']}
  </text>
</svg>'''
    with open(f"public/images/opponents/{opp['slug']}.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)

print(f"Generated {len(opponents)} opponent crests.")

# 2. Sponsor Logos (SVGs)
sponsors = [
    {"slug": "nivia", "name": "NIVIA", "sub": "OFFICIAL KIT SUPPLIER", "color": "#E53E3E"},
    {"slug": "churchill-group", "name": "CHURCHILL GROUP", "sub": "PRINCIPAL PARTNER", "color": "#D4A72C"},
    {"slug": "goa-tourism", "name": "GOA TOURISM", "sub": "DESTINATION PARTNER", "color": "#319795"},
    {"slug": "kingfisher", "name": "KINGFISHER", "sub": "OFFICIAL PARTNER", "color": "#DD6B20"},
    {"slug": "red-bull", "name": "RED BULL", "sub": "ENERGY PARTNER", "color": "#3182CE"},
    {"slug": "star-sports", "name": "STAR SPORTS", "sub": "OFFICIAL BROADCASTER", "color": "#D69E2E"},
]

for sp in sponsors:
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="100%" height="100%">
  <rect x="2" y="2" width="236" height="76" rx="8" fill="#18181B" stroke="#27272A" stroke-width="1.5"/>
  <circle cx="36" cy="40" r="16" fill="{sp['color']}" opacity="0.9"/>
  <text x="36" y="46" font-family="'Arial Black', sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle">★</text>
  <text x="66" y="38" font-family="'Arial Black', sans-serif" font-weight="900" font-size="16" fill="#F4F4F5" letter-spacing="1">
    {sp['name']}
  </text>
  <text x="66" y="55" font-family="Arial, sans-serif" font-weight="bold" font-size="9" fill="{sp['color']}" letter-spacing="1.5">
    {sp['sub']}
  </text>
</svg>'''
    with open(f"public/images/sponsors/{sp['slug']}.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)

print(f"Generated {len(sponsors)} sponsor badges.")
