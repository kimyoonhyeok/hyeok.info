
import os
import json
import re

works_dir = "/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info/main/works"
project_images = {}

# Regex to find src inside swiper-slide
# It matches patterns like: <div class="swiper-slide"> <img src="01.jpg"> </div>
# Or simple <img src="..."> if they are listed sequentially.
# Based on observed file:
# <div class="swiper-slide center">
#   <img src="01.jpg" ...>
# </div>
# OR <video ... src="10.mp4">

# We look for src="filename" inside the file content.
# Since we are inside `main/works/[slug]/index.html`, the srcs are usually relative like "01.jpg" or "./01.jpg"

if os.path.exists(works_dir):
    for project_name in os.listdir(works_dir):
        project_path = os.path.join(works_dir, project_name)
        index_html = os.path.join(project_path, "index.html")
        
        if os.path.isdir(project_path) and os.path.exists(index_html):
            try:
                with open(index_html, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                images = []
                
                # Regex to find items in the swiper-wrapper
                # We assume the order in HTML is the order of slides
                
                # Find all img src="..." or video src="..."
                # Pattern: src=["']([^"']+\.(jpg|jpeg|png|gif|mp4|webm))["']
                
                # We need to be careful not to capture scripts or other things.
                # But typically in these pages, media is in the main slider.
                
                # Regex to find img src, video src, or source src
                matches = re.finditer(r'(?:<img|<video|<source)[^>]+src=["\']([^"\']+\.(?:jpg|jpeg|png|gif|mp4|webm))["\']', content, re.IGNORECASE)
                
                for match in matches:
                    src = match.group(1)
                    filename = os.path.basename(src)
                    # Filter out favicon or common metadata if any
                    if "favicon" in filename or "og_image" in filename:
                        continue
                    
                    images.append(filename)
                
                if images:
                    project_images[project_name] = images
            except Exception as e:
                print(f"Error parsing {project_name}: {e}")

print(json.dumps(project_images, indent=2))
