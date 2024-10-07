import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';
import { MusicPlayer } from './gui/musicPlayer.jsx';
import { ConfigEditor } from './gui/configEditor.jsx';
import { Inventory } from './gui/inventory.jsx';
import { Minimap } from './gui/minimap.jsx';
import { ChatBox } from './gui/chatBox.jsx';

const GUI = ({ gameConfig, updateGame }) => {
  useEffect(() => {
    // Initialize any necessary side effects or configurations
    // If ConfigEditor or MusicPlayer need to be initialized differently, handle it here
  }, [gameConfig, updateGame]);

  const handleClick = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  return (
    <div id="game-gui" 
      onClick={handleClick}
      onMouseDown={handleClick}
      onMouseUp={handleClick}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        zIndex: '1001',
        pointerEvents: 'auto'
      }}
    >
      <ConfigEditor gameConfig={gameConfig} updateGame={updateGame} />
      <Inventory />
    </div>
  );
};

//      <MusicPlayer />
//      <Minimap />
//      <ChatBox />
// Ensure the GUI component is exported
export default GUI;