import React from "react";
import styles from "./ChartInput.module.css";

// ChartInput 컴포넌트: 선택된 메뉴에 따라 입력 필드를 렌더링
const ChartInput = ({ menuList, activeMenu }) => {
  const activeItem = menuList[activeMenu];

  // 단일 입력 필드를 렌더링할지 여부 판단 ('전체'가 아니면 true)
  const shouldRenderSingleInput = activeItem !== "전체";

  // 입력 항목이 '몸무게'인지 확인 (단위 g 표시용)
  const isWeightInput = activeItem === "몸무게";

  return (
    <div className={styles.sidePanel}>
      {/* 패널 상단 제목 */}
      <div className={styles.panelHeader}>{activeItem} 입력</div>

      {/* 입력 필드 영역 */}
      <div className={styles.panelContent}>
        {/* 날짜 입력: 공통 필드 */}
        <label className={styles.label}>날짜</label>
        <input className={styles.input} type="date" placeholder="날짜" />
 
        {/*'전체' 메뉴 선택 시: 모든 항목 입력 필드 렌더링 */}
        {activeItem === "전체" && (
          <div className={styles.allInputGroup}>
            {menuList.slice(1).map((item) => (
              <div key={item} className={styles.inputGroup}>
                <label className={styles.label}>{item}</label>
                {/* 몸무게는 단위 g 표시 */}
                {item === "몸무게" ? (
                  <div className={styles.inputWithUnit}>
                    <input
                      className={styles.input}
                      type="number"
                      placeholder={item}
                    />
                    <span className={styles.unit}>g</span>
                  </div>
                ) : (
                  <input
                    className={styles.input}
                    type="number"
                    placeholder={item}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 단일 메뉴 선택 시: 해당 항목만 입력 필드 렌더링 */}
        {shouldRenderSingleInput && activeItem !== "전체" && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>{activeItem}</label>
            {isWeightInput ? (
              <div className={styles.inputWithUnit}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder={activeItem}
                />
                <span className={styles.unit}>g</span>
              </div>
            ) : (
              <input
                className={styles.input}
                type="number"
                placeholder={activeItem}
              />
            )}
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonRow}>
        <button className={styles.cancelBtn}>취소</button>
        {/* 입력 초기화 용 */}
        <button className={styles.submitBtn}>완료</button>
      </div>
    </div>
  );
};

export default ChartInput;
