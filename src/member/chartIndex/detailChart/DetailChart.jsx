import React, { useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';
import styles from "./DetailChart.module.css";
import { UseDetailChart } from "./UseDetailChart";

const DetailChart = ({ menuList, activeMenu, currentWeek, standardData, babyInfo }) => {
  const [option, setOption] = useState({});

  useEffect(() => {
    if (!babyInfo?.babySeq || !babyInfo?.birthDate) return;

    UseDetailChart(activeMenu, currentWeek, menuList, standardData, babyInfo.babySeq, babyInfo.birthDate)
      .then(resOption => {
        console.log("그래프 옵션 생성 완료:", resOption);
        setOption(resOption);
      });
  }, [activeMenu, currentWeek, menuList, standardData, babyInfo]);

  return (
    <div className={styles.contentBox}>
      <div className={styles.chartArea}>
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default DetailChart;
