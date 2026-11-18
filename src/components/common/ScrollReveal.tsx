'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'zoom-in';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.12,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

    if (isVisible) {
      return {
        opacity: 1,
        transform: 'none',
        transition: baseTransition,
        transitionDelay: `${delay}ms`,
      };
    }

    let initialTransform = 'translateY(36px)';
    if (animation === 'fade-down') initialTransform = 'translateY(-36px)';
    if (animation === 'fade-in') initialTransform = 'none';
    if (animation === 'slide-left') initialTransform = 'translateX(40px)';
    if (animation === 'slide-right') initialTransform = 'translateX(-40px)';
    if (animation === 'scale-up' || animation === 'zoom-in') initialTransform = 'scale(0.94)';

    return {
      opacity: 0,
      transform: initialTransform,
      transition: baseTransition,
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
    };
  };

  return (
    <div ref={domRef} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
}

