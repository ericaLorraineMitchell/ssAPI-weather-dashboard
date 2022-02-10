//GLOBAL VARIABLE CONNECTIONS

var searchBtn = document.getElementById("search-btn");

var recentBtn = document.getElementById("recent-btn");

var city = document.getElementById("city");
var date = document.getElementById("date");
var date1 = document.getElementById("date1");
var date2 = document.getElementById("date2");
var date3 = document.getElementById("date3");
var date4 = document.getElementById("date4");
var date5 = document.getElementById("date5");

var weatherIcon = document.getElementById("weather-icon");
var weatherIcon1 = document.getElementById("weather-icon1");
var weatherIcon2 = document.getElementById("weather-icon2");
var weatherIcon3 = document.getElementById("weather-icon3");
var weatherIcon4 = document.getElementById("weather-icon4");
var weatherIcon5 = document.getElementById("weather-icon5");

var temp = document.getElementById("temp");
var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var temp4 = document.getElementById("temp4");
var temp5 = document.getElementById("temp5");

var wind = document.getElementById("wind");
var wind1 = document.getElementById("wind1");
var wind2 = document.getElementById("wind2");
var wind3 = document.getElementById("wind3");
var wind4 = document.getElementById("wind4");
var wind5 = document.getElementById("wind5");

var humidity = document.getElementById("humidity");
var humidity1 = document.getElementById("humidity1");
var humidity2 = document.getElementById("humidity2");
var humidity3 = document.getElementById("humidity3");
var humidity4 = document.getElementById("humidity4");
var humidity5 = document.getElementById("humidity5");

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
  //1. ADD TO BUTTON WITH DATA ATTR TO STORE SEARCH TERM
  $(".searchBtn").on("click", function () {
    var inputId = $(this).text("user-input");
    var inputValue = $("#" + inputId).val();

    localStorage.setItem(inputId, inputValue);
  });
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
      console.log(data.daily[0].dt);

      //LOOP THROUGH RESULTS
      // var forecastArr = data.daily;
      // for (var i = 0; i < 6; i++) {
      //   console.log(forecastArr[i]);
      //   console.log(forecastArr[i].dt);

      //DISPLAY DATE DATA
      var dateValue = data.daily[0].dt;
      var dateString = moment.unix(dateValue).format("MM/DD/YYYY");
      console.log(dateString);
      date.textContent = dateString;

      var dateValue1 = data.daily[1].dt;
      var dateString1 = moment.unix(dateValue1).format("MM/DD/YYYY");
      date1.textContent = dateString1;

      var dateValue2 = data.daily[2].dt;
      var dateString2 = moment.unix(dateValue2).format("MM/DD/YYYY");
      date2.textContent = dateString2;

      var dateValue3 = data.daily[3].dt;
      var dateString3 = moment.unix(dateValue3).format("MM/DD/YYYY");
      date3.textContent = dateString3;

      var dateValue4 = data.daily[4].dt;
      var dateString4 = moment.unix(dateValue4).format("MM/DD/YYYY");
      date4.textContent = dateString4;

      var dateValue5 = data.daily[5].dt;
      var dateString5 = moment.unix(dateValue5).format("MM/DD/YYYY");
      date5.textContent = dateString5;

      //DISPLAY ICON -set parameters? change to image in html?
      var dayIcon = data.daily[0].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + dayIcon + ".png";
      console.log(iconURL);
      weatherIcon.img = iconURL;
      weatherIcon1.img = iconURL;
      weatherIcon2.img = iconURL;
      weatherIcon3.img = iconURL;
      weatherIcon4.img = iconURL;
      weatherIcon5.img = iconURL;

      //DISPLAY TEMP DATA
      var dayTemp = Math.round(data.daily[0].temp.day);
      temp.textContent = "Temp: " + dayTemp + " \u00B0F";

      var dayTemp1 = Math.round(data.daily[1].temp.day);
      temp1.textContent = "Temp: " + dayTemp1 + " \u00B0F";

      var dayTemp2 = Math.round(data.daily[2].temp.day);
      temp2.textContent = "Temp: " + dayTemp2 + " \u00B0F";

      var dayTemp3 = Math.round(data.daily[3].temp.day);
      temp3.textContent = "Temp: " + dayTemp3 + " \u00B0F";

      var dayTemp4 = Math.round(data.daily[4].temp.day);
      temp4.textContent = "Temp: " + dayTemp4 + " \u00B0F";

      var dayTemp5 = Math.round(data.daily[5].temp.day);
      temp5.textContent = "Temp: " + dayTemp5 + " \u00B0F";

      //DISPLAY WIND SPEED DATA
      var windSpeed = Math.round(data.daily[0].wind_speed);
      wind.textContent = "Wind: " + windSpeed + "MPH";

      var windSpeed1 = Math.round(data.daily[1].wind_speed);
      wind1.textContent = "Wind: " + windSpeed1 + "MPH";

      var windSpeed2 = Math.round(data.daily[2].wind_speed);
      wind2.textContent = "Wind: " + windSpeed + "MPH";

      var windSpeed3 = Math.round(data.daily[3].wind_speed);
      wind3.textContent = "Wind: " + windSpeed3 + "MPH";

      var windSpeed4 = Math.round(data.daily[4].wind_speed);
      wind4.textContent = "Wind: " + windSpeed4 + "MPH";

      var windSpeed5 = Math.round(data.daily[5].wind_speed);
      wind5.textContent = "Wind: " + windSpeed5 + "MPH";

      //DISPLAY HUMIDITY DATA
      var dataHumidity = Math.round(data.daily[0].humidity);
      humidity.textContent = "Humidity: " + dataHumidity + "%";

      var dataHumidity1 = Math.round(data.daily[1].humidity);
      humidity1.textContent = "Humidity: " + dataHumidity1 + "%";

      var dataHumidity2 = Math.round(data.daily[2].humidity);
      humidity2.textContent = "Humidity: " + dataHumidity2 + "%";

      var dataHumidity3 = Math.round(data.daily[3].humidity);
      humidity3.textContent = "Humidity: " + dataHumidity3 + "%";

      var dataHumidity4 = Math.round(data.daily[4].humidity);
      humidity4.textContent = "Humidity: " + dataHumidity4 + "%";

      var dataHumidity5 = Math.round(data.daily[5].humidity);
      humidity5.textContent = "Humidity: " + dataHumidity5 + "%";

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
    });
}

//RECENT SEARCH BUTTONS
//FUNCTION ADD SEARCH TO RESULTS
//PARAMETER IN SEARCH TERM
var recentList = function () {
  var inputBtn = $('<input type="button">');
  inputBtn.addClass("recent-section").text(searchBtn);
  inputBtn.appendTo(recentBtn);

  recentList();
};
