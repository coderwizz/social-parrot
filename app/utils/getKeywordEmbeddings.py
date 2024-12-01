import json
import numpy as np
import gensim.downloader as api
import pandas as pd

# Step 1: Download the Word2Vec model (pre-trained from gensim's API)
def download_word2vec_model():
    # Download the pre-trained model (Google News Word2Vec, ~1.5 GB)
    model = api.load("word2vec-google-news-300")
    return model

# Step 2: Get the Word2Vec embeddings for each keyword
def get_word2vec_embeddings(model, keywords):
    embeddings = {}
    
    for keyword in keywords:
        try:
            # Fetch the embedding for the keyword
            embeddings[keyword] = model[keyword].tolist()
        except KeyError:
            # If the keyword is not in the model's vocabulary, return a zero vector
            embeddings[keyword] = np.zeros(model.vector_size).tolist()
    
    return embeddings

# Step 3: Load the list of keywords (from an Excel file or any other source)
def load_keywords_from_excel(file_path='key_words_vocab.xlsx'):
    try:
        df = pd.read_excel(file_path, engine='openpyxl')
        keywords = df['pleasure'].dropna().tolist()  # Assuming keywords are in the 'pleasure' column
        keywords = [keyword.strip() for keyword in keywords if isinstance(keyword, str)]
        return keywords
    except Exception as e:
        print(f"Error loading Excel file: {e}")
        return []

# Step 4: Save the embeddings as a JSON file
def save_as_json(data, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)  # Pretty-print JSON with indentation

# Main execution
if __name__ == "__main__":
    # Excel file containing keywords (e.g., 'key_words_vocab.xlsx')
    excel_file_path = "key_words_vocab.xlsx"     # Path to the Excel file containing keywords
    output_json_path = "keyword_embeddings.json" # Desired output JSON file name
    
    # Download Word2Vec model
    print("Downloading Word2Vec model...")
    word2vec_model = download_word2vec_model()
    
    # Load keywords from the Excel file
    print("Loading keywords from Excel file...")
    keywords = load_keywords_from_excel(excel_file_path)
    
    # Get Word2Vec embeddings for each keyword
    print("Fetching embeddings for keywords...")
    embeddings = get_word2vec_embeddings(word2vec_model, keywords)
    
    # Save the embeddings as a JSON file
    print("Saving embeddings to JSON...")
    save_as_json(embeddings, output_json_path)

    print(f"Word2Vec embeddings for the keywords have been saved to {output_json_path}")