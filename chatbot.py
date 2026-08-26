import os
import shutil
from flask import Flask, request, jsonify, render_template_string
import google.generativeai as genai
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

app = Flask(__name__)

# Configure Gemini
api_key = os.environ.get("GOOGLE_API_KEY", "")
if api_key:
    genai.configure(api_key=api_key)

retriever = None
active_model = None

def initialize_rag():
    global retriever, active_model
    pdf_path = "MGT501_Handouts.pdf"
    
    # 1. Embeddings & Document Loading
    print("Loading HuggingFace embeddings...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    
    if os.path.exists(pdf_path):
        print(f"Loading {pdf_path}...")
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()
        splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=300)
        chunks = splitter.split_documents(docs)
        
        vector_db = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory="./vector_db",
            collection_name="mgt501"
        )
        retriever = vector_db.as_retriever(search_kwargs={"k": 10})
        print(f"Vector DB initialized with {len(chunks)} chunks.")
    else:
        print("Warning: MGT501_Handouts.pdf not found in root directory.")

    # 2. Select Active Gemini Model
    if api_key:
        try:
            for m in genai.list_models():
                if "generateContent" in m.supported_generation_methods:
                    active_model = genai.GenerativeModel(m.name)
                    print(f"Active Gemini model set to: {m.name}")
                    break
        except Exception as e:
            print(f"Model selection warning: {e}")
            active_model = genai.GenerativeModel("models/gemini-1.5-flash")

# HTML Template with Cyber HUD UI
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MGT501 RAG Chatbot - Virtual University</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #050608; color: #e0e0e0; font-family: monospace; }
    </style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-8">
    <div class="max-w-4xl w-full mx-auto flex-1 flex flex-col gap-4">
        <!-- Header -->
        <header class="bg-[#0d1117] border border-[#1f2937] p-5 rounded-2xl flex items-center justify-between shadow-2xl">
            <div class="flex items-center gap-3">
                <div class="w-3.5 h-3.5 rounded-full bg-[#00ff9d] shadow-[0_0_12px_#00ff9d] animate-pulse"></div>
                <div>
                    <h1 class="text-lg font-bold text-white uppercase">MGT501 <span class="text-[#00ff9d]">RAG.Bot</span></h1>
                    <p class="text-xs text-[#8b949e]">Virtual University of Pakistan · Human Resource Management</p>
                </div>
            </div>
            <span class="px-2.5 py-1 rounded bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 text-xs font-bold">ONLINE</span>
        </header>

        <!-- Chat Log Window -->
        <div id="chatbox" class="flex-1 bg-[#0d1117] border border-[#1f2937] rounded-2xl p-5 overflow-y-auto space-y-4 min-h-[450px] shadow-2xl">
            <div class="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-xs sm:text-sm text-[#c9d1d9]">
                👋 <strong class="text-[#00ff9d]">Welcome!</strong> I am your MGT501 AI Tutor. Ask me any question from Lessons 1 to 45 (e.g. <em>"What is job analysis?"</em> or <em>"Explain line and staff authority"</em>).
            </div>
        </div>

        <!-- Input Box -->
        <form id="chat-form" class="flex gap-2">
            <input type="text" id="user-input" placeholder="Type your HRM course question here..." required
                class="flex-1 bg-[#0d1117] border border-[#1f2937] text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00ff9d]">
            <button type="submit" id="send-btn"
                class="bg-[#00ff9d] hover:bg-[#00e68d] text-black font-bold px-6 py-3 rounded-xl text-sm transition">
                Send
            </button>
        </form>
    </div>

    <script>
        const form = document.getElementById('chat-form');
        const input = document.getElementById('user-input');
        const chatbox = document.getElementById('chatbox');
        const sendBtn = document.getElementById('send-btn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const query = input.value.trim();
            if (!query) return;

            // Append User Question
            chatbox.innerHTML += `
                <div class="flex justify-end">
                    <div class="bg-[#00ff9d] text-black font-bold p-3.5 rounded-xl rounded-br-none text-xs sm:text-sm max-w-[80%]">
                        ${query}
                    </div>
                </div>
            `;
            input.value = '';
            chatbox.scrollTop = chatbox.scrollHeight;

            // Loading Indicator
            const loadId = 'load-' + Date.now();
            chatbox.innerHTML += `
                <div id="${loadId}" class="flex justify-start">
                    <div class="bg-[#161b22] text-[#00ff9d] p-3.5 rounded-xl text-xs animate-pulse">
                        Searching MGT501 Handouts & generating answer...
                    </div>
                </div>
            `;
            chatbox.scrollTop = chatbox.scrollHeight;

            try {
                const res = await fetch('/api/ask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: query })
                });
                const data = await res.json();
                document.getElementById(loadId).remove();

                chatbox.innerHTML += `
                    <div class="flex justify-start">
                        <div class="bg-[#161b22] border border-[#30363d] text-[#e0e0e0] p-4 rounded-xl rounded-bl-none text-xs sm:text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed">
                            ${data.answer}
                        </div>
                    </div>
                `;
            } catch (err) {
                document.getElementById(loadId).remove();
                chatbox.innerHTML += `
                    <div class="bg-red-950/40 border border-red-500/40 text-red-400 p-3 rounded-xl text-xs">
                        Error retrieving answer. Please check your API connection.
                    </div>
                `;
            }
            chatbox.scrollTop = chatbox.scrollHeight;
        });
    </script>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.get_json() or {}
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"error": "Empty question"}), 400

    if not retriever or not active_model:
        return jsonify({"answer": "I don't have access to the initialized handouts or model on this server instance."})

    try:
        # Retrieve chunks
        docs = retriever.invoke(question) if hasattr(retriever, 'invoke') else retriever.get_relevant_documents(question)
        formatted = []
        for i, doc in enumerate(docs, 1):
            page = doc.metadata.get("page", "?")
            formatted.append(f"[Lesson Extract {i} - Page {page}]\n{doc.page_content}")
        context_str = "\n\n---\n\n".join(formatted)

        prompt = f"""You are an expert HR assistant trained on MGT501 course materials from Virtual University of Pakistan.
Answer questions based ONLY on the provided course material. If you don't find the answer, say "I don't have information about this topic in the MGT501 course materials."

DOCUMENT CONTEXT:
{context_str}

QUESTION:
{question}

ANSWER:"""

        response = active_model.generate_content(prompt)
        return jsonify({"answer": response.text.strip()})
    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    initialize_rag()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)