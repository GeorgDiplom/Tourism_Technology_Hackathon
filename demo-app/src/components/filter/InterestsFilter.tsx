"use client";

import { appStore } from "@/stores/app.store";
import { useSnapshot } from "valtio";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function InterestsFilter() {
  const data = useSnapshot(appStore);

  return (
    <div>
      <p className="text-zinc-600 text-sm">Interests:</p>
      <ToggleGroup type="single" variant="outline" className="flex-wrap" value={data.filter.interests} onValueChange={(val: any) => (appStore.filter.interests = val)}>
        <ToggleGroupItem value="Family & Kids">Family & Kids</ToggleGroupItem>
        <ToggleGroupItem value="Art & Culture">Art & Culture</ToggleGroupItem>
        <ToggleGroupItem value="Food & Drink">Food & Drink</ToggleGroupItem>
        <ToggleGroupItem value="History & Architecture">History & Architecture</ToggleGroupItem>
        <ToggleGroupItem value="Music & Festivals">Music & Festivals</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
