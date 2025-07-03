import React, { useState, useEffect } from 'react';
import TipCard from '../components/TipCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      const keywords = ["기후위기", "미세먼지", "탄소중립", "플라스틱 쓰레기", "지구온난화", "환경오염"];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

      const url = `https://newsapi.org/v2/everything?q=${randomKeyword}&language=ko&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
          console.log(`[${randomKeyword}] 키워드로 ${data.articles.length}개 뉴스 로딩`);
        } else {
          console.warn("뉴스 데이터가 없습니다");
        }
      } catch (error) {
        console.error("뉴스 불러오기 실패:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#3b7a57' }}>🌿 ZeroWaste Guide</h1>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#555' }}>
        함께 살아가는 환경을 위한 작은 실천, 오늘부터 시작해볼까요?
      </p>
      <TipCard />
      <button onClick={() => navigate('/guide')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#79c081',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
        더 알아보기
      </button>

      {/* 환경 뉴스 섹션 */}
      <div style={{ marginTop: '50px', textAlign: 'left' }}>
        <h2 style={{ color: '#3b7a57' }}>📢 최신 환경 뉴스</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map((article, idx) => (
            <li key={idx} style={{ marginBottom: '20px' }}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
                <strong>{article.title}</strong>
              </a>
              <p style={{ fontSize: '14px', color: '#666' }}>{article.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;