"use client";

import { appStore } from "@/stores/app.store";
import { useSnapshot } from "valtio";
import { Button } from "../ui/button";
import { toggleActivityInPlanned } from "@/lib/plannedActivites";
import { Route, X } from "lucide-react";

export default function PlannedActivitiesFilter() {
  const { plannedActivities } = useSnapshot(appStore);

  console.log(plannedActivities);

  if (!plannedActivities || plannedActivities.length === 0) return null;

  return (
    <div className="max-h-[325px] overflow-y-auto">
      <p className="text-zinc-600 text-sm">Planned Activities:</p>

      {plannedActivities.map((activity) => (
        <div key={activity.id} className="p-2 border rounded-md mb-2 flex items-center justify-between gap-3">
          <p className="font-medium">{activity.title}</p>
          <Button className="cursor-pointer" variant="outline" size="icon-sm" onClick={() => toggleActivityInPlanned(activity.id)}>
            <X />
          </Button>
        </div>
      ))}
      <div className="sticky bottom-0 bg-white">
        <Button type="button" className="sticky bottom-0" onClick={() => alert("HA HA, not implemented yet!")}>
          <Route className="mr-2" />
          <span>Plan your Trip</span>
        </Button>
      </div>
    </div>
  );
}
