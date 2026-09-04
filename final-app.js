import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // if you want static files

// Serve the HTML page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Posts Fusion Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div class="min-h-screen bg-gray-50 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Posts Fusion Studio</h1>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Topic</label>
          <input id="topic" type="text" value="AI in Healthcare" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Niche</label>
          <input id="niche" type="text" value="SaaS Founders" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Tone</label>
          <input id="tone" type="text" value="authoritative & actionable" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
        </div>
      </div>
      <button id="generateBtn" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate Post (Streaming)
      </button>
      <button id="simpleBtn" class="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Get Full Post (No Streaming)
      </button>
    </div>

    <div id="error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"></div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Generated Content</h2>
      <div id="content" class="whitespace-pre-wrap font-sans text-gray-700">
        <p class="text-gray-400">Your post will appear here...</p>
      </div>
    </div>
  </div>
</div>

<script>
  const btn = document.getElementById('generateBtn');
  const simpleBtn = document.getElementById('simpleBtn');
  const contentDiv = document.getElementById('content');
  const errorDiv = document.getElementById('error');

  // Streaming using EventSource (GET)
  btn.addEventListener('click', () => {
    const topic = document.getElementById('topic').value;
    const niche = document.getElementById('niche').value;
    const tone = document.getElementById('tone').value;

    btn.disabled = true;
    btn.textContent = 'Generating...';
    contentDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    // Create EventSource with query parameters
    const url = '/api/stream?topic=' + encodeURIComponent(topic) + 
                '&niche=' + encodeURIComponent(niche) + 
                '&tone=' + encodeURIComponent(tone);
    const eventSource = new EventSource(url);

    let fullText = '';

    eventSource.addEventListener('start', (e) => {
      console.log('Start:', e.data);
    });

    eventSource.addEventListener('token', (e) => {
      const data = JSON.parse(e.data);
      const token = data.token;
      fullText += token;
      // Append token to content
      const textNode = document.createTextNode(token);
      contentDiv.appendChild(textNode);
    });

    eventSource.addEventListener('done', (e) => {
      console.log('Done:', e.data);
      eventSource.close();
      btn.disabled = false;
      btn.textContent = 'Generate Post (Streaming)';
    });

    eventSource.addEventListener('error', (e) => {
      console.error('EventSource error:', e);
      errorDiv.textContent = 'Error: ' + (e.data || 'Stream error');
      errorDiv.classList.remove('hidden');
      eventSource.close();
      btn.disabled = false;
      btn.textContent = 'Generate Post (Streaming)';
    });

    // Fallback if EventSource fails to open
    eventSource.onerror = (e) => {
      console.error('EventSource onerror:', e);
      // If it fails, try the non-streaming approach
      errorDiv.textContent = 'Streaming not supported, trying non-streaming...';
      errorDiv.classList.remove('hidden');
      eventSource.close();
      simpleBtn.click();
    };
  });

  // Non-streaming (simple fetch)
  simpleBtn.addEventListener('click', async () => {
    const topic = document.getElementById('topic').value;
    const niche = document.getElementById('niche').value;
    const tone = document.getElementById('tone').value;

    simpleBtn.disabled = true;
    simpleBtn.textContent = 'Loading...';
    contentDiv.innerHTML = '';
    errorDiv.classList.add('hidden');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche, tone }),
      });
      const data = await response.json();
      contentDiv.textContent = data.content;
    } catch (err) {
      errorDiv.textContent = 'Error: ' + err.message;
      errorDiv.classList.remove('hidden');
    } finally {
      simpleBtn.disabled = false;
      simpleBtn.textContent = 'Get Full Post (No Streaming)';
    }
  });
</script>
</body>
</html>
  `);
});

// Stream endpoint (GET with EventSource)
app.get('/api/stream', async (req, res) => {
  const topic = req.query.topic || 'AI Productivity';
  const niche = req.query.niche || 'SaaS Founders';
  const tone = req.query.tone || 'authoritative & actionable';

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  sendEvent('start', { topic, niche, tone });

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

  const tokens = mockPost.split(' ');
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i] + (i < tokens.length - 1 ? ' ' : '');
    sendEvent('token', { token });
    await new Promise(r => setTimeout(r, 20));
  }

  sendEvent('done', { source: 'mock' });
  res.end();
});

// Non-streaming JSON endpoint
app.post('/api/generate', async (req, res) => {
  const { topic, niche, tone } = req.body;
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
  res.json({ content: mockPost });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:3000`);
  console.log('🎭 MOCK MODE – Two buttons: Streaming and Full Post');
});