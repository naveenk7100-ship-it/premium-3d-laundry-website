import * as THREE from 'three';

// Procedural Canvas Texture Generators for Fast Loading & High Visual Fidelity
export function createFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm light grey-beige terrazzo base
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle multi-tone terrazzo stone flecks
  const colors = ['#cbd5e1', '#94a3b8', '#64748b', '#f1f5f9', '#f8fafc', '#fed7aa', '#fbcfe8', '#cbd5e1'];
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = Math.random() * 2.2 + 0.5;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Modern 1.2m polished porcelain tile grout lines
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 2;
  const tileSize = 256;
  for (let x = 0; x <= 1024; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 24);
  return texture;
}

export function createWoodSlatsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark acoustic backing
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 512, 512);

  // Warm blonde oak vertical slats
  const slatWidth = 16;
  const gap = 8;
  for (let x = 0; x < 512; x += slatWidth + gap) {
    const grad = ctx.createLinearGradient(x, 0, x + slatWidth, 0);
    grad.addColorStop(0, '#d4a373');
    grad.addColorStop(0.5, '#faedcd');
    grad.addColorStop(1, '#c59b6d');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, slatWidth, 512);

    // Realistic wood grain lines
    ctx.fillStyle = 'rgba(139, 94, 60, 0.15)';
    for (let i = 0; i < 5; i++) {
      const gx = x + Math.random() * slatWidth;
      ctx.fillRect(gx, 0, 1.2, 512);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 2);
  return texture;
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  return new THREE.CanvasTexture(canvas);
}

export function createDigitalPanelTexture(text: string, time: string, temp: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 256, 128);

  // Subtle cyan grid
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 128; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Cyan glowing digits
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 26px "Courier New", monospace';
  ctx.fillText(time, 16, 38);

  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText(text, 16, 70);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText(temp, 16, 100);

  // Active status LED
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(230, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

export function createStoreSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1024, 256);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 1004, 236);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  ctx.fillText('AURA ATELIER', 512, 105);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px sans-serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('ORGANIC LAUNDRY & DRY CLEANING', 512, 175);

  return new THREE.CanvasTexture(canvas);
}

export function createPosterTexture(title: string, subtitle: string, iconColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 768);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 8;
  ctx.strokeRect(16, 16, 480, 736);

  ctx.fillStyle = iconColor;
  ctx.beginPath();
  ctx.arc(256, 260, 95, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(256, 260, 58, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 460);

  ctx.fillStyle = '#64748b';
  ctx.font = '20px sans-serif';
  ctx.fillText(subtitle, 256, 510);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('ECO-CERTIFIED • ZERO PERC • OZONE SANITIZED', 256, 680);

  return new THREE.CanvasTexture(canvas);
}

export interface LaundryWorldObjects {
  doorLeft: THREE.Mesh;
  doorRight: THREE.Mesh;
  washerDrum: THREE.Group;
  washerClothes: THREE.Group;
  washerBubbles: THREE.Points;
  washerWaterMesh: THREE.Mesh;
  dryerDrums: THREE.Group[];
  dryerCoilLights: THREE.PointLight[];
  steamParticles: THREE.Points;
  dustParticles: THREE.Points;
  signMesh: THREE.Mesh;
  activeWasherSpotlight: THREE.SpotLight;
  foldingGarment: THREE.Group;
  packagingBagGarment: THREE.Group;
  deliveryParcel: THREE.Mesh;
}

export function buildLaundryWorld(scene: THREE.Scene): LaundryWorldObjects {
  const floorTexture = createFloorTexture();
  const slatsTexture = createWoodSlatsTexture();
  const signTexture = createStoreSignTexture();
  const shadowTexture = createContactShadowTexture();

  // Helper function to add realistic grounding contact shadows
  const addContactShadow = (x: number, z: number, w: number, d: number, opacity: number = 0.6) => {
    const shadowGeo = new THREE.PlaneGeometry(w, d);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(x, 0.005, z);
    scene.add(shadowMesh);
  };

  // Materials
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.22,
    metalness: 0.12,
  });

  const woodSlatsMaterial = new THREE.MeshStandardMaterial({
    map: slatsTexture,
    roughness: 0.6,
    metalness: 0.05,
  });

  const wallPlasterMaterial = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.85,
    metalness: 0.02,
  });

  const darkFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.8,
  });

  const stainlessMaterial = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.25,
    metalness: 0.85,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.08,
    metalness: 0.98,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.85,
    ior: 1.5,
  });

  const oakMaterial = new THREE.MeshStandardMaterial({
    color: 0xdeb887,
    roughness: 0.55,
    metalness: 0.05,
  });

  const marbleMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.18,
    metalness: 0.05,
  });

  // 1. ARCHITECTURE: FLOOR, WALLS, CEILING, EXTERIOR
  // Interior Floor (Z = 0 to 52)
  const floorGeo = new THREE.PlaneGeometry(16, 52);
  const floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, 26);
  floor.receiveShadow = true;
  scene.add(floor);

  // Exterior Sidewalk (Z = -25 to 0)
  const sidewalkGeo = new THREE.PlaneGeometry(24, 25);
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 });
  const sidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
  sidewalk.rotation.x = -Math.PI / 2;
  sidewalk.position.set(0, 0, -12.5);
  sidewalk.receiveShadow = true;
  scene.add(sidewalk);

  // Asphalt road beyond (Z = -35 to -25)
  const roadGeo = new THREE.PlaneGeometry(30, 10);
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.15, -30);
  scene.add(road);

  // Sidewalk Curb Stone
  const curbGeo = new THREE.BoxGeometry(26, 0.25, 0.4);
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 });
  const curb = new THREE.Mesh(curbGeo, curbMat);
  curb.position.set(0, 0.08, -25);
  scene.add(curb);

  // Left Wall (Wood Acoustic Slats): Z = 0 to 52, Height 6m
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6, 52), woodSlatsMaterial);
  leftWall.position.set(-8, 3, 26);
  scene.add(leftWall);

  // Right Wall (Microcement Plaster): Z = 0 to 52, Height 6m
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6, 52), wallPlasterMaterial);
  rightWall.position.set(8, 3, 26);
  scene.add(rightWall);

  // Back Wall (Z = 52)
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(16, 6, 0.4), wallPlasterMaterial);
  backWall.position.set(0, 3, 52);
  scene.add(backWall);

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(16, 52), new THREE.MeshStandardMaterial({ color: 0x0a0f1d, roughness: 0.9 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 6, 26);
  scene.add(ceiling);

  // Suspended ceiling beams
  for (let z = 6; z < 50; z += 8) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(16, 0.15, 0.2), darkFrameMaterial);
    beam.position.set(0, 5.5, z);
    scene.add(beam);
  }

  // 2. STOREFRONT FACADE (Z = 0)
  const facadeLeft = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 0.3), darkFrameMaterial);
  facadeLeft.position.set(-5, 3, 0);
  scene.add(facadeLeft);

  const facadeRight = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 0.3), darkFrameMaterial);
  facadeRight.position.set(5, 3, 0);
  scene.add(facadeRight);

  const facadeTop = new THREE.Mesh(new THREE.BoxGeometry(4, 1.8, 0.3), darkFrameMaterial);
  facadeTop.position.set(0, 5.1, 0);
  scene.add(facadeTop);

  // Large Architectural Glass Windows
  const winLeft = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.8), glassMaterial);
  winLeft.position.set(-5, 2.5, 0.05);
  scene.add(winLeft);

  const winRight = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.8), glassMaterial);
  winRight.position.set(5, 2.5, 0.05);
  scene.add(winRight);

  // Entrance Sliding Glass Doors at X: -1 to +1, Y: 0 to 4.2
  const doorGeo = new THREE.BoxGeometry(1.95, 4.2, 0.08);
  const doorLeft = new THREE.Mesh(doorGeo, glassMaterial);
  doorLeft.position.set(-1, 2.1, 0);
  const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.2, 16);
  const handleLeft = new THREE.Mesh(handleGeo, chromeMaterial);
  handleLeft.position.set(0.8, 0, 0.06);
  doorLeft.add(handleLeft);
  scene.add(doorLeft);

  const doorRight = new THREE.Mesh(doorGeo, glassMaterial);
  doorRight.position.set(1, 2.1, 0);
  const handleRight = new THREE.Mesh(handleGeo, chromeMaterial);
  handleRight.position.set(-0.8, 0, 0.06);
  doorRight.add(handleRight);
  scene.add(doorRight);

  // Illuminated Signboard
  const signMesh = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 1.3, 0.15),
    new THREE.MeshStandardMaterial({ map: signTexture, emissive: 0x38bdf8, emissiveIntensity: 0.35, roughness: 0.2 })
  );
  signMesh.position.set(0, 5.1, -0.15);
  scene.add(signMesh);

  const signLight = new THREE.PointLight(0x38bdf8, 3.5, 10);
  signLight.position.set(0, 5.1, -0.6);
  scene.add(signLight);

  // Planters flanking entrance
  [-3.8, 3.8].forEach((x) => {
    addContactShadow(x, -1.8, 1.6, 1.6);
    const planter = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.2), darkFrameMaterial);
    planter.position.set(x, 0.45, -1.8);
    scene.add(planter);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
    for (let f = 0; f < 3; f++) {
      const fol = new THREE.Mesh(new THREE.SphereGeometry(0.35 + f * 0.05, 12, 12), foliageMat);
      fol.position.set(x + (f - 1) * 0.2, 1.0 + f * 0.15, -1.8 + (f % 2 === 0 ? 0.1 : -0.1));
      scene.add(fol);
    }
  });

  // Street Lamp outside
  addContactShadow(-6.5, -8, 1.2, 1.2);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 5.5, 16), darkFrameMaterial);
  pole.position.set(-6.5, 2.75, -8);
  scene.add(pole);

  const lanternArm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.08), darkFrameMaterial);
  lanternArm.position.set(-5.9, 5.4, -8);
  scene.add(lanternArm);

  const streetLamp = new THREE.SpotLight(0xfef08a, 4.5, 16, Math.PI / 4, 0.5);
  streetLamp.position.set(-5.4, 5.3, -8);
  streetLamp.target.position.set(-4.5, 0, -8);
  scene.add(streetLamp);
  scene.add(streetLamp.target);

  // 3. ZONE 1: RECEPTION & COUNTER (Z = 3 to 7)
  addContactShadow(1.8, 5, 4.5, 2.2, 0.7);
  const counterGroup = new THREE.Group();
  counterGroup.position.set(1.8, 0, 5);

  const deskBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1.05, 32, 1, false, 0, Math.PI), oakMaterial);
  deskBase.position.set(0, 0.52, 0);
  counterGroup.add(deskBase);

  const deskMain = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.05, 1.2), oakMaterial);
  deskMain.position.set(-0.8, 0.52, 0);
  counterGroup.add(deskMain);

  const marbleTop = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 1.35), marbleMaterial);
  marbleTop.position.set(-0.4, 1.08, 0);
  counterGroup.add(marbleTop);

  const posStand = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 0.25, 16), chromeMaterial);
  posStand.position.set(-0.6, 1.2, 0.1);
  counterGroup.add(posStand);

  const posScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.22, 0.02),
    new THREE.MeshBasicMaterial({ map: createDigitalPanelTexture('AURA OS CHECK-IN', '10:42 AM', 'ACTIVE QUEUE: 4') })
  );
  posScreen.rotation.x = -Math.PI / 6;
  posScreen.position.set(-0.6, 1.34, 0.08);
  counterGroup.add(posScreen);

  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), chromeMaterial);
  bell.position.set(0.4, 1.15, 0.15);
  counterGroup.add(bell);

  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.35, 16), wallPlasterMaterial);
  vase.position.set(1.0, 1.25, -0.2);
  counterGroup.add(vase);

  // Back Credenza with kraft laundry bags
  addContactShadow(1.8, 7.2, 4.0, 1.2, 0.65);
  const credenza = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.9, 0.6), darkFrameMaterial);
  credenza.position.set(1.8, 0.45, 7.2);
  scene.add(credenza);

  const kraftMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
  for (let b = 0; b < 4; b++) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 0.25), kraftMat);
    bag.position.set(0.8 + b * 0.65, 1.18, 7.2);
    bag.rotation.y = (b % 2 === 0 ? 0.08 : -0.06);
    scene.add(bag);
  }

  // Pendant lights over reception
  [-0.6, 0.8].forEach((px) => {
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 3.2, 8), darkFrameMaterial);
    cord.position.set(1.8 + px, 4.4, 5);
    scene.add(cord);

    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), glassMaterial);
    globe.position.set(1.8 + px, 2.7, 5);
    scene.add(globe);

    const globeLight = new THREE.PointLight(0xfff7ed, 1.8, 6);
    globeLight.position.set(1.8 + px, 2.7, 5);
    scene.add(globeLight);
  });
  scene.add(counterGroup);

  // 4. ZONE 2 & 3: COMMERCIAL WASHERS ROW (Z = 9 to 18, left wall at X = -6.0)
  const washerDrum = new THREE.Group();
  const washerClothes = new THREE.Group();
  let washerBubbles!: THREE.Points;
  let washerWaterMesh!: THREE.Mesh;
  let activeWasherSpotlight!: THREE.SpotLight;

  // Detergent shelf above washers
  addContactShadow(-6.0, 13.5, 2.4, 10.5, 0.75);
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 9.5), oakMaterial);
  shelf.position.set(-6.8, 2.2, 13.5);
  scene.add(shelf);

  const amberGlassMat = new THREE.MeshStandardMaterial({
    color: 0x92400e,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.85,
  });
  for (let i = 0; i < 9; i++) {
    const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16), amberGlassMat);
    bottle.position.set(-6.8, 2.4, 9.2 + i * 1.05);
    scene.add(bottle);
  }

  const washerZs = [9.5, 12.0, 14.5, 17.0];
  washerZs.forEach((wz, idx) => {
    addContactShadow(-6.0, wz, 1.8, 1.8, 0.7);
    const washerBody = new THREE.Group();
    washerBody.position.set(-6.0, 0, wz);

    // Washer body
    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.8, 1.4), stainlessMaterial);
    bodyMesh.position.set(0, 0.9, 0);
    washerBody.add(bodyMesh);

    // Foot pads
    [-0.65, 0.65].forEach((fx) => {
      [-0.6, 0.6].forEach((fz) => {
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.04, 16), darkFrameMaterial);
        foot.position.set(fx, 0.02, fz);
        washerBody.add(foot);
      });
    });

    // Control fascia
    const panelMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.35, 1.3),
      new THREE.MeshBasicMaterial({
        map: createDigitalPanelTexture(
          idx === 1 ? 'WASHING • ACTIVE' : 'CYCLE READY',
          idx === 1 ? '0:18:42' : 'READY',
          idx === 1 ? '40°C • 1200 RPM' : 'ECO 30°C'
        ),
      })
    );
    panelMesh.position.set(0.76, 1.5, 0);
    washerBody.add(panelMesh);

    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 24), chromeMaterial);
    knob.rotation.z = Math.PI / 2;
    knob.position.set(0.77, 1.5, 0.5);
    washerBody.add(knob);

    // Chrome door ring bezel
    const doorRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.06, 16, 48), chromeMaterial);
    doorRing.rotation.y = Math.PI / 2;
    doorRing.position.set(0.76, 0.9, 0);
    washerBody.add(doorRing);

    // Porthole glass
    const glassPorthole = new THREE.Mesh(
      new THREE.SphereGeometry(0.44, 24, 24, 0, Math.PI * 2, 0, Math.PI / 3),
      glassMaterial
    );
    glassPorthole.rotation.z = Math.PI / 2;
    glassPorthole.position.set(0.76, 0.9, 0);
    washerBody.add(glassPorthole);

    // Active Hero Washer #2 (idx === 1)
    if (idx === 1) {
      washerDrum.position.set(0.2, 0.9, 0);
      washerDrum.rotation.z = Math.PI / 2;

      const drumMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.7, 32, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.15, metalness: 0.9, side: THREE.DoubleSide })
      );
      washerDrum.add(drumMesh);

      for (let b = 0; b < 3; b++) {
        const baffle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.08), chromeMaterial);
        baffle.position.set(Math.cos((b * Math.PI * 2) / 3) * 0.38, 0, Math.sin((b * Math.PI * 2) / 3) * 0.38);
        washerDrum.add(baffle);
      }

      // Swirling clothes
      const fabricColors = [0x38bdf8, 0xffffff, 0xf43f5e, 0xfde047, 0x818cf8];
      fabricColors.forEach((color, fIdx) => {
        const cloth = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.14, 1),
          new THREE.MeshStandardMaterial({ color, roughness: 0.9 })
        );
        cloth.position.set(
          Math.cos((fIdx * Math.PI * 2) / 5) * 0.22,
          (fIdx - 2) * 0.08,
          Math.sin((fIdx * Math.PI * 2) / 5) * 0.22
        );
        washerClothes.add(cloth);
      });
      washerDrum.add(washerClothes);

      // Semi-transparent water volume inside drum
      const waterGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.28, 24);
      const waterMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.5,
        roughness: 0.1,
        transmission: 0.7,
      });
      washerWaterMesh = new THREE.Mesh(waterGeo, waterMat);
      washerWaterMesh.position.set(0, -0.15, 0);
      washerDrum.add(washerWaterMesh);

      // Bubbles particle system
      const bubbleCount = 70;
      const bubbleGeo = new THREE.BufferGeometry();
      const bubblePositions = new Float32Array(bubbleCount * 3);
      for (let i = 0; i < bubbleCount; i++) {
        bubblePositions[i * 3 + 0] = (Math.random() - 0.5) * 0.55;
        bubblePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.55;
        bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.55;
      }
      bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
      washerBubbles = new THREE.Points(
        bubbleGeo,
        new THREE.PointsMaterial({ color: 0xe0f2fe, size: 0.045, transparent: true, opacity: 0.75 })
      );
      washerDrum.add(washerBubbles);

      washerBody.add(washerDrum);

      // Dedicated Wash Spotlight
      activeWasherSpotlight = new THREE.SpotLight(0x06b6d4, 4.0, 4, Math.PI / 3, 0.4);
      activeWasherSpotlight.position.set(0.6, 0.9, 0);
      activeWasherSpotlight.target.position.set(0, 0.9, 0);
      washerBody.add(activeWasherSpotlight);
      washerBody.add(activeWasherSpotlight.target);
    }

    scene.add(washerBody);
  });

  // 5. ZONE 4: DRYING ROW (Z = 20 to 28, right wall at X = 6.0)
  const dryerDrums: THREE.Group[] = [];
  const dryerCoilLights: THREE.PointLight[] = [];
  const dryerZs = [21.0, 24.0, 27.0];
  dryerZs.forEach((dz) => {
    addContactShadow(6.0, dz, 2.0, 2.0, 0.7);
    const dryerBody = new THREE.Group();
    dryerBody.position.set(6.0, 0, dz);

    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 1.5), darkFrameMaterial);
    bodyMesh.position.set(0, 1.0, 0);
    dryerBody.add(bodyMesh);

    const doorRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 16, 48), chromeMaterial);
    doorRing.rotation.y = -Math.PI / 2;
    doorRing.position.set(-0.81, 1.05, 0);
    dryerBody.add(doorRing);

    // Warm heating element glow
    const heatGlow = new THREE.PointLight(0xf97316, 2.8, 3.8);
    heatGlow.position.set(-0.3, 1.05, 0);
    dryerBody.add(heatGlow);
    dryerCoilLights.push(heatGlow);

    // Heating element spiral coil inside back of drum
    const coilGeo = new THREE.TorusGeometry(0.28, 0.02, 12, 32);
    const coilMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.rotation.y = Math.PI / 2;
    coil.position.set(0.4, 1.05, 0);
    dryerBody.add(coil);

    const dryerDrum = new THREE.Group();
    dryerDrum.position.set(-0.3, 1.05, 0);
    dryerDrum.rotation.z = Math.PI / 2;

    const drumMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.8, 32, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.8, side: THREE.DoubleSide })
    );
    dryerDrum.add(drumMesh);

    const towelColors = [0xfed7aa, 0xffedd5, 0xf1f5f9];
    towelColors.forEach((color, tIdx) => {
      const towel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12),
        new THREE.MeshStandardMaterial({ color, roughness: 0.95 })
      );
      towel.position.set(Math.cos((tIdx * Math.PI * 2) / 3) * 0.28, 0, Math.sin((tIdx * Math.PI * 2) / 3) * 0.28);
      dryerDrum.add(towel);
    });

    dryerBody.add(dryerDrum);
    dryerDrums.push(dryerDrum);
    scene.add(dryerBody);
  });

  // Steam particle system in drying area
  const steamCount = 80;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  for (let i = 0; i < steamCount; i++) {
    steamPos[i * 3 + 0] = 5.2 + (Math.random() - 0.5) * 2.0;
    steamPos[i * 3 + 1] = 1.2 + Math.random() * 2.5;
    steamPos[i * 3 + 2] = 20.0 + Math.random() * 8.0;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
  const steamParticles = new THREE.Points(
    steamGeo,
    new THREE.PointsMaterial({ color: 0xfed7aa, size: 0.22, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })
  );
  scene.add(steamParticles);

  // 6. ZONE 5: FOLDING ISLAND STATION (Z = 30 to 36, center)
  addContactShadow(0, 33, 3.4, 5.0, 0.8);
  const foldingGroup = new THREE.Group();
  foldingGroup.position.set(0, 0, 33);

  const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 4.4), oakMaterial);
  tableTop.position.set(0, 1.05, 0);
  foldingGroup.add(tableTop);

  [-1.1, 1.1].forEach((tx) => {
    [-1.9, 1.9].forEach((tz) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.0, 0.12), darkFrameMaterial);
      leg.position.set(tx, 0.5, tz);
      foldingGroup.add(leg);
    });
  });

  // Stacks of folded towels
  const towelStackColors = [
    [0x1e3a8a, 0x3b82f6, 0x60a5fa, 0x93c5fd],
    [0xffffff, 0xf1f5f9, 0xe2e8f0, 0xffffff],
    [0x14532d, 0x16a34a, 0x4ade80, 0x86efac],
    [0x78350f, 0x92400e, 0xb45309, 0xd97706],
  ];

  towelStackColors.forEach((stack, sIdx) => {
    const sx = -0.7 + (sIdx % 2) * 1.4;
    const sz = -1.2 + Math.floor(sIdx / 2) * 2.4;
    stack.forEach((col, lIdx) => {
      const layer = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.07, 0.7),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.9 })
      );
      layer.position.set(sx, 1.15 + lIdx * 0.075, sz);
      foldingGroup.add(layer);
    });
  });

  // Interactive Folding Garment (animates down onto the front stack as user scrolls to Scene 7)
  const foldingGarment = new THREE.Group();
  const foldTopMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.07, 0.7),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.85 })
  );
  foldingGarment.add(foldTopMesh);
  foldingGarment.position.set(-0.7, 1.45, -1.2);
  foldingGroup.add(foldingGarment);

  // Anglepoise inspection lamp on table
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.04, 16), darkFrameMaterial);
  lampBase.position.set(0.9, 1.13, 1.8);
  foldingGroup.add(lampBase);

  const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8), chromeMaterial);
  lampArm.rotation.z = Math.PI / 6;
  lampArm.position.set(0.8, 1.38, 1.8);
  foldingGroup.add(lampArm);

  const lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.18, 16), darkFrameMaterial);
  lampHead.rotation.z = -Math.PI / 3;
  lampHead.position.set(0.65, 1.55, 1.8);
  foldingGroup.add(lampHead);

  const lampLight = new THREE.SpotLight(0xfff7ed, 2.5, 4, Math.PI / 4, 0.3);
  lampLight.position.set(0.65, 1.55, 1.8);
  lampLight.target.position.set(0.3, 1.05, 1.4);
  foldingGroup.add(lampLight);
  foldingGroup.add(lampLight.target);

  // Wire laundry baskets on sides
  [-1.8, 1.8].forEach((bx) => {
    addContactShadow(bx, 33, 1.1, 1.1, 0.65);
    const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.8, 16), darkFrameMaterial);
    basket.position.set(bx, 0.4, 0);
    foldingGroup.add(basket);

    const liner = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.35, 0.78, 16), wallPlasterMaterial);
    liner.position.set(bx, 0.41, 0);
    foldingGroup.add(liner);
  });

  // Suspended linear brass LED fixture
  const pendantBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 4.0), chromeMaterial);
  pendantBar.position.set(0, 3.4, 0);
  foldingGroup.add(pendantBar);

  const pendantLight = new THREE.SpotLight(0xfffbeb, 4.0, 8, Math.PI / 3, 0.3);
  pendantLight.position.set(0, 3.3, 0);
  pendantLight.target.position.set(0, 1.0, 0);
  foldingGroup.add(pendantLight);
  foldingGroup.add(pendantLight.target);

  scene.add(foldingGroup);

  // 7. ZONE 6: PACKAGING & WARDROBE (Z = 37 to 43, left side at X = -5.5)
  addContactShadow(-5.5, 40, 1.4, 4.2, 0.75);
  const packagingGroup = new THREE.Group();
  packagingGroup.position.set(-5.5, 0, 40);

  const rackRail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.6, 16), chromeMaterial);
  rackRail.rotation.x = Math.PI / 2;
  rackRail.position.set(0, 2.0, 0);
  packagingGroup.add(rackRail);

  [-1.6, 1.6].forEach((rz) => {
    const rackLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.0, 16), chromeMaterial);
    rackLeg.position.set(0, 1.0, rz);
    packagingGroup.add(rackLeg);

    const rackBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.08), darkFrameMaterial);
    rackBase.position.set(0, 0.02, rz);
    packagingGroup.add(rackBase);
  });

  // Hanging garments in breathable covers
  for (let g = 0; g < 6; g++) {
    const garment = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.4, 0.45),
      new THREE.MeshPhysicalMaterial({ color: g % 2 === 0 ? 0xffffff : 0x0f172a, transparent: true, opacity: 0.8, roughness: 0.3 })
    );
    garment.position.set(0, 1.25, -1.2 + g * 0.5);
    packagingGroup.add(garment);
  }

  // Packaging work bench
  addContactShadow(-4.0, 40, 1.8, 3.0, 0.7);
  const packTable = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.95, 2.4), oakMaterial);
  packTable.position.set(1.5, 0.48, 0);
  packagingGroup.add(packTable);

  // Rigid black luxury gift boxes
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2 });
  [0, 1].forEach((bx) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.7), boxMat);
    box.position.set(1.5, 1.05 + bx * 0.2, -0.4);
    packagingGroup.add(box);
  });

  // Luxury Craft Laundry Carrier Bag waiting open on table
  const craftBagMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.35), kraftMat);
  craftBagMesh.position.set(1.5, 1.28, 0.5);
  packagingGroup.add(craftBagMesh);

  // Interactive Packaging Garment Bundle (smoothly slides into the laundry bag as user reaches Scene 8)
  const packagingBagGarment = new THREE.Group();
  const packBundleMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.2, 0.28),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 })
  );
  packagingBagGarment.add(packBundleMesh);
  packagingBagGarment.position.set(1.5, 1.08, 0.0);
  packagingGroup.add(packagingBagGarment);

  scene.add(packagingGroup);

  // 8. ZONE 7: DELIVERY & DISPATCH HUB (Z = 44 to 50, right side at X = 5.5)
  addContactShadow(5.5, 47, 2.0, 4.8, 0.8);
  const deliveryGroup = new THREE.Group();
  deliveryGroup.position.set(5.5, 0, 47);

  const locker = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 4.2), darkFrameMaterial);
  locker.position.set(0, 1.2, 0);
  deliveryGroup.add(locker);

  // Cubby shelves with tagged packages
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const parcel = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.25, 0.45),
        new THREE.MeshStandardMaterial({ color: (r + c) % 2 === 0 ? 0xd4a373 : 0xffffff, roughness: 0.8 })
      );
      parcel.position.set(-0.4, 0.5 + r * 0.7, -1.2 + c * 1.2);
      deliveryGroup.add(parcel);
    }
  }

  // Interactive Delivery Parcel (moves from sorting cart into dispatch locker slot)
  const deliveryParcel = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.26, 0.46),
    new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 })
  );
  deliveryParcel.position.set(-1.6, 1.05, 0);
  deliveryGroup.add(deliveryParcel);

  // Delivery Hamper Cart
  addContactShadow(3.9, 47, 1.4, 1.6, 0.65);
  const cart = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 1.2), wallPlasterMaterial);
  cart.position.set(-1.6, 0.55, 0);
  deliveryGroup.add(cart);

  scene.add(deliveryGroup);

  // 9. ARTWORK POSTERS ON RIGHT WALL (Z = 6, 14, 30, 42)
  const posterConfigs = [
    { z: 6, title: 'HYDRO PURITY', sub: 'Reverse Osmosis Closed Loop', color: '#0284c7' },
    { z: 14, title: 'ZERO PERC', sub: '100% Organic GreenEarth Fluid', color: '#059669' },
    { z: 30, title: 'PRECISION PRESS', sub: 'Italian 6-Bar Dry Steam', color: '#d97706' },
    { z: 42, title: 'ELECTRIC VALET', sub: 'Zero-Emission Neighborhood Fleet', color: '#7c3aed' },
  ];

  posterConfigs.forEach(({ z, title, sub, color }) => {
    const posterMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 2.4),
      new THREE.MeshBasicMaterial({ map: createPosterTexture(title, sub, color) })
    );
    posterMesh.rotation.y = -Math.PI / 2;
    posterMesh.position.set(7.84, 2.8, z);
    scene.add(posterMesh);
  });

  // 10. FLOATING DUST MOTES
  const dustCount = 180;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3 + 0] = (Math.random() - 0.5) * 14;
    dustPos[i * 3 + 1] = 0.5 + Math.random() * 4.5;
    dustPos[i * 3 + 2] = -10 + Math.random() * 60;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustParticles = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xfef08a, size: 0.045, transparent: true, opacity: 0.45 })
  );
  scene.add(dustParticles);

  // 11. GENERAL AMBIENT & STORE SPOTLIGHTING
  const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.25);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xe0f2fe, 1.4);
  sunLight.position.set(8, 12, -15);
  scene.add(sunLight);

  [10, 18, 26, 34, 42, 48].forEach((sz) => {
    const spot = new THREE.SpotLight(0xffedd5, 2.5, 14, Math.PI / 3.5, 0.4);
    spot.position.set(0, 5.6, sz);
    spot.target.position.set(0, 1, sz);
    scene.add(spot);
    scene.add(spot.target);
  });

  return {
    doorLeft,
    doorRight,
    washerDrum,
    washerClothes,
    washerBubbles,
    washerWaterMesh,
    dryerDrums,
    dryerCoilLights,
    steamParticles,
    dustParticles,
    signMesh,
    activeWasherSpotlight,
    foldingGarment,
    packagingBagGarment,
    deliveryParcel,
  };
}
