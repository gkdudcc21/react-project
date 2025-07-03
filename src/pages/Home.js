import React, { useState, useEffect } from 'react';
import TipCard from '../components/TipCard';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const keywords = ['제로웨이스트', '기후위기', '친환경', '플라스틱 줄이기', '지구온난화', "텀블러 캠페인", "일회용품 규제", "친환경 소비"];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const apiKey = process.env.REACT_APP_NEWS_API_KEY


      const newsApiUrl = `https://newsapi.org/v2/everything?q=${randomKeyword}&language=ko&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(newsApiUrl)}`;

      try {
        const response = await fetch(proxyUrl);

        const result = await response.json()
        const data = JSON.parse(result.contents);

        if (data.articles) {
          setArticles(data.articles);
          console.log(`📰 '${randomKeyword}' 키워드로 ${data.articles.length}개 뉴스 로딩 완료`);
        } else {
          console.warn('❗ 뉴스 데이터가 없습니다');
        }
      } catch (error) {
        console.error('❌ 뉴스 불러오기 실패:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#3ba757' }}>🌿 ZeroWaste Guide</h1>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#555' }}>
        함께 살아가는 환경을 위한 작은 실천, 오늘부터 시작해볼까요?
      </p>

      <TipCard />
      <button
        onClick={() => navigate('/guide')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#79c081',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        더 알아보기
      </button>

      {/* 🌍 환경 뉴스 + 미션 영역 2단 구성 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '40px',
          marginTop: '60px',
          padding: '0 40px',
          textAlign: 'left',
        }}
      >
        {/* 왼쪽 뉴스 */}
        <div style={{ flex: 2 }}>
          <h2 style={{ color: '#3ba757' }}>📢 최신 환경 뉴스</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {articles.map((article, idx) => (
              <li key={idx} style={{ marginBottom: '30px' }}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#222', fontWeight: 'bold', fontSize: '18px' }}
                >
                  {article.title}
                </a>
                <p style={{ fontSize: '14px', color: '#555' }}>{article.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽 오늘의 미션 */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f1f8f4',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ color: '#3ba757', marginBottom: '10px' }}>🌱 오늘의 제로웨이스트 미션</h3>
          <p style={{ fontSize: '15px', color: '#333' }}>
            오늘은 <strong>텀블러</strong>를 챙겨보세요!
            <br />
            연간 약 <strong>500잔</strong>의 일회용 컵을 줄일 수 있어요 💚
          </p>

          <hr style={{ margin: '20px 0' }} />

          <h4 style={{ color: '#333' }}>🧠 환경 슬로건</h4>
          <blockquote style={{ fontStyle: 'italic', color: '#666', marginTop: '10px' }}>
            “우리는 지구를 물려받은 것이 아니라 빌려쓰는 것이다.”
          </blockquote>
        </div>
      </div>
    </div>
  );
}
export default Home;

