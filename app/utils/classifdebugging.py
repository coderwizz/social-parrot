import json
import numpy as np

# Load the emoji embeddings from the JSON file
def load_emoji_embeddings(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

# Find the index of the highest probability for each emoji entry
def find_highest_probability_index(emoji_embeddings):
    for emoji, embedding in emoji_embeddings.items():
        # Convert embedding to a numpy array
        embedding_array = np.array(embedding)
        
        # Find the index of the highest probability
        highest_index = np.argmax(embedding_array)
        
        # Output the result
        print(f"Emoji: {emoji} -> Highest Probability Index: {highest_index}")

# Main function to execute the process
def main():
    emoji_embeddings_file = '../../public/emoji_embeddings.json'  # Adjust the path if necessary
    emoji_embeddings = load_emoji_embeddings(emoji_embeddings_file)
    
    find_highest_probability_index(emoji_embeddings)

# Run the main function
if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print('Error processing emoji embeddings:', e)