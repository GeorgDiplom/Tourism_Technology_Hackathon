import { ActivityData } from "@/activitiesMockData";
import { proxy } from "valtio";

export interface AppStore {
  filter: {
    interests: "Family & Kids" | "Art & Culture" | "Food & Drink" | "History & Architecture" | "Music & Festivals" | undefined;
    persons: {
      adults: number;
      children: number;
      childrenAges: number[];
    };
    duration?: number;
  };
  plannedActivities?: ActivityData[];
}

const defaultValues: AppStore = {
  filter: {
    interests: undefined,
    persons: {
      adults: 2,
      children: 0,
      childrenAges: [],
    },
  },
  plannedActivities: [],
};

export const appStore = proxy<AppStore>(defaultValues);
