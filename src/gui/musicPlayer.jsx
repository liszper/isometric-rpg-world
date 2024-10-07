import { h } from 'preact';
import { useState } from 'preact/hooks';
import { playLoopingSoundtrack, pauseSoundtrack } from '../sounds.js';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (event) => {
    event.stopPropagation();
    if (!isPlaying) {
      playLoopingSoundtrack();
      setIsPlaying(true);
      console.log('Playing looping soundtrack');
    } else {
      pauseSoundtrack();
      setIsPlaying(false);
      console.log('Paused soundtrack');
    }
  };

  return (
    <div style={playerContainerStyle} onMouseDown={(e) => e.stopPropagation()}>
      <button onClick={handlePlay} style={playButtonStyle}>
        {isPlaying ? 'Pause Soundtrack' : 'Play Soundtrack'}
      </button>
    </div>
  );
};

const playerContainerStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  zIndex: '1001',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '10px',
  borderRadius: '10px'
};

const playButtonStyle = {
  padding: '5px 10px'
};

export { MusicPlayer };