import * as THREE from 'three';
import { Vector3 } from 'three';
import { createCharacter } from './character';
import { createPathVisualization } from './character/pathVisualization';

const createPlayer = (camera, world, playerConfig = {}) => {
  
  const initialX = playerConfig.initialPosition.x;
  const initialZ = playerConfig.initialPosition.z;
  const terrainHeight = world.heightMap[Math.floor(initialZ)][Math.floor(initialX)];
  const initialPosition = new Vector3(initialX, terrainHeight + 0.5, initialZ);

  const playerOptions = {
    geometry: new THREE.CapsuleGeometry(0.25, 0.5),
    material: new THREE.MeshStandardMaterial({ color: 0x4040c0 }),
    moveSpeed: playerConfig.moveSpeed,
    usePathfinding: true
  };

  const player = createCharacter(initialPosition, world, playerOptions);

  // Pre-create reusable objects
  const raycaster = new THREE.Raycaster();
  const mouseCoords = new THREE.Vector2();
  const targetPosition = new Vector3();

  const pathVisualization = createPathVisualization(world);

  const update = (deltaTime) => {
    player.update(deltaTime);
    pathVisualization.updatePathNodes(player);
    updateCamera(player.getPosition());
  };

  const onMouseDown = (event) => {
    mouseCoords.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouseCoords, camera);
    const intersections = raycaster.intersectObject(world.terrain);

    if (intersections.length > 0) {
      targetPosition.set(intersections[0].point.x, 0.5, intersections[0].point.z);
      player.setTargetPosition(targetPosition);
      pathVisualization.visualizePath(player.getPath());
    }
  };

  window.addEventListener('mousedown', onMouseDown);

  const updateCamera = (position) => {
    camera.position.x = position.x;
    camera.position.y = position.y + playerConfig.cameraOffset.y;
    camera.position.z = position.z + playerConfig.cameraOffset.z;
    camera.lookAt(position);
  };

  return {
    ...player,
    update,
    mesh: player.mesh,
    getPosition: () => player.getPosition(),
    setPosition: (newPosition) => {
      player.mesh.position.copy(newPosition);
      player.setTargetPosition(newPosition);
    }
  };
};

export { createPlayer };