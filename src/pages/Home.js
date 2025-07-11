import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Home() {
  const UNSPLASH_ACCESS_KEY = 'ZQ8eduUdjXC97FtS3C53PPQNMhzGieA54M3tMx5nkKM';
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [heartCount, setHeartCount] = useState(0);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=zero+waste,nature,environment&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      setImageUrl(data.urls.regular);
      console.log('✅ 환경 이미지 불러옴:', data.urls.regular);
    } catch (error) {
      console.error('❌ Unsplash 이미지 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const storedCount = localStorage.getItem('heartCount');
      if (storedCount !== null) {
        setHeartCount(parseInt(storedCount, 10));
      }

      try {
        const response = await fetch('https://news-backend-m1od.onrender.com/news');
        const data = await response.json();
        console.log("📦 API 응답 데이터:", data);

        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          console.log(`✅ 환경 뉴스 ${data.articles.length}개 로딩 완료`);
        } else {
          console.warn("⚠️ 뉴스 데이터가 없습니다");
        }
      } catch (error) {
        console.error("❌ 뉴스 불러오기 실패:", error);
      }
    };

    fetchNews();
  }, []);
  const handleHeartClick = () => {
    const newCount = heartCount + 1;
    setHeartCount(newCount);
    localStorage.setItem('heartCount', newCount);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* 상단 로고 및 타이틀 */}
      <h1 style={{ color: '#3ba757', textAlign: 'center' }}>🌿 ZeroWaste Guide</h1>
      <p
        style={{
          textAlign: 'center',
          color: '#555',
          fontSize: '16px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        함께 살아가는 환경을 위한 작은 실천, 오늘부터 시작해볼까요?

        <button
          onClick={() => navigate('/guide')}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            whiteSpace: 'nowrap',
          }}
        >
          더 알아보기
        </button>
      </p>

      {/* ✅ 미션 카드 */}
      <div style={{
        position: 'relative',
        backgroundColor: '#f0fff4',
        border: '2px solid #3ba757',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>

        <strong>오늘의 ZeroWaste 🌱</strong>
        <p style={{ marginTop: '10px' }}>
          "오늘 내가 덜 버린 쓰레기 하나,
          지구에겐 커다란 휴식이 됩니다.
          함께 가볍게, 제로웨이스트 🌏"
        </p>


      </div>

      {/* ✅ TipCard : 5R 원칙 */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '2px solid #79c081',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#3ba757' }}>📌 제로웨이스트 실천을 위한 5R 원칙</h3>

        {/* 이 div가 ul을 감싸는 역할 */}
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ marginBottom: '10px' }}>
              <strong>Refuse(거절)</strong>: 불필요한 소비와 일회용품 거절
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Reduce(줄이기)</strong>: 필요한 것만 구매해 쓰레기 감소
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Reuse(재사용)</strong>: 다회용 컵, 장바구니 사용
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Recycle(재활용)</strong>: 분리배출 철저히
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Rot(퇴비화)</strong>: 음식물 쓰레기 자연 분해
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ 뉴스 & 제로웨이스트 미션 카드 (2단 그리드 구성) */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* 환경 뉴스 */}
        <div style={{ flex: 2 }}>
          <h2 style={{ color: '#3ba757' }}>📢 최신 환경 뉴스</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {articles.slice(0, 5).map((article, idx) => (
              <li key={idx} style={{ marginBottom: '20px' }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                  <strong>{article.title}</strong>
                </a>
                <p style={{ fontSize: '14px', color: '#666' }}>{article.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽 미션 카드 */}
        <div style={{
          position: 'relative',
          flex: 1,
          backgroundColor: '#e8f9f1',
          padding: '40px',
          borderRadius: '10px',
          border: '2px solid #b7e4cd',
          marginTop: '70px'
        }}>
          <h3 style={{ color: '#3ba757' }}>✅ 오늘의 제로웨이스트 미션</h3>
          <p>오늘은 <strong>텀블러를 챙겨보세요!</strong></p>
          <p>연간 약 <strong>500</strong>잔의 일회용 컵을 줄일 수 있어요 💚</p>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={handleHeartClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '28px',
                color: '#e74c3c',
                transition: 'transform 0.2s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1.0)'}
              title="하트를 눌러 출석체크!"
            >
              ❤️
            </button>
            <div style={{ fontSize: '16px', marginTop: '5px', color: '#333' }}>
              오늘의 하트: <strong>{heartCount}</strong>

            </div>
            {imageUrl && (
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <h4 style={{ color: '#3ba757' }}>🌳 오늘의 환경 이미지</h4>
                <img
                  src={imageUrl}
                  alt="환경 이미지"
                  onClick={fetchRandomImage}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '2px solid #b7e4cd',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s',
                    marginTop: '10px'
                  }}
                  title="이미지를 클릭하면 새로운 사진이 나와요 🌱"
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  이미지 클릭 시 랜덤 교체됩니다 🔁
                </p>
              </div>
            )}
          </div>
        </div >
      </div>




      {/* ✅ 환경 슬로건 (가장 하단) */}
      <div style={{
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#f0fff4',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#3ba757'
      }}>
        <h5>🌍 환경 슬로건</h5>
        <em style={{ color: '#555' }}>"우리는 지구를 물려받은 것이 아니라 빌려쓰는 것이다."</em>
      </div>
    </div>
  );
}
export default Home;

