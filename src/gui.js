import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { createMusicPlayer } from './gui/musicPlayer.js';
import { createConfigEditor } from './gui/configEditor.js';

const createGUI = (gameConfig, updateGame) => {
  const gui = new GUI();
  
  // Set GUI to be on top and prevent click-through
  gui.domElement.style.zIndex = '1001';
  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '0';
  gui.domElement.style.right = '0';

  // Add event listener to stop propagation of mouse events
  gui.domElement.addEventListener('mousedown', (event) => {
    event.stopPropagation();
  });

  // Create the config editor
  createConfigEditor(gui, gameConfig, updateGame);

  // Create the music player
  createMusicPlayer();

  return gui;
};

export { createGUI };