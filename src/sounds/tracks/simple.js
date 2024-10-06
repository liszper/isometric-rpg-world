
// New data structure for soundtrack configuration
export const SOUNDTRACK_CONFIG = {
    melody: {
      notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4'],
      durations: [0.25, 0.25, 0.25, 0.5, 0.25, 0.5],
      instrument: {
        name: 'lead',
        waveform: 'square',
        volume: 0.2,
        fadeOutDuration: 0.2
      }
    },
    bass: {
      notes: ['C4', 'C4', 'G3', 'G3'],
      durations: [0.5, 0.5, 0.5, 0.5],
      instrument: {
        name: 'bass',
        waveform: 'sawtooth',
        volume: 0.1,
        fadeOutDuration: 0.5
      }
    },
    harmony: {
      notes: ['E4', 'G4', 'B4', 'D5'],
      durations: [0.5, 0.5, 0.5, 0.5],
      instrument: {
        name: 'pad',
        waveform: 'triangle',
        volume: 0.2,
        fadeOutDuration: 0.3
      }
    },
    drums: {
      notes: ['C2', 'C2', 'E2', 'C2'],
      durations: [0.25, 0.25, 0.25, 0.25],
      instrument: {
        name: 'drums',
        waveform: 'drum',
        volume: 1,
        fadeOutDuration: 0.1
      }
    }
  };
  