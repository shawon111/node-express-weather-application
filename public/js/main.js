// dom elements
const cityInput = document.getElementById('cityInput');
const dayContainer = document.getElementById('dayName');
const dateContainer = document.getElementById('todayDate');
const cityNameContainer = document.getElementById('cityName');
const tempContainer = document.getElementById('temp');
const searchButton = document.getElementById('searchBtn');
const weatherIconContainer = document.getElementById('weatherIcon');

// set date
const setDate = () => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
    ]

    let currentDate = new Date();

    // day name
    const currentDay = currentDate.getDay();
    const currentDayName = days[currentDay]

    // date
    const todaysDate = currentDate.getDate()

    // month name
    const currentMonth = currentDate.getMonth();
    const currentMonthName = months[currentMonth];

    // set current date, day, month
    dayContainer.innerHTML = currentDayName;
    dateContainer.innerHTML = `${todaysDate} ${currentMonthName}`;
}

setDate();

// get temperature
const getInfo = async (e) => {
    e.preventDefault()
    let cityVal = cityInput.value;
    if (cityInput.value.length === 0) {
        cityNameContainer.innerHTML = `<span class="text-danger fw-bold">Please Enter Your City Name</span>`
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=b49f3079e8ec8176c7f9fd15ebc75f9d`;

            const response = await fetch(url);
            const data = await response.json()
            if(data.cod === '404'){
                cityNameContainer.innerHTML = `<span class="text-danger fw-bold">Please Enter Your City Name Properly</span>`;
            }else {
                const tempMood = data.weather[0].main;
                const tempInCel = data?.main?.temp - 273.15;
                const finaltemp = tempInCel.toFixed(2);
                tempContainer.innerHTML = `${finaltemp}&deg;C`;
                cityNameContainer.innerHTML = `${data?.name}, ${data?.sys?.country}`;
                if(tempMood === 'Clear'){
                    weatherIconContainer.innerHTML = `<i class="fa-solid fa-sun"></i>`
                }
                else if (tempMood === 'Clouds'){
                    weatherIconContainer.innerHTML = `<i class="fa-solid fa-cloud"></i>`
                }
                else if (tempMood === 'Rain'){
                    weatherIconContainer.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
                }
                else{
                    weatherIconContainer.innerHTML = `<i class="fa-solid fa-cloud"></i>`
                }
            }
        } catch {
            cityNameContainer.innerHTML = `<span class="text-danger fw-bold">Please Enter Your City Name Properly</span>`;
        }
    }
}

searchButton.addEventListener('click', getInfo)