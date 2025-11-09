import { ActivityData } from "@/activitiesMockData";
import { appStore } from "@/stores/app.store";
import { useSnapshot } from "valtio";
import { activitiesMockData } from "@/activitiesMockData";

export function getFilteredActivities(): ActivityData[] {
  const { interests, persons, duration } = useSnapshot(appStore).filter;

  const { childrenAges } = persons;

  return activitiesMockData.filter((activity) => {
    if (interests && !activity.interests.includes(interests)) {
      return false;
    }

    if (duration && activity.durationHours > duration) {
      return false;
    }

    if (childrenAges.length > 0) {
      const isSuitableForAllChildren = childrenAges.every((childAge) => {
        return childAge >= activity.ages.from && childAge <= activity.ages.to;
      });

      if (!isSuitableForAllChildren) {
        return false;
      }
    }
    return true;
  });
}
