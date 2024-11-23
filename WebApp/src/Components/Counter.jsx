import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Compteur : {count}</h2>
      <button onClick={increment} style={{ margin: "5px" }}>
        Incrémenter
      </button>
      <button onClick={decrement} style={{ margin: "5px" }}>
        Décrémenter
      </button>
      <button onClick={reset} style={{ margin: "5px" }}>
        Réinitialiser
      </button>
    </div>
  );
};

export default Counter;
