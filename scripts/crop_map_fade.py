from PIL import Image

path = "public/images/contacts-map-desktop.jpg"
im = Image.open(path).convert("RGB")
w, h = im.size
pixels = im.load()


def row_dist(y):
    total = 0
    count = 0
    for x in range(0, w, 8):
        r, g, b = pixels[x, y]
        total += (255 - r) + (255 - g) + (255 - b)
        count += 3
    return total / count


mid = row_dist(h // 2)
threshold = mid * 0.45
fade_start = h
for y in range(h // 2, h):
    if row_dist(y) < threshold:
        fade_start = y
        break

# keep a couple px of content edge
crop_h = max(1, fade_start)
cropped = im.crop((0, 0, w, crop_h))
cropped.save(path, quality=92, optimize=True)
print(f"cropped {w}x{h} -> {w}x{crop_h}")
