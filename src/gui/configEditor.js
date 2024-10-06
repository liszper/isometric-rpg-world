import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const createConfigEditor = (gameConfig, updateGame) => {
    const gui = new GUI({ closed: true });

    const addFolder = (name, params, path = '') => {
      const folder = gui.addFolder(name);
      Object.entries(params).forEach(([key, value]) => {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          addFolder(key, value, newPath);
        } else {
          folder.add(params, key).onChange((newValue) => {
            updateGame(newPath, newValue);
          });
        }
      });
      return folder; // Return the created folder
    };
  
    // Lights and Sky controls
    const environmentFolder = gui.addFolder('Environment');
    environmentFolder.close(); // Close the Environment folder by default
    
    // Sky and Sun controls
    const skyFolder = environmentFolder.addFolder('Sky & Sun');
    
    skyFolder.add(gameConfig.sky, 'turbidity', 0, 20).onChange(value => updateGame('sky.turbidity', value));
    skyFolder.add(gameConfig.sky, 'rayleigh', 0, 4).onChange(value => updateGame('sky.rayleigh', value));
    skyFolder.add(gameConfig.sky, 'mieCoefficient', 0, 0.1).onChange(value => updateGame('sky.mieCoefficient', value));
    skyFolder.add(gameConfig.sky, 'mieDirectionalG', 0, 1).onChange(value => updateGame('sky.mieDirectionalG', value));
    skyFolder.add(gameConfig.sky, 'elevation', 0, 90).onChange(value => updateGame('sky.elevation', value));
    skyFolder.add(gameConfig.sky, 'azimuth', 0, 360).onChange(value => updateGame('sky.azimuth', value));
    skyFolder.add(gameConfig.sky, 'exposure', 0, 1).onChange(value => updateGame('sky.exposure', value));
  
    // Sun light intensity
    skyFolder.add(gameConfig.lights.sun, 'intensity', 0, 10).onChange((value) => {
      updateGame('lights.sun.intensity', value);
    });
  
    // Ambient light
    const ambientFolder = environmentFolder.addFolder('Ambient Light');
    ambientFolder.add(gameConfig.lights.ambient, 'intensity', 0, 1).onChange((value) => {
      updateGame('lights.ambient.intensity', value);
    });
  
    // addFolder('World', gameConfig.world, 'world'); doesn't work properly because of the heightmap
    const npcsFolder = addFolder('NPCs', gameConfig.npcs, 'npcs');
    npcsFolder.close(); // Close the NPCs folder by default

    return gui;
};

export { createConfigEditor };