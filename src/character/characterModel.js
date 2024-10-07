import * as THREE from 'three';

const createCharacterModel = (options = {}) => {
  const {
    bodyColor = 0xffcc99, // Skin color
    shirtColor = 0x0000ff, // Blue shirt
    pantsColor = 0x8b4513, // Brown pants
    sizeMultiplier = 1,
  } = options;

  // Create a group to hold all parts of the character
  const character = new THREE.Group();

  // Body (torso)
  const bodyGeometry = new THREE.BoxGeometry(0.6 * sizeMultiplier, 0.8 * sizeMultiplier, 0.3 * sizeMultiplier);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: shirtColor });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);https://oldschool.runescape.wiki/w/Player_character
  character.add(body);

  // Head
  const headGeometry = new THREE.BoxGeometry(0.4 * sizeMultiplier, 0.4 * sizeMultiplier, 0.4 * sizeMultiplier);
  const headMaterial = new THREE.MeshBasicMaterial({ color: bodyColor });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 0.6 * sizeMultiplier, 0);
  character.add(head);

  // Arms
  const armGeometry = new THREE.BoxGeometry(0.2 * sizeMultiplier, 0.6 * sizeMultiplier, 0.2 * sizeMultiplier);
  const armMaterial = new THREE.MeshBasicMaterial({ color: bodyColor });
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.4 * sizeMultiplier, 0, 0);
  rightArm.position.set(0.4 * sizeMultiplier, 0, 0);
  character.add(leftArm, rightArm);

  // Legs
  const legGeometry = new THREE.BoxGeometry(0.25 * sizeMultiplier, 0.7 * sizeMultiplier, 0.25 * sizeMultiplier);
  const legMaterial = new THREE.MeshBasicMaterial({ color: pantsColor });
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.15 * sizeMultiplier, -0.75 * sizeMultiplier, 0);
  rightLeg.position.set(0.15 * sizeMultiplier, -0.75 * sizeMultiplier, 0);
  character.add(leftLeg, rightLeg);

  // Face (simple eyes and mouth)
  const eyeGeometry = new THREE.BoxGeometry(0.05 * sizeMultiplier, 0.05 * sizeMultiplier, 0.05 * sizeMultiplier);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  const rightEye = leftEye.clone();
  leftEye.position.set(-0.1 * sizeMultiplier, 0.6 * sizeMultiplier, 0.21 * sizeMultiplier);
  rightEye.position.set(0.1 * sizeMultiplier, 0.6 * sizeMultiplier, 0.21 * sizeMultiplier);
  character.add(leftEye, rightEye);

  const mouthGeometry = new THREE.BoxGeometry(0.1 * sizeMultiplier, 0.03 * sizeMultiplier, 0.05 * sizeMultiplier);
  const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
  mouth.position.set(0, 0.45 * sizeMultiplier, 0.21 * sizeMultiplier);
  character.add(mouth);

  // Set the forward direction (along positive Z-axis)
  character.userData.forward = new THREE.Vector3(0, 0, 1);

  return character;
};

export { createCharacterModel };