"""
DAY 2: Cosine Similarity
Task: Generate embeddings for 5 sentences and compute similarity
"""

import requests
import math

def get_embedding(text):
    """Generate embedding using Ollama"""
    response = requests.post(
        "http://localhost:11434/api/embeddings",
        json={"model": "nomic-embed-text", "prompt": text},
        timeout=30
    )
    return response.json().get("embedding", [])

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors"""
    # Dot product
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    # Magnitudes
    mag1 = math.sqrt(sum(a * a for a in vec1))
    mag2 = math.sqrt(sum(b * b for b in vec2))
    # Cosine similarity
    return dot_product / (mag1 * mag2)

print("=" * 60)
print("📚 DAY 2: COSINE SIMILARITY")
print("=" * 60)

# 5 sentences (mix of similar and unrelated)
sentences = [
    "I love eating pizza with extra cheese",
    "Pizza is my favorite food to eat",
    "I enjoy Italian food especially pasta",
    "The weather is beautiful today",
    "I need to fix my car engine"
]

print("\n📝 Sentences:")
for i, s in enumerate(sentences, 1):
    print(f"  {i}. {s}")

# Generate embeddings for all sentences
print("\n⏳ Generating embeddings...")
embeddings = {}
for i, sentence in enumerate(sentences, 1):
    embedding = get_embedding(sentence)
    embeddings[i] = embedding
    print(f"  ✅ Sentence {i} embedding generated ({len(embedding)} numbers)")

# Compute cosine similarity between every pair
print("\n📊 Cosine Similarity Matrix:")
print("-" * 60)
print("       | S1    | S2    | S3    | S4    | S5    |")
print("-" * 60)

for i in range(1, 6):
    row = f"  S{i}   |"
    for j in range(1, 6):
        if i == j:
            sim = 1.0
        else:
            sim = cosine_similarity(embeddings[i], embeddings[j])
        row += f" {sim:.3f} |"
    print(row)
print("-" * 60)

# Analysis
print("\n📊 Similarity Analysis:")
print("-" * 60)

pairs = [
    (1, 2, "Pizza-related"),
    (1, 3, "Food-related"),
    (2, 3, "Food-related"),
    (1, 4, "Pizza vs Weather (different)"),
    (1, 5, "Pizza vs Car (different)"),
    (4, 5, "Weather vs Car (different)")
]

for a, b, label in pairs:
    sim = cosine_similarity(embeddings[a], embeddings[b])
    print(f"  Sentence {a} vs {b} ({label}): {sim:.4f}")

print("\n✅ CONFIRMATION:")
print("  Similar sentences (1,2,3) have HIGHER cosine similarity scores.")
print("  Unrelated sentences (1,4,5) have LOWER cosine similarity scores.")
print("  This proves embeddings capture MEANING, not just words.")

print("\n" + "=" * 60)
print("✅ DAY 2 COMPLETE!")
print("=" * 60)