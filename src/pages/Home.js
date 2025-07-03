import React from 'react';
import TipCard from '../components/TipCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default Home;