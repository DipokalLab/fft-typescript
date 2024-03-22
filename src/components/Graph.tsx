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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart",
    },
  },
};

function LineGraph({ data }: { data: number[] }) {
  const [graphData, setGraphData] = useState({
    labels: data.map(() => ""),
    datasets: [
      {
        label: "Dataset",
        data: data,
        borderColor: "#2e82ff",
        backgroundColor: "#2e82ff",
      },
    ],
  });

  useEffect(() => {
    setGraphData({
      labels: data.map(() => ""),
      datasets: [
        {
          label: "Dataset",
          data: data,
          borderColor: "#2e82ff",
          backgroundColor: "#2e82ff",
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
