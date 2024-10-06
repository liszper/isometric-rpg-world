import { createMusicPlayer } from './gui/musicPlayer.js';
import { createConfigEditor } from './gui/configEditor.js';
import { createInventory } from './gui/inventory.js';
import { createMinimap } from './gui/minimap.js';
import { createChatBox } from './gui/chatBox.js';

const createGUI = (gameConfig, updateGame) => {
  const guiContainer = document.createElement('div');
  guiContainer.id = 'game-gui';
  guiContainer.style.position = 'absolute';
  guiContainer.style.top = '0';
  guiContainer.style.right = '0';
  guiContainer.style.bottom = '0';
  guiContainer.style.width = '200px'; // Adjust as needed
  guiContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  guiContainer.style.color = 'white';
  guiContainer.style.fontFamily = 'Arial, sans-serif';
  guiContainer.style.fontSize = '12px';
  guiContainer.style.zIndex = '1001';

  // Create and append GUI components
  const minimap = createMinimap();
  const inventory = createInventory();
  const chatBox = createChatBox();

  guiContainer.appendChild(minimap);
  guiContainer.appendChild(inventory);
  document.body.appendChild(chatBox);
  document.body.appendChild(guiContainer);

  // Create the config editor (you may want to hide this in the final version)
  createConfigEditor(gameConfig, updateGame);
  // Create the music player (you may want to integrate this differently)
  createMusicPlayer();

  return guiContainer;
};

export { createGUI };