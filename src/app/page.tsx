"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  return (
    <main>
      Home
      <p>Count: {count}</p>
      <button
        type={"button"}
        onClick={() => setCount((prevState) => prevState + 1)}
      >
        Click
      </button>
    </main>
  );
}
