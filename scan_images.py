
import os
import json
import re

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split('([0-9]+)', s)]

works_dir = "/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info/main/works"
project_images = {}

if os.path.exists(works_dir):
    for project_name in os.listdir(works_dir):
        project_path = os.path.join(works_dir, project_name)
        if os.path.isdir(project_path):
            images = []
            for f in os.listdir(project_path):
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.mp4', '.webm')):
                    images.append(f)
            
            images.sort(key=natural_sort_key)
            if images:
                project_images[project_name] = images

print(json.dumps(project_images, indent=2))
