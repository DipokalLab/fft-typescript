import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Complex } from "../math/complex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph({ data, title = "" }: { data: Complex[]; title?: string }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const [graphData, setGraphData] = useState({
    labels: data.map(() => ""),
    datasets: [
      {
        label: "Re",
        data: data.map((item) => {
          return item.re;
        }),
        borderColor: "#2e82ff",
        backgroundColor: "#2e82ff",
      },
      {
        label: "Im",
        data: data.map((item) => {
          return item.im;
        }),
        borderColor: "#1fff6d",
        backgroundColor: "#1fff6d",
      },
    ],
  });

  useEffect(() => {
    setGraphData({
      labels: data.map(() => ""),
      datasets: [
        {
          label: "Re",
          data: data.map((item) => {
            return item.re;
          }),
          borderColor: "#2e82ff",
          backgroundColor: "#2e82ff",
        },
        {
          label: "Im",
          data: data.map((item) => {
            return item.im;
          }),
          borderColor: "#1fff6d",
          backgroundColor: "#1fff6d",
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Line options={options} data={graphData} />
    </div>
  );
}

export { LineGraph };
