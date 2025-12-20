'use client';


import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';
import { IconCloud } from "@/components/ui/icon-cloud";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  variant?: 'default' | 'groovy';
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  variant = 'default'
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;

  // Groovy wave path vs simple curve
  const pathD = variant === 'groovy'
    ? "M0,60 C360,160 720,-40 1080,60 C1440,160 1800,-40 2160,60"
    : `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(2200 / textLength) + 2) // Increased buffer for wider wave
      .fill(text)
      .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        // Update main ref directly for speed
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');

        // Trigger re-render to update other layers (State update drives the other prop-based offsets)
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="flex items-center justify-center w-full "
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className={`select-none w-full overflow-visible block aspect-[100/12] font-bold uppercase leading-none mt-30px lg:mt-[80px] ${className?.includes('text-') ? '' : 'text-[12rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] xl:text-[5rem]' // Default sizes if not provided
          }`}
        viewBox="0 0 1440 120"
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <>
            {variant === 'groovy' ? (
              <>
                {/* Layer 1: Yellow Outline (Background) */}
                <text className={className}>
                  <textPath href={`#${pathId}`} startOffset={offset + 'px'} stroke="#FFD000" strokeWidth="28" strokeLinejoin="round" fill="none">
                    {totalText}
                  </textPath>
                </text>

                {/* Layer 2: Black Outline (Middle) */}
                <text className={className}>
                  <textPath href={`#${pathId}`} startOffset={offset + 'px'} stroke="#000000" strokeWidth="14" strokeLinejoin="round" fill="none">
                    {totalText}
                  </textPath>
                </text>

                {/* Layer 3: Yellow Fill (Foreground) */}
                <text className={className}>
                  <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} fill="#FFD000">
                    {totalText}
                  </textPath>
                </text>
              </>
            ) : (
              <text xmlSpace="preserve" className={`fill-yellow-400 ${className ?? ''}`}>
                <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
                  {totalText}
                </textPath>
              </text>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
