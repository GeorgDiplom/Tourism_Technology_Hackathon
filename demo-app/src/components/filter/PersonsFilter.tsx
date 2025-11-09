"use client";

import { appStore } from "@/stores/app.store";
import { useSnapshot } from "valtio";
import NumberCounter from "../composed/NumberCounter";
import { Input } from "../ui/input";
import { useEffect } from "react";

export default function PersonsFilter() {
  const { filter } = useSnapshot(appStore);

  useEffect(() => {
    if (filter.persons.children < filter.persons.childrenAges.length) {
      appStore.filter.persons.childrenAges = appStore.filter.persons.childrenAges.slice(0, filter.persons.children);
    }
  }, [filter.persons.children]);
  return (
    <div>
      <p className="text-zinc-600 text-sm">Adults:</p>
      <NumberCounter value={filter.persons.adults} onChange={(val) => (appStore.filter.persons.adults = val)} />
      <p className="text-zinc-600 text-sm">Children:</p>
      <NumberCounter value={filter.persons.children} onChange={(val) => (appStore.filter.persons.children = val)} />

      {Array.from({ length: filter.persons.children }).map((_, index) => (
        <div key={index} className="mt-2">
          <p className="text-zinc-600 text-sm">Age of child {index + 1}:</p>
          <Input type="number" value={filter.persons.childrenAges[index] || 0} onChange={(e) => (appStore.filter.persons.childrenAges[index] = e.target.value ? parseInt(e.target.value, 10) : 0)} />
        </div>
      ))}
    </div>
  );
}
