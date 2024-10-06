// New data structure for soundtrack configuration
export const SOUNDTRACK_CONFIG = {
    melody: {
      notes: ['G4', 'A4', 'B4', 'D5', 'G4', 'F#4', 'E4', 'D4', 'B4', 'A4', 'G4',
              'A4', 'B4', 'D5', 'E5', 'D5', 'B4', 'A4', 'G4', 'F#4', 'E4', 'D4'],
      durations: [0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5, 0.25, 0.25, 0.5,
                  0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.75],
      instrument: {
        name: 'flute',
        waveform: 'sine',
        volume: 0.4,
        fadeOutDuration: 0.1
      }
    },
    harmony: {
      notes: ['D4', 'G4', 'B4', 'A4', 'D4', 'F#4', 'A4', 'G4',
              'E4', 'G4', 'B4', 'D5', 'G4', 'B4', 'D5', 'G4'],
      durations: [1, 1, 1, 1, 1, 1, 1, 1,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      instrument: {
        name: 'strings',
        waveform: 'sawtooth',
        volume: 0.25,
        fadeOutDuration: 0.3
      }
    },
    bass: {
      notes: ['G2', 'G2', 'D3', 'D3', 'E2', 'E2', 'A2', 'A2',
              'G2', 'G2', 'D3', 'D3', 'C3', 'C3', 'D3', 'D3'],
      durations: [1, 1, 1, 1, 1, 1, 1, 1,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      instrument: {
        name: 'bass',
        waveform: 'triangle',
        volume: 0.3,
        fadeOutDuration: 0.1
      }
    },
    percussion: {
      notes: ['C2', 'C2', 'G2', 'C2', 'C2', 'C2', 'G2', 'C2',
              'C2', 'G2', 'C2', 'G2', 'C2', 'G2', 'C2', 'G2'],
      durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
      instrument: {
        name: 'drum',
        waveform: 'square',
        volume: 0.2,
        fadeOutDuration: 0.05
      }
    },
    ambience: {
      notes: ['D3', 'G3', 'A3', 'B3', 'D4', 'G4', 'A4', 'B4'],
      durations: [2, 2, 2, 2, 2, 2, 2, 2],
      instrument: {
        name: 'pad',
        waveform: 'sine',
        volume: 0.1,
        fadeOutDuration: 1
      }
    }
  };
