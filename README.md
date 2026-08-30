# 🚀 AI-Powered Content Generation Studio

**AI Engineering Internship Project — Posts Fusion / Pro Fusion AI**
**Author:** Sawaira Mumtaz · **Duration:** July – August 2026 (7 Weeks)

A progressive build-up from Python API scripting to a full-stack, real-time streaming content generation app — covering prompt engineering, multiple LLM provider integrations, and a production-style React + Node.js architecture.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Deliverables](#key-deliverables)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Weekly Learning Journey](#weekly-learning-journey)
- [Prompt Engineering Approach](#prompt-engineering-approach)
- [API Comparison](#api-comparison)
- [Setup & Installation](#setup--installation)
- [Challenges & Solutions](#challenges--solutions)
- [Skills Acquired](#skills-acquired)
- [Future Improvements](#future-improvements)

---

## Overview

This project focused on building AI-powered content generation tools using multiple LLM APIs (Ollama, Groq, OpenRouter) combined with full-stack development (React + Node.js). It progressed from basic Python scripting to a complex streaming application with real-time, token-by-token generation.

## Key Deliverables

- ✅ LinkedIn Post Generator (Python + Ollama/Groq)
- ✅ Streaming Content Studio (React + Node.js + OpenRouter)
- ✅ 7 weeks of progressive learning and implementation, fully documented

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express + TypeScript |
| AI Providers | Ollama, Groq, OpenRouter (OpenAI-compatible) |
| Streaming | Server-Sent Events (SSE) |
| Frontend | React + Vite + Tailwind CSS |
| Language (scripting) | Python |

## Project Structure

```
AI_LLM_postfusion_internship/
├── Week1/
│   ├── Tuesday_task.py
│   ├── Wednesday_task.py
│   └── Thursday_task.py
├── Week2/
│   ├── Few-shot prompting.py
│   ├── generate_6_posts.py
│   └── constraint_test.py
├── Week3/
│   └── linkedin_generator.py
├── Week4/
│   ├── generate.py
│   └── README4.md
├── Week5/
│   ├── server.ts
│   ├── package.json
│   └── README5.md
├── Week6/
│   ├── server-simple.js
│   ├── test.html
│   └── README6.md
└── Week7/
    ├── server.ts
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── README7.md
```

## Weekly Learning Journey

| Week | Focus | Key Outcome |
|---|---|---|
| 1 | Environment setup & Python fundamentals | API calls, JSON handling, virtual environments |
| 2 | Prompt engineering & content generation | Zero-shot vs. few-shot, tone control, constraint validation |
| 3 | LinkedIn Post Generator with self-check | AI self-critique as a quality gate (1–10 scoring) |
| 4 | Groq API integration | Fast inference (100–300ms), real-time output validation |
| 5 | OpenRouter + full-stack streaming app | SSE token streaming, React + Node.js architecture |
| 6 | React UI + streaming improvements | Same-origin serving to avoid CORS, live token display |
| 7 | Final deployment & documentation | Production-ready structure, full project documentation |

## Prompt Engineering Approach

**Evolution over the internship:**

| Before (Week 1) | After (Week 7) |
|---|---|
| Writing one prompt | Writing, testing, and iterating on prompts |
| One-time instruction | Continuous refinement process |
| Generic outputs | Brand-specific, personalized outputs |
| No validation | Output validation and re-prompting |

**Best practices applied:**
- Use few-shot examples rather than instructions alone
- Repeat key constraints (e.g. word count) multiple times in the prompt
- Always validate output (word count, hashtags, structure)
- Iterate at least 2–3 times before accepting output
- Specify tone explicitly (e.g. "bold, direct, opinionated" vs. just "professional")

## API Comparison

| API | Speed | Cost | Best For |
|---|---|---|---|
| Ollama | Medium | Free (local) | Local testing, offline use |
| Groq | Very fast (100–300ms) | Free tier | Production, speed-critical apps |
| OpenRouter | Fast (varies) | Free tier | Access to 50+ models, auto-fallback |
| Gemini | Medium | Free tier | Multimodal tasks, long context |

> **Lesson learned:** Free models on OpenRouter change frequently — using the `openrouter/free` alias auto-selects a currently-working free model, avoiding constant manual updates.

## Setup & Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd AI_LLM_postfusion_internship/Week7

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenRouter API key to .env — never hardcode it in source files

# Run the development server
npm run dev
```

Server runs at `http://localhost:3000`.

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| Ollama model errors | Switched to Groq API |
| Groq model became paid | Switched to OpenRouter with `openrouter/free` |
| `.env` variables not loading | Debugged and corrected environment loading |
| CORS blocking frontend requests | Served frontend from the same Express server |
| Memory issues (esbuild) | Increased Node memory via `NODE_OPTIONS` |
| Model 404 errors | Used `openrouter/free` to auto-select a working model |
| React UI not connecting | Served `index.html` directly from Express |

## Skills Acquired

| Skill | Level |
|---|---|
| Python Programming | Intermediate |
| API Integration | Intermediate |
| Prompt Engineering | Proficient |
| LinkedIn Content Generation | Proficient |
| Tone-Specific Prompting | Proficient |
| React + TypeScript | Intermediate |
| Node.js + Express | Intermediate |
| GitHub | Proficient |
| Docker | Basic |

## Future Improvements

- Migrate to the `google.genai` package for Gemini support
- Add user authentication and saved posts
- Implement a model comparison feature
- Deploy to the cloud (Vercel/Railway)
- Add analytics and usage tracking

---

**Prepared by:** Sawaira Mumtaz
**Company:** Posts Fusion / Pro Fusion AI

> ⚠️ **Security note:** This project uses LLM API keys (OpenRouter/Groq). Always load keys from a `.env` file (excluded via `.gitignore`) — never commit or hardcode API keys in source files.
