import { useEffect, useMemo, useRef, useState } from 'react';
import { imagePath, imageTitle } from '../data';

export default function RoundCarousel({ images, onSelect }) {
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const animationRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastFrameRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0, moved: false });
  const [size, setSize] = useState({ width: 300, height: 400, radius: 471 });
  const angle = useMemo(() => 360 / images.length, [images.length]);

  useEffect(() => {
    const measure = () => {
      const stageWidth = stageRef.current?.clientWidth ?? 800;
      const width = Math.min(300, Math.max(220, stageWidth - 80));
      const height = width * (400 / 300);
      const radius = (width * 1.3) / (2 * Math.tan(Math.PI / images.length));
      setSize({ width, height, radius });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [images.length]);

  useEffect(() => {
    const apply = () => {
      if (!ringRef.current) return;
      ringRef.current.style.transform = `translateZ(${-size.radius}px) rotateY(${rotationRef.current}deg)`;
    };
    const frame = now => {
      const dt = lastFrameRef.current ? Math.min((now - lastFrameRef.current) / 1000, 0.1) : 0;
      lastFrameRef.current = now;
      if (!dragRef.current.active) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current * dt;
          velocityRef.current *= 0.94;
        } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          rotationRef.current += 6 * dt;
        }
        apply();
      }
      animationRef.current = requestAnimationFrame(frame);
    };
    apply();
    animationRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationRef.current);
  }, [angle, images.length, size.radius]);

  const pointerDown = event => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = { active: true, x: event.clientX, moved: false };
    velocityRef.current = 0;
  };
  const pointerMove = event => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.x;
    if (Math.abs(dx) > 2) dragRef.current.moved = true;
    dragRef.current.x = event.clientX;
    rotationRef.current += dx * 1.5;
    velocityRef.current = dx * 90;
    ringRef.current.style.transform = `translateZ(${-size.radius}px) rotateY(${rotationRef.current}deg)`;
  };
  const pointerUp = event => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragRef.current.active = false;
  };

  return <div className="round-carousel" ref={stageRef} aria-label="图片作品环形展示" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
    <div className="round-carousel-tilt"><div className="round-carousel-ring" ref={ringRef} style={{ width: size.width, height: size.height }}>
      {images.map((file, index) => {
        const source = imagePath(file);
        const faceStyle = { backgroundImage: `url("${source}")` };
        return <button className="round-carousel-face" type="button" key={file} aria-label={`查看图片：${imageTitle(file)}`} onClick={() => !dragRef.current.moved && onSelect(file)} style={{ transform: `rotateY(${index * angle}deg) translateZ(${size.radius}px)` }}>
          <span className="round-carousel-image front" style={faceStyle}></span>
          <span className="round-carousel-image back" style={faceStyle}></span>
        </button>;
      })}
    </div></div>
  </div>;
}
