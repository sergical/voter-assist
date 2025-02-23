'use client';

import { env } from '@/env';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';

type GoogleMapProps = {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  userLocation?: {
    lat: number;
    lng: number;
  } | null;
  onDistanceCalculated?: (distance: number) => void;
};

export function GoogleMap({
  location,
  userLocation,
  onDistanceCalculated,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      });

      const { Map: GoogleMapConstructor } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker');

      if (!mapRef.current) return;

      const votingLocation = {
        lat: location.latitude,
        lng: location.longitude,
      };

      const newMapInstance = new GoogleMapConstructor(mapRef.current, {
        center: votingLocation,
        zoom: 15,
        mapId: 'voter-assist-map',
      });

      const locationMarker = new Marker({
        map: newMapInstance,
        position: votingLocation,
        title: location.name,
      });

      setMapInstance(newMapInstance);
      setMarker(locationMarker);
    };

    if (!mapInstance) {
      initMap();
    }
  }, [location, mapInstance]);

  useEffect(() => {
    const calculateDistance = async () => {
      if (!mapInstance || !userLocation) return;

      const { DistanceMatrixService } = await new Loader({
        apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      }).importLibrary('routes');

      const service = new DistanceMatrixService();

      const result = await service.getDistanceMatrix({
        origins: [userLocation],
        destinations: [{ lat: location.latitude, lng: location.longitude }],
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (result.rows[0]?.elements[0]?.distance) {
        const distanceInKm = result.rows[0].elements[0].distance.value / 1000;
        onDistanceCalculated?.(distanceInKm);
      }
    };

    if (userLocation) {
      // Update or create user location marker
      if (userMarker) {
        userMarker.setPosition(userLocation);
      } else if (mapInstance) {
        const { Marker } = google.maps;
        const newUserMarker = new Marker({
          map: mapInstance,
          position: userLocation,
          title: 'Your Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });
        setUserMarker(newUserMarker);
      }

      // Fit bounds to show both markers
      if (mapInstance && marker) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(userLocation);
        bounds.extend({ lat: location.latitude, lng: location.longitude });
        mapInstance.fitBounds(bounds);
      }

      calculateDistance();
    }
  }, [
    userLocation,
    mapInstance,
    marker,
    location,
    userMarker,
    onDistanceCalculated,
  ]);

  return <div ref={mapRef} className="h-full w-full rounded-md" />;
}
