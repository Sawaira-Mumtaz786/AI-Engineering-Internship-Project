import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/content/generate', async (req, res) => {
  const { topic = 'AI Productivity', niche = 'SaaS Founders', tone = 'authoritative & actionable' } = req.body;
  console.log('📥 Received:', { topic, niche, tone });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendSSE = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  sendSSE('start', { topic, niche, tone });

  // Mock content – fully customizable
  const mockPost = `
🚀 ${topic} is transforming ${niche} – here's how to leverage it.

The opportunity is massive. By 2027, the market will reach $200B.

Here's what you need to know:
• Speed: AI slashes development time by 60%
• Personalization: Tailor solutions at scale
• Cost: Reduce operational expenses by 40%

Action steps for ${niche}:
1. Start with a small pilot project.
2. Use AI to automate repetitive tasks.
3. Measure ROI and scale.

What's your biggest challenge with ${topic}? Drop a comment below.

#${topic.replace(/\s/g,'')} #${niche.replace(/\s/g,'')} #AI #Innovation
  `.trim();

  // Stream token by token
  const tokens = mockPost.split(' ');
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i] + (i < tokens.length - 1 ? ' ' : '');
    sendSSE('token', { token });
    await new Promise(r => setTimeout(r, 20)); // simulate delay
  }

  sendSSE('done', { source: 'mock' });
  res.end();
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log('🎭 Running in MOCK mode – no API key needed');
  });
}

startServer();