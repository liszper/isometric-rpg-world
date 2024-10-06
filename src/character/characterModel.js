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

  // Body (torso) - made thinner
  const bodyGeometry = new THREE.BoxGeometry(0.6 * sizeMultiplier, 0.9 * sizeMultiplier, 0.3 * sizeMultiplier);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: shirtColor });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  character.add(body);

  // Head - adjusted to be more oval-shaped
  const headGeometry = new THREE.BoxGeometry(0.5 * sizeMultiplier, 0.6 * sizeMultiplier, 0.5 * sizeMultiplier);
  const headMaterial = new THREE.MeshBasicMaterial({ color: bodyColor });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 0.75 * sizeMultiplier, 0);
  character.add(head);

  // Hair - adjusted to fit the new head shape
  const hairGeometry = new THREE.BoxGeometry(0.52 * sizeMultiplier, 0.15 * sizeMultiplier, 0.52 * sizeMultiplier);
  const hairMaterial = new THREE.MeshBasicMaterial({ color: hairColor });
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.set(0, 1.1 * sizeMultiplier, 0);
  character.add(hair);

  // Arms - made thinner and slightly shorter
  const armGeometry = new THREE.BoxGeometry(0.18 * sizeMultiplier, 0.6 * sizeMultiplier, 0.18 * sizeMultiplier);
  const armMaterial = new THREE.MeshBasicMaterial({ color: shirtColor });
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  const rightArm = leftArm.clone();
  leftArm.position.set(-0.38 * sizeMultiplier, 0.15 * sizeMultiplier, 0);
  rightArm.position.set(0.38 * sizeMultiplier, 0.15 * sizeMultiplier, 0);
  character.add(leftArm, rightArm);

  // Belt - adjusted to fit the thinner body
  const beltGeometry = new THREE.BoxGeometry(0.62 * sizeMultiplier, 0.08 * sizeMultiplier, 0.32 * sizeMultiplier);
  const beltMaterial = new THREE.MeshBasicMaterial({ color: beltColor });
  const belt = new THREE.Mesh(beltGeometry, beltMaterial);
  belt.position.set(0, -0.45 * sizeMultiplier, 0);
  character.add(belt);

  // Legs - made thinner and slightly longer
  const legGeometry = new THREE.BoxGeometry(0.25 * sizeMultiplier, 1.4 * sizeMultiplier, 0.25 * sizeMultiplier);
  const legMaterial = new THREE.MeshBasicMaterial({ color: pantsColor });
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-0.15 * sizeMultiplier, -1.15 * sizeMultiplier, 0);
  rightLeg.position.set(0.15 * sizeMultiplier, -1.15 * sizeMultiplier, 0);
  character.add(leftLeg, rightLeg);

  // Eyes - adjusted position for the new head shape
  const eyeGeometry = new THREE.BoxGeometry(0.15 * sizeMultiplier, 0.05 * sizeMultiplier, 0.05 * sizeMultiplier);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  const rightEye = leftEye.clone();
  leftEye.position.set(-0.12 * sizeMultiplier, 0.8 * sizeMultiplier, 0.25 * sizeMultiplier);
  rightEye.position.set(0.12 * sizeMultiplier, 0.8 * sizeMultiplier, 0.25 * sizeMultiplier);
  character.add(leftEye, rightEye);

  // Hands - adjusted position for thinner arms
  const handGeometry = new THREE.BoxGeometry(0.12 * sizeMultiplier, 0.12 * sizeMultiplier, 0.12 * sizeMultiplier);
  const handMaterial = new THREE.MeshBasicMaterial({ color: bodyColor });
  const leftHand = new THREE.Mesh(handGeometry, handMaterial);
  const rightHand = leftHand.clone();
  leftHand.position.set(-0.45 * sizeMultiplier, -0.15 * sizeMultiplier, 0);
  rightHand.position.set(0.45 * sizeMultiplier, -0.15 * sizeMultiplier, 0);
  character.add(leftHand, rightHand);

  // Feet - adjusted to be slightly smaller
  const footGeometry = new THREE.BoxGeometry(0.3 * sizeMultiplier, 0.15 * sizeMultiplier, 0.5 * sizeMultiplier);
  const footMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
  const rightFoot = leftFoot.clone();
  leftFoot.position.set(-0.15 * sizeMultiplier, -1.9 * sizeMultiplier, 0.1 * sizeMultiplier);
  rightFoot.position.set(0.15 * sizeMultiplier, -1.9 * sizeMultiplier, 0.1 * sizeMultiplier);
  character.add(leftFoot, rightFoot);

  character.userData.forward = new THREE.Vector3(0, 0, 1);

  return character;
};

export { createCharacterModel };