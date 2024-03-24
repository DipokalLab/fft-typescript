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

function LineGraph({ data, title = "" }: { data: number[]; title?: string }) {
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
