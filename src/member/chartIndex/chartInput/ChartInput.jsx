import React, { useState } from "react";
import styles from "./ChartInput.module.css";
import { submitChartData } from "./UseChartInput"; // JS 분리
import useAuthStore from "../../../store/useStore";

const ChartInput = ({ menuList, activeMenu, currentWeek, existingData }) => {
  const activeItem = menuList[activeMenu];
  const [isEditing, setIsEditing] = useState(false);
  const hasData = existingData?.[currentWeek] ? true : false;

  const [date, setDate] = useState("");
  const [inputs, setInputs] = useState({});
  const { id, babySeq } = useAuthStore();

  const handleChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await submitChartData({ inputs, date, babySeq, id });
    // 저장 완료 후 상태 처리
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancelOrUpdate = () => setIsEditing(false);

  const shouldRenderSingleInput = activeItem !== "성장";
  const isWeightInput = activeItem === "몸무게";
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.sidePanel}>
      <div className={styles.panelHeader}>{activeItem}</div>

      <div className={styles.panelContent}>
        <label className={styles.label}>날짜</label>
        <input
          className={styles.input}
          type="date"
          placeholder="날짜"
          value={date}
          min={todayStr}
          max={todayStr}
          disabled={hasData}
          onChange={(e) => setDate(e.target.value)}
        />

        {activeItem === "성장" && (
          <div className={styles.allInputGroup}>
            {menuList.slice(1).map((item) => (
              <div key={item} className={styles.inputGroup}>
                <label className={styles.label}>{item}</label>
                {item === "몸무게" ? (
                  <div className={styles.inputWithUnit}>
                    <input
                      className={styles.input}
                      type="number"
                      value={inputs[item] || ""}
                      onChange={(e) => handleChange(item, e.target.value)}
                      placeholder={item}
                    />
                    <span className={styles.unit}>g</span>
                  </div>
                ) : (
                  <input
                    className={styles.input}
                    type="number"
                    value={inputs[item] || ""}
                    onChange={(e) => handleChange(item, e.target.value)}
                    placeholder={item}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {shouldRenderSingleInput && activeItem !== "성장" && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>{activeItem}</label>
            {isWeightInput ? (
              <div className={styles.inputWithUnit}>
                <input
                  className={styles.input}
                  type="number"
                  value={inputs[activeItem] || ""}
                  onChange={(e) => handleChange(activeItem, e.target.value)}
                  placeholder={activeItem}
                />
                <span className={styles.unit}>g</span>
              </div>
            ) : (
              <input
                className={styles.input}
                type="number"
                value={inputs[activeItem] || ""}
                onChange={(e) => handleChange(activeItem, e.target.value)}
                placeholder={activeItem}
              />
            )}
          </div>
        )}
      </div>

      <div className={styles.buttonRow}>
        {!hasData && (
          <button className={styles.submitBtn} onClick={handleSubmit}>
            완료
          </button>
        )}
        {hasData && isEditing && (
          <>
            <button className={styles.cancelBtn} onClick={handleCancelOrUpdate}>
              취소
            </button>
            <button className={styles.submitBtn} onClick={handleCancelOrUpdate}>
              수정완료
            </button>
          </>
        )}
        {hasData && !isEditing && (
          <button className={styles.submitBtn} onClick={handleEdit}>
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default ChartInput;
