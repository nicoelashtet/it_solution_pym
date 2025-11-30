window.onscroll = function () {
    const button = document.getElementById('backToTop');
    button.style.display = window.scrollY > 200 ? 'block' : 'none';
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = 
            now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);

async function fetchWeather() {
    const cityId = '150010'; // 新潟市の地域ID
    const url = `https://weather.tsukumijima.net/api/forecast/city/${cityId}`;
    const weatherDiv = document.getElementById('weather');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('天気情報の取得に失敗しました');

        const data = await response.json();
        const forecast = data.forecasts[0]; // Today's forecast

        weatherDiv.innerHTML = `
         日付: ${forecast.date} <br> 天気: ${forecast.telop}
    <br>
    
    <img src="${forecast.image.url}" style="max-width:60px;">
`;
    } catch (error) {
        console.error('エラー:', error);
        weatherDiv.innerHTML = '<p id="error">天気情報の取得に失敗しました。</p>';
    }
}

fetchWeather();
