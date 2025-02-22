"use client";

import { Components } from "@/types/components";
import { useEffect, useState } from "react";

export default function Page() {
  const [components, setComponents] = useState<Components>([]);

  useEffect(() => {
    fetch("/api/components")
      .then((res) => res.json())
      .then(setComponents);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Discover</h1>
      <ul className="space-y-4">
        {components.map((comp) => (
          <li key={comp.id} className="rounded border p-4">
            <h2 className="text-lg font-semibold">{comp.name}</h2>
            <p>{comp.description}</p>
            <pre className="rounded bg-gray-100 p-2">{comp.code}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
