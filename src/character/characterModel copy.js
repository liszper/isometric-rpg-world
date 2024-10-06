import * as THREE from 'three';

const createCharacterModel = (options = {}) => {
  const {
    bodyColor = 0x4040c0,
    eyeColor = 0xffffff,
    noseColor = 0xff0000,
    sizeMultiplier = 1,
    geometry = new THREE.CapsuleGeometry(0.25 * sizeMultiplier, 0.5 * sizeMultiplier),
  } = options;

  const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor });
  const mesh = new THREE.Mesh(geometry, bodyMaterial);

  // Create a nose to indicate direction
  const noseGeometry = new THREE.ConeGeometry(0.05 * sizeMultiplier, 0.2 * sizeMultiplier, 16);
  const noseMaterial = new THREE.MeshStandardMaterial({ color: noseColor });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, 0.25 * sizeMultiplier, 0.25 * sizeMultiplier);

  // Create eyes
  const eyeGeometry = new THREE.SphereGeometry(0.05 * sizeMultiplier);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: eyeColor });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  const rightEye = leftEye.clone();
  leftEye.position.set(-0.1 * sizeMultiplier, 0.3 * sizeMultiplier, 0.2 * sizeMultiplier);
  rightEye.position.set(0.1 * sizeMultiplier, 0.3 * sizeMultiplier, 0.2 * sizeMultiplier);

  // Create arms
  const armGeometry = new THREE.CapsuleGeometry(0.05 * sizeMultiplier, 0.3 * sizeMultiplier);
  const armMaterial = new THREE.MeshStandardMaterial({ color: bodyColor });
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.3 * sizeMultiplier, 0, 0);
  rightArm.position.set(0.3 * sizeMultiplier, 0, 0);
  leftArm.rotation.z = Math.PI / 4;
  rightArm.rotation.z = -Math.PI / 4;

  // Create a group to hold all parts of the character
  const character = new THREE.Group();
  character.add(mesh, nose, leftEye, rightEye, leftArm, rightArm);

  // Set the forward direction to match the nose (along positive Z-axis)
  character.userData.forward = new THREE.Vector3(0, 0, 1);

  return character;
};

export { createCharacterModel };