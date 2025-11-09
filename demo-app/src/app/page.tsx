"use client";
import ActivitiesListView from "@/components/ActivitiesListView";
import NumberCounter from "@/components/composed/NumberCounter";
import MapView from "@/components/MapView";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getFilteredActivities } from "@/lib/getFilteredActivities";
import { useState } from "react";
const api_key = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export default function Home() {
  const data = getFilteredActivities();
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <div className="flex flex-col gap-5">
      <ToggleGroup variant="outline" type="single" value={view} onValueChange={(val: "list" | "map") => setView(val)}>
        <ToggleGroupItem value="list">List View </ToggleGroupItem>
        <ToggleGroupItem value="map">Map View</ToggleGroupItem>
      </ToggleGroup>
      {view === "list" && (
        <div className="grid grid-cols-3 gap-5">
          <ActivitiesListView data={data} />
        </div>
      )}
      {view === "map" && (
        <div className="h-[800px] w-full">
          <MapView data={data} />
        </div>
      )}
    </div>
  );
}
