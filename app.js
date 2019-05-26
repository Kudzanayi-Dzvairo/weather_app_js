window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimsezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    let temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "http://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/5015a490270eddb1f3f19982f5bdf5ce/${lat},${long}`
            console.log(api)

        fetch(api)
       .then(res => res.json())
       .then(data => {
           console.log(data)
           const {temperature, summary, icon } = data.currently
           
           //Set Dom Elements From Api 
           temperatureDegree.innerText = temperature
           temperatureDescription.innerText = summary
           locationTimsezone.innerText = data.timezone
            
           //FORMULA FOR CELSIUS 
           let celsius = (temperature - 32) * (5/9)
           //setIcon
           setIcons(icon, document.querySelector('.icon'))

           //Change tempbetween Celsius and Farenheit
           temperatureSection.addEventListener('click', () =>{
               if(temperatureSpan.textContent === 'F'){
                   temperatureSpan.textContent = 'C'
                   temperatureDegree.innerText = Math.floor(celsius)
               } else {
                temperatureSpan.textContent = 'F'
                temperatureDegree.innerText = temperature
               }
           })


         })
       })
    }
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'})
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
});