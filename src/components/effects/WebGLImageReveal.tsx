import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface WebGLImageRevealProps {
  imageUrl: string;
  className?: string;
}

export default function WebGLImageReveal({ imageUrl, className = "" }: WebGLImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    time: number;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uProgress;
      uniform float uTime;
      uniform float uHover;
      uniform vec2 uMouse;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.01 * uHover;
        float dist = distance(uv, uMouse);
        float distortion = smoothstep(0.5, 0.0, dist) * 0.02 * uHover;
        
        uv.x += wave + distortion;
        
        float reveal = smoothstep(0.0, 1.0, uProgress);
        
        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        float glitch = step(0.98, noise) * uHover * 0.1;
        
        float mask = smoothstep(0.0, 0.03, uv.x - (1.0 - reveal) + glitch);
        
        vec4 tex = texture2D(uTexture, uv);
        
        float r = texture2D(uTexture, uv + vec2(0.01 * glitch, 0.0)).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, uv - vec2(0.01 * glitch, 0.0)).b;
        tex = vec4(mix(tex.rgb, vec3(r, g, b), glitch), tex.a);
        
        gl_FragColor = tex * mask;
      }
    `;

    const loader = new THREE.TextureLoader();
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: null },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    loader.load(
      imageUrl,
      (texture) => {
        material.uniforms.uTexture.value = texture;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
      },
      undefined,
      () => console.error("Failed to load texture")
    );

    sceneRef.current = { scene, camera, renderer, mesh, material, time: 0 };

    let startTime = performance.now();
    const duration = 2000;

    const animate = () => {
      if (!sceneRef.current) return;
      const { material, time } = sceneRef.current;
      
      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      setProgress(currentProgress);

      material.uniforms.uProgress.value = currentProgress;
      material.uniforms.uTime.value = time;

      renderer.render(scene, camera);
      sceneRef.current.time += 0.016;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!sceneRef.current) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      material.uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sceneRef.current = null;
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.material.uniforms.uHover.value = isHovered ? 1 : 0;
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: "#0e0c0a" }}
    />
  );
}
