const currentTime = document.getElementById('time');
const currentdate = document.getElementById('date');
const Currentlocation = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const image = document.getElementById('weather-img');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const sunRise = document.getElementById('sunrise');
const sunSet = document.getElementById("sunset");
const futureWeathercast = document.getElementById('future-forcast');
const latLng = document.getElementById('lat-lng');

const months = [ "January", "February", "March",
 "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 const days = ["Sunday","Monday", "Tuesday"," Wednesday", "Thursday", "Friday", "Saturday"]

   const timeSetting = setInterval(() => {
    let time = new Date()
    let hour = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
    let minutes = time.getMinutes();
    let ampm = time.getHours() >= 12 ? "PM" : "AM" ;
    let day =  `${days[ time.getDay()]} ${time.getDate()}, ${months[time.getMonth()]}`;
  
    currentdate.textContent = day;
    currentTime.innerHTML = `<div>${hour < 10 ? "0" + hour : hour}:
    ${minutes < 10 ? "0" + minutes : minutes}<small class="text-2xl">  ${ampm}</small></div> `
  }, 1000);

 const ApiKey = "49cc8c821cd2aff9af04c9f98c36eb74";
 
//  to update data 
let Forcast = "";
 function getWeather(data){
  // current weather
   Currentlocation.textContent = data.timezone
   latLng.textContent = `${data.lat}N ${data.lon}E`
   temperature.innerHTML = `${Math.floor(data.current.temp)}&#8451;`
   description.textContent = data.current.weather[0].description;
   image.innerHTML =`<img class="m-auto" src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="">`;
   humidity.textContent = `${data.current.humidity}%`
   windSpeed.textContent = `${data.current.wind_speed}`
   let currentSunrises = data.current.sunrise;
   let currentSunsets = data.current.sunset;
   sunRise.innerHTML = `<div>${window.moment(currentSunrises * 1000).format('HH:mm a')}</div>`
   sunSet.innerHTML = `<div>${window.moment(currentSunsets * 1000).format('HH:mm a')}</div>`



let futureForcast =  data.daily


futureForcast.forEach((future, i) => {

    let time = new Date();
    let day = time.getDay();
    let r = 0;

    if(i === 0){
    r = day
    }elseif(i > 0){
      r = i + r
    }

let futureDays = r < 7 ? r :  r - 7;
let futureSunrise = future.sunrise;
let futureSunset = future.sunset;

  Forcast += ` 
<div id="future-weather--forcast" 
  class="my-[2rem] bg-[#004F6B] bg-opacity-[0.5] text-[#fff]
  border-[1px] text-[1.3rem] m-[2rem] p-4 rounded-[1rem]  w-[20rem] md:w-[25rem]">
  <div class="flex justify-between items-center">
      <div>
          <p>Day</p>
          <span  id="temperature" class="text-5xl md:text-6xl">${Math.floor(future.temp.day)}&#8451;</span>
          <p id="description" class="text-[1.2rem] md:text-xl mb-[1rem]">${future.weather[0].description}</p>
      </div>
      <div class="flex flex-col items-center">
          <p id="day">${days[futureDays]}</p>
          <img src="http://openweathermap.org/img/wn/${future.weather[0].icon}.png" alt="" id="weather-img" class="mt-[-0.5rem]">
      </div>
  </div>
  <div class="">
      <div class="flex justify-between py-2 w-[15rem] md:w-[23rem]">
          <div>Humidity</div>
          <div id="humidity">${future.humidity}%</div>
      </div>
      <div class="flex justify-between py-2">
          <div>Wind Speed</div>
          <div id="wind-speed">${future.wind_speed}</div>
      </div>
      <div class="flex justify-between py-2">
          <div>Sunrise</div> 
          <div id="sunrise">${window.moment(futureSunrise * 1000).format('HH:mm a')}</div>
      </div>
      <div class="flex justify-between py-2">
          <div>Sunset</div>
          <div id="sunset">${window.moment(futureSunset * 1000).format('HH:mm a')}</div>
      </div>
  </div>
</div>`

futureWeathercast.innerHTML = Forcast;
})
}

// get location and call api 
 navigator.geolocation.getCurrentPosition(success => {
  let {longitude, latitude} = success.coords

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${ApiKey}`)
  .then(res => res.json().then(data => getWeather(data)))  
})


