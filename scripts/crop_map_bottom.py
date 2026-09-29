from PIL import Image

path = "public/images/contacts-map-desktop.jpg"
im = Image.open(path).convert("RGB")
w, h = im.size
cropped = im.crop((0, 0, w, h - 20))
cropped.save(path, quality=92, optimize=True)
print(f"cropped {w}x{h} -> {w}x{h - 20}")
