import styles from "./BabyBox.module.css";
import backgrond from "./imgs/Background.svg";
import infants from "./imgs/Infants.svg";
import backgrond2 from "./imgs/Background2.svg";
import toddlers from "./imgs/Toddlers.svg";

// isPregnant: boolean (임산모면 true, 육아면 false)
// isDuePassed: boolean (출산 예정일이 지났거나, 육아 회원인 경우 true)
/**
 * 아기 박스 컴포넌트
 * {string} babyName - 아기 이름 (또는 태명)
 * {string} dueDateStatus - D-day 상태 (예: D-20주, D+50일)
 * {boolean} isPregnant - 임산모 타입인지 여부
 * {boolean} isDuePassed - 출산 예정일이 지났는지 여부 (임산모 타입일 때만 유효)
 */
// 기본값 설정: Prop이 없으면 테스트 값으로 대체
const BabyBox = ({
  babyName = "김돌쇠",
  dueDateStatus = "D-2개월",
  isPregnant = true,
  isDuePassed = false,
}) => {
  // 렌더링할 이미지 세트 결정 - 아기 이미지
  let backgroundImage = backgrond;
  let mainImage = infants;

  // 조건: 회원이 '육아' 타입이거나, '임산모' 타입이지만 D-day가 지났을 때 (즉, 출산 후)
  const isParenting = !isPregnant || isDuePassed;

  if (isParenting) {
    // 육아 이미지 세트
    backgroundImage = backgrond2;
    mainImage = toddlers;
  }

  return (
    <div className={styles.container}>
      <div className={styles.babyImagePlaceholder}>
        <b className={styles.babyName}>{babyName}</b>
        <div className={styles.dueDate}>{dueDateStatus}</div>
      </div>

      <div className={styles.mainContentArea}>
        <div>
          <img
            src={backgroundImage}
            className={styles.backgrondImage}
            alt="배경"
          />
        </div>
        <div>
          <img
            src={mainImage}
            className={styles.placeholderImage}
            alt={isParenting ? "육아" : "아기"}
          />
        </div>
      </div>
    </div>
  );
};
export default BabyBox;
