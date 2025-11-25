// UseDetailChart.js
import { FETAL_STANDARDS } from '../FetalStandardData'; // 전체 표준 데이터
import { calculateFetalWeek } from '../../../member/utils/pregnancyUtils';
import { caxios } from '../../../config/config';
export const UseDetailChart = (activeMenu, currentWeek, menuList, babyInfo) => {
    if (!babyInfo || !babyInfo.babySeq) return Promise.resolve({});

    const { babySeq, birthDate, status } = babyInfo;
    const selectedMetricName = menuList[activeMenu];
    const metricKeyMap = {
        "몸무게": "EFW",
        "머리둘레": "HC",
        "머리직경": "OFD",
        "복부둘레": "AC",
        "허벅지 길이": "FL"
    };
    const selectedMetricKey = metricKeyMap[selectedMetricName];
    if (!selectedMetricKey || !FETAL_STANDARDS[currentWeek]) return Promise.resolve({});

    console.log("UseDetailChart 호출됨, babySeq:", babySeq);
    return caxios.get(`/chart/detail?babySeq=${babySeq}`)
        .then(res => {
            console.log("서버 응답 받음", res.data);
            const records = res.data;

            // 측정 데이터 주차 기준으로 매핑
            const actual = {};
            records.forEach(r => {
                let week;
                if (status.toLowerCase() === 'fetus') {
                    week = calculateFetalWeek(birthDate, r.measure_date);
                    console.log("measure_date:", r.measure_date, "=> week:", week);
                } else {
                    week = null; // 생후 주차 로직 필요하면 추가
                }

                if (week) {
                    if (!actual[week]) actual[week] = {};
                    actual[week][r.measure_type] = r.measure_value;
                }
            });

            const START_WEEK = 14;
            const END_WEEK = 40;
            const weeks = [];
            const avgData = [];
            const actualBabyData = [];

            let unit = FETAL_STANDARDS[14][selectedMetricKey].unit;

            for (let week = START_WEEK; week <= END_WEEK; week++) {
                weeks.push(week);
                avgData.push(FETAL_STANDARDS[week][selectedMetricKey]?.avg ?? null);
                actualBabyData.push(actual[week]?.[selectedMetricKey] ?? null);
            }



            return {
                title: { text: `${selectedMetricName} 성장 추이 (${START_WEEK}주~${END_WEEK}주)`, left: 'center' },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params) => {
                        const week = params[0].name;
                        const values = params.map(p => `${p.marker} ${p.seriesName}: ${p.value} ${unit}`);
                        return `주차: ${week}주<br/>` + values.join('<br/>');
                    }
                },
                legend: { data: ['태아 표준 기록 (평균)', '내 아기 성장 기록'], bottom: 0 },
                xAxis: { type: 'category', data: weeks, name: '임신 주수 (Week)', boundaryGap: false },
                yAxis: { type: 'value', name: `측정값 (${unit})` },
                series: [
                    { name: '태아 표준 기록 (평균)', type: 'line', data: avgData, lineStyle: { color: 'green', width: 2 }, smooth: true, showSymbol: false },
                    { name: '내 아기 성장 기록', type: 'line', data: actualBabyData, lineStyle: { color: 'blue', width: 3 }, symbolSize: 8, connectNulls: true }
                ]
            };
        })
        .catch(err => {
            console.error(err);
            return {};
        });

};
