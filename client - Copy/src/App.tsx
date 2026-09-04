import React, { useState } from 'react';

function App() {
  const [topic, setTopic] = useState('AI in Healthcare');
  const [niche, setNiche] = useState('SaaS Founders');
  const [tone, setTone] = useState('authoritative & actionable');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generatePost = async () => {
    setIsGenerating(true);
    setContent('');
    setError('');
    console.log('🚀 Generate button clicked');

    try {
      console.log('📤 Sending request to /api/content/generate with:', { topic, niche, tone });

      const response = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche, tone }),
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log('✅ Stream finished');
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        console.log('📦 Raw buffer chunk:', buffer);

        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          console.log('📄 Processing line:', line);
          if (line.startsWith('event: ')) {
            const eventType = line.slice(7).trim();
            console.log('🔔 Event type:', eventType);

            // The data line is in the next part of the array, but we can find it in the lines array
            const dataLine = lines.find(l => l.startsWith('data: '));
            if (dataLine) {
              const jsonData = dataLine.slice(6);
              console.log('📊 Raw data:', jsonData);
              try {
                const data = JSON.parse(jsonData);
                console.log('📦 Parsed data:', data);
                if (eventType === 'token') {
                  setContent(prev => prev + data.token);
                } else if (eventType === 'error') {
                  setError(data.message);
                } else if (eventType === 'done') {
                  console.log('🏁 Done event received');
                } else if (eventType === 'start') {
                  console.log('▶️ Start event received');
                }
              } catch (e) {
                console.warn('⚠️ Failed to parse JSON:', jsonData);
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error('🔥 Unhandled error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsGenerating(false);
      console.log('🏁 Generation cycle complete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts Fusion Studio</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Niche</label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
          </div>
          <button
            onClick={generatePost}
            disabled={isGenerating}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Post'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Generated Content</h2>
          <div className="prose prose-blue max-w-none">
            {content ? (
              <pre className="whitespace-pre-wrap font-sans text-gray-700">{content}</pre>
            ) : (
              <p className="text-gray-400">Your post will appear here as it's generated...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;