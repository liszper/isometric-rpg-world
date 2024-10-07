import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const Minimap = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    // Simulate fetching or generating map data
    const initialMapData = generateMapData();
    setMapData(initialMapData);
  }, []);

  const generateMapData = () => {
    // This function would generate or fetch the map data
    // For simplicity, we'll return a static array
    return [
      ['.', '.', '.', '#', '#'],
      ['.', '#', '.', '.', '.'],
      ['#', '.', '.', '#', '.'],
      ['.', '.', '#', '.', '.'],
      ['#', '#', '.', '.', '.']
    ];
  };

  return (
    <div id="minimap" style={minimapStyle}>
      <h2>Minimap</h2>
      <div style={mapGridStyle}>
        {mapData.map((row, rowIndex) => (
          <div key={rowIndex} style={mapRowStyle}>
            {row.map((cell, cellIndex) => (
              <span key={cellIndex} style={cell === '#' ? wallStyle : pathStyle}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const minimapStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: '150px',
  height: '150px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #5D4E3C',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  padding: '10px',
  overflow: 'hidden'
};

const mapGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '2px'
};

const mapRowStyle = {
  display: 'flex'
};

const wallStyle = {
  backgroundColor: '#5D4E3C',
  width: '20px',
  height: '20px',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '20px'
};

const pathStyle = {
  backgroundColor: '#fff',
  width: '20px',
  height: '20px',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '20px'
};

export { Minimap };