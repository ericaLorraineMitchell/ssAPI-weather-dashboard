//GLOBAL VARIABLE CONNECTIONS

var searchBtn = document.getElementById("search-btn");

var recentBtn = document.getElementById("recent-btn");
var recent1 = document.getElementById("1");
var recent2 = document.getElementById("2");
var recent3 = document.getElementById("3");
var recent4 = document.getElementById("4");
var recent5 = document.getElementById("5");

var city = document.getElementById("city");
var date = document.getElementById("date");
var weatherIcon = document.getElementById("weather-icon");

var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var index = document.getElementById("index");

var APIKey = "a45fd2e2b53fbbb2b9f139e7fb6f0df4";

//SEARCH BUTTON RETURN API RESULTS
//FUNCTION EVENT CLICK
function searchSubmit(event) {
  event.preventDefault();

  var userInput = document.querySelector("#user-input").value;

  if (!userInput) {
    console.error("Enter city!");
    alert("ENTER CITY!");
  }

  searchApi(userInput);
}

searchBtn.addEventListener("click", searchSubmit);

//CREATE URL FOR FETCH -CURRENT API READS CITY NAME & GIVES LAT&LON
function searchApi(userInput) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&appid=a45fd2e2b53fbbb2b9f139e7fb6f0df4";
  console.log(queryURL);

  //FETCH RESULTS
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })

    //CALL FUNCTION FOR RESULTS
    .then(function (localResult) {
      console.log(localResult);
      //DISPLAY CITY NAME DATA
      var cityName = localResult.name;
      city.textContent = cityName;

      var coords = localResult.coord;
      console.log(coords);
      //PUT LAT&LON VALUE FROM FIRST API INTO NEW ONE CALL API
      newAPI(coords.lon, coords.lat);
    });
}

//CREATE URL FOR FETCH -ONE CALL API GIVES REMAINING DATA
function newAPI(lon, lat) {
  var newURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;
  console.log(newURL);

  //FETCH RESULTS
  fetch(newURL)
    .then(function (response) {
      return response.json();
    })

    .then((data) => {
      console.log(data);
      console.log(data.daily);
      console.log(data.daily[0].dt);
      // for (i = 1; i < 6; i++) -attempted fors with removing index positions
      // for (i = 0; data.daily[i]; i++)
      // for (i = 1; data.daily < 5; i++) {

      //TODAY RESULTS
      //DISPLAY DATE DATA
      var dateValue = data.daily[0].dt;
      var dateString = moment.unix(dateValue).format("MM/DD/YYYY");
      console.log(dateString);
      date.innerText = dateString;

      //DISPLAY ICON -set parameters? change to image in html?
      var dayIcon = data.daily[0].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + dayIcon + ".png";
      console.log(iconURL);
      weatherIcon.img = iconURL;

      //DISPLAY TEMP DATA
      var dayTemp = Math.round(data.daily[0].temp.day);
      temp.textContent = "Temp: " + dayTemp + " \u00B0F";

      //DISPLAY WIND SPEED DATA
      var windSpeed = Math.round(data.daily[0].wind_speed);
      wind.textContent = "Wind: " + windSpeed + "MPH";

      //DISPLAY HUMIDITY DATA
      var dataHumidity = Math.round(data.daily[0].humidity);
      humidity.textContent = "Humidity: " + dataHumidity + "%";

      //DISPLAY UV INDEX DATA
      var dataUVI = data.daily[0].uvi;
      index.textContent = "UV Index: " + dataUVI;
      //INDEX ICON CONDITIONAL <=2 green, 3-5 yellow, >6 red
      if (dataUVI <= 2) {
        color = "green";
      } else if (dataUVI >= 2 && dataUVI <= 5) {
        color = "yellow";
      } else {
        color = "red";
      }

      //5-DAY RESULTS
      //A. INFO - DATE, CONDITIONS ICON, TEMP, WIND SPEED, HUMIDITY
      // var dailyData = data.daily;
      // console.log(dailyData);
      // dailyData.forEach((i) => console.log(i));
      // dailyData.forEach((wind_speed) => console.log(wind_speed));

      // for (i = 1; i < 6; i++) {
      //   console.log(dailyData[i]);
      //   console.log(dailyData[i].humidity);

      // var dateValue = dailyData.dt;
      // var dateString = moment.unix(dateValue).format("MM/DD/YYYY");
      // console.log(dateString);
      // date.innerText = dateString;
      // }
    });
}

//   var dateValue = dailyData.dt;
//   var dateString = moment.unix(dateValue).format("MM/DD/YYYY");
//   console.log(dateString);
//   date.innerText = dateString;

//   // //DISPLAY ICON -set parameters? change to image in html?
//   // var dayIcon = dailyData.weather.icon;
//   // var iconURL = "http://openweathermap.org/img/w/" + dayIcon + ".png";
//   // console.log(iconURL);
//   // weatherIcon.img = iconURL;

//   //DISPLAY TEMP DATA
//   var dayTemp = Math.round(data.daily.temp.day);
//   temp.textContent = "Temp: " + dayTemp + " \u00B0F";
// }
// //DISPLAY WIND SPEED DATA
// var windSpeed = Math.round(data.daily.wind_speed);
// wind.textContent = "Wind: " + windSpeed + "MPH";

// //DISPLAY HUMIDITY DATA
// var dataHumidity = Math.round(data.daily.humidity);
// humidity.textContent = "Humidity: " + dataHumidity + "%";

//RECENT SEARCH BUTTONS
//FUNCTION ADD SEARCH TO RESULTS
//PARAMETER IN SEARCH TERM
//1. ADD TO BUTTON WITH DATA ATTR TO STORE SEARCH TERM

//FUNCTION EVENT CLICK RECENT RESULTS
//1.READ DATA ATTR
//2.CALL TO DISPLAY IN TODAY & 5 DAY RESULTS
