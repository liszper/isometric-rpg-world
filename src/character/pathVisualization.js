import * as THREE from 'three';
import { smoothedTerrainHeight } from '../character';

const createPathVisualization = (world) => {
  const pathNodeGroup = new THREE.Group();
  world.add(pathNodeGroup);

  // Memoize path node creation
  const pathNodeCache = new Map();
  const getPathNode = (coords) => {
    const key = `${coords.x},${coords.y}`;
    if (!pathNodeCache.has(key)) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
      );
      const terrainHeight = smoothedTerrainHeight(world.heightMap, coords.x + 0.5, coords.y + 0.5);
      node.position.set(coords.x + 0.5, terrainHeight + 0.1, coords.y + 0.5);
      pathNodeCache.set(key, node);
    }
    return pathNodeCache.get(key);
  };

  const visualizePath = (path) => {
    // Clear existing path nodes
    while (pathNodeGroup.children.length > 0) {
      pathNodeGroup.remove(pathNodeGroup.children[0]);
    }

    // Add new path nodes
    path.forEach(coords => {
      const node = getPathNode(coords);
      pathNodeGroup.add(node);
    });
  };

  return {
    visualizePath,
    updatePathNodes: (player) => {
      // Get the current path
      const currentPath = player.getPath();
      
      // Get the current position and path index
      const currentPathIndex = player.getCurrentPathIndex();

      // Visualize the remaining path
      visualizePath(currentPath.slice(currentPathIndex));
    }
  };
};

export { createPathVisualization };
