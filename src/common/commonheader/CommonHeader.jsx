import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CommonHeader.module.css";
import { HelpCircle, Menu } from "lucide-react";
import log from "./imgs/log.svg";
import BabySideNavi from "../babySideNavi/BabySideNavi"; // 사이드바 컴포넌트 임포트

const CommonHeader = () => {
  // 사이드바 표시 상태 관리: 기본값은 닫힘
  const [isNavOpen, setIsNavOpen] = useState(false);

  // 사이드바 토글 함수
  const toggleSideNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // BabySideNavi 내부에서 닫기 버튼/오버레이 클릭 시 호출될 함수
  const closeSideNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      {isNavOpen && <BabySideNavi onClose={closeSideNav} />}
      <div className={styles.topbar}>
        <div className={styles.headerContentWrapper}>
          {/* Left Section (로고 및 메뉴) */}
          <div className={styles.leftSection}>
            {/* 로고 (홈 링크) */}
            <Link to="/">
              <img src={log} className={styles.logoIcon} alt="로고 이미지" />
            </Link>

            <div className={styles.menuItems}>
              {/* 활성 메뉴 예시 */}
              <div className={styles.menuActive}>
                <b className={styles.menuItem}>커뮤니티</b>
              </div>
              {/* 비활성 메뉴 예시 */}
              <div className={styles.menuItemBox}>
                <span className={styles.menuItem}>마이페이지</span>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            {/* 도움말 아이콘 */}
            <button className={styles.iconButton}>
              <HelpCircle className={styles.helpIcon} />
            </button>

            {/* 메뉴 아이콘 (사이드바 토글 버튼) */}
            <button onClick={toggleSideNav} className={styles.iconButton}>
              <Menu className={styles.menuIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommonHeader;
