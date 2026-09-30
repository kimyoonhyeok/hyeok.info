import sys
try:
    import fitz # PyMuPDF
    doc = fitz.open("/Users/yoonhyeokkim/Documents/Obsidian Vault/LLM Wiki/Study/MA/Works/The Shapes of Language/김윤혁_졸업전시_0923.pdf")
    text = ""
    # PyMuPDF uses 0-based indexing. PDF pages 78-95 correspond to index 77-94.
    for i in range(77, min(95, len(doc))):
        text += f"--- Page {i+1} ---\n"
        text += doc[i].get_text()
    print(text)
except ImportError:
    try:
        import PyPDF2
        with open("/Users/yoonhyeokkim/Documents/Obsidian Vault/LLM Wiki/Study/MA/Works/The Shapes of Language/김윤혁_졸업전시_0923.pdf", "rb") as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for i in range(77, min(95, len(reader.pages))):
                text += f"--- Page {i+1} ---\n"
                text += reader.pages[i].extract_text()
            print(text)
    except ImportError:
        print("No PDF library installed.")
