'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { buildLaundryWorld, LaundryWorldObjects } from './LaundryWorld';
import { audioEngine } from '@/utils/audioEngine';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Mouse,
  ArrowDown,
} from 'lucide-react';

export interface WaypointData {
  id: number;
  label: string;
  subtitle: string;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  description: string;
  highlight: string;
  badge: string;
}

export const WAYPOINTS: WaypointData[] = [
  {
    id: 1,
    label: 'Exterior Storefront',
    subtitle: 'Aura Organic Garment Atelier',
    camPos: [0, 1.9, -15.0],
    lookAt: [0, 2.1, 0.0],
    description: 'Modern street facade with warm exterior lighting, architectural glass, and glowing illuminated signage.',
    highlight: 'Zero-emission pickup hub & organic valet boutique',
    badge: 'SCENE 01 / EXTERIOR',
  },
  {
    id: 2,
    label: 'Entrance Portal',
    subtitle: 'Automatic Glass Doors',
    camPos: [0, 1.8, -2.5],
    lookAt: [0, 1.8, 6.0],
    description: 'Sliding glass doors part smoothly to reveal the immaculate, climate-controlled interior atelier.',
    highlight: 'Air-filtered sterile chamber with allergen barrier',
    badge: 'SCENE 02 / ENTRANCE',
  },
  {
    id: 3,
    label: 'Reception & Valet Counter',
    subtitle: 'Smart Garment Intake',
    camPos: [2.2, 1.6, 3.8],
    lookAt: [0.6, 1.25, 5.5],
    description: 'Fluted oak desk, high-CRI optical inspection, and digital barcoding of each individual garment.',
    highlight: 'Multi-spectral fabric scan & barcode QR tracking',
    badge: 'SCENE 03 / INTAKE',
  },
  {
    id: 4,
    label: 'Commercial Washing Bank',
    subtitle: 'Heavy-Duty Hydro Extractors',
    camPos: [-1.4, 1.55, 10.8],
    lookAt: [-5.0, 1.35, 12.8],
    description: 'Row of industrial stainless steel front-load washers operating with certified hypoallergenic bio-enzymes.',
    highlight: 'Closed-loop reverse osmosis water & honeycomb drums',
    badge: 'SCENE 04 / WASHERS',
  },
  {
    id: 5,
    label: 'Washing Cycle Close-Up',
    subtitle: 'Ozone Micro-Bubble Injection',
    camPos: [-4.2, 1.35, 12.0],
    lookAt: [-5.8, 1.35, 12.0],
    description: 'Macro view into the spinning drum: foaming water bubbles and gentle agitation eliminating 99.9% bacteria.',
    highlight: 'Cold-water ozone sanitization preserving natural fibers',
    badge: 'SCENE 05 / WATER CYCLE',
  },
  {
    id: 6,
    label: 'Drying Row & Warm Glow',
    subtitle: 'Moisture-Sensing Reverse Tumble',
    camPos: [2.0, 1.55, 22.0],
    lookAt: [5.2, 1.35, 23.5],
    description: 'Gentle warmth with infrared heating coils, tumbling fluffy towels, and rising warm steam exhaust.',
    highlight: 'Fiber-safe 42°C drying curves preventing fabric shrinkage',
    badge: 'SCENE 06 / DRYERS',
  },
  {
    id: 7,
    label: 'Artisanal Folding Station',
    subtitle: 'Precision Hand-Finished Stacks',
    camPos: [0, 2.1, 30.5],
    lookAt: [0, 1.1, 33.0],
    description: 'Solid blonde oak island table where garments are inspected, de-linted, and folded with razor-sharp edges.',
    highlight: 'Zero missing sock guarantee & custom fabric conditioning',
    badge: 'SCENE 07 / FOLDING',
  },
  {
    id: 8,
    label: 'Packaging & Wardrobe',
    subtitle: 'Luxury Garment Presentation',
    camPos: [-1.8, 1.65, 38.0],
    lookAt: [-4.8, 1.5, 39.5],
    description: 'Brass mobile racks with hanging suits in breathable covers and rigid presentation gift boxes.',
    highlight: '100% biodegradable cornstarch bags & cedar moth rings',
    badge: 'SCENE 08 / PACKAGING',
  },
  {
    id: 9,
    label: 'Delivery & Valet Dispatch',
    subtitle: 'Lockers & Electric Fleet Staging',
    camPos: [1.8, 1.6, 45.0],
    lookAt: [4.8, 1.4, 47.0],
    description: 'Courier dispatch cubbies with barcode-tagged orders ready for same-day climate-controlled delivery.',
    highlight: '100% electric delivery vehicles & real-time courier GPS',
    badge: 'SCENE 09 / DISPATCH',
  },
  {
    id: 10,
    label: 'Grand Atelier Panorama',
    subtitle: 'The Sanctuary of Clean',
    camPos: [0, 5.2, 18.0],
    lookAt: [0, 1.2, 33.0],
    description: 'Cinematic elevated view across the entire modern laundry boutique, bathed in warm architectural light.',
    highlight: 'Fresh clothes. Zero effort. Complete peace of mind.',
    badge: 'SCENE 10 / PANORAMA',
  },
];

interface CinematicStore3DProps {
  onOpenBooking: () => void;
  scrollProgress: number; // 0 to 1
  onSceneChange?: (sceneIndex: number) => void;
}

export default function CinematicStore3D({
  onOpenBooking,
  scrollProgress,
  onSceneChange,
}: CinematicStore3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [freeLookMode, setFreeLookMode] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const worldObjectsRef = useRef<LaundryWorldObjects | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isTabVisible = useRef(true);

  // Interpolation targets
  const currentCamPos = useRef(new THREE.Vector3(0, 1.9, -15.0));
  const targetCamPos = useRef(new THREE.Vector3(0, 1.9, -15.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 2.1, 0.0));
  const targetLookAt = useRef(new THREE.Vector3(0, 2.1, 0.0));

  // Current scroll progress reference for animation updates
  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  // Mouse parallax offset
  const mouseOffset = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const orbitAngle = useRef({ yaw: 0, pitch: 0 });

  // Pre-calculate Splines for smooth Catmull-Rom path
  const camPoints = WAYPOINTS.map((w) => new THREE.Vector3(...w.camPos));
  const lookAtPoints = WAYPOINTS.map((w) => new THREE.Vector3(...w.lookAt));
  const camSpline = useRef(new THREE.CatmullRomCurve3(camPoints, false, 'catmullrom', 0.25));
  const lookSpline = useRef(new THREE.CatmullRomCurve3(lookAtPoints, false, 'catmullrom', 0.25));

  // Update target coordinates based on progress (0 to 1)
  const updateCameraTarget = useCallback((prog: number) => {
    const clampedProg = Math.max(0, Math.min(0.9999, prog));
    const splinePos = camSpline.current.getPointAt(clampedProg);
    const splineLook = lookSpline.current.getPointAt(clampedProg);

    targetCamPos.current.copy(splinePos);
    targetLookAt.current.copy(splineLook);

    // Determine current waypoint index
    const segment = clampedProg * (WAYPOINTS.length - 1);
    const sceneIdx = Math.round(segment);
    setActiveScene(sceneIdx);
    if (onSceneChange) onSceneChange(sceneIdx);
    audioEngine.setZoneAudio(sceneIdx);

    // Animate doors opening when approaching Z = -8 to 0
    if (worldObjectsRef.current) {
      const { doorLeft, doorRight } = worldObjectsRef.current;
      if (splinePos.z > -8 && splinePos.z < 2) {
        const openFactor = Math.min(1, Math.max(0, (splinePos.z + 8) / 4));
        doorLeft.position.x = -1.0 - openFactor * 1.5;
        doorRight.position.x = 1.0 + openFactor * 1.5;
      } else if (splinePos.z <= -8) {
        doorLeft.position.x = -1.0;
        doorRight.position.x = 1.0;
      }
    }
  }, [onSceneChange]);

  // Synchronize with external scrollProgress prop
  useEffect(() => {
    if (!isAutoPlaying) {
      updateCameraTarget(scrollProgress);
    }
  }, [scrollProgress, isAutoPlaying, updateCameraTarget]);

  // Auto-tour playback
  useEffect(() => {
    if (!isAutoPlaying) return;
    let localProgress = scrollProgress;
    const interval = setInterval(() => {
      localProgress += 0.0016;
      if (localProgress >= 1.0) localProgress = 0;
      updateCameraTarget(localProgress);
    }, 20);

    return () => clearInterval(interval);
  }, [isAutoPlaying, scrollProgress, updateCameraTarget]);

  // Handle visibility / background throttling
  useEffect(() => {
    const handleVisibility = () => {
      isTabVisible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Three.js Mount & Animation Loop
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const mobile = width < 768;
    setIsMobile(mobile);

    // Scene & Camera (Adaptive FOV: 54 for desktop, 66 for mobile for broader vertical framing)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.018);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(mobile ? 66 : 54, width / height, 0.1, 120);
    camera.position.set(0, 1.9, -15.0);
    camera.lookAt(0, 2.1, 0.0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !mobile,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Build the 3D World
    const worldObjects = buildLaundryWorld(scene);
    worldObjectsRef.current = worldObjects;

    // Mouse Move for Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (freeLookMode && isPointerDown.current) {
        const deltaX = e.clientX - pointerStart.current.x;
        const deltaY = e.clientY - pointerStart.current.y;
        orbitAngle.current.yaw += deltaX * 0.004;
        orbitAngle.current.pitch = Math.max(-0.6, Math.min(0.6, orbitAngle.current.pitch - deltaY * 0.003));
        pointerStart.current = { x: e.clientX, y: e.clientY };
      } else if (!mobile) {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseOffset.current.x = normX * 0.35;
        mouseOffset.current.y = normY * 0.2;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isPointerDown.current = true;
      pointerStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isPointerDown.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!mount || !cameraRef.current || !rendererRef.current) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      const isMob = w < 768;
      setIsMobile(isMob);
      cameraRef.current.fov = isMob ? 66 : 54;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Skip render calculations when tab is hidden
      if (!isTabVisible.current) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const currentProg = progressRef.current;

      // Smooth camera interpolation (inertial damping)
      currentCamPos.current.lerp(targetCamPos.current, 0.075);
      currentLookAt.current.lerp(targetLookAt.current, 0.075);

      if (cameraRef.current) {
        if (freeLookMode) {
          cameraRef.current.position.copy(currentCamPos.current);
          const forward = new THREE.Vector3(0, 0, 1)
            .applyAxisAngle(new THREE.Vector3(1, 0, 0), orbitAngle.current.pitch)
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), orbitAngle.current.yaw);
          const lookTarget = currentCamPos.current.clone().add(forward.multiplyScalar(5));
          cameraRef.current.lookAt(lookTarget);
        } else {
          cameraRef.current.position.set(
            currentCamPos.current.x + mouseOffset.current.x,
            currentCamPos.current.y + mouseOffset.current.y,
            currentCamPos.current.z
          );
          cameraRef.current.lookAt(
            currentLookAt.current.x + mouseOffset.current.x * 0.5,
            currentLookAt.current.y + mouseOffset.current.y * 0.5,
            currentLookAt.current.z
          );
        }
      }

      // 3D Environmental & Interactive Animations:
      if (worldObjectsRef.current) {
        const {
          washerDrum,
          washerClothes,
          washerBubbles,
          washerWaterMesh,
          dryerDrums,
          dryerCoilLights,
          steamParticles,
          dustParticles,
          signMesh,
          foldingGarment,
          packagingBagGarment,
          deliveryParcel,
        } = worldObjectsRef.current;

        // 1. Washing machine: drum rotates, clothes swirl with wobble, water ripples & bubbles
        if (washerDrum) {
          washerDrum.rotation.y += delta * 7.5;
        }

        if (washerClothes) {
          washerClothes.rotation.z += delta * 6.0;
          washerClothes.rotation.x = Math.sin(elapsed * 4) * 0.25;
        }

        if (washerWaterMesh) {
          washerWaterMesh.rotation.z += delta * 3.5;
          washerWaterMesh.position.y = -0.15 + Math.sin(elapsed * 6) * 0.02;
        }

        if (washerBubbles) {
          const positions = washerBubbles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(elapsed * 5 + i) * 0.004;
          }
          washerBubbles.geometry.attributes.position.needsUpdate = true;
        }

        // 2. Dryer: rotating drums, warm pulsing coils, rising steam airflow
        dryerDrums.forEach((drum, dIdx) => {
          drum.rotation.y += delta * (1.8 + dIdx * 0.3);
        });

        dryerCoilLights.forEach((light) => {
          light.intensity = 2.8 + Math.sin(elapsed * 3) * 0.35;
        });

        if (steamParticles) {
          const positions = steamParticles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += delta * 0.65;
            positions[i] += Math.sin(elapsed + i) * 0.005;
            if (positions[i + 1] > 4.5) {
              positions[i + 1] = 1.2;
            }
          }
          steamParticles.geometry.attributes.position.needsUpdate = true;
        }

        // 3. Interactive Folding Animation:
        // When approaching Scene 7 (progress between 0.60 and 0.72), clothes animate down into a neat folded stack
        if (foldingGarment) {
          const foldFactor = Math.min(1, Math.max(0, (currentProg - 0.58) / 0.1));
          foldingGarment.position.y = 1.85 - foldFactor * 0.40;
          foldingGarment.rotation.x = (1 - foldFactor) * -0.4;
          foldingGarment.scale.set(1, 0.6 + foldFactor * 0.4, 1);
        }

        // 4. Interactive Packaging Animation:
        // When approaching Scene 8 (progress between 0.72 and 0.82), folded bundle slides into the luxury laundry bag
        if (packagingBagGarment) {
          const packFactor = Math.min(1, Math.max(0, (currentProg - 0.70) / 0.1));
          packagingBagGarment.position.z = 0.0 + packFactor * 0.5;
          packagingBagGarment.position.y = 1.08 + packFactor * 0.18;
          packagingBagGarment.scale.set(1 - packFactor * 0.15, 1, 1 - packFactor * 0.15);
        }

        // 5. Interactive Delivery Animation:
        // When approaching Scene 9 (progress between 0.82 and 0.94), package moves into the delivery locker cubby
        if (deliveryParcel) {
          const deliveryFactor = Math.min(1, Math.max(0, (currentProg - 0.82) / 0.09));
          deliveryParcel.position.x = -1.6 + deliveryFactor * 1.2;
          deliveryParcel.position.y = 1.05 + deliveryFactor * 0.15;
          deliveryParcel.position.z = 0.0 - deliveryFactor * 0.4;
        }

        // 6. Subtle floating dust motes
        if (dustParticles) {
          const positions = dustParticles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(elapsed * 0.8 + i) * 0.002;
            positions[i] += Math.cos(elapsed * 0.5 + i) * 0.002;
          }
          dustParticles.geometry.attributes.position.needsUpdate = true;
        }

        // 7. Storefront neon sign breathing pulse
        if (signMesh) {
          const mat = signMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.35 + Math.sin(elapsed * 2.5) * 0.08;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement && mount) {
        mount.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [freeLookMode]);

  // Jump camera directly to a chosen waypoint
  const jumpToWaypoint = (idx: number) => {
    audioEngine.playClick();
    audioEngine.playChime(520 + idx * 40);
    const targetProg = idx / (WAYPOINTS.length - 1);
    updateCameraTarget(targetProg);

    // Scroll to position
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = targetProg * (scrollHeight * 0.72);
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const isMuted = audioEngine.toggleMute();
    setIsAudioMuted(isMuted);
  };

  const currentWp = WAYPOINTS[activeScene] || WAYPOINTS[0];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full absolute inset-0 ${
          freeLookMode ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`}
      />

      {/* Graceful Fallback if WebGL Disabled */}
      {!webGLSupported && (
        <div className="absolute inset-0 bg-slate-950 flex items-center justify-center text-white text-center p-6 pointer-events-auto">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900 border border-cyan-500/30">
            <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading">WebGL Acceleration Required</h3>
            <p className="text-sm text-slate-400 mt-2">
              Your browser does not have WebGL enabled. You can still explore all our laundry services, pricing, and book pickups below!
            </p>
          </div>
        </div>
      )}

      {/* Floating Minimal Glass HUD Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none z-10">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full pt-16 sm:pt-20">
          {/* Active Scene Badge */}
          <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 bg-slate-950/75 backdrop-blur-xl border border-cyan-500/30 text-white px-3.5 sm:px-4 py-2 rounded-full shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-cyan-300">
              {currentWp.badge}
            </span>
            <span className="hidden sm:inline text-xs text-slate-500">|</span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">
              {currentWp.label}
            </span>
          </div>

          {/* Quick Interactive Toolset: Sound, Auto Tour, Free Look */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl flex items-center gap-2 text-xs font-bold ${
                !isAudioMuted
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-500/20'
                  : 'bg-slate-900/70 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
              title={isAudioMuted ? 'Unmute Store Sound' : 'Mute Store Sound'}
              aria-label="Toggle store audio ambience"
            >
              {!isAudioMuted ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="hidden md:inline">Ambience ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline">Sound OFF</span>
                </>
              )}
            </button>

            {/* Auto Tour Toggle */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setIsAutoPlaying(!isAutoPlaying);
              }}
              className={`p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl flex items-center gap-2 text-xs font-bold ${
                isAutoPlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900/70 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
              title={isAutoPlaying ? 'Pause Auto Tour' : 'Play Guided 3D Walkthrough'}
              aria-label="Toggle auto tour"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4" />}
              <span className="hidden md:inline">{isAutoPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
            </button>

            {/* Free Look / Orbit Toggle */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setFreeLookMode(!freeLookMode);
              }}
              className={`p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl flex items-center gap-2 text-xs font-bold ${
                freeLookMode
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                  : 'bg-slate-900/70 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
              title="Click & Drag to Look Around 360°"
              aria-label="Toggle 360 free look mode"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">{freeLookMode ? 'Lock Scroll' : 'Free Look'}</span>
            </button>
          </div>
        </div>

        {/* Floating Story Card for Active Waypoint (glides in on bottom-left) */}
        <div className="pointer-events-auto max-w-sm sm:max-w-md w-full">
          <div className="bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl p-4 sm:p-6 shadow-2xl text-white space-y-2 sm:space-y-3 transform transition-all duration-500">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                {currentWp.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeScene + 1} / {WAYPOINTS.length}
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-2xl font-bold font-heading text-white">
                {currentWp.label}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-200/80 font-medium">
                {currentWp.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
              {currentWp.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] sm:text-xs">
              <span className="text-amber-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentWp.highlight}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Timeline Waypoint Scrubber */}
        <div className="pointer-events-auto w-full max-w-4xl mx-auto pb-2 sm:pb-4">
          <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-2 sm:p-2.5 shadow-2xl flex items-center justify-between gap-1 sm:gap-2">
            <button
              onClick={() => jumpToWaypoint(Math.max(0, activeScene - 1))}
              disabled={activeScene === 0}
              className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              aria-label="Previous scene"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* 10 Waypoint Dots / Buttons */}
            <div className="flex-1 flex items-center justify-between gap-1 px-1">
              {WAYPOINTS.map((wp, idx) => {
                const isActive = activeScene === idx;
                return (
                  <button
                    key={wp.id}
                    onClick={() => jumpToWaypoint(idx)}
                    className="group relative flex flex-col items-center py-1 flex-1 transition-all"
                    aria-label={`Jump to ${wp.label}`}
                  >
                    <span
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_10px_#38bdf8]'
                          : 'w-1.5 sm:w-3 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                    <span
                      className={`hidden lg:block text-[9px] font-mono mt-1 whitespace-nowrap transition-colors ${
                        isActive ? 'text-cyan-300 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {wp.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => jumpToWaypoint(Math.min(WAYPOINTS.length - 1, activeScene + 1))}
              disabled={activeScene === WAYPOINTS.length - 1}
              className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              aria-label="Next scene"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
