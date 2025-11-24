import { useState, useEffect } from "react";
import styles from "./BabyInfo.module.css";

const BabyInfo = ({ initialName = "", initialBirthday = "", initialGender = "" }) => {
    const [babyName, setBabyName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // 편집 전 값 백업
    const [backup, setBackup] = useState({});

    // 초기값 적용
    useEffect(() => {
        setBabyName(initialName);
        setBirthday(initialBirthday);
        setSelectedGender(initialGender);
    }, [initialName, initialBirthday, initialGender]);

    const handleEdit = () => {
        setBackup({ babyName, birthday, selectedGender }); // 편집 시작 시 백업
        setIsEditing(true);
    };

    const handleCancel = () => {
        setBabyName(backup.babyName);
        setBirthday(backup.birthday);
        setSelectedGender(backup.selectedGender);
        setIsEditing(false);
    };

    const handleSave = () => {
        setIsEditing(false);
        // 필요시 여기서 서버로 저장 API 호출 가능
    };

    return (
        <div className={styles.rightcontainer}>
            <div className={styles.babyinformation}>

                {/* 제목 */}
                <div className={styles.bb}>
                    <h1>아기 정보</h1>
                </div>

                {/* 이름 */}
                <div className={styles.babyla}>
                    <label htmlFor='babyname'>이름</label>
                    <input
                        type="text"
                        id="babyname"
                        placeholder='김OO'
                        className={styles.babyname}
                        value={babyName}
                        onChange={(e) => setBabyName(e.target.value)}
                        readOnly={!isEditing}
                        style={{
                            border: isEditing ? "1px solid #696B70" : "none",
                            backgroundColor: isEditing ? "white" : "#FFF4D6",
                            cursor: isEditing ? "text" : "default"
                        }}
                    />
                </div>

                {/* 출생일 */}
                <div className={styles.birthday}>
                    <label htmlFor='birthday'>출생일</label>
                    <input
                        type="date"
                        id="birthday"
                        className={styles.babybirthday}
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        readOnly={!isEditing}
                        style={{
                            border: isEditing ? "1px solid #696B70" : "none",
                            backgroundColor: isEditing ? "white" : "#FFF4D6",
                            cursor: isEditing ? "text" : "default",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "textfield"
                        }}
                    />
                </div>

                {/* 성별 */}
                <div className={styles.sex}>
                    <h1 className={styles.sextitle}>성별</h1>
                    <div className={styles.btns}>
                        {isEditing ? (
                            ["미정", "남자", "여자"].map((gender) => (
                                <button
                                    key={gender}
                                    className={`${styles[gender === "미정" ? "quest" : gender === "남자" ? "manb" : "girlb"]} ${selectedGender === gender ? styles.active : ""}`}
                                    onClick={() => setSelectedGender(gender)}
                                    style={{
                                        backgroundColor: selectedGender === gender ? "#ADB9E3" : "white",
                                        border: selectedGender === gender ? "none" : "1px solid #8C8C8C",
                                        color: "#8C8C8C",
                                        cursor: "pointer"
                                    }}
                                >
                                    {gender === "미정" ? "미정?" : gender}
                                </button>
                            ))
                        ) : (
                            <span style={{
                                display: "inline-block",
                                width: "188px",
                                height: "48px",
                                lineHeight: "48px",
                                textAlign: "center",
                                backgroundColor: "#ADB9E3",
                                borderRadius: "20px",
                                border: "none",
                                color: "#8C8C8C"
                            }}>
                                {selectedGender || "미정"}
                            </span>
                        )}
                    </div>
                </div>

                {/* 몸무게 */}
                <div className={styles.kg}>
                    <p>몸무게</p>
                    <div className={styles.kgdb}>DB에서 꺼내오는 몸무게</div>
                </div>

                {/* 수정/완료/취소 버튼 */}
                <div className={styles.correct} style={{ gap: "10px" }}>
                    {!isEditing ? (
                        <button className={styles.corbt} onClick={handleEdit}>
                            수정
                        </button>
                    ) : (
                        <>
                            <button className={styles.corbtd} onClick={handleCancel}>
                                취소
                            </button>
                            <button className={styles.corbtc} onClick={handleSave}>
                                완료
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BabyInfo;
