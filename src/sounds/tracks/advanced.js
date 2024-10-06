// New data structure for soundtrack configuration
export const SOUNDTRACK_CONFIG = {
    melody: {
      notes: ['G4', 'A4', 'B4', 'D5', 'G4', 'E4', 'D4', 'B3', 'A3', 'G3',
              'A3', 'B3', 'D4', 'G4', 'E4', 'D4', 'B3', 'A3', 'G3', 'A3', 'B3', 'D4'],
      durations: [0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 1,
                  0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1],
      instrument: {
        name: 'flute',
        waveform: 'triangle',
        volume: 0.4,
        fadeOutDuration: 0.1
      }
    },
    harmony: {
      notes: ['G3', 'D4', 'B3', 'G3', 'C4', 'G3', 'D4', 'G3',
              'E3', 'B3', 'G3', 'D4', 'G3', 'C4', 'A3', 'D4'],
      durations: [2, 2, 2, 2, 2, 2, 2, 2,
                  1, 1, 1, 1, 1, 1, 1, 1],
      instrument: {
        name: 'strings',
        waveform: 'sawtooth',
        volume: 0.2,
        fadeOutDuration: 0.3
      }
    },
    bass: {
      notes: ['G2', 'G2', 'D3', 'D3', 'C3', 'C3', 'G2', 'G2',
              'E2', 'E2', 'G2', 'G2', 'C3', 'C3', 'D3', 'D3'],
      durations: [2, 2, 2, 2, 2, 2, 2, 2,
                  1, 1, 1, 1, 1, 1, 1, 1],
      instrument: {
        name: 'bass',
        waveform: 'triangle',
        volume: 0.25,
        fadeOutDuration: 0.1
      }
    },
    percussion: {
      notes: ['C2', 'G2', 'C2', 'G2', 'C2', 'G2', 'C2', 'G2',
              'C2', 'G2', 'C2', 'G2', 'C2', 'G2', 'C2', 'C2'],
      durations: [1, 1, 1, 1, 1, 1, 1, 1,
                  0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25],
      instrument: {
        name: 'drum',
        waveform: 'square',
        volume: 0.15,
        fadeOutDuration: 0.05
      }
    },
    ambience: {
      notes: ['G3', 'B3', 'D4', 'G4', 'A3', 'C4', 'E4', 'A4'],
      durations: [4, 4, 4, 4, 4, 4, 4, 4],
      instrument: {
        name: 'pad',
        waveform: 'sine',
        volume: 0.08,
        fadeOutDuration: 1.5
      }
    }
  };
