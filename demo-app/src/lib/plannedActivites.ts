import { activitiesMockData } from "@/activitiesMockData";
import { appStore } from "@/stores/app.store";

export const toggleActivityInPlanned = (activityId: number) => {
  if (!appStore.plannedActivities) {
    appStore.plannedActivities = [];
  }

  const index = appStore.plannedActivities.findIndex((a) => a.id === activityId);

  if (index > -1) {
    appStore.plannedActivities.splice(index, 1);
  } else {
    const activityToAdd = activitiesMockData.find((a) => a.id === activityId);

    if (activityToAdd) {
      appStore.plannedActivities.push(activityToAdd);
    }
  }
};
