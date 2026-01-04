import os
import re
import json

# Paths
BASE_DIR = "/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info"
WORKS_HTML_PATH = os.path.join(BASE_DIR, "main/works/works.html")
WORKS_DIR = os.path.join(BASE_DIR, "main/works")
OUTPUT_TS_PATH = os.path.join(BASE_DIR, "next-app/lib/projectData.ts")

def clean_html(text):
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_projects():
    # 1. First, get list of slugs and thumbnails from works.html to maintain order and thumbnails
    with open(WORKS_HTML_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    projects = []
    
    # Parse works.html for initial list
    # <a href="./slug/index.html" class="project-item">
    # Capture slug and thumbnail
    # We will get metadata from detail page primarily, but use works.html as fallback or ordering source.
    
    lines = content.split('\n')
    current_slug = None
    
    project_order = [] # List of slugs
    project_thumbnails = {} # slug -> thumbnail_filename
    
    in_item = False
    
    for line in lines:
        line = line.strip()
        match_href = re.search(r'<a href="\./([^/]+)/index\.html" class="project-item">', line)
        if match_href:
            in_item = True
            current_slug = match_href.group(1)
            project_order.append(current_slug)
            
        if in_item:
             # Img or Video thumbnail
             # <img src="./slug/01.jpg" ...>
             # <video src="./slug/01.mp4" ...>
             m_img = re.search(r'<img src="\./([^"]+)"', line)
             if m_img:
                 filename = os.path.basename(m_img.group(1))
                 if current_slug not in project_thumbnails:
                     project_thumbnails[current_slug] = filename
                     
             m_vid = re.search(r'<video src="\./([^"]+)"', line)
             if m_vid:
                 filename = os.path.basename(m_vid.group(1))
                 if current_slug not in project_thumbnails:
                     project_thumbnails[current_slug] = filename
                     
             if "</a>" in line:
                 in_item = False
                 current_slug = None

    # 2. Now traverse each project and extract rich data from its index.html
    final_projects = []
    
    for slug in project_order:
        p_path = os.path.join(WORKS_DIR, slug, "index.html")
        
        # Defaults
        p_data = {
            "slug": slug,
            "title": "",
            "scope": "",
            "category": "",
            "completion": "",
            "thumbnail": project_thumbnails.get(slug, ""),
            "description": "",
            "images": []
        }
        
        # Scan images first
        p_dir = os.path.join(WORKS_DIR, slug)
        if os.path.exists(p_dir):
            files = os.listdir(p_dir)
            media = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.mp4', '.webm'))]
            media.sort()
            p_data["images"] = media
            if not p_data["thumbnail"] and media:
                 p_data["thumbnail"] = media[0]
        
        if os.path.exists(p_path):
            with open(p_path, 'r', encoding='utf-8', errors='ignore') as f:
                d_content = f.read()
                
                # Extract Description
                # Strategy: Find "To find out more about the project details"
                # Then grab the text in the following tag (p or div)
                
                # Check for <div class="moreInfo">...</div>
                # But inside it, look for the localized text container (often moreInfoSlug)
                # Regex to find the container *after* the "To find out more..." text
                
                # "To find out more ... hover here ↗"
                # Followed by <div ...> OR <p ...> with content.
                marker = "To find out more about the project details"
                idx = d_content.find(marker)
                description = ""
                
                if idx != -1:
                    sub = d_content[idx:]
                    # Find first opening tag after the marker text
                    # e.g. ...↗ <div class="moreInfoSWYFT">
                    
                    # Regex for class starting with moreInfo (case insensitive?)
                    # <(div|p) class="moreInfo[^"]*">
                    match_desc = re.search(r'<(div|p)\s+class="moreInfo[^"]*"\s*>(.*?)</\1>', sub, re.DOTALL)
                    if match_desc:
                        raw_desc = match_desc.group(2)
                        description = clean_html(raw_desc)
                
                p_data["description"] = description
                
                # Extract Metadata from <div class="projectInfo">
                # Content: Title <br> Scope. Category, Date <br>
                # e.g. LWY x Sunoa ≪20≫ <br> Album jacket design. Commercial, Dec. 2024 <br>
                
                info_match = re.search(r'<div class="projectInfo">(.*?)</div>', d_content, re.DOTALL)
                if info_match:
                    info_text = info_match.group(1)
                    # Split by <br> or newline
                    parts = re.split(r'<br\s*/?>', info_text)
                    parts = [clean_html(x) for x in parts if clean_html(x)]
                    
                    if len(parts) >= 1:
                        p_data["title"] = parts[0]
                    
                    if len(parts) >= 2:
                        # "Album jacket design. Commercial, Dec. 2024"
                        # Try to parse.
                        meta_line = parts[1]
                        
                        # Parsing logic:
                        # Scope ends with '.'?
                        # Category ends with ','?
                        # Date at end?
                        
                        # Split by '.'
                        # "Album jacket design" . " Commercial, Dec" . " 2024" ??
                        # Warning: dots in text.
                        
                        # Simple heuristics for now matching legacy format
                        # Scope is part 1.
                        # Then Category, Date.
                        
                        # If comma exists: "Category, Date"
                        if ',' in meta_line:
                            last_comma = meta_line.rfind(',')
                            p_data["completion"] = meta_line[last_comma+1:].strip()
                            remainder = meta_line[:last_comma]
                            
                            # "Album jacket design. Commercial"
                            # If dot exists
                            if '.' in remainder:
                                last_dot = remainder.rfind('.')
                                p_data["category"] = remainder[last_dot+1:].strip()
                                p_data["scope"] = remainder[:last_dot].strip()
                            else:
                                # Assume all remainder is Scope or Category?
                                # Usually "Scope. Category"
                                p_data["scope"] = remainder.strip()
                        else:
                            p_data["scope"] = meta_line
                            
        final_projects.append(p_data)
        
    # Generate TS
    ts_content = "export interface Project {\n  slug: string;\n  title: string;\n  scope: string;\n  category: string;\n  completion: string;\n  thumbnail: string;\n  description: string;\n  images: string[];\n}\n\n"
    ts_content += "export const projects: Project[] = [\n"
    
    for p in final_projects:
        ts_content += "  {\n"
        ts_content += f'    slug: "{p["slug"]}",\n'
        ts_content += f'    title: "{p["title"]}",\n'
        ts_content += f'    scope: "{p["scope"]}",\n'
        ts_content += f'    category: "{p["category"]}",\n'
        ts_content += f'    completion: "{p["completion"]}",\n'
        ts_content += f'    thumbnail: "{p["thumbnail"]}",\n'
        safe_desc = p["description"].replace('"', '\\"').replace('\n', ' ')
        ts_content += f'    description: "{safe_desc}",\n'
        ts_content += f'    images: {json.dumps(p["images"])}\n'
        ts_content += "  },\n"
    
    ts_content += "];\n"
    
    with open(OUTPUT_TS_PATH, "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Extraction V3 complete. {len(final_projects)} projects.")

if __name__ == "__main__":
    extract_projects()
