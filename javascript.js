let lon;
let lat;
let cityname;
var map = L.map('map').setView([15.5007, 32.5599], 6);
let nameExpress = /^[\p{L}]+(?:\s+[\p{L}]+)*$/u;
var marker;
let geodata;
const apikey = "a3a77587fe0d2fdc6726a70663ec305a";
var titles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
map.on('popupopen', function () {
    const sharebutton = document.getElementById("share");
    const facebook = document.getElementById("facebook");

    if (sharebutton) {
        const message = ` ${cityname}
                temperature:${geodata.main.temp}
                clouds:${geodata.clouds.all}
                humidity:${geodata.main.humidity}
                wind speed:${geodata.wind.speed} `
        sharebutton.addEventListener("click", async function () {
            hideerror();
            try {
                await navigator.clipboard.writeText(message);
                sharebutton.textContent = "copied !";

                setTimeout(function () {
                    sharebutton.textContent = "share";
                }, 2000);

            }

            catch (error) {
                displayerror(error.message);

            }
        });
    }
    if (facebook) {
        const url = encodeURIComponent(window.location.href);
        facebook.addEventListener("click", async function () {
            hideerror();
            try {

                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
            }
            catch (error) {
                displayerror(error);


            }
        });

    }

});
titles.addTo(map);

const city = document.getElementById("city");
const getWeatherButton = document.getElementById("Search_city");

getWeatherButton.addEventListener("submit", function (event) {
    event.preventDefault();
    cityname = city.value.trim();
    getCoord();

});

async function getCoord() {
    hideerror();

    if (cityname.length < 2) {
        displayerror("please enter city name ");
        return;
    }
    else if (!nameExpress.test(cityname)) {
        hideerror();
        displayerror("please enter only letters ");
        return;
    }
    displayLoad();
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityname)}&format=json&limit=1`);
        if (!response.ok) throw new Error("error");
        const data = await response.json();
        if (data.length > 0) {
            lat = Number(data[0].lat);
            lon = Number(data[0].lon);
            map.flyTo([lat, lon], 6);
            if (marker) {
                marker.setLatLng([lat, lon]);

            }
            else {
                marker = L.marker([lat, lon]).addTo(map);
            }
            await getWeather(lat, lon);

        }
        else {
            displayerror("city not found");
        }
        console.log(data);
    }
    catch (error) {
        displayerror(error.message);
    }
    finally {
        hideLoad();

    }


}
async function getWeather(lat, lon) {
    hideerror();

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(apikey)}&units=metric`);
    if (!response.ok) throw new Error("error");
    geodata = await response.json();

    marker.bindPopup(
        ` <div id="popup">
                <h4>${cityname}</h4>
                <h5>temperature:${geodata.main.temp}°C</h5>
                <h5>clouds:${geodata.clouds.all}%</h5>
                <h5>humidity:${geodata.main.humidity}%</h5>
                <h5>wind speed:${geodata.wind.speed}m/s</h5>
                <h5>${geodata.weather[0].description}</h5>
                <img  id="wea_icon" src="https://openweathermap.org/img/wn/${geodata.weather[0].icon}@2x.png" alt="${geodata.weather[0].description}">
           <div id="but_con">
           <button  type="button" id="share">share</button>   
            <button  type="button" id="facebook">facebook</button>
           </div>           </div>`

    );
    marker.openPopup();

}
function displayerror(error) {
    const box = document.getElementById("err_box");
    box.textContent = error;
    box.classList.remove("hidden");

}
function hideerror() {
    const box = document.getElementById("err_box");
    box.textContent = "";
    box.classList.add("hidden");

}
function displayLoad() {
    const box = document.getElementById("load");
    box.classList.remove("hidden");

}
function hideLoad() {
    const box = document.getElementById("load");
    box.classList.add("hidden");

}
