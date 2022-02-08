//GLOBAL VARIABLE CONNECTIONS

var searchBtn = document.getElementById("search-btn");

var recentBtn = document.getElementById("recent-btn");
var recent1 = document.getElementById("1");
var recent2 = document.getElementById("2");
var recent3 = document.getElementById("3");
var recent4 = document.getElementById("4");
var recent5 = document.getElementById("5");

var todayCity = document.getElementById("today-city");
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
    return;
  }

  searchApi(userInput);
}

searchBtn.addEventListener("click", searchSubmit);

//1.READ VALUE FROM INPUT - convert city format to lat&long

//2.CREATE URL FOR FETCH
function searchApi(userInput) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&appid=a45fd2e2b53fbbb2b9f139e7fb6f0df4";
  console.log(queryURL);

  //3.FETCH RESULTS
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (localResult) {
      //4.CALL FUNCTION TO DISPLAY RESULTS
      console.log(localResult);
      var coords = localResult.coord;
      console.log(coords);
      newAPI(coords.lon, coords.lat);
    });
}

function newAPI(lon, lat) {
  var newURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
  console.log(newURL);

  fetch(newURL)
    .then(function (response) {
      return response.json();
    })

    .then((data) => {
      console.log(data);
    });
}

//FUNCTION FOR RESULTS DISPLAY
//1.CALL FUNCTION ADD RECENT SEARCH
//2.CALL FUNCTION ADD TODAYS RESULTS
//3.CALL FUNCTION ADD 5 DAY RESULTS
//4. CLEAR INPUT BOX

//RECENT SEARCH BUTTONS
//FUNCTION ADD SEARCH TO RESULTS
//PARAMETER IN SEARCH TERM
//1. ADD TO BUTTON WITH DATA ATTR TO STORE SEARCH TERM

//FUNCTION EVENT CLICK RECENT RESULTS
//1.READ DATA ATTR
//2.CALL TO DISPLAY IN TODAY & 5 DAY RESULTS

//TODAY RESULTS
//FUNCTION TO ADD TODAY RESULTS
//A.INFO - CITY NAME, DATE, ICON OF CONDITIONS, TEMP, HUMIDITY,
//WIND SPEED, COLOR CODED UV INDEX (FAVORABLE, MODERATE, SEVERE)

//5-DAY RESULTS
//FUNCTION TO ADD 5 DAY RESULTS
//A. INFO - DATE, CONDITIONS ICON, TEMP, WIND SPEED, HUMIDITY
