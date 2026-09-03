# 🎓 MGT501 RAG AI Chatbot (Virtual University of Pakistan)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-00ff9d?style=for-the-badge&logo=render&logoColor=black)](https://rag-chatbot-lw6m.onrender.com)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Framework-Flask-black?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Gemini](https://img.shields.io/badge/LLM-Google_Gemini-orange?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Status](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge)](https://rag-chatbot-lw6m.onrender.com)

> An intelligent, retrieval-augmented question-answering AI assistant trained strictly on the official **MGT501 (Human Resource Management)** course handouts from the Virtual University of Pakistan (Lessons 1 to 45).
---
## 🌐 Live Application
🔗 **Public URL:** [https://rag-chatbot-lw6m.onrender.com](https://rag-chatbot-lw6m.onrender.com)
---
## 📌 Project Overview

Traditional LLMs often hallucinate or provide generic answers. This project implements a **Retrieval-Augmented Generation (RAG)** pipeline that grounds responses in official course material:

- **Course**: MGT501 – Human Resource Management
- **Institution**: Virtual University of Pakistan
- **Coverage**: Complete Handouts (Lessons 1 to 45)
- **Strict Grounding**: Responds based only on provided lecture notes and explicitly refuses out-of-domain queries to prevent academic misinformation.
---
## 🏗️ System Architecture & Workflow

[ User Query ] ──► [ Google Embeddings API ] (text-embedding-004)
│
▼
[ Cosine Similarity Search ] ◄── [ Pre-Indexed Handout Chunks ]
│
▼
[ Top-K Extracted Lecture Context ]
│
▼
[ Strict Academic Grounding Prompt ]
│
▼
[ Google Gemini Generative Model ]
│
▼
[ Grounded Course Response ]
code

**🚀 Local Setup & Installation
**
1. Clone the Repository
**code**
**Bash**
**git clone https://github.com/Sawaira-Mumtaz786/Rag-chatbot.git
**
**cd Rag-chatbot
**
**2. Create and Activate Virtual Environment
**
code
Bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
****3. Install Dependencies
**
**
code
Bash
**pip install -r requirements.txt
**
**4. Set Google Gemini API Key
**
code
Bash
# On Windows (Command Prompt):
set GOOGLE_API_KEY=your_gemini_api_key_here

# On Windows (PowerShell):
$env:GOOGLE_API_KEY="your_gemini_api_key_here"

# On macOS/Linux:
export GOOGLE_API_KEY="your_gemini_api_key_here"
**5. Run the Server
**
code
Bash
python chatbot.py
Open your browser at http://localhost:5000 to interact with the chatbot locally.
**🧪 Evaluation & Test Cases
**The system was evaluated against 21 comprehensive benchmark questions across the syllabus:
Test ID	Course Topic	Sample Question	Result
L1	Intro to HRM	What is Human Resource Management and its main purpose?	✅ Passed
L10	HR Authority	Explain line and staff aspects of HRM.	✅ Passed
L14	Job Analysis	What is job analysis and its purpose?	✅ Passed
L18	Selection	What is the selection process in HR?	✅ Passed
L31	Motivation	What motivates employees in an organization?	✅ Passed
REFUSE	Out of Domain	What is the capital of France?	🛡️ Correctly Refused
**🛠️ Technology Stack
**Backend: Python 3.10, Flask
Document Processing: pypdf
Embeddings: Google text-embedding-004
Large Language Model: Google Gemini (gemini-flash family)
Frontend: HTML5, Tailwind CSS, JavaScript (Fetch API)
Hosting & Deployment: Render (Cloud Web Service)

**👩‍💻 Author
****Developer: Sawaira Mumtaz
**GitHub: @Sawaira-Mumtaz786
**Course: MGT501 (Human Resource Management)
****📄 License
**This project is developed for educational and academic research purposes. Its a task in my post fusion internship to make a rag chat bot i have a document n my university so i use it you can use any document to create a rag."


