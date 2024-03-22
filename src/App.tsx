import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { LineGraph } from "./components/Graph";

function App() {
  const [data, setData] = useState([1, 2, 3, 4]);
  useEffect(() => {
    setInterval(() => {
      data.push(Math.random());
      setData([...data]);
    }, 1000);
  }, []);

  return (
    <div>
      <LineGraph data={data}></LineGraph>
    </div>
  );
}

export default App;
