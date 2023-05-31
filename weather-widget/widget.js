
window.addEventListener('onWidgetLoad', (obj) => {
  
  const fieldData = obj.detail.fieldData
  
  // ------------------------------------------------CHANGE THESE SETTINGS ----------------------------------------------- */
  // REQUIRED
  var yourApiKey = fieldData.apiKey;			// your OpenWeatherMap Api key here
  var yourCity = fieldData.city				// your city name, ex: "London, UK" or "Las Vegas, NV, US" 
  var yourUnits = fieldData.unit				// 'imperial' for fahrenheit  'metric' for celsius  'standard' for kelvin.
  
  // OPTIONAL
  var weatherDisplay = "full";				// options: "full" , "weather", "simple" , "temp" , "time" (if blank or error, default is "full")
  var weatherIcons = 1;						// show Weather status icons in display 1=on  0=off
  var iconPack = 3;							// Icon Pack ID. (1-3) (add your own just follow the folder (pack1, pack2, pack3...) and file (01d.png, 01n.png) naming convention.  
  var iconHeight = "22px";					// weather icon height (for best results use textSize + 2. ex: textSize = 20pt + 2 = 22px)
  var textSize = "20pt";						// font size
  var textColor = "black";					// font color
  var weatherBackground = "lightgrey";		// weather Background color  (if dynamicBackground is enabled this only applies during daytime hours)
  var dynamicBackground = 1;					// weather background changes based on day or night 1=on 0=off
  var clockSeperator = "";					// optional: seperator for the temp and time in full mode only (ex: -, /, ., *, @, additional spaces, etc.)
  var time24hour = fieldData.time24hour;		// 24 hour time.  true or false
  var weatherBorder = "0";					// border size in pixels. default is 0
  var autoCheckUpdates = true;				// Automatically check for updates.
  
  // ---------------------------------------------  NO CHANGES BELOW HERE  ----------------------------------------------- */
  
  // var weatherVersion; var weatherFriendly;  
  // var wVer = 101; 
  // if (weatherVersion > wVer && localStorage.getItem(wVer+"."+weatherVersion+"update") != 1 && autoCheckUpdates == true) { 
  //   if (confirm("g4Weather v"+weatherFriendly+" Update Available. Please visit:\nhttps://github.com/ngholson/obs_weather_time_overlay\nClick 'CANCEL' to hide future notifications about this update") != true){ 
  //     localStorage.setItem(wVer+"."+weatherVersion+"update",1);
  //   } 
  // }  
  
  if(!yourCity){
    document.getElementById("id-weather").innerHTML = "Waiting for your City..."
    return
  }
  
  if(!yourApiKey){
    document.getElementById("id-weather").innerHTML = "Waiting for your API Key..."
    return
  }

  
  var language = window.navigator.userLanguage || window.navigator.language;
  
  const regionTranslate = new Intl.DisplayNames([language], { type: 'region' });
  document.querySelector(':root').style.setProperty('--txtSize', textSize); document.querySelector(':root').style.setProperty('--txtColor', textColor);
  document.querySelector(':root').style.setProperty('--wBack', weatherBackground);
  document.querySelector(':root').style.setProperty('--wBorder', weatherBorder+"px");
  refreshData();
  function weatherCheck() {
    var time = time24hour != 'true' ? currentTime(new Date()) : time24(new Date());
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      data: { units: yourUnits, q: yourCity, appid: yourApiKey, lang: language },
      dataType: 'json',
      success: function (apiResponse) {
        if (dynamicBackground == 1) {
          if (apiResponse.weather[0].icon.slice(2) == "n") { document.querySelector(':root').style.setProperty('--wBack', "linear-gradient(to bottom, black , dimgrey"); document.querySelector(':root').style.setProperty('--txtColor', "white"); }
          else { document.querySelector(':root').style.setProperty('--wBack', "linear-gradient(to bottom, skyblue ," + weatherBackground); document.querySelector(':root').style.setProperty('--txtColor', "black"); }
        }
        var curtemp = Math.round(apiResponse.main.temp);
        var wimg = "https://github.com/ngholson/obs_weather_time_overlay/blob/86c6ff2e3347d1706440ca71223d95318930cf00/images/pack" + `${iconPack}` + "/" + apiResponse.weather[0].icon + ".png?raw=true";
        $.ajax({
          url: 'https://api.openweathermap.org/geo/1.0/direct',
          data: { q: yourCity, appid: yourApiKey },
          dataType: 'json',
          success: function (geoResponse) {
            if (geoResponse[0].country.toLowerCase() != "us") {
              if (geoResponse[0].state == apiResponse.name || geoResponse[0].state == null) {
                geoResponse[0].state = regionTranslate.of(geoResponse[0].country);
              }
            }
            if (weatherDisplay.toLowerCase() == "temp") {
              if (weatherIcons == 1) { document.getElementById("id-weather").innerHTML = `<img style='height: ${iconHeight};' src=${wimg}> ${curtemp}&deg;`; return; }
              document.getElementById("id-weather").innerHTML = `${curtemp}&deg;`; return;
            }
            if (weatherDisplay.toLowerCase() == "time") { document.getElementById("id-weather").innerHTML = `${time}`; return; }
            if (weatherDisplay.toLowerCase() == "simple") {
              if (weatherIcons == 1) { document.getElementById("id-weather").innerHTML = `${curtemp}&deg; <img style='height: ${iconHeight};' src=${wimg}> ${time}`; return; }
              document.getElementById("id-weather").innerHTML = `${curtemp}&deg;  ${time}`; return;
            }
            if (weatherDisplay.toLowerCase() == "weather") {
              if (weatherIcons == 1) {
                document.getElementById("id-weather").innerHTML = `${geoResponse[0].name}, ${geoResponse[0].state}: ${curtemp}&deg; <img style='height: ${iconHeight};' src=${wimg}> ${apiResponse.weather[0].description}`;
              } else { document.getElementById("id-weather").innerHTML = `${geoResponse[0].name}, ${geoResponse[0].state}: ${curtemp}&deg; \/ ${apiResponse.weather[0].description}`; }
              return;
            }
            //start of full
            if (weatherIcons == 1) {
              document.getElementById("id-weather").innerHTML = `${geoResponse[0].name}, ${geoResponse[0].state}: ${curtemp}&deg; <img style='height: ${iconHeight};' src=${wimg}> ${apiResponse.weather[0].description} ${clockSeperator} ${time}`;
            } else { document.getElementById("id-weather").innerHTML = `${geoResponse[0].name}, ${geoResponse[0].state}: ${curtemp}&deg; \/ ${apiResponse.weather[0].description} ${clockSeperator} ${time}`; }
          }
        });
      },
      error: function(request, status, errorThrown) {
        document.getElementById("id-weather").innerHTML = `Error ${request.responseJSON.cod}: ${errorThrown} - ${request.responseJSON.message}`
        console.log('status: ', status)
        console.log('request: ', request)
        console.log('errorThrown: ', errorThrown)
        // There's been an error, do something with it!
        // Only use status and errorThrown.
        // Chances are request will not have anything in it.
      }
    });
  }
  function currentTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var isAmPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var curTime = hours + ':' + minutes + ' ' + isAmPm;
    return curTime;
  }
  function time24(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var curTime24 = hours + ':' + minutes;
    return curTime24;
  }
  function refreshData() {
    weatherCheck();
    setTimeout(refreshData, 60000);
  }
  
})
