import { Vector3 } from 'three';
import { createCharacter } from './character';
import { createCharacterModel } from './character/characterModel';

const createNPC = (initialPosition, world) => {
  // Generate random color
  const randomColor = Math.random() * 0xFFFFFF;
  
  // Generate random size (0.8 to 1.2 times the original size)
  const sizeMultiplier = 0.8 + Math.random() * 0.4;

  const { geometry, material } = createCharacterModel(randomColor, sizeMultiplier);

  const npcOptions = {
    geometry,
    material,
    moveSpeed: 2,
    usePathfinding: true
  };

  const npc = createCharacter(initialPosition, world, npcOptions);

  const chooseNewDestination = () => {
    const x = Math.floor(Math.random() * world.width);
    const z = Math.floor(Math.random() * world.height);
    return new Vector3(x + 0.5, 0.5, z + 0.5);
  };

  const update = (deltaTime) => {
    npc.update(deltaTime);

    if (!npc.isMoving()) {
      if (Math.random() < 0.01) { // 1% chance to start moving when idle
        const newDestination = chooseNewDestination();
        npc.setTargetPosition(newDestination);
      }
    }
  };

  // Immediately set a random destination for the NPC
  const initialDestination = chooseNewDestination();
  npc.setTargetPosition(initialDestination);

  return {
    mesh: npc.mesh,
    update,
    isMoving: npc.isMoving,
    setTargetPosition: npc.setTargetPosition
  };
};

const createNPCs = (count, world) => {
  let npcs = [];

  const addNPC = () => {
    const initialPosition = new Vector3(
      Math.random() * world.width,
      0.5,
      Math.random() * world.height
    );
    const newNPC = createNPC(initialPosition, world);
    npcs.push(newNPC);
    return newNPC.mesh;
  };

  // Create initial NPCs
  for (let i = 0; i < count; i++) {
    addNPC();
  }

  return {
    update: (deltaTime) => npcs.forEach(npc => npc.update(deltaTime)),
    getMeshes: () => npcs.map(npc => npc.mesh),
    addNPC: () => {
      const newNPCMesh = addNPC();
      return newNPCMesh;
    },
    removeNPC: () => {
      if (npcs.length > 0) {
        const removedNPC = npcs.pop();
        return removedNPC.mesh;
      }
      return null;
    },
    getCount: () => npcs.length
  };
};

export { createNPCs };