import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { caxios } from "../../config/config";
import { FETAL_STANDARDS } from "./FetalStandardData"; 
//  MOCK_...으로 시작하는 모든 변수 정의는 제거되었습니다.


export const useChartIndex = () => {
    
    
    // 1. 상태 초기화 (API 응답을 기다리는 null 상태)
    const [babyInfo, setBabyInfo] = useState(null);       // Baby DTO (EDD, Status)
    const [currentWeek, setCurrentWeek] = useState(0);    // 계산된 주차
    const [actualData, setActualData] = useState(null);   // 현재 주차의 실측 데이터 (Map)
    const [activeMenu, setActiveMenu] = useState(0);

    const menuList = [
        "성장", "몸무게", "머리직경", "머리둘레", "복부둘레", "허벅지 길이",
    ];
    
    //  참고: DUMMY_BABY_SEQ는 인증 구현 전까지 API 호출의 시작점이므로 유지합니다.
    const DUMMY_BABY_SEQ = 1; 


    // 3. PHASE 1: 초기 데이터 로드 및 currentWeek 계산 (EDD/Status -> Week)
    useEffect(() => {
        const fetchInitialState = async () => {
            try {
                // Baby 정보 조회
                const babyResponse = await caxios.get(`/api/baby/${DUMMY_BABY_SEQ}`);
                const { status, birthDate, baby_seq } = babyResponse.data;

                // 주차 계산 API 호출
                const weekResponse = await caxios.get('/chart/week', {
                    params: { status: status, birthDate: birthDate }
                });
                
                // 상태 업데이트
                setBabyInfo({ babySeq: baby_seq, status, birthDate });
                setCurrentWeek(weekResponse.data.week); 

            } catch (error) {
                console.error("초기 데이터 로딩 오류:", error);
                setCurrentWeek(28); // 오류 시 기본값 설정
                setBabyInfo({ babySeq: DUMMY_BABY_SEQ, status: 'FETUS', birthDate: '2026-01-01' }); 
            }
        };
        
        fetchInitialState();
    }, []); 


    // 4. PHASE 2: 실제 측정 데이터 조회 (currentWeek 확정 후 실행)
    useEffect(() => {
        if (currentWeek <= 0 || !babyInfo) return; 

        const fetchActualData = async () => {
            setActualData(null); 
            try {
                const response = await caxios.get(`/api/fetal/measurement/current`, {
                    params: { babyId: babyInfo.babySeq, week: currentWeek }
                });
                setActualData(response.data || {}); 
            } catch (error) {
                console.error("Actual Data 조회 실패:", error);
                setActualData({});
            }
        };
        
        fetchActualData();
    }, [currentWeek, babyInfo]); 


    // 5. 메모이제이션된 표준 데이터 (FETAL_STANDARDS)
    const currentStandardData = useMemo(() => {
        if (currentWeek <= 0) return null;
        return FETAL_STANDARDS[currentWeek]; 
    }, [currentWeek]);


    // 6. 최종 반환 값
    return {
        menuList,
        currentWeek,
        activeMenu,
        setActiveMenu,
        currentStandardData,
        currentActualData: actualData,
    };
};