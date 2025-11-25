import { caxios } from "../../../config/config";

// 전송 로직 분리
export const submitChartData = async ({ inputs, date, babySeq, id }) => {
  const measureTypes = {
    EFW: inputs["몸무게"],
    HC: inputs["머리직경"],
    OFD: inputs["머리둘레"],
    FL: inputs["복부둘레"],
    AC: inputs["허벅지 길이"],
  };

  const payload = Object.entries(measureTypes)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([type, value]) => ({
      baby_seq: babySeq,
      user_id: id,
      measure_date: date,
      measure_type: type,
      measure_value: parseFloat(value),
    }));

  console.log("최종 전송 payload:", JSON.stringify(payload));

  try {
    await caxios.post("/chart/insert", payload);
    alert("저장 완료!");
  } catch (err) {
    console.error(err);
    alert("저장 실패");
  }
};
