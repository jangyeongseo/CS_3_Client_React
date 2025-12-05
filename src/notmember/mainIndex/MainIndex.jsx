import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CommonHeader from "../../common/commonheader/CommonHeader";
import Information from "../Information/Information";
import BabyIndex from "../../member/babyIndex/BabyIndex";
import BabyInfoIndex from "../../member/babyInfoIndex/BabyInfoIndex";
import CheckListIndex from "../../member/checkListIndex/CheckListIndex";
import ChartIndex from "../../member/chartIndex/ChartIndex";
import DiaryIndex from "../../member/diaryIndex/DiaryIndex";
import BoardIndex from "../boardIndex/BoardIndex";
import ParentInfoIndex from "../../member/parentInfoIndex/ParentInfoIndex";
import Loading from "common/loading/Loading";

import styles from "./MainIndex.module.css";
import useAuthStore from "../../store/useStore";
import { caxios } from "config/config";

import { useEffect, useRef, useState } from "react";

const MainIndex = ({ alerts, setAlerts }) => {
  const { isLogin } = useAuthStore((state) => state);
  const location = useLocation();

  /* -----------------------------
   *  모든 Hook은 조건문 밖 최상단
  --------------------------------*/
  const [isLoading, setIsLoading] = useState(true);

  // 헤더 높이 측정
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(98);

  // Information 페이지 여부 (비로그인 + "/")
  const isInfoPage = !isLogin && location.pathname === "/";

  /* -----------------------------
   *  로딩 처리 useEffect
  --------------------------------*/
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  /* -----------------------------
   *  경로 변화 감지
  --------------------------------*/
  useEffect(() => {
    if (!isLogin) return;

    const trackablePaths = [
      "/board",
      "/mypage",
      "/babymypage",
      "/checklist",
      "/chart",
      "/diary",
    ];

    if (trackablePaths.some((p) => location.pathname.startsWith(p))) {
      caxios.post("/dashCart", { path: location.pathname }).catch(() => {});
    }
  }, [location, isLogin]);

  /* -----------------------------
   *  헤더 높이 자동 측정
  --------------------------------*/
  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      setHeaderHeight(headerRef.current.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  /* -----------------------------
   * 노란 배경을 써야 하는 경로
  --------------------------------*/
  const yellowBackgroundPaths = ["/", "/babyIndex", "/babymypage"];

  const isYellowBackground =
    isLogin &&
    yellowBackgroundPaths.some((path) =>
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path)
    );

  const mainLayoutClassName = isYellowBackground
    ? styles.layoutMainYellow
    : styles.layoutMain;

  /* -----------------------------
   *  Hook 사용 후 return 허용
  --------------------------------*/
  if (isLoading) {
    return <Loading message="페이지를 준비하고 있습니다" />;
  }

  return (
    <div className={styles.container}>
      {/* 헤더 (Information 페이지에서만 고정) */}
      <header
        ref={headerRef}
        className={
          isInfoPage ? styles.MemberHeaderFixed : styles.MemberHeaderNormal
        }
      >
        <CommonHeader isLogin={isLogin} alerts={alerts} setAlerts={setAlerts} />
      </header>

      {/* 메인 */}
      <div className={mainLayoutClassName}>
        <Routes>
          <Route path="" element={!isLogin ? <Information /> : <BabyIndex />} />
          {/*로그인 안되어 있으면 ? 인포메이션 : 되면 베이비인덱스*/}
          <Route path="board/*" element={<BoardIndex />} /> {/*커뮤니티*/}
          {/*-----------------------------------------------------------------------여기까지는 비회원도 접근 가능한 부분 아래는 불가하게 막아야함*/}
          <Route path="mypage" element={<ParentInfoIndex />} />
          <Route path="babymypage" element={<BabyInfoIndex />} />
          {/*아기 마이페이지*/}
          <Route path="checklist" element={<CheckListIndex />} />
          {/*검진 체크리스트*/}
          <Route path="chart/*" element={<ChartIndex />} /> {/*차트*/}
          <Route path="diary/*" element={<DiaryIndex />} /> {/*산모수첩*/}
        </Routes>
      </div>
    </div>
  );
};

export default MainIndex;
