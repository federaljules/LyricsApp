$body = $("body");

$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); }
});



function search() {
    let artist = document.getElementById('artist').value;
    let song = document.getElementById('song').value;

    if (artist == "" || song == "") {
        alert("You have to fill both fields to search!")
    }else{

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://mourits-lyrics.p.rapidapi.com/?separator="+"<br/>"+"&artist="+artist+"&song="+song+"",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
            "x-rapidapi-key": "35f0a061bamsh37e41a82b568d09p1e5af9jsn88d2b56e158d"
        }
    } 
   

    $.ajax(settings).done(function (res) {

        let cont = document.getElementById('cont').style;

        let style = {
            "font-weight": "bold",
            "font-size": "30pt"
        }

        console.log(res)
        if (res.success == true) {
            cont.visibility = "visible";
       
            $("#lyrics").html("<h1 class='align-center' style='font-weight:bold;font-size:13pt;font-family: 'Alata', sans-serif;'>" + res.artist.charAt(0).toUpperCase() + res.artist.slice(1) + " - " + res.song.charAt(0).toUpperCase() + res.song.slice(1) + "</h1><br/>" + res.result.lyrics);
            

        } else if (res.success == false) {
            alert(res.error + "Please check that your search criterias are right and try again.")
           cont.visibility = "hidden";
        }
    });
    }
}




