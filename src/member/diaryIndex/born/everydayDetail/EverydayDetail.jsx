import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EverydayDetail.module.css";
import {
  Milk,
  Droplets,
  Soup,
  Moon,
  Thermometer,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  PlusCircle,
} from "lucide-react";
import EverydayWrite from "../everydayWrite/EverydayWrite";

// 타입별 아이콘과 색상 매핑
const typeMap = {
  전체: { color: "#f0d827" },
  분유: { icon: Milk, color: "#ff8cb3" },
  배변: { icon: Droplets, color: "#ffb84d" },
  이유식: { icon: Soup, color: "#7adf80" },
  수면: { icon: Moon, color: "#7abaff" },
  체온: { icon: Thermometer, color: "#ff7a7a" },
};

// 로그 리스트 컨테이너 애니메이션 Variants
const listContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

// 개별 로그 항목 애니메이션 Variants
const logItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EverydayDetail = ({ logData }) => {
  const [activeType, setActiveType] = useState("전체");
  const [logs, setLogs] = useState(
    logData || [
      { time: "07:03", type: "분유", amount: "30ml" },
      { time: "09:10", type: "분유", amount: "60ml" },
      { time: "11:20", type: "배변", amount: "1회" },
    ]
  );

  const [showModal, setShowModal] = useState(false);
  const [typeToAdd, setTypeToAdd] = useState("");

  const openModalForNewLog = (type) => {
    setTypeToAdd(type);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleTypeClick = (type) => {
    setActiveType(type);
  };

  return (
    <div className={styles.detailContainer}>
      {/* Header & 날짜 */}
      <div className={styles.headerSection}>
        <div className={styles.dateNavigation}>
          <ChevronLeft className={styles.arrowIcon} />
          <div className={styles.currentDate}>11월 30일 (일)</div>
          <ChevronRight className={styles.arrowIcon} />
        </div>

        {/* 타입 필터 버튼 */}
        <div className={styles.categoryFilters}>
          {Object.entries(typeMap).map(([key, info]) => (
            <div
              key={key}
              className={`${styles.filterButton} ${
                key === "전체" ? styles.fullButton : ""
              } ${activeType === key ? styles.filterButtonActive : ""}`}
              onClick={() => handleTypeClick(key)}
            >
              {info.icon && (
                <info.icon
                  size={18}
                  style={{ color: activeType === key ? info.color : "#8c8c8c" }}
                />
              )}
              <div
                className={styles.filterText}
                style={{ color: activeType === key ? info.color : "#696b70" }}
              >
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 기록 추가 버튼 (전체 선택 시 숨김) */}
      {activeType !== "전체" && (
        <div className={styles.addButtonWrapper}>
          <button
            className={styles.addButton}
            onClick={() => openModalForNewLog(activeType)}
          >
            <PlusCircle size={20} className={styles.addIcon} />
            <span className={styles.addText}>{activeType} 기록 추가</span>
          </button>
        </div>
      )}

      {/* 로그 리스트 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType} // activeType 변경 시 애니메이션 발생
          className={styles.logListWrapper}
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {logs
            .filter((item) => activeType === "전체" || item.type === activeType)
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((item, i) => {
              const info = typeMap[item.type];
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  className={styles.logEntry}
                  style={{ borderLeft: `4px solid ${info.color}` }}
                  variants={logItemVariants}
                >
                  <div className={styles.logTimeWrapper}>
                    <div
                      className={styles.timeLine}
                      style={{ backgroundColor: info.color }}
                    />
                    <div className={styles.timeLabel}>
                      <div
                        className={styles.timeText}
                        style={{ color: info.color }}
                      >
                        {item.time}
                      </div>
                    </div>
                  </div>

                  <div className={styles.logContent}>
                    {Icon && (
                      <Icon
                        className={styles.logIconSvg}
                        style={{ color: info.color }}
                      />
                    )}
                    <div className={styles.logType}>{item.type}</div>
                    <div className={styles.logAmount}>{item.amount}</div>
                  </div>

                  <div className={styles.actionButtonWrapper}>
                    <MoreVertical className={styles.actionIcon} />
                  </div>
                </motion.div>
              );
            })}

          {/* 로그 없을 경우 */}
          {logs.filter(
            (item) => activeType === "전체" || item.type === activeType
          ).length === 0 && (
            <div className={styles.noLogMessage}>
              현재 {activeType} 기록이 없습니다. 상단의 '기록 추가' 버튼을
              눌러주세요.
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 모달 */}
      {/* showModal 상태가 true일 때만 EverydayWrite 컴포넌트 렌더링 */}
      <AnimatePresence>
        {showModal && (
          <EverydayWrite
            type={typeToAdd}
            logs={logs}
            setLogs={setLogs}
            onCancel={closeModal}
            // EverydayWrite 내부에서 AnimatePresence가 showModal을 대신하도록 isOpen prop을 전달
            isOpen={showModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EverydayDetail;
