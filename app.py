from openai_client import generate_html

with open("prompts/prompt.txt", "r", encoding="utf-8") as f:
    prompt = f.read()

html = generate_html(prompt)

with open("output/generated.html", "w", encoding="utf-8") as f:
    f.write(html)

print("HTML Generated Successfully")