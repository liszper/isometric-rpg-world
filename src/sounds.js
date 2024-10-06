import { createDrumSound } from './sounds/drumSound.js';
import { createSynthSound } from './sounds/synthSound.js';
import { SOUNDTRACK_CONFIG } from './sounds/tracks/advanced.js';
import { createVisualization, updateVisualization } from './sounds/visualization.js';

const NOTES = {
  C2: 65.41, "C#2": 69.30, D2: 73.42, "D#2": 77.78, E2: 82.41, F2: 87.31, "F#2": 92.50, G2: 98.00, "G#2": 103.83, A2: 110.00, "A#2": 116.54, B2: 123.47,
  C3: 130.81, "C#3": 138.59, D3: 146.83, "D#3": 155.56, E3: 164.81, F3: 174.61, "F#3": 185.00, G3: 196.00, "G#3": 207.65, A3: 220.00, "A#3": 233.08, B3: 246.94,
  C4: 261.63, "C#4": 277.18, D4: 293.66, "D#4": 311.13, E4: 329.63, F4: 349.23, "F#4": 369.99, G4: 392.00, "G#4": 415.30, A4: 440.00, "A#4": 466.16, B4: 493.88,
  C5: 523.25, "C#5": 554.37, D5: 587.33, "D#5": 622.25, E5: 659.25, F5: 698.46, "F#5": 739.99, G5: 783.99, "G#5": 830.61, A5: 880.00, "A#5": 932.33, B5: 987.77
};

const WAVEFORMS = ['square', 'sawtooth', 'triangle', 'sine'];

let sharedAudioContext = null;
let activeSounds = [];
let loopTimeoutId = null;
let isPlaying = false;
let pausedTime = 0;
let startTime = 0;
let currentPatterns = null;
let currentLoops = -1;
let pauseStartTime = 0;
let totalPausedTime = 0;
let visualizationElements = [];
let audioContextErrorCount = 0;
const MAX_AUDIO_CONTEXT_ERRORS = 5;

// Add this helper function at the beginning of the file
function isValidNumber(value) {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
}

export function getAudioContext() {
  if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
    try {
      sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      sharedAudioContext.addEventListener('statechange', handleAudioContextStateChange);
    } catch (error) {
      console.error('Failed to create AudioContext:', error);
      return null;
    }
  }
  return sharedAudioContext;
}

function handleAudioContextStateChange(event) {
  console.log('AudioContext state changed:', event.target.state);
  if (event.target.state === 'interrupted' || event.target.state === 'suspended') {
    event.target.resume().catch(error => console.warn('Failed to resume AudioContext:', error));
  }
}

function createTone(frequency, duration, waveform = 'square', fadeOutDuration = 0.4) {
  const audioContext = getAudioContext();
  if (!audioContext) {
    console.error('AudioContext is not available');
    return null;
  }

  if (!isValidNumber(frequency) || !isValidNumber(duration)) {
    console.warn(`Invalid frequency (${frequency}) or duration (${duration}). Skipping this note.`);
    return null;
  }

  if (waveform === 'drum') {
    return createDrumSound(frequency, duration);
  }

  const sound = createSynthSound(frequency, duration, waveform, fadeOutDuration);
  
  if (sound) {
    const now = audioContext.currentTime;
    activeSounds.push({ tone: sound, stopTime: now + duration });
  }
  
  return sound;
}

// Updated definePattern function
function definePattern(notes, durations, instrument) {
  return notes.map((note, index) => {
    if (note === null) {
      return { duration: durations[index], isRest: true };
    }
    const frequency = NOTES[note];
    if (!isFinite(frequency)) {
      console.warn(`Invalid or missing note: ${note}. Skipping this note.`);
      return null;
    }
    return {
      frequency: frequency,
      duration: durations[index],
      ...instrument
    };
  }).filter(note => note !== null);
}

// Updated playPattern function with visualization
function playPattern(pattern, loops = 1) {
  const audioContext = getAudioContext();
  if (!audioContext) {
    console.error('AudioContext is not available');
    return 0;
  }

  const now = audioContext.currentTime;
  let time = 0;
  const patternDuration = pattern.reduce((sum, note) => sum + (note ? note.duration : 0), 0);

  for (let loop = 0; loop < loops; loop++) {
    pattern.forEach(note => {
      if (note.isRest) {
        // If it's a rest, just wait for the duration
        time += note.duration;
      } else if (note && isFinite(note.frequency)) {
        const tone = createTone(note.frequency, note.duration, note.waveform);
        if (tone) {
          const gainNode = audioContext.createGain();
          gainNode.gain.setValueAtTime(note.volume, now + time);
          tone.connect(gainNode);
          gainNode.connect(audioContext.destination);
          tone.start(now + time);
          tone.stop(now + time + note.duration);
          
          // Update visualization for the note
          updateVisualization(visualizationElements[visualizationElements.length - 1], now + time, note.duration);
        }
        time += note.duration;
      } else {
        console.warn(`Skipping invalid note in pattern:`, note);
      }
    });
  }

  return patternDuration * loops;
}

// Updated playPolyphonic function with visualization
function playPolyphonic(patterns, loops = 1) {
  if (!patterns || !Array.isArray(patterns) || patterns.length === 0) {
    console.error('Invalid patterns provided to playPolyphonic');
    return 0;
  }

  const audioContext = getAudioContext();
  if (!audioContext) {
    console.error('AudioContext is not available');
    return 0;
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(error => console.warn('Failed to resume AudioContext:', error));
  }

  const now = audioContext.currentTime;
  let maxDuration = 0;

  patterns.forEach(pattern => {
    let time = 0;
    const patternDuration = calculatePatternDuration(pattern);

    for (let loop = 0; loop < loops; loop++) {
      pattern.forEach(note => {
        if (note.isRest) {
          time += note.duration;
        } else if (note && isValidNumber(note.frequency) && isValidNumber(note.duration) && isValidNumber(note.volume)) {
          const tone = createTone(note.frequency, note.duration, note.waveform, note.fadeOutDuration);
          if (tone) {
            try {
              const gainNode = audioContext.createGain();
              gainNode.gain.setValueAtTime(note.volume, now + time);
              tone.connect(gainNode);
              gainNode.connect(audioContext.destination);
              tone.start(now + time);
              tone.stop(now + time + note.duration);
              
              // Create and update visualization for each note
              const visualElement = createVisualization(note.frequency, note.duration, note.waveform);
              updateVisualization(visualElement, now + time, note.duration, now);
            } catch (error) {
              console.warn('Error playing note:', error);
              audioContextErrorCount++;
              if (audioContextErrorCount >= MAX_AUDIO_CONTEXT_ERRORS) {
                console.error('Too many AudioContext errors. Stopping playback.');
                stopAllSounds();
                return;
              }
            }
          }
          time += note.duration;
        } else {
          console.warn(`Skipping invalid note in pattern:`, note);
        }
      });
    }
    maxDuration = Math.max(maxDuration, time);
  });

  return maxDuration;
}

// Updated playSoundtrack function with looping
function playSoundtrack(loops = 1) {
  const patterns = Object.values(SOUNDTRACK_CONFIG).map(
    ({ notes, durations, instrument }) => definePattern(notes, durations, instrument)
  );
  return playPolyphonic(patterns, loops);
}

// New function to play a looping soundtrack
function playLoopingSoundtrack(loops = -1) {
  stopAllSounds();
  const patterns = Object.values(SOUNDTRACK_CONFIG).map(
    ({ notes, durations, instrument }) => definePattern(notes, durations, instrument)
  );
  currentPatterns = patterns;
  currentLoops = loops;
  startTime = getAudioContext().currentTime;
  isPlaying = true;
  loop(patterns, loops);
}

// Updated stopAllSounds function to clear visualizations
function stopAllSounds() {
  isPlaying = false;
  pausedTime = 0;
  currentPatterns = null;
  currentLoops = -1;
  totalPausedTime = 0;
  audioContextErrorCount = 0;

  if (loopTimeoutId) {
    clearTimeout(loopTimeoutId);
    loopTimeoutId = null;
  }

  // Stop all active sounds
  const audioContext = getAudioContext();
  if (audioContext) {
    const now = audioContext.currentTime;
    activeSounds.forEach(({ tone, stopTime }) => {
      if (tone.stop && stopTime > now) {
        try {
          tone.stop();
        } catch (error) {
          console.warn('Error stopping tone:', error);
        }
      }
    });
    activeSounds = [];

    // Suspend the audio context
    if (audioContext.state === 'running') {
      audioContext.suspend().catch(error => console.warn('Failed to suspend AudioContext:', error));
    }
  }

  // Clear all visualizations
  visualizationElements.forEach(element => element.remove());
  visualizationElements = [];
}

function loop(patterns, loops, currentLoop = 0) {
  if (!isPlaying) return;

  if (currentLoop < loops || loops === -1) {
    if (!patterns || !Array.isArray(patterns) || patterns.length === 0) {
      console.error('Invalid patterns in loop function');
      stopAllSounds();
      return;
    }

    const duration = playPolyphonic(patterns);
    loopTimeoutId = setTimeout(() => {
      loop(patterns, loops, currentLoop + 1);
    }, duration * 1000); // Convert duration to milliseconds
  }
}

function calculatePatternDuration(pattern) {
  return pattern.reduce((sum, note) => sum + (note ? note.duration : 0), 0);
}

// Updated pauseSoundtrack function
function pauseSoundtrack() {
  if (isPlaying) {
    isPlaying = false;
    pauseStartTime = getAudioContext().currentTime;
    
    if (loopTimeoutId) {
      clearTimeout(loopTimeoutId);
      loopTimeoutId = null;
    }

    // Pause all active sounds
    const now = getAudioContext().currentTime;
    activeSounds.forEach(({ tone, stopTime }) => {
      if (tone.stop && stopTime > now) {
        tone.stop();
      }
    });
    
    // Suspend the audio context
    getAudioContext().suspend();

    // Pause all visualizations (if the pause method exists)
    visualizationElements.forEach(element => {
      if (element && typeof element.pause === 'function') {
        element.pause();
      }
    });
  }
}

// Updated resumeSoundtrack function
function resumeSoundtrack() {
  if (!isPlaying && currentPatterns) {
    isPlaying = true;
    const now = getAudioContext().currentTime;
    totalPausedTime += now - pauseStartTime;
    
    // Resume the audio context
    getAudioContext().resume();
    
    // Resume all visualizations (if the resume method exists)
    visualizationElements.forEach(element => {
      if (element && typeof element.resume === 'function') {
        element.resume();
      }
    });
    
    // Recalculate the current position in the loop
    const totalDuration = calculatePatternDuration(currentPatterns[0]) * currentPatterns.length;
    const adjustedTime = (now - startTime - totalPausedTime) % totalDuration;
    
    // Find the correct starting point in the patterns
    let elapsedTime = 0;
    let startPatternIndex = 0;
    let startNoteIndex = 0;
    
    for (let i = 0; i < currentPatterns.length; i++) {
      const patternDuration = calculatePatternDuration(currentPatterns[i]);
      if (elapsedTime + patternDuration > adjustedTime) {
        startPatternIndex = i;
        for (let j = 0; j < currentPatterns[i].length; j++) {
          if (elapsedTime + currentPatterns[i][j].duration > adjustedTime) {
            startNoteIndex = j;
            break;
          }
          elapsedTime += currentPatterns[i][j].duration;
        }
        break;
      }
      elapsedTime += patternDuration;
    }
    
    // Resume from the current position
    const remainingPatterns = [
      ...currentPatterns.slice(startPatternIndex).map(pattern => pattern.slice(startNoteIndex)),
      ...currentPatterns.slice(0, startPatternIndex)
    ];
    
    loop(remainingPatterns, currentLoops);
  }
}

export {
  NOTES,
  WAVEFORMS,
  definePattern,
  playPattern,
  playPolyphonic,
  playSoundtrack,
  playLoopingSoundtrack,
  stopAllSounds,
  pauseSoundtrack,
  resumeSoundtrack
};