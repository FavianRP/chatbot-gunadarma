import pandas as pd
from sentence_transformers import SentenceTransformer
import pickle

# Load CSV
df = pd.read_csv('dataset.csv')

questions = df['question'].tolist()
answers = df['answer'].tolist()

# Load model
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

# Generate embeddings
embeddings = model.encode(questions, show_progress_bar=True)

# Simpan embeddings dan data QA
with open('embeddings.pkl', 'wb') as f:
    pickle.dump({'embeddings': embeddings}, f)

with open('qa_data.pkl', 'wb') as f:
    pickle.dump({'questions': questions, 'answers': answers}, f)

print("Embeddings dan data QA berhasil dibuat dari CSV.")
