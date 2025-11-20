import { useState, useRef, useEffect } from "react";
import styles from "./InputBaby.module.css";
import addImg from "./img/Add.png";
import oneImg from "./img/one.png";
import twoImg from "./img/two.png";
import threeImg from "./img/three.png";
import fourImg from "./img/four.png";
import useInputBaby from "./useInputBaby";

const InputBaby = ({ type = "mom", onClose, fromChooseType = false }) => {
  // 상태 관리
  const [selectedGender, setSelectedGender] = useState(""); // 성별
  const [selectedBaby, setSelectedBaby] = useState(""); // 아기 이미지 선택
  const [inputBlocks, setInputBlocks] = useState([{}]); // 인풋 배열 준비
  const clickplusRef = useRef(null);

  // 쌍둥이 추가
  const handleAdd = () => {
    if (inputBlocks.length < 3) {
      // 새 블록을 추가할 때 auth와 inputCount에도 기본값을 추가해야 합니다.
      setInputBlocks((prev) => [...prev, {}]);
    }
  };

  // 새 블록 추가 시 자동 스크롤
  useEffect(() => {
    if (clickplusRef.current) {
      clickplusRef.current.scrollTop = clickplusRef.current.scrollHeight;
    }
  }, [inputBlocks]);

  // 제목/부제
  const title = type === "mom" ? "임산모" : "육아";
  const subtitle =
    type === "mom"
      ? "출산 예정일과 태명을 입력해 주세요"
      : "출생일과 성별, 이름을 입력해 주세요";

  // 스타일 조건
  const inputBoxStyle = {
    width: "580px",
    height: "660px",
    backgroundColor: "white",
    borderRadius: "20px",
    border: fromChooseType ? "none" : "1px solid black",
    boxShadow: fromChooseType ? "4px 4px 8px -2px rgba(0,0,0,0.25)" : "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const {
    data, auth, todayString, yesterdayString, inputCount,
    handleChange, handleComplete,
    syncGenderAndImage ,handleLoginKeyUp
  } = useInputBaby(
    inputBlocks, setInputBlocks, selectedGender, selectedBaby
  );

  useEffect(() => {
    if (selectedBaby && selectedGender) {
      syncGenderAndImage();
    }
  }, [selectedGender, selectedBaby, syncGenderAndImage]);


  return (
    <div
      className={styles.container}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className={styles.Inputb} style={inputBoxStyle}>
        <div className={styles.babymomclick}>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          <div className={styles.clickplus} ref={clickplusRef}>
            {inputBlocks.map((_, idx) => (
              <div key={idx} style={{ width: "100%" }}>
                <div className={styles.babys}>
                  {["one", "two", "three", "four"].map((val) => (
                    <label className={styles.radioLabel} key={val}>
                      <input
                        type="radio"
                        name={`baby-${idx}`}
                        value={val}
                        checked={selectedBaby === val}
                        // --- 수정 없음: setSelectedBaby만 호출 ---
                        onChange={(e) => setSelectedBaby(e.target.value)}
                      />
                      <img
                        src={
                          val === "one"
                            ? oneImg
                            : val === "two"
                              ? twoImg
                              : val === "three"
                                ? threeImg
                                : fourImg
                        }
                        alt={val}
                        className={styles[`${val}Image`]}
                      />
                    </label>
                  ))}
                </div>

                {/* 성별 버튼 */}
                <div className={styles.buttons}>
                  {/* 미정 버튼: mom일 때만 */}
                  {type === "mom" && (
                    <button
                      className={`${styles.why} ${selectedGender === "미정" ? styles.activeGender : ""}`}
                      onClick={() => setSelectedGender("미정")}
                    >
                      미정?
                    </button>
                  )}

                  {/* 남자 버튼 */}
                  <button
                    className={`${type === "mom" ? styles.man : styles.mantwo} ${selectedGender === "남자" ? styles.activeGender : ""
                      }`}
                    onClick={() => setSelectedGender("남자")}
                  >
                    남자
                  </button>

                  {/* 여자 버튼 */}
                  <button
                    className={`${type === "mom" ? styles.girl : styles.girltwo} ${selectedGender === "여자" ? styles.activeGender : ""
                      }`}
                    onClick={() => setSelectedGender("여자")}
                  >
                    여자
                  </button>
                </div>

                {/* 출생일 */}
                <div className={styles.babyparty}>
                  <label htmlFor={`bp-${idx}`}>출생일</label>
                  <input type="date" id={`bp-${idx}`} placeholder="출생일"
                    min={type === "mom" ? yesterdayString : ""}
                    max={type === "mom" ? "" : todayString}
                    name="birth_date"
                    onChange={e => handleChange(idx, e)}
                    className={!auth[idx]?.birth_date && inputCount[idx]?.birth_date > 0 ? styles.invalid : ""} />
                </div>

                {/* 이름 */}
                <div className={styles.babyname}>
                  <label htmlFor={`bn-${idx}`}>이름</label>
                  <input type="text" id={`bn-${idx}`} placeholder="이름" name="name"
                    className={!auth[idx]?.name && inputCount[idx]?.name > 0 ? styles.invalid : ""}
                    onChange={e => handleChange(idx, e)} onKeyUp={handleLoginKeyUp}/>
                </div>
              </div>
            ))}
          </div>

          {/* 쌍둥이 추가 버튼 (3개 이상이면 숨김) */}
          {inputBlocks.length < 3 && (
            <div className={styles.babyplus}>
              <img
                src={addImg}
                alt="add"
                className={styles.addImage}
                onClick={handleAdd}
              />
              <p className={styles.babyadd} onClick={handleAdd}>
                쌍둥이 추가
              </p>
            </div>
          )}

          {/* 취소 / 완료 */}
          <div className={styles.bbtt}>
            <button
              className={styles.deb}
              onClick={() => {
                setInputBlocks([{}]);
                setSelectedBaby("");
                setSelectedGender("");
                onClose();
              }}
            >
              취소
            </button>
            <button className={styles.cb} onClick={handleComplete}>완료</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBaby;