import { useEffect, useMemo, useRef, useState } from 'react';
import { imagePath, imageTitle } from '../data';

export default function RoundCarousel({ images }) {
  const sourceSpeed = 0.5;
  const degreesPerSecond = sourceSpeed * 6;
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const animationRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastFrameRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  const [size, setSize] = useState({ width: 450, height: 600, radius: 707 });
  const angle = useMemo(() => 360 / images.length, [images.length]);

  useEffect(() => {
    const measure = () => {
      const stageWidth = stageRef.current?.clientWidth ?? 800;
      const width = Math.min(450, Math.max(220, stageWidth - 40));
      const height = width * (600 / 450);
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
          rotationRef.current += degreesPerSecond * dt;
        }
        apply();
      }
      animationRef.current = requestAnimationFrame(frame);
    };
    apply();
    animationRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationRef.current);
  }, [angle, degreesPerSecond, images.length, size.radius]);

  const step = direction => {
    velocityRef.current = 0;
    rotationRef.current += direction * angle;
    if (ringRef.current) ringRef.current.style.transform = `translateZ(${-size.radius}px) rotateY(${rotationRef.current}deg)`;
  };

  const pointerDown = event => {
    if (event.target.closest('.carousel-control')) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = { active: true, x: event.clientX };
    velocityRef.current = 0;
  };
  const pointerMove = event => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.x;
    dragRef.current.x = event.clientX;
    rotationRef.current += dx * 1.5;
    velocityRef.current = dx * 90;
    ringRef.current.style.transform = `translateZ(${-size.radius}px) rotateY(${rotationRef.current}deg)`;
  };
  const pointerUp = event => {
    if (event.target.closest('.carousel-control')) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragRef.current.active = false;
  };
  const pointerCancel = event => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragRef.current.active = false;
  };

  return <div className="round-carousel" ref={stageRef} aria-label="图片作品环形展示" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerCancel}>
    <div className="round-carousel-tilt"><div className="round-carousel-ring" ref={ringRef} style={{ width: size.width, height: size.height }}>
      {images.map((file, index) => {
        const source = imagePath(file);
        const faceStyle = { backgroundImage: `url("${source}")` };
        return <div className="round-carousel-face" key={file} role="img" aria-label={imageTitle(file)} style={{ transform: `rotateY(${index * angle}deg) translateZ(${size.radius}px)` }}>
          <span className="round-carousel-image front" style={faceStyle}></span>
          <span className="round-carousel-image back" style={faceStyle}></span>
        </div>;
      })}
    </div></div>
    <button className="carousel-control carousel-previous" type="button" aria-label="上一张图片" onClick={() => step(1)}><span aria-hidden="true">←</span></button>
    <button className="carousel-control carousel-next" type="button" aria-label="下一张图片" onClick={() => step(-1)}><span aria-hidden="true">→</span></button>
  </div>;
}
