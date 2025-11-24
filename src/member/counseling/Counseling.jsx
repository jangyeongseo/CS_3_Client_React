import React, { useState, useRef, useEffect } from "react";
import styles from "./Counseling.module.css"; // CSS 모듈 import
import pointImg from "./img/point.png"; // 전송 버튼 이미지 import

// Counseling 컴포넌트: 긴급 상담 채팅창
const Counseling = ({ onClose }) => {
  const messageEndRef = useRef(null); // 채팅 스크롤을 마지막 메시지로 이동시키기 위한 ref
  const [inputText, setInputText] = useState(""); // 입력창 상태
  const [messages, setMessages] = useState([]); // 채팅 메시지 배열 상태

  // 메시지 전송 함수
  const sendMessage = () => {
    if (inputText.trim() === "") return; // 입력이 비어있으면 전송 X

    const now = new Date(); // 현재 시간
    const formatTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // HH:MM 형식

    // 메시지 배열에 추가: 사용자가 보낸 메시지 + 챗봇 응답 메시지
    setMessages(prev => [
      ...prev,
      { text: inputText, sender: "me", time: formatTime, senderName: "나" },
      {
        text: "아구몬 : 파충류형 디지몬 세대는 성장기이며 속성은 백신/데이터이다. 주요 능력은 입에서 작은 불덩어리를 뿜는 필살기 '베이비 플레임'이 있다. 크고 둥근 녹색 눈과 주황색 피부가 특징이며, 그레이몬 계열의 시초가 되는 디지몬이자 많은 시리즈에서 주인공의 파트너 디지몬으로 등장한다.",
        sender: "other",
        time: formatTime,
        senderName: "챗봇",
        buttons: [
          "그레이몬 : 공룡형 디지몬 세대는 성숙기이며 속성은 백신/데이터 이다. 주요 능력은 강력한 완력과 단단한 두개골을 이용한 박치기, 입에서 뿜는 고열의 화염 필살기 '메가플레임'이 있다. 머리 부분에 투구 모양의 딱딱한 껍질이 있으며, 공격적인 성향을 지니고 있다. 아구몬의 진화체이다.",
          "메탈그레이몬 : 사이보그형 디지몬 세대는 완전체이며 속성은 백신/데이터/바이러스 이다. 주요 능력은 단단한 크롬디지조이드 합금 몸체와 거대한 발톱, 가슴의 해치에서 발사하는 두 개의 유도 미사일 '기가 디스트로이어'가 있다. 온 몸이 기계화되어 있으며, 그레이몬 계열의 완전체 형태이다.",
          "워그레이몬 : 드래곤맨형 디지몬 세대는 궁극체이며 속성은 백신이다. 주요 능력은 양팔에 장착된 최강 경도(硬度)의 '드라몬 킬러'와 등껍질로 합쳐지는 방패 '브레이브 실드', 그리고 방대한 에너지를 구체로 모아 발사하는 필살기 '가이아 포스'가 있다. 용사의 모습을 한 형태이며, 메탈그레이몬의 진화체이자 아구몬 계열의 최종 진화형 중 하나이다."
        ]
      }
    ]);

    setInputText(""); // 입력창 초기화
  };

  // 메시지가 추가될 때마다 스크롤을 마지막 메시지로 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      {/* 왼쪽 배경 클릭 시 채팅창 닫기 */}
      <div className={styles.left} onClick={onClose}></div>

      <div className={styles.right}>
        {/* 채팅창 상단 */}
        <div className={styles.up}>
          <div className={styles.oneonenine}>긴급 상담</div>
        </div>

        {/* 채팅창 하단: 메시지 표시 영역 + 입력 영역 */}
        <div className={styles.down}>
          {/* 메시지 표시 영역 */}
          <div className={styles.chatbody}>
            <div className={styles.mes}>
              {messages.map((msg, idx) => {
                const isMe = msg.sender === "me"; // 내가 보낸 메시지인지 확인

                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isMe ? "flex-end" : "flex-start",
                      marginBottom: "10px",
                      gap: "2px",
                      width: "100%"
                    }}
                  >
                    {/* 발신자 이름 */}
                    {msg.senderName && (
                      <span style={{ fontSize: "16px", fontWeight: "bold", color: "#808080" }}>
                        {msg.senderName}
                      </span>
                    )}

                    {/* 시간과 말풍선 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: isMe ? "flex-end" : "flex-start",
                        gap: "5px",
                        width: "100%",
                        flexWrap: "wrap"
                      }}
                    >
                      {/* 시간: 내가 보낸 메시지 왼쪽, 챗봇 오른쪽 */}
                      {isMe && <span style={{ fontSize: "12px", color: "#888" }}>{msg.time}</span>}

                      {/* 말풍선 */}
                      <div
                        style={{
                          maxWidth: "70%",
                          backgroundColor: isMe ? "#FFF4D6" : "#D6F0FF", // 내가 보낸 메시지: 노랑, 챗봇: 파랑
                          padding: "10px 14px",
                          borderRadius: "15px",
                          fontSize: "14px",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          boxSizing: "border-box"
                        }}
                      >
                        <span>{msg.text}</span>

                        {/* 챗봇 버튼 */}
                        {!isMe && msg.buttons && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            {msg.buttons.map((btnText, i) => (
                              <button
                                key={i}
                                style={{
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  border: "1px solid #808080",
                                  background: "#fff",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                  wordWrap: "break-word",
                                  overflowWrap: "break-word",
                                  whiteSpace: "normal"
                                }}
                              >
                                {btnText}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 챗봇 메시지 시간 */}
                      {!isMe && <span style={{ fontSize: "12px", color: "#888" }}>{msg.time}</span>}
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef}></div> {/* 마지막 메시지 ref */}
            </div>
          </div>

          {/* 메시지 입력 영역 */}
          <div className={styles.chatmessage}>
            <div className={styles.chme}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="메시지를 입력하세요"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(); // Enter 입력 시 전송
                }}
              />
              <button className={styles.send} onClick={sendMessage}>
                <img src={pointImg} alt="send" /> {/* 전송 버튼 이미지 */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counseling;
