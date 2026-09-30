import fitz # PyMuPDF
doc = fitz.open("/Users/yoonhyeokkim/Documents/Obsidian Vault/LLM Wiki/Study/MA/Works/The Shapes of Language/김윤혁_졸업전시_0923.pdf")
text = ""
for i in range(84, min(95, len(doc))):
    text += f"--- Page {i+1} ---\n"
    text += doc[i].get_text()
print(text)
