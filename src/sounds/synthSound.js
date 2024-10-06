import { getAudioContext } from '../sounds.js';

export function createSynthSound(frequency, duration, waveform = 'square', fadeOutDuration = 0.4) {
  const audioContext = getAudioContext();

  if (!isFinite(frequency)) {
    console.error(`Invalid frequency: ${frequency}`);
    return null;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  
  oscillator.connect(gainNode);
  
  const sound = {
    start: (startTime = audioContext.currentTime) => {
      oscillator.start(startTime);
      // Apply a quick fade-out at the end of the note
      gainNode.gain.setValueAtTime(0.5, startTime + duration - fadeOutDuration);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    },
    stop: (stopTime = audioContext.currentTime) => {
      oscillator.stop(stopTime);
    },
    connect: (destination) => {
      gainNode.connect(destination);
    }
  };

  return sound;
}