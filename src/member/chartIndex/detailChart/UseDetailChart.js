import { FETAL_STANDARDS } from '../FetalStandardData'; // 전체 표준 데이터
//  아기의 역사적 기록 Mock 데이터 (실제는 DB에서 가져와야 함)
const MOCK_BABY_HISTORY = {
    'EFW': { 18: 230, 24: 750, 28: 1350, 32: 2300, 36: 3500 }, 
    'HC': { 18: 150, 24: 220, 28: 265, 32: 300, 36: 340 },
    'OFD': { 18: 50, 24: 78, 28: 92, 32: 105, 36: 115 },
    'AC': { 18: 120, 24: 180, 28: 230, 32: 280, 36: 320 },
    'FL': { 18: 25, 24: 40, 28: 50, 32: 60, 36: 70 },
};

/**
 * 선택된 항목에 대한 꺾은선 그래프 옵션을 생성합니다. (최근 6주)
 */
export const UseDetailChart = (activeMenu, currentWeek, menuList) => {
    
    // activeMenu에서 측정 항목 키를 찾습니다.
    const selectedMetricName = menuList[activeMenu];
    const metricKeyMap = { "몸무게": "EFW", "머리둘레": "HC", "머리직경": "OFD", "복부둘레": "AC", "허벅지 길이": "FL" };
    const selectedMetricKey = metricKeyMap[selectedMetricName];

    if (!selectedMetricKey || !FETAL_STANDARDS[currentWeek]) {
        return {};
    }

    // 1. 데이터 범위 정의 (최근 6주)
    const START_WEEK = Math.max(14, currentWeek - 5);
    const END_WEEK = currentWeek;

    // 2. 데이터 파싱
    const weeks = [];
    const avgData = []; 
    const actualBabyData = [];
    let unit = FETAL_STANDARDS[14][selectedMetricKey].unit; 

    for (let week = START_WEEK; week <= END_WEEK; week++) {
        const standard = FETAL_STANDARDS[week];
        if (standard && standard[selectedMetricKey]) {
            const metric = standard[selectedMetricKey];
            
            weeks.push(week);
            avgData.push(metric.avg);
            // 아기의 실제 기록
            actualBabyData.push(MOCK_BABY_HISTORY[selectedMetricKey] ? MOCK_BABY_HISTORY[selectedMetricKey][week] : null);
        }
    }
    
    // 3. ECharts Line Chart 옵션 구성
    return {
        title: { text: `${selectedMetricName} 성장 추이 (${START_WEEK}주~${END_WEEK}주)`, left: 'center' },
        tooltip: { trigger: 'axis', formatter: (params) => {
            const week = params[0].name;
            const values = params.map(p => `${p.marker} ${p.seriesName}: ${p.value} ${unit}`);
            return `주차: ${week}주<br/>` + values.join('<br/>');
        } },
        legend: { data: ['태아 표준 기록 (평균)', '내 아기 성장 기록'], bottom: 0 },
        xAxis: { type: 'category', data: weeks, name: '임신 주수 (Week)', boundaryGap: false },
        yAxis: { type: 'value', name: `측정값 (${unit})` },
        series: [
            { name: '태아 표준 기록 (평균)', type: 'line', data: avgData, lineStyle: { color: 'green', width: 2 }, smooth: true, showSymbol: false },
            { name: '내 아기 성장 기록', type: 'line', data: actualBabyData, lineStyle: { color: 'red', width: 3 }, symbolSize: 8, connectNulls: true }
        ]
    };
};