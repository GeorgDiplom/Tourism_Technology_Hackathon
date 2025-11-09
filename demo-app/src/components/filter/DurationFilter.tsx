"use client";

import { appStore } from "@/stores/app.store";
import { useSnapshot } from "valtio";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function DurationFilter() {
  const data = useSnapshot(appStore);

  return (
    <div>
      <p className="text-zinc-600 text-sm">Duration:</p>
      <ToggleGroup type="single" variant="outline" className="flex-wrap" value={data.filter.duration?.toString()} onValueChange={(val: any) => (appStore.filter.duration = parseInt(val))}>
        <ToggleGroupItem value={"1"}>Quick Stops (under 1 hour)</ToggleGroupItem>
        <ToggleGroupItem value={"4"}>Half-Day Activities</ToggleGroupItem>
        <ToggleGroupItem value={"8"}>Full Day Trip</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
