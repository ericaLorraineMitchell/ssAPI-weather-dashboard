//GLOBAL VARIABLE CONNECTIONS
var userInput = document.getElementById("user-input");
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

//SEARCH BUTTON RETURN API RESULTS
//FUNCTION EVENT CLICK
function searchSubmit(event) {
  event.preventDefault();

  userInput = document.querySelector("#user-input").value;

  if (!userInput) {
    console.error("Enter city!");
    return;
  }

  searchApi(searchInputVal);
}

searchBtn.addEventListener("submit", searchSubmit);

//1.READ VALUE FROM INPUT - convert city format to lat&long?

//2.CREATE URL FOR FETCH
function searchApi(localQueryUrl) {
  localQueryUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={minutely,alerts}&appid={API key}";
}
//3.FETCH RESULTS
fetch(localQueryUrl)
  .then(function (response) {
    return response.json();
  })

  .then(function (localResult) {
    //4.CALL FUNCTION TO DISPLAY RESULTS
    userInput.textContent = localResult.search.query;
    recentBtn.textContent = localResult.search.query;
    console.log(localResult);
  });

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
