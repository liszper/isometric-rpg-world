import * as THREE from 'three';

const createCharacterModel = (options = {}) => {
  const {
    skinColor = 0xffcc99,
    hairColor = 0x8b4513,
    shirtColor = 0x0000ff,
    pantsColor = 0x1e1e1e,
    sizeMultiplier = 1,
  } = options;

  const character = new THREE.Group();

  // Body (torso)
  const bodyGeometry = new THREE.CylinderGeometry(0.3 * sizeMultiplier, 0.25 * sizeMultiplier, 0.8 * sizeMultiplier, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: shirtColor });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.4 * sizeMultiplier;
  character.add(body);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.2 * sizeMultiplier, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({ color: skinColor });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 0.9 * sizeMultiplier;
  character.add(head);

  // Hair
  const hairGeometry = new THREE.SphereGeometry(0.21 * sizeMultiplier, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const hairMaterial = new THREE.MeshStandardMaterial({ color: hairColor });
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.y = 0.9 * sizeMultiplier;
  character.add(hair);

  // Arms
  const armGeometry = new THREE.CylinderGeometry(0.05 * sizeMultiplier, 0.05 * sizeMultiplier, 0.6 * sizeMultiplier, 16);
  const armMaterial = new THREE.MeshStandardMaterial({ color: skinColor });
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.35 * sizeMultiplier, 0.4 * sizeMultiplier, 0);
  rightArm.position.set(0.35 * sizeMultiplier, 0.4 * sizeMultiplier, 0);
  leftArm.rotation.z = 0.1;
  rightArm.rotation.z = -0.1;
  character.add(leftArm, rightArm);

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.07 * sizeMultiplier, 0.05 * sizeMultiplier, 0.7 * sizeMultiplier, 16);
  const legMaterial = new THREE.MeshStandardMaterial({ color: pantsColor });
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.1 * sizeMultiplier, -0.35 * sizeMultiplier, 0);
  rightLeg.position.set(0.1 * sizeMultiplier, -0.35 * sizeMultiplier, 0);
  character.add(leftLeg, rightLeg);

  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(0.025 * sizeMultiplier, 16, 16);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  const rightEye = leftEye.clone();
  leftEye.position.set(-0.07 * sizeMultiplier, 0.93 * sizeMultiplier, 0.15 * sizeMultiplier);
  rightEye.position.set(0.07 * sizeMultiplier, 0.93 * sizeMultiplier, 0.15 * sizeMultiplier);
  character.add(leftEye, rightEye);

  // Pupils
  const pupilGeometry = new THREE.SphereGeometry(0.01 * sizeMultiplier, 8, 8);
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  const rightPupil = leftPupil.clone();
  leftPupil.position.set(-0.07 * sizeMultiplier, 0.93 * sizeMultiplier, 0.17 * sizeMultiplier);
  rightPupil.position.set(0.07 * sizeMultiplier, 0.93 * sizeMultiplier, 0.17 * sizeMultiplier);
  character.add(leftPupil, rightPupil);

  // Mouth
  const mouthGeometry = new THREE.TorusGeometry(0.03 * sizeMultiplier, 0.01 * sizeMultiplier, 8, 16, Math.PI);
  const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
  const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
  mouth.position.set(0, 0.83 * sizeMultiplier, 0.15 * sizeMultiplier);
  mouth.rotation.x = -Math.PI / 2;
  character.add(mouth);

  // Set the forward direction (along positive Z-axis)
  character.userData.forward = new THREE.Vector3(0, 0, 1);

  return character;
};

export { createCharacterModel };