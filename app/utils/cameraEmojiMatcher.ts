let videoElement: HTMLVideoElement;
let emojiCallback: (emoji: string) => void;
let emojiInterval: number | null = null;
let idleTimeout: number | null = null;
let isProcessingEmoji = false;
let isIdle = false;
let isPageActive = true;
let permanentBlock = false;
let matchCount = 0;
let idleDuration = 0;

// Initialize the camera and periodic emoji matching
export async function init(callback: (emoji: string) => void) {
  videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.style.display = 'none';
  document.body.appendChild(videoElement);

  emojiCallback = callback;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;

  startEmojiInterval();
  setupActivityDetection();
}

// Start periodic emoji matching with control to prevent race conditions
function startEmojiInterval() {
  if (emojiInterval !== null) return;

  // Define the function to run every 12.5 seconds
  const intervalFunction = async () => {
    if (!isIdle && isPageActive && !permanentBlock && !isProcessingEmoji) {
      await captureAndMatchEmoji();
      if (!permanentBlock) {
        emojiInterval = window.setTimeout(intervalFunction, 12000); // Schedule next execution after 12 seconds
      }
    }
  };

  // Start the first interval
  emojiInterval = window.setTimeout(intervalFunction, 12000);
}

// Stop periodic emoji matching
function stopEmojiInterval() {
  if (emojiInterval !== null) {
    clearTimeout(emojiInterval);
    emojiInterval = null;
  }
}

// Reset idle timer on activity detection
function resetIdleTimer() {
  if (permanentBlock) return;

  if (isIdle) {
    isIdle = false;
    emojiCallback('😴');
    idleDuration = 0;
    startEmojiInterval();
  }

  if (idleTimeout !== null) {
    clearTimeout(idleTimeout);
  }

  idleTimeout = window.setTimeout(() => {
    handleIdleState();
  }, 60000);
}

// Handle idle state
function handleIdleState() {
  isIdle = true;
  idleDuration += 60;

  if (idleDuration >= 300) {
    permanentBlock = true;
    emojiCallback('⛔');
    stopEmojiInterval();
  } else {
    stopEmojiInterval();
    emojiCallback('😴');
  }
}

// Handle visibility changes
function handleVisibilityChange() {
  isPageActive = document.visibilityState === 'visible';
  if (!isPageActive) {
    stopEmojiInterval();
    emojiCallback('😴');
  } else if (!isIdle && !permanentBlock) {
    startEmojiInterval();
  }
}

// Detect user activity
function setupActivityDetection() {
  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('scroll', resetIdleTimer);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  resetIdleTimer();
}

// Capture and match emoji
export async function captureAndMatchEmoji() {
  if (isProcessingEmoji) return;
  isProcessingEmoji = true;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const videoWidth = videoElement.videoWidth;
    const videoHeight = videoElement.videoHeight;
    const trimAmount = 10;
    const trimmedWidth = videoWidth - 2 * trimAmount;

    canvas.width = trimmedWidth;
    canvas.height = videoHeight;

    if (ctx) {
      ctx.drawImage(
        videoElement,
        trimAmount,
        0,
        trimmedWidth,
        videoHeight,
        0,
        0,
        trimmedWidth,
        videoHeight
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg')
      );

      if (blob) {
        const bestEmoji = await sendImageToBackend(blob);
        emojiCallback(bestEmoji);
        matchCount++;

        if (matchCount > 100) {
          permanentBlock = true;
          emojiCallback('⛔');
          stopEmojiInterval();
        }
      }
    }
  } catch (error) {
    console.error('Error processing emoji:', error);
  } finally {
    isProcessingEmoji = false;
  }
}

// Send the captured image to the backend
async function sendImageToBackend(imageBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('image', imageBlob, 'capturedImage.jpg');

  try {
    const response = await fetch('https://parrot-backend-nine.vercel.app/api/EmojiMatcher', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result.bestEmoji;
  } catch (error) {
    console.error('Network error, returning Wi-Fi emoji:', error);
    return '📶';
  }
}

// Cleanup function to release resources
export function cleanup() {
  stopEmojiInterval();
  if (idleTimeout !== null) {
    clearTimeout(idleTimeout);
    idleTimeout = null;
  }

  document.removeEventListener('mousemove', resetIdleTimer);
  document.removeEventListener('scroll', resetIdleTimer);
  document.removeEventListener('visibilitychange', handleVisibilityChange);

  const stream = videoElement.srcObject as MediaStream;
  stream.getTracks().forEach((track) => track.stop());
  videoElement.remove();
}