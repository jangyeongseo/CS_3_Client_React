
import React, { useState } from "react";
import BabyBox from "./babyBox/BabyBox";
import BabyArticle from "./babyArticle/BabyArticle";
import BabyButton from "./babyButton/BabyButton";
import styles from "./BabyIndex.module.css";

const BabyIndex = () => {
  return (
    <div className={styles.container}>
      {/* 왼쪽: 아기 정보 + 네비바 */}
      <div className={styles.leftSection}>
        <div className={styles.babyBoxWrapper}>
          <BabyBox />
        </div>
        {/* 네비바 */}
        <div className={styles.babyButtonWrapper}>
          <BabyButton />
        </div>
      </div>
      {/* 오른쪽: 아기 관련 기사 */}
      <div className={styles.rightSection}>
        <BabyArticle />
      </div>
    </div>
  );
};

export default BabyIndex;
