"use client";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import { Minus, Plus } from "lucide-react";
import { useSnapshot } from "valtio";
import { appStore } from "@/stores/app.store";
import { cn } from "@/lib/utils";
import { ActivityData } from "@/activitiesMockData";
import { toggleActivityInPlanned } from "@/lib/plannedActivites";
import { Skeleton } from "./ui/skeleton";

export default function ActivitiesListView({ data }: { data: ActivityData[] }) {
  const { plannedActivities } = useSnapshot(appStore);

  return data.map((activity) => {
    const isPlanned = plannedActivities?.some((a) => a.id === activity.id);
    const classes = cn({
      "border-green-300 bg-green-50": isPlanned,
    });

    return (
      <button type="button" key={activity.id} onClick={() => toggleActivityInPlanned(activity.id)} className="cursor-pointer text-left">
        <Item variant="outline" className={classes}>
          <ItemMedia>
            <Skeleton className="h-20 w-20" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{activity.title}</ItemTitle>
            <ItemDescription>{activity.description}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <div className="rounded-full border flex items-center gap-2 p-1 text-sm">
              {isPlanned ? <Minus className="size-4" /> : <Plus className="size-4" />}
              {isPlanned ? "Remove" : "Add to trip"}
            </div>
          </ItemActions>
        </Item>
      </button>
    );
  });
}
