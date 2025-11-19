import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import styles from "./BabyInfo.module.css";

//아기 마이페이지 왼쪽 사진쪽
const BabyInfo = ()=>{

        const [selectedGender, setSelectedGender] = useState(""); // "", "미정", "남자", "여자"

return(
    <div className={styles.rightcontainer}>
        <div className={styles.babyinformation}>
            <div className={styles.bb}>
                <h1>아기 정보</h1>
            </div>

            <div className={styles.babyla}>
                <label htmlFor='babyname'>이름</label>
                <input type="text" id="babyname" placeholder='김OO' class={styles.babyname}></input>
            </div>

            <div className={styles.birthday}>
                <label htmlFor='birthday'>출생일</label>
                <input type="date" id="birthday" placeholder='2026.10.11' class={styles.babybirthday}></input>
            </div>

            <div className={styles.sex}>
                    <h1 className={styles.sextitle}>성별</h1>

                    <div className={styles.btns}>
                        <button
                            className={`${styles.quest} ${selectedGender === "미정" ? styles.active : ""}`}
                            onClick={() => setSelectedGender("미정")}
                        >
                            미정?
                        </button>
                        <button
                            className={`${styles.manb} ${selectedGender === "남자" ? styles.active : ""}`}
                            onClick={() => setSelectedGender("남자")}
                        >
                            남자
                        </button>
                        <button
                            className={`${styles.girlb} ${selectedGender === "여자" ? styles.active : ""}`}
                            onClick={() => setSelectedGender("여자")}
                        >
                            여자
                        </button>
                    </div>
                </div>

            <div className={styles.kg}>
                <p>몸무게</p>
                <div className={styles.kgdb}>DB에서 꺼내오는 몸무게</div>
            </div>

            <div className={styles.correct}>
                <button className={styles.corbt}>수정</button>
            </div>

        </div>
    </div>
);


}
export default BabyInfo;