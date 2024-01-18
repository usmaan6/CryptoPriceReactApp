import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
  const [chart, setChart] = useState({});

  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "coinranking88c9953a42ee5f1e0a2320df5d9c3c4ed02825f275631207";

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  console.log("chart", chart);

  var data = {
    labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: `${chart?.coins?.length} Coins Available`,
        data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <Bar data={data} height={400} options={options} />
    </div>
  );
};

export default BarChart;
