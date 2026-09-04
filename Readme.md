📘 Posts Fusion Studio – AI Content Generator
LIVE DEMO
RENDER
NODE.JS
EXPRESS
SSE
MOCK MODE

An intelligent, real-time AI content streaming application built with Node.js and Express.
Generates mock social media posts with word-by-word streaming – no API key required!

🌐 Live Application
Public URL: https://posts-fusion-studio.onrender.com
⚠️ Note: Free instance spins down with inactivity. First visit may take 30–60 seconds to wake up.

📌 Project Overview
Traditional content generation tools make you wait for the full response. This app implements real-time token streaming using Server-Sent Events (SSE):

Instant Feedback: See content appear word-by-word

Two Modes: Streaming (EventSource) + Full Post (JSON fetch)

Mock Content: Works immediately – no API key required

Clean UI: Modern, responsive design with Tailwind CSS

🏗️ System Architecture & Workflow
text
[User Input] → [Frontend UI] → [POST /api/generate or GET /api/stream]
                    ↓
              [Express Server]
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
   [Mock Generator]     [Real API (Optional)]
        ↓                       ↓
   [Token Streaming]    [Token Streaming]
        ↓                       ↓
        └───────────┬───────────┘
                    ↓
        [SSE Event Stream]
                    ↓
        [Frontend EventSource]
                    ↓
        [Live Token Display]
🛠️ Tech Stack
Layer	Technology
Backend	Node.js + Express
Frontend	Vanilla JavaScript + HTML + Tailwind CSS
Streaming	Server-Sent Events (SSE) / EventSource API
Deployment	Render (free tier)
Version Control	GitHub
✨ Features
Feature	Description
⚡ Live Streaming	Watch content appear word‑by‑word in real time
🎭 Mock Content	Works immediately – no API key required
🔀 Two Generation Modes	Streaming (EventSource) + Full Post (JSON fetch)
🧩 Single File	Everything is contained in final-app.js
🎨 Modern UI	Clean, responsive design with Tailwind CSS
📱 Mobile Friendly	Works on all devices
🚀 Instant Deployment	Ready to deploy on Render, Railway, or Vercel
📦 Local Setup & Installation
1. Clone the Repository
bash
git clone https://github.com/Sawaira-Mumtaz786/AI-Engineering-Internship-Project.git
cd AI-Engineering-Internship-Project
2. Install Dependencies
bash
npm install express
3. Start the Server
bash
node final-app.js
4. Open Your Browser
Navigate to: http://localhost:3000

🧪 How to Use
Enter a Topic – e.g., "AI in Healthcare"

Enter a Niche – e.g., "SaaS Founders"

Choose a Tone – e.g., "authoritative & actionable"

Click one of the buttons:

🟦 "Generate Post (Streaming)" – watch content appear token by token

🟩 "Get Full Post (No Streaming)" – instantly displays the complete post

📸 Screenshots
Streaming Mode	Full Post Mode
https://Output1.png	https://Output2.png
🔧 Extending with a Real AI API
The app currently uses a mock generator. To connect to a real LLM:

Option 1: OpenAI
bash
npm install openai
javascript
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const stream = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: prompt }],
  stream: true,
});
Option 2: OpenRouter (Free)
javascript
const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
const stream = await openrouter.chat.completions.create({
  model: 'openrouter/free',
  messages: [{ role: 'user', content: prompt }],
  stream: true,
});
⚠️ Important Security Note
Never hardcode API keys – use environment variables (.env file)

Add .env to .gitignore to prevent accidental commits

Use process.env.YOUR_KEY in your code

🛑 Troubleshooting
Issue	Solution
Blank page	Make sure you are visiting http://localhost:3000 (not a file path). Press Ctrl+Shift+R to hard refresh.
Streaming button does nothing	Try the "Get Full Post (No Streaming)" button – it works every time.
Error: Cannot find module 'express'	Run npm install express first.
Port 3000 already in use	Change the PORT variable in final-app.js (e.g., to 3001), then restart.
Nothing appears in content box	Open browser console (F12) and check for red errors. Ensure the server is running.
Render deployment fails	Make sure package.json has "type": "module" and express in dependencies.
🚀 Deployment
The app is deployed on Render (free tier):

Deploy Your Own Copy
Push your code to GitHub.

Go to render.com → New Web Service.

Connect your GitHub repository.

Fill:

Build Command: npm install

Start Command: npm start

Root Directory: . (or blank)

Click Create Web Service.

You'll get a URL like https://your-app.onrender.com.

📁 Project Structure
text
AI-Engineering-Internship-Project/
├── final-app.js          # Main server file (routing, HTML, endpoints)
├── package.json          # Dependencies and start script
├── .gitignore            # Ignore node_modules, .env, etc.
├── Output1.png           # Screenshot 1
├── Output2.png           # Screenshot 2
└── README.md             # This file

👩‍💻 Author
Sawaira Mumtaz
AI Engineering Intern at Posts Fusion / Pro Fusion AI

📧 [sawairamumtaz369@gamil.com]

🔗 GitHub  https://github.com/Sawaira-Mumtaz786

🔗 LinkedIn https://www.linkedin.com/in/sawaira-mumtaz-3b77972b1/

🙏 Acknowledgments
Posts Fusion / Pro Fusion AI – for the internship opportunity

OpenAI & OpenRouter – for their amazing APIs

Render – for free hosting

📄 License
This project is licensed under the MIT License – feel free to use, modify, and distribute it.

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!

Happy building! 🚀
