from weasyprint import HTML

def main():
    print("Generating your 8-page presentation draft...")
    
    # WeasyPrint directly converts our HTML file and hooks style.css internally
    HTML('output/generated.html').write_pdf('output/carousel_draft1.pdf')
    
    print("Done! Check 'carousel_draft.pdf' to review the visual flow.")

if __name__ == "__main__":
    main()  