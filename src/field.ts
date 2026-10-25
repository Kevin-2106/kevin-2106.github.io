import * as THREE from 'three';

export function createField(container: HTMLElement, initialMotion: boolean) {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { return { setMotion() {}, dispose() {} }; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.setClearColor(0x171918, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x171918, 0.035);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(11, 10, 15);
  camera.lookAt(0, 0, 0);
  const field = new THREE.Group();
  field.position.set(1.4, -1.5, 0);
  field.rotation.y = -0.3;
  scene.add(field);

  const plane = new THREE.PlaneGeometry(26, 26, 68, 68);
  const pos = plane.attributes.position;
  const height = (x: number, y: number) => Math.sin(x * 0.48 + y * 0.1) * Math.cos(y * 0.33) * 1.2 + Math.sin(y * 0.68 + x * 0.22) * 0.65 + Math.cos(x * 0.3 - y * 0.2) * 0.9;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, height(x, y)); }
  plane.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ color: 0x839181, wireframe: true, transparent: true, opacity: 0.13 }));
  mesh.position.y = -2.1;
  field.add(mesh);

  const points = new THREE.Points(plane.clone(), new THREE.PointsMaterial({ size: 0.037, color: 0xc7d3bb, transparent: true, opacity: 0.6, sizeAttenuation: true }));
  points.position.y = -2.07;
  field.add(points);

  const core = new THREE.Group();
  core.position.y = 1.1;
  core.rotation.set(0.25, 0.4, Math.PI / 4);
  field.add(core);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xfffa00, transparent: true, opacity: 0.95 });
  const cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.3, 3.3, 3.3)), lineMaterial);
  core.add(cube);
  const inner = new THREE.Mesh(new THREE.BoxGeometry(2.05, 2.05, 2.05), new THREE.MeshBasicMaterial({ color: 0xfffa00, transparent: true, opacity: 0.035, depthWrite: false }));
  core.add(inner);
  const innerLines = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.05, 2.05, 2.05)), new THREE.LineBasicMaterial({ color: 0xfffa00, transparent: true, opacity: 0.36 }));
  core.add(innerLines);

  const satellites = new THREE.Group();
  field.add(satellites);
  for (let i = 0; i < 8; i++) {
    const theta = i / 8 * Math.PI * 2;
    const node = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.32, 0.32, 0.32)), new THREE.LineBasicMaterial({ color: i % 3 === 0 ? 0xfffa00 : 0xa7b69f, transparent: true, opacity: 0.8 }));
    node.position.set(Math.cos(theta) * 5.3, Math.sin(theta * 2) * 0.45, Math.sin(theta) * 5.3);
    satellites.add(node);
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -2, 0), node.position]);
    satellites.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x9da794, transparent: true, opacity: 0.12 })));
  }

  for (let i = 0; i < 3; i++) {
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 128 }, (_, j) => { const a = j / 128 * Math.PI * 2; return new THREE.Vector3(Math.cos(a) * (4.6 + i * 0.4), -1.5 + i * 0.12, Math.sin(a) * (4.6 + i * 0.4)); })), new THREE.LineBasicMaterial({ color: 0xa3b297, transparent: true, opacity: 0.2 - i * 0.05 }));
    field.add(ring);
  }

  const grid = new THREE.GridHelper(32, 16, 0x75826d, 0x53604c);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.09;
  grid.position.y = -3.8;
  field.add(grid);

  let motion = initialMotion, visible = true, disposed = false, frame = 0, last = 0, elapsed = 0;
  const pointer = new THREE.Vector2();
  function onPointer(event: PointerEvent) { const r = container.getBoundingClientRect(); pointer.set((event.clientX - r.left) / r.width - 0.5, (event.clientY - r.top) / r.height - 0.5); }
  container.parentElement!.addEventListener('pointermove', onPointer, { passive: true });
  function render(time = 0) {
    frame = 0;
    if (disposed) return;
    if (motion && visible && !document.hidden) {
      const delta = Math.min((time - last) / 1000 || 0, 0.05); elapsed += delta;
      core.rotation.y = 0.4 + elapsed * 0.13;
      core.position.y = 1.1 + Math.sin(elapsed * 0.7) * 0.25;
      satellites.rotation.y = elapsed * -0.035;
      field.rotation.y += (-0.3 + pointer.x * 0.2 - field.rotation.y) * 0.025;
      field.rotation.x += (pointer.y * 0.06 - field.rotation.x) * 0.025;
      points.material.opacity = 0.45 + Math.sin(elapsed * 0.6) * 0.1;
      frame = requestAnimationFrame(render);
    }
    last = time;
    renderer.render(scene, camera);
  }
  function schedule() { if (!frame && !disposed) { last = performance.now(); frame = requestAnimationFrame(render); } }
  const resize = new ResizeObserver(() => { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); schedule(); });
  resize.observe(container);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); }, { threshold: 0 });
  intersection.observe(container);
  const onVisibility = () => { if (!document.hidden) schedule(); };
  document.addEventListener('visibilitychange', onVisibility);
  schedule();
  return {
    setMotion(value: boolean) { motion = value; if (!motion && frame) { cancelAnimationFrame(frame); frame = 0; } schedule(); },
    dispose() { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect(); document.removeEventListener('visibilitychange', onVisibility); container.parentElement?.removeEventListener('pointermove', onPointer); scene.traverse(object => { const o = object as THREE.Mesh; o.geometry?.dispose(); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose()); }); renderer.dispose(); renderer.domElement.remove(); },
  };
}
