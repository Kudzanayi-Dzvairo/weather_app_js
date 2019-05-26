window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimsezone = document.querySelector('.location-timezone')

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
           setIcons(icon, )
         })
       })
    }
    
    function setIcons(icon, iconID){
        const skycons = new skycons({color:'white'})
        const currentIcon = icon.replce(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID. Skycons[currentIcon])
    }
    
});