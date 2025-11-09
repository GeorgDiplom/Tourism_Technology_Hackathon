"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import React, { useEffect } from "react";
import { on } from "events";

interface NumberCounterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function NumberCounter({ value, onChange }: NumberCounterProps) {
  const [inputValue, setInputValue] = React.useState<number>(value);
  const handleChange = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setInputValue(parsedValue);
      onChange(parsedValue);
    }
  };

  return (
    <div className="inline-flex items-center border rounded-md">
      <button className="p-3" onClick={() => handleChange((inputValue - 1).toString())}>
        <MinusIcon />
      </button>
      <input className="w-[50px] p-3" type="text" value={inputValue} onChange={(e) => handleChange(e.target.value)} />
      <button className="p-3" onClick={() => handleChange((inputValue + 1).toString())}>
        <PlusIcon />
      </button>
    </div>
  );
}
