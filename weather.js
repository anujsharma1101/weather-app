let key={
    "api_key": "0ae282b86df70deb82da4921fd9bcfdd",
    get_Weather ( city ) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
            + city 
            + "&units=metric&cnt=7&appid="
            + this.api_key
            ).then( (response) => response.json() ).then( (data) => this.displayWeather(data) );
    },
    displayWeather: function(data) {
        const { name } = data.city;
        const listing = data.list[0];
        const { description, icon } = listing.weather[0];
        const { temp, humidity } = listing.main;
        const { speed } = listing.wind;

        let graphval = [];

        // console.log( name, description, temp, humidity, speed); 
        document.querySelector(".city").innerText = "Weather in "+ name;
        document.querySelector(".temp").innerText =Math.round(temp)+" °C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerHTML =`<span class="humi">Humidity: </span>` + humidity+"%";
        document.querySelector(".wind").innerHTML = `<span class="humi">Wind: </span>`+speed+"Km/hr";
        document.querySelector(".icon").src="http://openweathermap.com/img/wn/"+icon+"@2x.png";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
        document.querySelector(".weather").classList.remove("loading");


        graphval[0] = data.list[0].main.temp;
        graphval[1] = data.list[12].main.temp;
        graphval[2] = data.list[28].main.temp;
        

        for(var i=0;i<3;i++){
            document.getElementById('graph').innerHTML=`<div id="div${i}">${graphval[i]}</div>`;
        }
    },

    search: function () {
        this.get_Weather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".__searchButton").addEventListener("click", function () {
    key.search(); 
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if( event.key == "Enter" ){
        key.search();
    }
});

window.onLoad(document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?landscape)");