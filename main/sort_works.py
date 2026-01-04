import re
from datetime import datetime
import sys

# Define Month Map
month_map = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
}

def parse_date(date_str):
    # Expected: "Completion : Dec. 2024"
    match = re.search(r'Completion\s*:\s*([A-Za-z]+)\.?\s*(\d{4})', date_str)
    if match:
        month_str = match.group(1).title()[:3] # Ensure Title case and 3 chars
        year_str = match.group(2)
        month = month_map.get(month_str, 1)
        try:
            return datetime(int(year_str), month, 1)
        except ValueError:
            pass
    return datetime.min

def update_category_html(item_html):
    # Find the Category line div
    # It might already have spans if we ran sed, or text if not.
    # Pattern to find the Category div content
    # Look for <div>Category : ... </div>
    # Using specific markers to be safe
    
    cat_match = re.search(r'(<div>Category\s*:\s*)(.*?)(</div>)', item_html, re.IGNORECASE | re.DOTALL)
    if not cat_match:
        return item_html # Should not happen if structure is valid
    
    prefix = cat_match.group(1)
    content = cat_match.group(2)
    suffix = cat_match.group(3)
    
    # Determine which is active
    is_commercial_active = False
    is_non_commercial_active = False

    # Check for existing classes if script ran partially or verify logic
    if 'active">Commercial' in content:
        is_commercial_active = True
    elif 'active">Non-Commercial' in content:
        is_non_commercial_active = True
    else:
        # Check based on text content if no classes yet
        # If "Non-Commercial" is in text but it's the only one, or...
        # Wait, the user said "Commercial" opacity 100%, "Non-Commercial" 25%.
        # So every project has BOTH words now? 
        # The user said: "Commercial / Non-Commercial" 
        # And "Commercial" is active if it's a commercial project.
        # How do we know if it matches? 
        # Previous state: <div>Category : Commercial</div> OR <div>Category : Non-Commercial</div>
        # My sed command replaced "Category : Commercial" with spans.
        # So regex detection of 'active">Commercial' is reliable if sed ran.
        # If sed DID NOT run (it failed?), we might see plain text.
        # Let's handle plain text too.
        raw_text = content.strip()
        if raw_text == "Commercial":
            is_commercial_active = True
        elif raw_text == "Non-Commercial":
            is_non_commercial_active = True
        elif "Commercial" in raw_text and "Non-Commercial" not in raw_text:
            is_commercial_active = True # Contains Commercial but not Non-Commercial
    
    # Construct new content
    # Logic: If commercial active => Commercial(active) / Non-Commercial(inactive)
    # Logic: If non-commercial active => Commercial(inactive) / Non-Commercial(active)
    
    new_content = ""
    if is_commercial_active:
         new_content = '<span class="category-text active">Commercial</span> / <span class="category-text inactive">Non-Commercial</span>'
    elif is_non_commercial_active:
         new_content = '<span class="category-text inactive">Commercial</span> / <span class="category-text active">Non-Commercial</span>'
    else:
         # Default or Fallback: Assume Commercial if ambiguous? Or keep original?
         # If existing content already looks correct (has slash), leave it?
         if "/" in content:
             return item_html
         # If we can't determine, maybe default to Commercial active?
         # Let's verify if we have data.
         # Actually, the user asked to ADD Non-Commercial.
         # If original was "Category : Commercial", it implies Commercial active.
         # So my logic above `raw_text == "Commercial"` covers it.
         new_content = '<span class="category-text active">Commercial</span> / <span class="category-text inactive">Non-Commercial</span>'

    return item_html.replace(cat_match.group(0), f"{prefix}{new_content}{suffix}")

def main():
    file_path = '/Users/yoonhyeokkim/Desktop/2025/Web/hyeok/hyeok.info/main/works/works.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract Project Grid
    # <div class="project-grid"> ... </div>
    # We need to find the closing div of project-grid correctly.
    # Since we can't count braces with regex easily, let's look for known footer marker or next section.
    # The grid is followed by <footer>.
    
    grid_start_marker = '<div class="project-grid">'
    grid_end_marker = '<footer>' # This might be risky if there are nested divs suitable
    # Let's find the content explicitly between known lines if possible.
    # Or just split the file.
    
    parts = content.split(grid_start_marker)
    if len(parts) < 2:
        print("Could not find project-grid start")
        return
    
    pre_grid = parts[0] + grid_start_marker
    rest = parts[1]
    
    # Find where grid ends. It ends before the first <footer> or just before </div> that closes it.
    # Looking at the file, grid is followed by <footer>.
    # But there might be a closing </div> for the grid before footer.
    # Structure: <div class="project-grid"> ... </div> <footer>
    
    # Let's search for the closing div that precedes footer.
    # A bit hard with regex/split.
    # Let's assume indentation: "    </div>\n\n    <footer>"
    # Or just look for the last </div> before footer?
    
    rest_split = rest.split('<footer>')
    if len(rest_split) < 2:
        print("Could not find footer")
        return

    grid_content = rest_split[0] 
    post_grid = '<footer>' + '<footer>'.join(rest_split[1:])
    
    # The grid_content includes the closing </div> at the end presumably.
    # Let's strip the last </div>
    grid_content_stripped = grid_content.strip()
    if grid_content_stripped.endswith('</div>'):
        grid_inner = grid_content_stripped[:-6] # Remove </div>
        grid_closing_tag = "\n    </div>\n\n    " # Reconstruct spacing later
    else:
        # Maybe exact match
        match = re.search(r'(.*)(</div>\s*)$', grid_content, re.DOTALL)
        if match:
             grid_inner = match.group(1)
             grid_closing_tag = match.group(2) + "\n    "
        else:
             print("Could not find closing div of grid")
             return

    # Now parse items from grid_inner
    # Each item matches: <a href=... class="project-item"> ... </a>
    # Use re.findall with dotall? No, better to split by tag start if consistent.
    # <a href=... is the start.
    
    # Regex to capture each project item
    item_pattern = re.compile(r'(<a\s+href="[^"]*"\s+class="project-item">.*?</a>)', re.DOTALL)
    items = item_pattern.findall(grid_inner)
    
    print(f"Found {len(items)} items")

    parsed_items = []
    
    for item_html in items:
        # Update category first
        updated_html = update_category_html(item_html)
        
        # Parse Date for Sorting
        date_match = re.search(r'Completion\s*:\s*([A-Za-z]+\.?\s*\d{4})', updated_html)
        date_obj = datetime.min
        if date_match:
            date_obj = parse_date("Completion : " + date_match.group(1))
        
        parsed_items.append({
            'html': updated_html,
            'date': date_obj
        })

    # Sort
    parsed_items.sort(key=lambda x: x['date'], reverse=True)
    
    # Reassemble
    new_grid_inner = "\n\n"
    for item in parsed_items:
        new_grid_inner += "      " + item['html'].strip() + "\n\n"

    final_content = pre_grid + new_grid_inner + "    </div>\n\n    " + post_grid
    
    # Normalize footer connection if spacing is off
    # The split might have eaten some newlines.
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print("Successfully sorted and updated categories")

if __name__ == "__main__":
    main()
