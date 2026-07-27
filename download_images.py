import urllib.request
import os

target_dir = os.path.join(os.path.dirname(__file__), 'public', 'images', 'bengaluru')
os.makedirs(target_dir, exist_ok=True)

images = {
    "nandi-hills.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/19/Sunrise_at_Nandi_Hills.jpg",
    "wonderla.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Wonderla_Amusement_Park_Kochi.jpg",
    "visvesvaraya.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Visvesvaraya_Industrial_and_Technological_Museum%2C_Bangalore_%282025%29_02.jpg"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')]
urllib.request.install_opener(opener)

for filename, url in images.items():
    try:
        urllib.request.urlretrieve(url, os.path.join(target_dir, filename))
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
