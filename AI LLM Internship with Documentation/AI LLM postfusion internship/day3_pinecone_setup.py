"""
DAY 3: Pinecone Index Setup
Task: Create a test index and upsert embeddings
"""
import requests
import math
import time
import random

# ==========================================
# STEP 1: Generate embeddings (using Ollama)
# ==========================================

def get_embedding(text):
    """Generate embedding using Ollama"""
    response = requests.post(
        "http://localhost:11434/api/embeddings",
        json={"model": "nomic-embed-text", "prompt": text},
        timeout=30
    )
    return response.json().get("embedding", [])

print("=" * 60)
print("📚 DAY 3: PINECONE SETUP")
print("=" * 60)

# 5 sentences from Tuesday
sentences = [
    "I love eating pizza with extra cheese",
    "Pizza is my favorite food to eat",
    "I enjoy Italian food especially pasta",
    "The weather is beautiful today",
    "I need to fix my car engine"
]

print("\n📝 Generating embeddings for 5 sentences...")

embeddings = {}
for i, sentence in enumerate(sentences, 1):
    embedding = get_embedding(sentence)
    embeddings[i] = embedding
    print(f" ✅ Sentence {i} embedding generated ({len(embedding)} numbers)")

print("\n" + "=" * 60)
print("📘 UNDERSTANDING PINECONE")
print("=" * 60)

print("""
WHY USE A VECTOR DATABASE INSTEAD OF A LIST?

| **List/Array** | **Vector Database (Pinecone)** |
| :--- | :--- |
| Stores embeddings in memory | Stores embeddings in a specialized index |
| Slow for large datasets (O(n) search) | Fast similarity search (O(log n) with ANN) |
| Can't scale beyond memory limits | Scales to billions of vectors |
| No built-in similarity search | Built-in cosine similarity search |
| No metadata filtering | Supports metadata filtering |

WHY THIS MATTERS FOR POSTS FUSION:
- Content Fingerprint stores thousands of post embeddings
- Need to find top-3 similar posts in milliseconds
- Pinecone provides this speed and scalability
""")

print("=" * 60)
print("📘 HOW TO SET UP PINECONE (FREE TIER)")
print("=" * 60)

print("""
1. Go to: https://www.pinecone.io/
2. Click 'Start Free' and sign up
3. Create a new index:
   - Name: postsfusion-test
   - Dimension: 768 (matching nomic-embed-text)
   - Metric: cosine
4. Get your API key from the dashboard

CODE EXAMPLE (needs your API key):
```python
import pinecone

# Initialize
pc = pinecone.Pinecone(api_key="your-api-key")

# Create index
pc.create_index(
    name="postsfusion-test",
    dimension=768,
    metric="cosine"
)
# Upsert data
index = pc.Index("postsfusion-test")
vectors = [
    ("id1", embeddings[1]),
    ("id2", embeddings[2]),
    ("id3", embeddings[3]),
    ("id4", embeddings[4]),
    ("id5", embeddings[5])
]
index.upsert(vectors=vectors)
""")

print("\n" + "=" * 60)
print("📊 YOUR EMBEDDINGS READY FOR UPSERT")
print("=" * 60)

print("Vector IDs to use:")
for i in range(1, 6):
 print(f" id{i}: '{sentences[i-1][:30]}...' ({len(embeddings[i])} numbers)")

print("\n" + "=" * 60)
print("✅ DAY 3 COMPLETE!")
print("=" * 60)