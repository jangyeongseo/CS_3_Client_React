// EverydayNavi.jsx
import { motion } from "framer-motion";
import { Milk, Droplets, Soup, Moon, Thermometer } from "lucide-react";
import styles from "./EverydayNavi.module.css";

const summaryData = {
  formula: { title: "분유", total: "450ml", icon: Milk, color: "#ff8cb3" },
  poop: { title: "배변", total: "3회", icon: Droplets, color: "#ffb84d" },
  babyfood: { title: "이유식", total: "180ml", icon: Soup, color: "#7adf80" },
  sleep: { title: "수면", total: "7시간", icon: Moon, color: "#7abaff" },
  temp: { title: "체온", total: "36.5°C", icon: Thermometer, color: "#ff7a7a" },
};

// 전체 리스트 stagger
const listContainer = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// 카드 애니메이션
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

const EverydayNavi = () => {
  return (
    <div className={styles.container}>
      {/* 날짜 선택 */}
      <div className={styles.dateBox}>
        <input type="date" className={styles.dateInput} />
        <input type="date" className={styles.dateInput} />
      </div>

      {/* 요약 카드 */}
      <motion.div variants={listContainer} initial="hidden" animate="show">
        <div className={styles.summaryGrid}>
          {Object.entries(summaryData).map(([key, item]) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={key}
                className={styles.summaryCard}
                variants={cardVariants}
              >
                <Icon size={28} strokeWidth={2.5} color={item.color} />
                <div className={styles.summaryText}>
                  <div className={styles.summaryTitle}>{item.title}</div>
                  <div className={styles.summaryValue}>{item.total}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default EverydayNavi;
