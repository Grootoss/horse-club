from PIL import Image

path = "public/images/contacts-map-desktop.jpg"
im = Image.open(path).convert("RGB")
w, h = im.size
pixels = im.load()

def row_dist(y):
    total = 0
    step = 8
    count = 0
    for x in range(0, w, step):
        r, g, b = pixels[x, y]
        total += (255 - r) + (255 - g) + (255 - b)
        count += 3
    return total / count

mid = row_dist(h // 2)
print("mid dist", round(mid, 2), "h", h)

# find where fade starts: rows significantly whiter than mid
threshold = mid * 0.45
print("threshold", round(threshold, 2))
fade_start = h - 1
for y in range(h // 2, h):
    d = row_dist(y)
    if d < threshold:
        fade_start = y
        print("fade starts around y=", y, "dist=", round(d, 2))
        break

# also check alpha if any png nearby
for name in [
    "public/images/contacts-map-desktop.jpg",
    "public/images/contacts-desktop-overlay.png",
]:
    try:
        img = Image.open(name)
        print(name, img.mode, img.size)
        if img.mode in ("RGBA", "LA"):
            a = img.getchannel("A")
            aw, ah = a.size
            ap = a.load()
            for y in [0, ah // 2, ah - 1, max(0, ah - 50), max(0, ah - 100)]:
                vals = [ap[x, y] for x in range(0, aw, 40)]
                print("  alpha y", y, "min", min(vals), "max", max(vals), "avg", sum(vals) / len(vals))
    except Exception as e:
        print(name, e)

# Crop estimate: remove bottom fade
crop_h = fade_start
print("suggested crop height", crop_h)
