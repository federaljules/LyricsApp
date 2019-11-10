var apiKey = "44c7d3b0975057b45b85719b1418192b"         //API key for the OpenWeatherMaps

var options = {
    enableHighAccuracy: true                        // Tried to fix geolocation with this option but it did not help with the problem
};

function getPosition() {                //this function is the code for the geolocation, or how far I got


    var loc = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        console.log('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + apiKey + "&units=metric",
            dataType: "json",
            success: function (data) {
                console.log(data)
                alert("Geolocation is Work In Progress, did not get it to work properly just yet.")
            }
        })

    };
    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}               //geolocation function ends


function loadJson(url, func) {                                                  // Here is the funtion to make a API call
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {                         // If the call is succesfull parse the JSON response to the assigned function
            func(JSON.parse(xhr.responseText));
        } else if (xhr.status == 404 || xhr.status == 400) {                    // If error it changes the placeholder of the search box
            document.getElementById("txtfield").placeholder = "No city found! Try again.";
            document.getElementById("txtfield").value = "";
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
        
function searchWeather() {                                                     // Here is the function when user searches with city name, this function makes 2 API calls where it inserts the city name.                                                
    let txt = document.getElementById("txtfield").value;


    loadJson("https://api.openweathermap.org/data/2.5/weather?q=" + txt + "&units=metric&APPID=" + apiKey, currWeath)               // This call for current weather by city name
    loadJson("https://api.openweathermap.org/data/2.5/forecast?q=" + txt + "&units=metric&APPID=" + apiKey, hourWeath)              // This call for 5day forecast by city name

    document.getElementById("txtfield").placeholder = "Search city name";

}

function getCurrWeath() {

    loadJson("https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&APPID=" + apiKey, currWeath)              // Here it gets the weather for helsinki as default. Here aswell I ran out of time and would have liked not to leave helsinki as default
                                                                                                                                // but as my geolocation did not get working, it messed up my original plans to get users location as default
}
getCurrWeath();


function currWeath(data) {                                                                                                      // In this function I insert and create the current weather section whit the blue background
    let txt = document.getElementById("txtfield").value = "";
    var temp = document.getElementById("temp");
    var city = document.getElementById("city");
    var icon = document.getElementById("icon");


    icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"                                           // Here i get the weather icon

    var tz = data.timezone;                                                                                                     // In these lines i get the UTC time
    var hours = new Date().getUTCHours();
    var mins = new Date().getUTCMinutes();

    hours = hours + ((tz / 60) / 60)                                                                                             // Here I use the timezone data i get from api call to convert citys time to correct local time.

    if (mins.toString().length == 1) {
        temp.innerHTML = "<span id='currTime' style='font-size:20pt;color:white;margin:0;padding:0;'>" + "Local time " + hours + ":" + "0" + mins + "</span><br>" + Math.round(data.main.temp) + "°C";              // This if else is for the time just to add a "0" to the string if the time has only 1 character
    } else {
        temp.innerHTML = "<span id='currTime' style='font-size:20pt;color:white;margin:0;padding:0;'>" + "Local time " + hours + ":" + mins + "</span><br>" + Math.round(data.main.temp) + "°C";
    }
    city.innerHTML = data.name;                                                                                                                                 // Here comes the citys name
    
}

 
function timeConv(time) {                                           // In this function I cut the time data get from the API call to be better to read and understand
    var d = new Date(time).toDateString();
    var t = new Date(time).toTimeString();


    let day = d.substr(0, 3);
    let dayNum = d.substr(8, 2);
    let month = d.substr(4, 4);
    let year = d.substr(11, 10);
    let tme = t.substr(0, 5);


    return day + " " + dayNum + " " + month + " <b>" + tme + "</b>";
}




function getHourWeath() {                                                                                     // This function activates the helsinki's default forecast for 5 days
    loadJson("https://api.openweathermap.org/data/2.5/forecast?q=helsinki&units=metric&APPID=" + apiKey, hourWeath)
}
getHourWeath();

function hourWeath(data) {                                                                                 // In this function I create the beige forecast list items from the data gathered from API call
    var ul = document.getElementById("list");
   
    console.log(data)

    if (ul.children.length == 0) {                                                                          // Here I check if there is any items in the ul and if there is not then create them in the for loop below
        
        
        for (var i = 0; i < data.list.length; i++) {
          
            var li = document.createElement("li");
            var img = document.createElement("img");
            var text = document.createElement("span");
            img.style.position = "inherit";
            img.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
            img.alt = data.list[i].weather[0].description;
            text.innerHTML = "<b style='font-size:25pt;'>" + Math.round(data.list[i].main.temp) + "°C " + data.list[i].weather[0].main + "</b> <br>" + timeConv(data.list[i].dt_txt) + " UTC";  // Here i use the timeConv function to make the time more readable

            li.appendChild(img);
            li.appendChild(text);                                                                           // Here I append the items to the list
            ul.appendChild(li);
        }
    } else {
        var child = ul.lastElementChild;                                                                                    // If there is items in list then delete the old ones and add new ones
        while (child) {
            ul.removeChild(child);
            child = ul.lastElementChild;
        }

        for (var i = 0; i < data.list.length; i++) {                                                                        // This is the same for loop as earlier
            var li = document.createElement("li");
            var img = document.createElement("img");
            var text = document.createElement("span");
            img.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
            img.alt = data.list[i].weather[0].description;
            text.innerHTML = "<b style='font-size:25pt;'>" + Math.round(data.list[i].main.temp) + "°C " + data.list[i].weather[0].main + "</b> <br>" + timeConv(data.list[i].dt_txt) + " UTC";

            li.appendChild(img);
            li.appendChild(text);
            ul.appendChild(li);
        }
    }


}


$("#search").click(function () {
    $("#searchbar").toggle("fast");                                     // Here I use jQuery to toggle the searchbar div which has text input and button inside of it, by pressing the search button top left
});


$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#return-to-top').fadeIn(200);                                // Here is jQuery for the scroll to the top element in app, so that it does not show when at the top of page but when you scroll down in appears
    } else {
        $('#return-to-top').fadeOut(200);
    }
});
$('#return-to-top').click(function () {
    $('body,html').animate({                                            //Here it makes the animation happen
        scrollTop: 0
    }, 500);
});