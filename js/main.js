getData('cairo');

let cityName = document.querySelector('#location');
let findBtn = document.querySelector('#find');
let errorMsg = document.querySelector('.error');
let menuBtn = document.querySelector('.sm-toggler');
let menu = document.querySelector('.menu');

cityName.addEventListener('focus', ()=> {
    errorMsg.style.display = 'none';
})

findBtn.addEventListener('click', () => {
    let city = cityName.value;
    getData(city);
})

menuBtn.addEventListener('click', () => {
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
      } else {
        menu.style.display = 'none';
      }
})

/////////////Today/////////////
let todayDay = document.querySelector('.today .title .day');
let todayDate = document.querySelector('.today .title .date');
let todayCity = document.querySelector('.today .info .city');
let todayTemp = document.querySelector('.today .info .temp');
let todayIcon = document.querySelector('.today .info .icon img');
let todayStatus = document.querySelector('.today .info .status');
let todayRain = document.querySelector('.today .extra .rain p');
let todaySpeed = document.querySelector('.today .extra .speed p');
let todayDirection = document.querySelector('.today .extra .direction p');

/////////////Tommorrow/////////////
let secDay = document.querySelector('.tomorrow .title .day');
let secIcon = document.querySelector('.tomorrow .info .icon img');
let secMaxTemp = document.querySelector('.tomorrow .info .temp-sec p');
let secMinTemp = document.querySelector('.tomorrow .info .temp-sec small');
let secStatus = document.querySelector('.tomorrow .info .status');

/////////////After Tommorrow/////////////
let thirdDay = document.querySelector('.after .title .day');
let thirdIcon = document.querySelector('.after .info .icon img');
let thirdMaxTemp = document.querySelector('.after .info .temp-sec p');
let thirdMinTemp = document.querySelector('.after .info .temp-sec small');
let thirdStatus = document.querySelector('.after .info .status');

function getData(city) {
    let res = fetch(`https://api.weatherapi.com/v1/forecast.json?key=be6c909cf017459092d20524220406&q=${city}&days=3`);

    res.then(response => {
        if (!response.ok) {
            return response.text().then(text => {throw new Error(text)})
        } else {
            return response.json()
        }
    })
    .then(data => {
        /////////////Today/////////////
        var localTime = data.location.localtime;
        var dayName = new Date(localTime).toLocaleDateString('en-us', {weekday: "long"});
        var dayDate = new Date(localTime).toLocaleDateString('en-us', {day: "numeric" ,month: "long"});

        todayDay.innerHTML = dayName;
        todayDate.innerHTML = dayDate;
        todayCity.innerHTML = data.location.name;
        todayTemp.innerHTML = `${data.current.temp_c} <sup>O</sup> C`;
        todayIcon.src = `http:${data.current.condition.icon}`;
        todayStatus.innerHTML = data.current.condition.text;
        todayRain.innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
        todaySpeed.innerHTML = `${data.current.wind_mph}km/hr`;
        todayDirection.innerHTML = data.current.wind_dir;

        /////////////Tommorrow/////////////
        var date = data.forecast.forecastday[1].date;
        var dayName = new Date(date).toLocaleDateString('en-us', {weekday: "long"});

        secDay.innerHTML = dayName;
        secIcon.src = `http:${data.forecast.forecastday[1].day.condition.icon}`;
        secMaxTemp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c} <sup>O</sup> C`;
        secMinTemp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c} <sup>O</sup> C`;
        secStatus.innerHTML = data.forecast.forecastday[1].day.condition.text;

        /////////////After Tommorrow/////////////
        var date = data.forecast.forecastday[2].date;
        var dayName = new Date(date).toLocaleDateString('en-us', {weekday: "long"});

        thirdDay.innerHTML = dayName;
        thirdIcon.src = `http:${data.forecast.forecastday[2].day.condition.icon}`;
        thirdMaxTemp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c} <sup>O</sup> C`;
        thirdMinTemp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c} <sup>O</sup> C`;
        thirdStatus.innerHTML = data.forecast.forecastday[2].day.condition.text;
    })
    .catch(error => {
        var errorObj = JSON.parse(error.message)
        errorMsg.innerHTML = errorObj.error.message;
        errorMsg.style.display = "block";
    })
}