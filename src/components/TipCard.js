import React from 'react';

function TipCard() {
  const tip = "텀블러를 챙기는 것만으로도 연간 약 500잔의 일회용 컵을 줄일 수 있어요!";

  return (
    <div style={{
      border: '2px solid #79c081',
      backgroundColor: '#f0fff4',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '20px auto',
      fontSize: '18px',
      fontFamily: 'Arial'
    }}>
      <p>{tip}</p>
    </div>
  );
}

export default TipCard;