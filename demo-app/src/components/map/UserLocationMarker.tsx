"use client";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

export function UserLocationMarker() {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  if (!userLocation) {
    return null;
  }

  return (
    <AdvancedMarker position={userLocation} title={"Dein Standort"}>
      <Pin background={"#1976D2"} borderColor={"#1976D2"} glyphColor={"#FFFFFF"} />
    </AdvancedMarker>
  );
}
