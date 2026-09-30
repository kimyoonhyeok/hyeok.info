import re

with open('app/(sub)/graduation-show/components/Chapter2Diagrams.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will find Ask, Stay, Eat diagrams and remove <GhostBlock text="주" /> and <GhostBlock text="시" />
# But first, I need to make sure I don't remove them from Give!
# Let's split the content. Give ends before Ask1Diagram.

parts = content.split('export const Ask1Diagram')
if len(parts) == 2:
    give_part = parts[0]
    rest_part = 'export const Ask1Diagram' + parts[1]
    
    # Remove GhostBlocks from rest_part
    rest_part = re.sub(r'<GhostBlock text="주" />\n?', '', rest_part)
    rest_part = re.sub(r'<GhostBlock text="시" />\n?', '', rest_part)
    rest_part = re.sub(r'<GhostBlock text="주" />\r\n?', '', rest_part)
    rest_part = re.sub(r'<GhostBlock text="시" />\r\n?', '', rest_part)
    
    # In order to right-align blocks, we should add justifyContent: 'flex-end' to the blocks containers in Ask3, Stay3, Eat3, Ask4, Stay4, Eat4.
    # In Ask3, Stay3, Eat3:
    # <div style={{ display: 'flex' }}> -> <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}> ?
    # Wait, in xxx3Diagram, the blocks container is:
    # <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', width: '10.5rem' }}>
    # If we want right-align, we change alignItems to 'flex-end'!
    
    rest_part = rest_part.replace("alignItems: 'flex-start', width: '10.5rem'", "alignItems: 'flex-end', width: '10.5rem'")
    rest_part = rest_part.replace("alignItems: 'flex-start', width: '14rem'", "alignItems: 'flex-end', width: '14rem'")
    
    # In xxx4Diagram:
    # The container is <div style={{ display: 'flex' }}> next to the text.
    # We should add marginLeft: 'auto' so it pushes to the right! Or just let them be left aligned?
    # Wait, the user's Eat4 screenshot shows them left-aligned right after the text!
    # Because <div style={{ display: 'flex' }}> doesn't have marginLeft: auto.
    # If we add flexWrap: 'wrap' (which I did with sed), it might be fine.
    
    with open('app/(sub)/graduation-show/components/Chapter2Diagrams.tsx', 'w', encoding='utf-8') as f:
        f.write(give_part + rest_part)
