const currentTime = document.getElementById('time');
const currentdate = document.getElementById('click');
const Currentlocation = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const image = document.getElementById('weather-img');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const sunRise = document.getElementById('sunrise');
const sunSet = document.getElementById("sunset");
const futureForecast = document.getElementById('future-forcast');
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

    currentTime.innerHTML = `<div>${hour < 10 ? "0" + hour : hour}:
    ${minutes < 10 ? "0" + minutes : minutes}<small class="text-2xl">  ${ampm}</small></div> `
  }, 1000);

 const ApiKey = "49cc8c821cd2aff9af04c9f98c36eb74";
 
 function getWeather(response){
   Currentlocation.textContent = response.timezone
   latLng.textContent = `${response.lat}N ${response.lon}E`

 
}



 navigator.geolocation.getCurrentPosition(success => {
  let {longitude, latitude} = success.coords

  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${ApiKey}`)
  .then(res => res.json().then(data =>{console.log(data); getWeather(data)}))  

})


