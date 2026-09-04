📘 Posts Fusion Studio – AI Content Generator
🚀 Live Demo: https://posts-fusion-studio.onrender.com

A fully functional AI content streaming application built with Node.js and Express.
It generates mock social media posts with real-time token streaming – no API key required!

✨ Features
Feature	Description
⚡ Live Streaming	Watch content appear word‑by‑word using Server‑Sent Events
🎭 Mock Content	Works immediately without any external API key
🔀 Two Modes	Streaming (EventSource) + Full Post (JSON fetch)
🧩 Single File	Everything is contained in final-app.js
🎨 Clean UI	Styled with Tailwind CSS (loaded from CDN)
📱 Responsive	Works on desktop, tablet, and mobile
🎯 Live Demo
Try it now: https://posts-fusion-studio.onrender.com

⚠️ Note: The free instance spins down after 15 minutes of inactivity. The first visit may take 30–60 seconds to wake up.

🛠️ Tech Stack
Backend: Node.js + Express

Frontend: Vanilla JavaScript + HTML + Tailwind CSS

Streaming: Server-Sent Events (SSE) / EventSource API

Deployment: Render (free tier)

📦 Installation & Setup
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
You should see:

text
✅ Server running on http://localhost:3000
🎭 MOCK MODE – No API key needed!
4. Open Your Browser
Go to: http://localhost:3000

🧪 How to Use
Enter a Topic – e.g., "AI in Healthcare"

Enter a Niche – e.g., "SaaS Founders"

Choose a Tone – e.g., "authoritative & actionable"

Click one of the buttons:

🟦 "Generate Post (Streaming)" – watch content appear token by token

🟩 "Get Full Post (No Streaming)" – instantly displays the complete post

The generated content will appear in the box below.

📁 Project Structure
text
AI-Engineering-Internship-Project/
├── final-app.js          # Main server file (routing, HTML, endpoints)
├── package.json          # Dependencies and start script
├── .gitignore            # Ignore node_modules, .env, etc.
├── Output1.png           # Screenshot 1
├── Output2.png           # Screenshot 2
└── README.md             # This file
🔧 Extending with a Real AI API
The app currently uses a mock generator. To connect to a real LLM:

Option 1: OpenAI
bash
npm install openai
Then modify the /api/stream endpoint:

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
⚠️ Important
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

Click Create Web Service.

You'll get a URL like https://your-app.onrender.com.

📸 Screenshots
(Add your screenshots here)

Streaming Mode	Full Post Mode
https://Output1.png	https://Output2.png
👩‍💻 Author
Sawaira Mumtaz
AI Engineering Intern at Posts Fusion / Pro Fusion AI

 [sawairamumtaz369@gmail.com]

🔗 GitHub  https://github.com/Sawaira-Mumtaz786

🔗 LinkedIn  https://www.linkedin.com/in/sawaira-mumtaz-3b77972b1/

📄 License
This project is licensed under the MIT License – feel free to use, modify, and distribute it.

🙏 Acknowledgments
Posts Fusion / Pro Fusion AI – for the internship opportunity

OpenAI & OpenRouter – for their amazing APIs

Render – for free hosting

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!

Happy building! 🚀

