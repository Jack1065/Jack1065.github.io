import React, { useEffect, useRef } from 'react';

const ThreeCardAnimator: React.FC<{ speed?: number }> = ({ speed = 30 }) => {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      let THREE: any;
      try {
        THREE = await import('three');
      } catch (err) {
        console.warn('three.js not installed — ThreeCardAnimator is disabled. Run `npm install three` to enable.');
        return;
      }

      if (!mounted) return;

      const { Clock } = THREE;
      const clock = new Clock();

      // collect .marquee-item elements
      const container = document.querySelector('.marquee');
      if (!container) return;
      const items = Array.from(container.querySelectorAll('.marquee-item')) as HTMLElement[];
      if (!items.length) return;

      // compute total width of all items
      const widths = items.map(it => it.getBoundingClientRect().width + 16); // include gap approx
      const totalWidth = widths.reduce((s, w) => s + w, 0);

      // keep a base offset that increases over time and wraps
      let offset = 0;

      const animate = () => {
        const dt = clock.getDelta();
        // speed px per second
        offset += (speed * dt);
        // wrap offset to [0, totalWidth)
        if (offset >= totalWidth) offset = offset % totalWidth;

        // place items sequentially
        let x = -offset;
        for (let i = 0; i < items.length; i++) {
          const el = items[i];
          // translateX value
          el.style.transform = `translateX(${x}px)`;
          // increment x by width
          x += widths[i % widths.length];
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

    })();

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return null; // this component only drives DOM transforms
};

export default ThreeCardAnimator;
