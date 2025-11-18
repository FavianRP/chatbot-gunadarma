from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load model dan data
print("Loading model...")
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

with open('embeddings.pkl', 'rb') as f:
    emb_data = pickle.load(f)

with open('qa_data.pkl', 'rb') as f:
    qa_data = pickle.load(f)

embeddings = emb_data['embeddings']
questions = qa_data['questions']
answers = qa_data['answers']

print("Model loaded successfully!")

def preprocess_text(text):
    return str(text).strip().lower()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Preprocess
        processed_input = preprocess_text(user_message)
        
        # Encode
        input_embedding = model.encode([processed_input], convert_to_numpy=True)
        
        # Calculate similarity
        similarities = cosine_similarity(input_embedding, embeddings)[0]
        
        # Get best match
        best_idx = np.argmax(similarities)
        best_score = float(similarities[best_idx])
        
        # Threshold check
        threshold = 0.5
        if best_score < threshold:
            response = {
                'answer': 'Maaf, saya tidak memiliki informasi yang cukup untuk menjawab pertanyaan Anda. Silakan hubungi admin kampus atau coba pertanyaan lain.',
                'score': best_score,
                'matched_question': None
            }
        else:
            response = {
                'answer': answers[best_idx],
                'score': best_score,
                'matched_question': questions[best_idx]
            }
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'API is running'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)