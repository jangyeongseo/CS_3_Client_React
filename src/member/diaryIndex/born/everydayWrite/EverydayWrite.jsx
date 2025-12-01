import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EverydayWrite.module.css";

// 모달 오버레이 애니메이션
const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

// 모달 본체 애니메이션
const containerVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.2 } },
};

// 하루일기 작성 컴포넌트
const EverydayWrite = ({ type = "분유", logs, setLogs, onCancel, isOpen }) => {
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");

  // 타입에 따라 단위, 입력 타입, 라벨 설정
  const getLogDetails = (logType) => {
    switch (logType) {
      case "분유":
      case "이유식":
        return { unit: "ml", inputType: "number", label: "용량" };
      case "배변":
        return { unit: "회", inputType: "number", label: "횟수" };
      case "수면":
        return { unit: "시간", inputType: "text", label: "시간" };
      case "체온":
        return { unit: "°C", inputType: "number", label: "체온" };
      default:
        return { unit: "", inputType: "text", label: "내용" };
    }
  };

  const { unit, inputType, label } = getLogDetails(type);

  const handleAdd = () => {
    if (!time || !amount) {
      alert(`시간과 ${label}을 입력해주세요.`);
      return;
    }

    if (setLogs) {
      const newLog = { time, type, amount: `${amount}${unit}` };
      setLogs([...logs, newLog]);
    }

    setTime("");
    setAmount("");

    if (onCancel) onCancel(); // 완료 후 모달 닫기
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 모달 오버레이 */}
          <motion.div
            className={styles.overlay}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onCancel} // 배경 클릭 시 닫기
          />

          {/* 모달 본체 */}
          <motion.div
            className={styles.writeContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.contentWrapper}>
              {/* 카테고리 제목 */}
              <div className={styles.categoryTitleWrapper}>
                <div className={styles.categoryTitle}>{type} 기록</div>
              </div>

              {/* 입력 그룹 */}
              <div className={styles.inputGroup}>
                <div className={styles.inputBox}>
                  <div className={styles.inputLabel}>시간</div>
                  <input
                    type="time"
                    className={styles.timeInput}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className={styles.inputBox}>
                  <div className={styles.inputLabel}>{label}</div>
                  <div className={styles.amountInputWrapper}>
                    <input
                      type={inputType}
                      placeholder={`${label}을 입력하세요`}
                      className={styles.amountInput}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {unit && (
                      <div className={styles.unitBox}>
                        <div className={styles.unitText}>{unit}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className={styles.actionButtonsWrapper}>
                <div className={styles.actionButtonsContainer}>
                  <button
                    className={`${styles.actionButton} ${styles.backButton}`}
                    onClick={onCancel}
                  >
                    <div className={styles.buttonText}>뒤로가기</div>
                  </button>

                  <button
                    className={`${styles.actionButton} ${styles.completeButton}`}
                    onClick={handleAdd}
                  >
                    <div className={styles.buttonTextBold}>완료</div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EverydayWrite;
