import * as THREE from 'three';

const createCharacterModel = (options = {}) => {
  const {
    debugName = 'Unnamed',
    bodyColor = 0x4040c0,
    eyeColor = 0xffffff,
    noseColor = 0xff0000,
    sizeMultiplier = 1,
    geometryType = 'capsule',
    // Add other options as needed
  } = options;
  // Create geometry based on geometryType
  let geometry;
  switch (geometryType) {
    case 'capsule':
      geometry = new THREE.CapsuleGeometry(0.25 * sizeMultiplier, 0.5 * sizeMultiplier);
      break;
    case 'box':
      geometry = new THREE.BoxGeometry(0.5 * sizeMultiplier, 1 * sizeMultiplier, 0.5 * sizeMultiplier);
      break;
    case 'sphere':
      geometry = new THREE.SphereGeometry(0.5 * sizeMultiplier, 32, 32);
      break;
    // Add more geometry types as desired
    default:
      geometry = new THREE.CapsuleGeometry(0.25 * sizeMultiplier, 0.5 * sizeMultiplier);
  }

  // Create body - ensure a new material instance is created per NPC
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor });
  const mesh = new THREE.Mesh(geometry, bodyMaterial);

  // Adjust positions based on geometry type
  let eyeYPosition, eyeZPosition, noseZPosition, armYPosition;
  switch (geometryType) {
    case 'capsule':
      eyeYPosition = 0.3 * sizeMultiplier;
      eyeZPosition = 0.2 * sizeMultiplier;
      noseZPosition = 0.25 * sizeMultiplier;
      armYPosition = 0;
      break;
    case 'box':
      eyeYPosition = 0.25 * sizeMultiplier;
      eyeZPosition = 0.26 * sizeMultiplier;
      noseZPosition = 0.26 * sizeMultiplier;
      armYPosition = -0.15 * sizeMultiplier;
      break;
    case 'sphere':
      eyeYPosition = 0.2 * sizeMultiplier;
      eyeZPosition = 0.4 * sizeMultiplier;
      noseZPosition = 0.45 * sizeMultiplier;
      armYPosition = -0.1 * sizeMultiplier;
      break;
    default:
      eyeYPosition = 0.3 * sizeMultiplier;
      eyeZPosition = 0.2 * sizeMultiplier;
      noseZPosition = 0.25 * sizeMultiplier;
      armYPosition = 0;
  }

  // Create a nose to indicate direction
  const noseGeometry = new THREE.ConeGeometry(0.05 * sizeMultiplier, 0.2 * sizeMultiplier, 16);
  const noseMaterial = new THREE.MeshStandardMaterial({ color: noseColor });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, eyeYPosition, noseZPosition);

  // Create eyes - ensure materials are unique
  const eyeGeometry = new THREE.SphereGeometry(0.05 * sizeMultiplier, 16, 16);
  const leftEyeMaterial = new THREE.MeshStandardMaterial({ color: eyeColor });
  const rightEyeMaterial = new THREE.MeshStandardMaterial({ color: eyeColor });
  const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
  const rightEye = new THREE.Mesh(eyeGeometry.clone(), rightEyeMaterial);
  leftEye.position.set(-0.1 * sizeMultiplier, eyeYPosition, eyeZPosition);
  rightEye.position.set(0.1 * sizeMultiplier, eyeYPosition, eyeZPosition);

  // Create arms - ensure materials are unique
  const armGeometry = new THREE.CapsuleGeometry(0.05 * sizeMultiplier, 0.3 * sizeMultiplier);
  const leftArmMaterial = new THREE.MeshStandardMaterial({ color: bodyColor });
  const rightArmMaterial = new THREE.MeshStandardMaterial({ color: bodyColor });
  const leftArm = new THREE.Mesh(armGeometry, leftArmMaterial);
  const rightArm = new THREE.Mesh(armGeometry.clone(), rightArmMaterial);
  leftArm.position.set(-0.3 * sizeMultiplier, armYPosition, 0);
  rightArm.position.set(0.3 * sizeMultiplier, armYPosition, 0);
  leftArm.rotation.z = Math.PI / 4;
  rightArm.rotation.z = -Math.PI / 4;

  // Create a group to hold all parts of the character
  const character = new THREE.Group();
  character.add(mesh, nose, leftEye, rightEye, leftArm, rightArm);

  // Optionally add other randomized features, such as hats, accessories, etc.
  // Example: Randomly add a hat
  if (Math.random() < 0.5) {
    const hatGeometry = new THREE.CylinderGeometry(0.15 * sizeMultiplier, 0.15 * sizeMultiplier, 0.1 * sizeMultiplier, 16);
    const hatMaterial = new THREE.MeshStandardMaterial({ color: Math.floor(Math.random() * 0xFFFFFF) });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(0, 0.55 * sizeMultiplier, 0);
    character.add(hat);
  }

  // Set the forward direction to match the nose (along positive Z-axis)
  character.userData.forward = new THREE.Vector3(0, 0, 1);

  return character;
};

export { createCharacterModel };