import json
import numpy as np
from gensim.models import KeyedVectors

# Step 1: Load the emojional.bin file (assumed to be in Word2Vec binary format)
def load_emojional_bin(file_path):
    return KeyedVectors.load_word2vec_format(file_path, binary=True)

# Step 2: Convert the data to a JSON serializable format
def convert_to_json(data):
    # Convert the embeddings (numpy arrays) to lists and convert KeyedVectors to dict
    emoji_embeddings = {}
    for word in data.index_to_key:  # Iterating over all words in the model
        emoji_embeddings[word] = data[word].tolist()  # Convert numpy array to list
    return emoji_embeddings

# Step 3: Save the data as JSON
def save_as_json(data, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Main execution
if __name__ == "__main__":
    emojional_bin_path = "../../emojional/emojional.bin"  # Specify the path to emojional.bin
    output_json_path = "emoji_embeddings.json"          # Desired output JSON file name

    # Load and process the binary data
    data = load_emojional_bin(emojional_bin_path)
    json_data = convert_to_json(data)

    # Save as JSON
    save_as_json(json_data, output_json_path)

    print(f"Data successfully converted to {output_json_path}")