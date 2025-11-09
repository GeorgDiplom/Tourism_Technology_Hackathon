"use client";
import { ActivityData } from "@/activitiesMockData";
import { toggleActivityInPlanned } from "@/lib/plannedActivites";
import { appStore } from "@/stores/app.store";
import { AdvancedMarker, APIProvider, InfoWindow, Map, Pin } from "@vis.gl/react-google-maps";
import { useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { UserLocationMarker } from "./map/UserLocationMarker";
import { getPinColor } from "@/lib/getPinColor";
const api_key = process.env.NEXT_PUBLIC_MAPS_API_KEY;

interface MapViewProps {
  data: ActivityData[];
}

const mapStyles = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
];

export default function MapView({ data }: MapViewProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null);
  const { plannedActivities } = useSnapshot(appStore);

  const handleChange = (activity: ActivityData) => {
    setSelectedActivity(activity);
  };

  const isPlanned = (activityId: number) => {
    return plannedActivities?.some((a) => a.id === activityId);
  };

  const handleButtonClick = (activityId: number) => {
    toggleActivityInPlanned(activityId);
  };

  const center = useMemo(() => {
    if (!data || data.length === 0) {
      return { lat: 0, lng: 0 };
    }

    const totalLat = data.reduce((acc, activity) => acc + activity.latitude, 0);
    const totalLng = data.reduce((acc, activity) => acc + activity.longitude, 0);
    return {
      lat: totalLat / data.length,
      lng: totalLng / data.length,
    };
  }, [data]);

  const randomizedMatchRateActivities = useMemo(() => {
    return data.map((activity) => ({
      ...activity,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, [data]);

  return (
    <APIProvider apiKey={api_key!}>
      <Map defaultCenter={{ lat: center.lat, lng: center.lng }} defaultZoom={13} mapId="7f5d57c975598799be7045aa" className="h-full w-full">
        {randomizedMatchRateActivities.map((activity) => (
          <AdvancedMarker onClick={() => handleChange(activity)} key={activity.id} position={{ lat: activity.latitude, lng: activity.longitude }} title={activity.title}>
            {isPlanned(activity.id) ? <Pin {...getPinColor(activity, true)} /> : <Pin {...getPinColor(activity, false)} />}
          </AdvancedMarker>
        ))}
        <UserLocationMarker />
        {selectedActivity && (
          <InfoWindow
            position={{
              lat: selectedActivity.latitude,
              lng: selectedActivity.longitude,
            }}
            onCloseClick={() => setSelectedActivity(null)}
            headerContent={<strong>{selectedActivity.title}</strong>}
          >
            <div>
              <p>{selectedActivity.description}</p>

              <button type="button" onClick={() => handleButtonClick(selectedActivity.id)}>
                {isPlanned(selectedActivity.id) ? "Remove from plan" : "Add to plan"}
              </button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
