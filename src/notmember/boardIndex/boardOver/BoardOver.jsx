// src/notmember/boardIndex/boardOver/BoardOver.jsx
import React, { useState } from "react";
import styles from "./BoardOver.module.css";
import { caxios } from "config/config";

const BoardOver = ({ isOpen, onClose, boardSeq, commentSeq }) => {
  const [data, setData] = useState("");
  if (!isOpen) return null;

  const hendleChange = (e) => {
    const value = e.target.value;
    setData(value);
  }

  const handleSubmitReport = () => {
    let keyname = "";
    let pathName = "";
    let value = "";
    if(!data){
      alert("신고 사유를 선택해주쉐요.");
      return;
    }
    if (boardSeq) {
      // 게시글 신고 요청
      console.log("게시글 신고:", boardSeq);
      keyname = "board_seq";
      pathName = "boardSeq";
      value = boardSeq;
    } else if (commentSeq) {
      // 댓글 신고 요청
      console.log("댓글 신고:", commentSeq);
      keyname = "comment_seq";
      pathName = "commentSeq"
      value = commentSeq;
    }

    caxios.post(`/report/${pathName}`, { [keyname] : value, report_type :data})
    .then(resp=>{
      alert("신고 완료되었습니다.");
    })
    .catch(err=>console.log(err));

    onClose();
  };

  return (
    <div className={styles.reportOverlay} onClick={onClose}>
      <div className={styles.reportBox} onClick={(e) => e.stopPropagation()}>

        <div className={styles.reportOptions}>
          <label><input type="radio" name="reason" onChange={hendleChange} value="욕설 및 적절하지 않은 용어 사용" /> 욕설 및 적절하지 않은 용어 사용</label>
          <label><input type="radio" name="reason" onChange={hendleChange} value="광고성 게시물" /> 광고성 게시물</label>
          <label><input type="radio" name="reason" onChange={hendleChange} value="태그와 관련없는 글" /> 태그와 관련없는 글</label>
          <label><input type="radio" name="reason" onChange={hendleChange} value="불법 복제 및 저작권 침해 글" /> 불법 복제 및 저작권 침해 글</label>
        </div>

        <div className={styles.reportBtnArea}>
          <button className={styles.reportCancelBtn} onClick={onClose}>취소</button>
          <button className={styles.reportSubmitBtn} onClick={handleSubmitReport}>신고 완료</button>
        </div>
      </div>
    </div>
  );
};

export default BoardOver;
