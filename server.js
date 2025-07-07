const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// ▶ 여기에 NewsAPI 키 넣기
const API_KEY = process.env.API_KEY;

app.get('/news', async (req, res) => {
    const query = '환경 OR 기후 OR 탄소중립 OR 지구온난화 OR 재활용';

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                language: 'ko',
                sortBy: 'publishedAt',
                pageSize: 2,
                apiKey: API_KEY,
            },
        });

        res.json(response.data); // 프론트로 전달
    } catch (error) {
        console.error('❌ API 호출 실패:', error.response?.data || error.message);
        res.status(500).json({ error: '뉴스 호출 실패', detail: error.response?.data || error.message });
    }
});

// ▶ 포트 4000에서 서버 실행
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 환경 뉴스 백엔드 실행 중 → http://localhost:${PORT}`);
});