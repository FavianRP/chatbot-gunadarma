from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# ================= INIT APP =================
app = Flask(__name__)
CORS(app)

# ================= LOAD EMBEDDINGS & DATA =================
print("Loading embeddings & QnA data...")

with open("embeddings.pkl", "rb") as f:
    emb_data = pickle.load(f)

with open("qa_data.pkl", "rb") as f:
    qa_data = pickle.load(f)

embeddings = emb_data["embeddings"]      # numpy array
questions = emb_data["questions"]        # list (preprocessed questions)
answers = qa_data["answers"]             # list of answers

print("✓ Embeddings and Q&A loaded!")

# ================= HELPERS =================
def preprocess_text(text):
    return str(text).strip().lower()

# ================= API ROUTES =================
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # --- Preprocess ---
        processed = preprocess_text(user_message)

        # --- Encode input user ---
        user_embedding = model.encode([processed], convert_to_numpy=True)

        # --- Calculate similarity to dataset embeddings ---
        similarities = cosine_similarity(user_embedding, embeddings)[0]

        best_idx = int(np.argmax(similarities))
        best_score = float(similarities[best_idx])

        threshold = 0.70

        if best_score < threshold:
            return jsonify({
                "answer": "Maaf, saya tidak menemukan jawaban yang relevan. "
                          "Silakan coba pertanyaan lain yang lebih spesifik.",
                "score": best_score,
                "matched_question": None
            })

        return jsonify({
            "answer": answers[best_idx],
            "score": best_score,
            "matched_question": questions[best_idx]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "API running"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
