import { getAudioContext } from '../sounds.js';

function createDrumSound(frequency, duration, type = 'kick') {
  const audioContext = getAudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  switch (type) {
    case 'kick':
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      oscillator.frequency.exponentialRampToValueAtTime(1, audioContext.currentTime + duration);
      break;
    case 'snare':
      oscillator.type = 'triangle';
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(1, audioContext.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      noiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      noiseSource.start();
      break;
    case 'hihat':
      oscillator.type = 'square';
      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 10000;
      oscillator.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      break;
    default:
      console.warn(`Unknown drum type: ${type}. Defaulting to kick.`);
      return createDrumSound(frequency, duration, 'kick');
  }
  
  oscillator.connect(gainNode);
  
  return {
    start: (startTime = audioContext.currentTime) => {
      oscillator.start(startTime);
    },
    stop: (stopTime = audioContext.currentTime + duration) => {
      oscillator.stop(stopTime);
    },
    connect: (destination) => {
      gainNode.connect(destination);
    }
  };
}

export { createDrumSound };