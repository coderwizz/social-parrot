"use client"; // Marks the component as a client-side component

import React, { useEffect, useState } from 'react';
// Ensure the import path to cameraEmojiMatcher is correct
import { init } from '../../app/utils/cameraEmojiMatcher';

const EmojiDisplay: React.FC = () => {
  const [currentEmoji, setCurrentEmoji] = useState('🦜'); // Default emoji to display

  // Initialize camera and matching process
  useEffect(() => {
    const initialize = async () => {
      // Initialize the camera and pass the callback to update the emoji
      await init(setCurrentEmoji);
    };

    initialize();

    return () => {
      // Stop the video stream when the component unmounts
      const stream = (document.querySelector('video')?.srcObject as MediaStream) || null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.emoji}>{currentEmoji}</div> {/* Display the matched emoji */}
    </div>
  );
};

// Styling for the container and emoji display
const styles: { container: React.CSSProperties; emoji: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'transparent',
  },
  emoji: {
    fontSize: '20rem', // Large emoji size
    textAlign: 'center',
  },
};

export default EmojiDisplay;