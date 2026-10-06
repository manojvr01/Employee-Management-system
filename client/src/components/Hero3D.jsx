import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Sparkles, Activity, Shield } from 'lucide-react';
import * as THREE from 'three';

export default function Hero3D({ employees = [] }) {
  const mountRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const totalEmployees = employees.length;
  const uniqueDepartments = new Set(employees.map(e => e.department).filter(Boolean)).size;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = mountRef.current;
    if (!container) return;

    let scene, camera, renderer, animationFrameId;
    let group, coreSphere, rings = [], departmentNodes = [], particleSystem;
    let mouseX = 0, mouseY = 0;

    try {
      // 1. Scene Setup
      scene = new THREE.Scene();
      const width = container.clientWidth || 380;
      const height = container.clientHeight || 250;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      group = new THREE.Group();
      scene.add(group);

      // 2. Central Organization Core
      const coreGeo = new THREE.IcosahedronGeometry(2.4, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
        emissive: 0x6366f1,
        emissiveIntensity: 0.6,
      });
      coreSphere = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreSphere);

      // Core glow inner sphere
      const innerGeo = new THREE.SphereGeometry(1.6, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.5,
      });
      const innerSphere = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerSphere);

      // 3. Orbital Rings
      const ringGeos = [
        new THREE.TorusGeometry(5.2, 0.03, 16, 100),
        new THREE.TorusGeometry(7.0, 0.03, 16, 100),
      ];
      ringGeos.forEach((geo, i) => {
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x8b5cf6 : 0x06b6d4,
          transparent: true,
          opacity: 0.4,
        });
        const ring = new THREE.Mesh(geo, ringMat);
        ring.rotation.x = Math.PI / 3 + (i * 0.4);
        ring.rotation.y = i * 0.5;
        group.add(ring);
        rings.push(ring);
      });

      // 4. Department Nodes (Orbiting Nodes)
      const deptColors = [0x06b6d4, 0x8b5cf6, 0x10b981, 0xf59e0b, 0x3b82f6, 0xf43f5e, 0xa855f7];
      const nodeCount = Math.max(uniqueDepartments, 5);

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 5.2;
        const nodeGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: deptColors[i % deptColors.length],
          emissive: deptColors[i % deptColors.length],
          emissiveIntensity: 0.8,
          metalness: 0.5,
          roughness: 0.2,
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(angle) * radius, (Math.sin(angle * 2) * 1.2), Math.sin(angle) * radius);
        group.add(node);
        departmentNodes.push({ mesh: node, baseAngle: angle, radius });
      }

      // 5. Data Flow Particle Galaxy
      const particleCount = 120;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 22;
        positions[i + 1] = (Math.random() - 0.5) * 16;
        positions[i + 2] = (Math.random() - 0.5) * 16;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.12,
        transparent: true,
        opacity: 0.6,
      });
      particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // 6. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x8b5cf6, 3, 50);
      pointLight1.position.set(10, 10, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 50);
      pointLight2.position.set(-10, -10, 10);
      scene.add(pointLight2);

      // Mouse Move Parallax
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      };
      container.addEventListener('mousemove', handleMouseMove);

      // Resize observer
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!prefersReducedMotion) {
          const delta = clock.getElapsedTime();

          coreSphere.rotation.x = delta * 0.25;
          coreSphere.rotation.y = delta * 0.35;

          rings[0].rotation.z = delta * 0.15;
          rings[1].rotation.z = -delta * 0.12;

          departmentNodes.forEach((item, index) => {
            const currentAngle = item.baseAngle + delta * (0.3 + index * 0.05);
            item.mesh.position.x = Math.cos(currentAngle) * item.radius;
            item.mesh.position.z = Math.sin(currentAngle) * item.radius;
            item.mesh.position.y = Math.sin(currentAngle * 2 + delta) * 1.5;
          });

          particleSystem.rotation.y = delta * 0.05;

          // Mouse tilt interpolation
          group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.05;
          group.rotation.x += (-mouseY * 0.5 - group.rotation.x) * 0.05;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          if (renderer.domElement) {
            container.removeChild(renderer.domElement);
          }
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization fallback triggered:', err);
      setWebGLSupported(false);
    }
  }, [uniqueDepartments]);

  return (
    <div className="hero-3d-panel">
      {/* Left Content Column */}
      <div className="hero-left-content">
        <div className="hero-badge-tag">
          <Activity size={13} color="var(--text-cyan)" />
          <span>EMPLOYEE INTELLIGENCE // 3D CONTROL CENTER</span>
        </div>

        <h1 className="hero-main-title">
          Manage your workforce.<br />
          <span>Understand your organization.</span>
        </h1>

        <p className="hero-subtext">
          Real-time workforce neural telemetry connected to MongoDB Atlas. Monitor headcount distribution, departmental bandwidth, and team structures with zero latency.
        </p>

        <div className="hero-actions-row">
          <Link to="/employees/new" className="btn btn-primary">
            <UserPlus size={17} />
            <span>+ Add Employee</span>
          </Link>
          <a href="#constellation-section" className="btn btn-secondary btn-sm">
            <Sparkles size={14} color="var(--text-cyan)" />
            <span>View Neural Graph</span>
          </a>
        </div>
      </div>

      {/* Right 3D Interactive Canvas Column */}
      <div className="hero-canvas-wrap" ref={mountRef}>
        {!webGLSupported && (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              background: 'radial-gradient(circle, var(--accent-violet) 0%, transparent 70%)',
              margin: '0 auto 12px',
              border: '1px solid var(--accent-cyan)'
            }} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--text-cyan)' }}>
              ORG NETWORK: {totalEmployees} NODES ACTIVE
            </span>
          </div>
        )}

        <div className="canvas-stats-overlay">
          <span>NODES: {totalEmployees}</span> // <span>TEAMS: {uniqueDepartments}</span>
        </div>
      </div>
    </div>
  );
}
