// New data structure for soundtrack configuration
export const SOUNDTRACK_CONFIG = {
    melody: {
      notes: ['G4', 'A4', 'B4', 'D5', 'G4', 'F#4', 'E4', 'D4', null, 'B4', 'A4', 'G4',
              null,
              'A4', 'B4', 'D5', 'E5', 'D5', 'B4', 'A4', 'G4', 'F#4', 'E4', 'D4',
              null,
              'G4', 'B4', 'D5', 'G5', 'F#5', 'D5', 'B4', 'G4', 'A4', 'C5', 'E5', 'A5',
              null,
              'G5', 'F#5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F#4', 'E4', 'D4',
              'G4', 'B4', 'D5', 'G5', 'F#5', 'D5', 'B4', 'G4', 'A4', 'C5', 'E5', 'A5',
              'G5', 'E5', 'C5', 'A4', 'B4', 'D5', 'F#5', 'B5', 'A5', 'F#5', 'D5', 'B4',
              'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5', 'F#5', 'E5', 'D5', 'C5',
              'B4', 'A4', 'G4', 'F#4', 'E4', 'D4', 'C4', 'B3', 'A3', 'B3', 'C4', 'D4'],
      durations: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.25, 0.25, 0.5,
                  0.5,
                  0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.75,
                  0.5,
                  0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.25, 0.25,
                  0.5,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 1,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
      instrument: {
        name: 'lead',
        waveform: 'square',
        volume: 0.4,
        fadeOutDuration: 0.05
      }
    },
    harmony: {
      notes: ['D4', 'G4', 'B4', 'A4', 'D4', 'F#4', 'A4', null, 'G4', 'B4', 'D5', 'G4',
              null,
              'B4', 'D5', 'G4', 'G4', 'B4', 'D5', 'F#4', 'A4', 'C5', 'E4', 'G4', 'B4',
              null,
              'D4', 'F#4', 'A4', 'G4', 'B4', 'D5', 'C4', 'E4', 'G4',
              'B3', 'D4', 'F#4', 'A3', 'C4', 'E4', 'G3', 'B3', 'D4',
              'F#3', 'A3', 'C4', 'E3', 'G3', 'B3', 'D3', 'F#3', 'A3'],
      durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                  0.25, 0.25, 0.25, 0.25,
                  0.5,
                  0.25, 0.25, 0.25, 0.25, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75,
                  0.5,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1],
      instrument: {
        name: 'chords',
        waveform: 'square',
        volume: 0.3,
        fadeOutDuration: 0.1
      }
    },
    bass: {
      notes: ['G2', 'G2', 'D3', 'D3', 'E2', 'E2', 'A2', 'A2',
              null,
              'G2', 'G2', 'D3', 'D3', 'C3', 'C3', 'D3', 'D3',
              null,
              'G2', 'G2', 'B2', 'B2', 'C3', 'C3', 'A2', 'A2',
              'F#2', 'F#2', null, 'D3', 'D3', 'E3', 'E3', 'C3',
              'G2', 'G2', 'D3', 'D3', 'A2', 'A2', 'E3', 'E3',
              'B2', 'B2', 'F#3', 'F#3', 'G2', 'G2', 'D3', 'D3'],
      durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                  0.5,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.5,
                  0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1],
      instrument: {
        name: 'bass',
        waveform: 'triangle',
        volume: 0.35,
        fadeOutDuration: 0.05
      }
    },
    percussion: {
      notes: ['C2', 'C2', 'G2', null, 'C2', 'C2', 'C2', 'G2',
              'C2', 'G2', 'C2', 'G2', 'C2', 'G2', 'C2', 'G2',
              'C2', 'G2', 'C2', 'G2', 'C2', 'C2', 'G2', 'C2',
              'C2', 'G2', 'C2', 'G2', 'C2', 'C2', 'G2', 'C2',
              'C2', 'G2', 'C2', 'G2', 'C2', 'G2', 'C2', 'G2',
              'C2', 'C2', 'G2', 'C2', 'C2', 'G2', 'C2', 'G2'],
      durations: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
                  0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125,
                  0.25, 0.25, 0.25, 0.25, 0.125, 0.125, 0.25, 0.25,
                  0.25, 0.25, 0.25, 0.25, 0.125, 0.125, 0.25, 0.25,
                  0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
      instrument: {
        name: 'drums',
        waveform: 'drum',
        volume: 1,
        fadeOutDuration: 0.1
      }
    },
    ambience: {
      notes: ['D3', 'G3', 'A3', 'B3', 'C4', 'E4', 'F#4', 'G4'],
      durations: [4, 4, 4, 4, 4, 4, 4, 4],
      instrument: {
        name: 'pad',
        waveform: 'sine',
        volume: 0.1,
        fadeOutDuration: 1
      }
    }
  };

// Add this function at the end of the file
export function validateSoundtrackConfig(config) {
  for (const part in config) {
    if (config[part].notes.length !== config[part].durations.length) {
      console.error(`Mismatch in ${part}: ${config[part].notes.length} notes vs ${config[part].durations.length} durations`);
    }
  }
}

// Call the validation function
validateSoundtrackConfig(SOUNDTRACK_CONFIG);