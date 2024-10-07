import * as THREE from 'three';

const createCharacterModel = (options = {}) => {
  const {
    bodyColor = 0xd2a77d,
    shirtColor = 0x2e8b57,
    pantsColor = 0x1a1a1a,
    hairColor = 0x4a3728,
    beltColor = 0x8B4513,
    sizeMultiplier = 0.7,
  } = options;

  const character = new THREE.Group();

  // Body (torso) - made much smaller
  const bodyGeometry = new THREE.BoxGeometry(0.4 * sizeMultiplier, 0.6 * sizeMultiplier, 0.2 * sizeMultiplier);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: shirtColor });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, 0.5 * sizeMultiplier, 0);
  character.add(body);

  // Head - adjusted position for smaller torso
  const headGeometry = new THREE.SphereGeometry(0.16 * sizeMultiplier, 60, 32);
  const headMaterial = new THREE.MeshBasicMaterial({ color: bodyColor });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.scale.set(1, 1.2, 0.8); // Adjust scale for oval shape
  head.position.set(0, 1 * sizeMultiplier, 0);
  character.add(head);

  const eyeGeometry = new THREE.BoxGeometry(0.06 * sizeMultiplier, 0.02 * sizeMultiplier, 0.02 * sizeMultiplier);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  const rightEye = leftEye.clone();
  leftEye.position.set(-0.07 * sizeMultiplier, 1.02 * sizeMultiplier, 0.14 * sizeMultiplier);
  rightEye.position.set(0.07 * sizeMultiplier, 1.02 * sizeMultiplier, 0.14 * sizeMultiplier);
  character.add(leftEye, rightEye);

  // Hair - adjusted for new head position
  const hairGeometry = new THREE.BoxGeometry(0.34 * sizeMultiplier, 0.1 * sizeMultiplier, 0.26 * sizeMultiplier);
  const hairMaterial = new THREE.MeshBasicMaterial({ color: hairColor });
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.set(0, 1.1 * sizeMultiplier, 0);
  character.add(hair);

  // Arms - made slightly longer and thinner
  const upperArmGeometry = new THREE.BoxGeometry(0.08 * sizeMultiplier, 0.35 * sizeMultiplier, 0.08 * sizeMultiplier);
  const forearmGeometry = new THREE.BoxGeometry(0.07 * sizeMultiplier, 0.35 * sizeMultiplier, 0.07 * sizeMultiplier);
  const armMaterial = new THREE.MeshBasicMaterial({ color: shirtColor });

  // Left Arm
  const leftUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
  const leftForearm = new THREE.Mesh(forearmGeometry, armMaterial);
  leftUpperArm.position.set(-0.24 * sizeMultiplier, 0.55 * sizeMultiplier, 0);
  leftForearm.position.set(-0.24 * sizeMultiplier, 0.2 * sizeMultiplier, 0);
  character.add(leftUpperArm, leftForearm);

  // Right Arm
  const rightUpperArm = leftUpperArm.clone();
  const rightForearm = leftForearm.clone();
  rightUpperArm.position.set(0.24 * sizeMultiplier, 0.55 * sizeMultiplier, 0);
  rightForearm.position.set(0.24 * sizeMultiplier, 0.2 * sizeMultiplier, 0);
  character.add(rightUpperArm, rightForearm);

  // Hands - adjusted position for new arm structure
  const handGeometry = new THREE.BoxGeometry(0.06 * sizeMultiplier, 0.06 * sizeMultiplier, 0.06 * sizeMultiplier);
  const handMaterial = new THREE.MeshBasicMaterial({ color: bodyColor });
  const leftHand = new THREE.Mesh(handGeometry, handMaterial);
  const rightHand = leftHand.clone();
  leftHand.position.set(-0.24 * sizeMultiplier, 0.05 * sizeMultiplier, 0);
  rightHand.position.set(0.24 * sizeMultiplier, 0.05 * sizeMultiplier, 0);
  character.add(leftHand, rightHand);

  // Belt - adjusted for new body size
  const beltGeometry = new THREE.BoxGeometry(0.42 * sizeMultiplier, 0.06 * sizeMultiplier, 0.22 * sizeMultiplier);
  const beltMaterial = new THREE.MeshBasicMaterial({ color: beltColor });
  const belt = new THREE.Mesh(beltGeometry, beltMaterial);
  belt.position.set(0, 0.25 * sizeMultiplier, 0);
  character.add(belt);

  // Legs - made slightly longer and thinner
  const legGeometry = new THREE.BoxGeometry(0.12 * sizeMultiplier, 0.8 * sizeMultiplier, 0.12 * sizeMultiplier);
  const legMaterial = new THREE.MeshBasicMaterial({ color: pantsColor });
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.1 * sizeMultiplier, -0.1 * sizeMultiplier, 0);
  rightLeg.position.set(0.1 * sizeMultiplier, -0.1 * sizeMultiplier, 0);
  character.add(leftLeg, rightLeg);
  // Feet - adjusted for longer legs
  const footGeometry = new THREE.BoxGeometry(0.16 * sizeMultiplier, 0.08 * sizeMultiplier, 0.25 * sizeMultiplier);
  const footMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
  const rightFoot = leftFoot.clone();
  leftFoot.position.set(-0.1 * sizeMultiplier, -0.5 * sizeMultiplier, 0.06 * sizeMultiplier);
  rightFoot.position.set(0.1 * sizeMultiplier, -0.5 * sizeMultiplier, 0.06 * sizeMultiplier);
  character.add(leftFoot, rightFoot);

  character.userData.forward = new THREE.Vector3(0, 0, 1);

  return character;
};

export { createCharacterModel };