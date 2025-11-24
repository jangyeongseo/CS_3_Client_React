import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./BabyArticle.module.css";

/* =========================================================
  1) 상단 카테고리 기본 데이터 (고정)
      - DB/API에서 동적으로 받아오는 데이터와 결합될 때,
        title/description/bgColor/path는 그대로 유지됨
   ========================================================= */
const MOCK_CATEGORIES = [
  {
    id: 1,
    title: "임신, 출산, 육아, 저출산 정책",
    description: "...",
    bgColor: "#f0d827",
    path: "/category/policy",
  },
  {
    id: 2,
    title: "건강 상식",
    description: "...",
    bgColor: "#e3adb9",
    path: "/category/health",
  },
  {
    id: 3,
    title: "성장 발달 가이드",
    description: "...",
    bgColor: "#add3e3",
    path: "/category/growth",
  },
  {
    id: 4,
    title: "기타 정보",
    description: "...",
    bgColor: "#d5add3",
    path: "/category/etc1",
  },
  {
    id: 5,
    title: "긴급 연락처",
    description: "...",
    bgColor: "#e3e3ad",
    path: "/category/etc2",
  },
];

/* =========================================================
    2) ArticleCard (카테고리별 카드 + 최신 기사 목록 렌더링)
      - 특정 카테고리의 기사만 필터링
      - 최신 기사 8개까지만 표시
      - 카드 내부에 title/description 렌더링
   ========================================================= */
const ArticleCard = ({ category, articles }) => {
  // 해당 카테고리(article.categoryId === category.id) 기사만 필터링
  const filteredArticles = articles
    .filter((a) => a.categoryId === category.id)
    .slice(-8) // 최신 데이터 8개만
    .reverse(); // 최신순 정렬

  return (
    <div className={styles.cardWrapper}>
      {/* ---------------- 카드 UI ---------------- */}
      <div className={styles.cardContainer}>
        <Link to={category.path} className={styles.cardLink}>
          {/* 상단 배경 색 박스 */}
          <div
            className={styles.cardHeader}
            style={{ backgroundColor: category.bgColor }}
          />

          {/* 카드 본문 영역 */}
          <div className={styles.cardContent}>
            <b className={styles.cardTitle}>{category.title}</b>

            {/* description은 category 자체의 기본값 표시 */}
            <div className={styles.cardDescription}>{category.description}</div>
          </div>
        </Link>
      </div>

      {/* ---------------- 관련 기사 목록 ---------------- */}
      {filteredArticles.length > 0 && (
        <div className={styles.articleList}>
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className={styles.articleItem}
            >
              <div className={styles.articleTitle}>{article.title}</div>
              <div className={styles.articleDate}>{article.date}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================================================
    3) BabyArticle (통합 컴포넌트)
      - API에서 기사 데이터를 패칭
      - 상태 관리: articles, loading, error
      - 각 카테고리 카드에 articles를 전달
   ========================================================= */
const BabyArticle = () => {
  // API에서 받아온 기사 목록 상태
  const [articles, setArticles] = useState([]);

  // 로딩 / 에러 상태관리
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------------- API 호출 ---------------- */
  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     const API_URL = "/api/baby-articles"; // 실제 API URL로 변경 필요 - 백앤드 api

  //     try {
  //       const response = await fetch(API_URL);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setArticles(data); // 기사 데이터 저장
  //     } catch (e) {
  //       console.error("Failed to fetch articles:", e);
  //       setError("기사를 불러오는데 실패했습니다."); // 에러 메시지
  //     } finally {
  //       setIsLoading(false); // 로딩 종료
  //     }
  //   };

  //   fetchArticles();
  // }, []); // 마운트 시 한 번 실행

  /* ---------------- 로딩 / 에러 처리 ---------------- */
  if (isLoading) {
    return <div className={styles.loading}>기사 로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  /* ---------------- 실제 렌더링 ---------------- */
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.cardGrid}>
        {MOCK_CATEGORIES.map((category) => (
          <ArticleCard
            key={category.id}
            category={category}
            articles={articles} // API에서 가져온 기사 전달
          />
        ))}
      </div>
    </div>
  );
};

export default BabyArticle;
