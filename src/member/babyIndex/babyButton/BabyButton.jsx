import styles from "./BabyButton.module.css";

// isPrengant : 현재 사용자가 임산부 상태인지
const BabyButton = ({ isPregnant = true }) => {
  // 버튼 항목 데이터
  const baseItems = [
    {
      label: "아기 정보",
      path: "/babymypage",
      iconColor: "#f0d827",
    },
    {
      label: "건강 기록",
      path: "/checklist",
      iconColor: "#f0d827",
    },
    {
      label: "성장차트",
      path: "/chart",
      iconColor: "#f0d827",
    },
  ];

  // 임산부 전용/육아 전용 항목 분리
  const pregnantItems = [
    {
      label: "산모수첩",
      path: "/diary",
      iconColor: "#f0d827",
    },
    {
      label: "긴급 상담",
      path: "/counseling",
      iconColor: "#f0d827",
    },
  ];

  const parentingItems = [
    {
      label: "하루 일기",
      path: "/diary",
      iconColor: "#f0d827",
    },
    {
      label: "긴급 상담",
      path: "/counseling",
      iconColor: "#f0d827",
    },
  ];

  // 메뉴 목록 결정
  let navItems = [...baseItems];

  if (isPregnant) {
    navItems = [...baseItems, ...pregnantItems];
  } else {
    // 육아 상태일 때 산모수첩은 숨기고 육아일기 등을 표시할 수 있습니다.
    navItems = [...baseItems, ...parentingItems];
  }

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.buttonList}>
        {navItems.map((item, index) => (
          <a key={index} href={item.path} className={`${styles.navButton}`}>
            <div className={styles.iconLabelGroup}>
              <div
                className={styles.iconCircle}
                style={{
                  backgroundColor: item.isActive ? "white" : item.iconColor,
                }}
              />

              <div className={styles.labelText}>{item.label}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default BabyButton;
