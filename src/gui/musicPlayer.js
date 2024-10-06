import { playLoopingSoundtrack, pauseSoundtrack, resumeSoundtrack } from '../sounds.js';

const createMusicPlayer = () => {
  const playerContainer = document.createElement('div');
  playerContainer.style.position = 'absolute';
  playerContainer.style.bottom = '20px';
  playerContainer.style.right = '20px';
  playerContainer.style.zIndex = '1001';
  playerContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  playerContainer.style.padding = '10px';
  playerContainer.style.borderRadius = '10px';

  // Prevent click-through
  playerContainer.addEventListener('mousedown', (event) => {
    event.stopPropagation();
  });

  const playButton = document.createElement('button');
  playButton.textContent = 'Play Soundtrack';
  playButton.style.padding = '5px 10px';

  let isPlaying = false;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const handlePlay = (event) => {
    event.stopPropagation();
    if (!isPlaying) {
      playLoopingSoundtrack();
      playButton.textContent = 'Pause Soundtrack';
      isPlaying = true;
      console.log('Playing looping soundtrack');
    } else {
      pauseSoundtrack();
      playButton.textContent = 'Resume Soundtrack';
      isPlaying = false;
      console.log('Paused soundtrack');
    }
  };

  playButton.addEventListener('click', handlePlay);

  // Remove track selector and stop button
  playerContainer.appendChild(playButton);

  document.body.appendChild(playerContainer);
};

export { createMusicPlayer };