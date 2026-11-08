from PIL import Image

im = Image.open('public/images/club/crest.png').convert('RGBA')
# Flood fill transparency from the 4 corners:
# Corners are pure white background
width, height = im.size
pixels = im.load()

# Create a mask of pixels connected to the border that are near-white (r>235, g>235, b>235)
visited = set()
queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]

for x in range(width):
    queue.append((x, 0))
    queue.append((x, height-1))
for y in range(height):
    queue.append((0, y))
    queue.append((width-1, y))

while queue:
    x, y = queue.pop()
    if (x, y) in visited:
        continue
    visited.add((x, y))
    if 0 <= x < width and 0 <= y < height:
        r, g, b, a = pixels[x, y]
        # if background pixel (close to white/grey background)
        if r > 220 and g > 220 and b > 220:
            pixels[x, y] = (r, g, b, 0) # transparent
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    queue.append((nx, ny))

im.save('public/images/club/crest_transparent.png')
print('Transparent crest saved:', im.size)
