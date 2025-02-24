'use client';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import ReactGlobe, { type GlobeMethods } from 'react-globe.gl';

type Marker = {
  lat: number;
  lng: number;
  size: number;
};

const MARKERS: Marker[] = [
  { lat: 43.6532, lng: -79.3832, size: 0.3 }, // Toronto
  { lat: 45.4215, lng: -75.6972, size: 0.3 }, // Ottawa
  { lat: 42.9849, lng: -81.2453, size: 0.3 }, // London
  { lat: 43.8975, lng: -78.9429, size: 0.2 }, // Oshawa
  { lat: 46.4917, lng: -80.993, size: 0.2 }, // Sudbury
  { lat: 48.4152, lng: -89.2377, size: 0.2 }, // Thunder Bay
];

export const Globe = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 992, height: 992 });

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Make height responsive - smaller on mobile
        const height = window.innerWidth < 768 ? width * 0.6 : width;
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Set initial position
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: 51.2538,
        lng: -85.3232,
        // Adjust altitude based on screen size
        altitude: window.innerWidth < 768 ? 2.5 : 2,
      });
    }
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <ReactGlobe
        ref={globeRef}
        globeImageUrl={
          isDark
            ? '//unpkg.com/three-globe/example/img/earth-dark.jpg'
            : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
        }
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        pointsData={MARKERS}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => '#1E90FF'}
        pointAltitude={0.01}
        pointRadius="size"
        animateIn={true}
        atmosphereColor="#1E90FF"
        atmosphereAltitude={0.1}
        pointsMerge={true}
        enablePointerInteraction={false}
      />
    </div>
  );
};
