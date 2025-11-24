import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  vertices: number[];
  indices: number[];
}

export const CustomShapePreviewCanvas: React.FC<Props> = ({ vertices, indices }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(450, 450);
    renderer.setClearColor("#111");

    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(3, 3, 4);
    camera.lookAt(0, 0, 0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const material = new THREE.MeshStandardMaterial({
      color: 0xff9933,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex(indices);

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    const animate = () => {
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  // Обновляем геометрию при изменении vertices / indices
  useEffect(() => {
    if (!meshRef.current) return;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex(indices);

    meshRef.current.geometry.dispose();
    meshRef.current.geometry = geometry;
  }, [vertices, indices]);

  return <div ref={canvasRef} />;
};
