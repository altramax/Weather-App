const get = async () => await navigator.geolocation.getCurrentPosition(success => console.log(success))

console.log(get());