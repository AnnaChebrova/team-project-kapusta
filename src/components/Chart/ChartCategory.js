import React from "react";
import { useSelector } from "react-redux";
import { getIDiagramInfo } from "../../redux/transaction/selectors";
import WindowDementions from "../../helpers/WindowDementions";
import { Bar } from "react-chartjs-2";

// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import s from "../Chart/Chart.module.css";
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

export default function ChartCategory() {
  const { width } = WindowDementions();
  const info = useSelector(getIDiagramInfo);

  const getNextColor = (color) => {
    const palitraEl = ["#FF751D", "#FFDAC0", "#fcd7bd"];

    if (!color) {
      return palitraEl[0];
    }

    const colors = palitraEl.findIndex((el) => color === el);

    return palitraEl[colors + 1] ? colors[colors + 1] : palitraEl[0];
  };

  const barThickness = width < 768 ? 15 : 38;
  const data = {
    labels: Object.keys(info),
    datasets: [
      {
        data: Object.values(info),
        backgroundColor: getNextColor(),
        borderColor: getNextColor(),
        borderWidth: 1,
        borderRadius: 10,
        barThickness: barThickness,
        barMargin: 50,
      },
    ],
  };

  console.log(Object.keys(info));

  const optionsVertical = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const optionsHorizontal = {
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const height = width < 425 ? 422 : 200;
  const options = width < 768 ? optionsHorizontal : optionsVertical;

  return (
    <div className={s.chartContainer}>
      {Object.keys(info).length !== 0 ? (
        <Bar data={data} width={320} height={height} options={options} />
      ) : (
        <div className={s.altBlock}>
          <span className={s.altText1}>Если хотите создать диаграмму</span>
          <span className={s.altText2}> Кликайте на иконку</span>
          <p></p>
        </div>
      )}
    </div>
  );
}
