$('#search').click(function () {

    let artist = document.getElementById('artist').value;
    let song = document.getElementById('song').value;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "c1fc2f0fa7msh519308ad83d404cp199d10jsn3c02c8fe956f"
        }
    }

    $.ajax(settings).done(function (res) {
        artist.style = "text-transform:capitalize;"
        for (var i = 0; i < res.data.length; i++){
            if (res.data[i].artist.name.toUpperCase() == artist.toUpperCase()){
        $('#art_cont').html("<h1 style='font-size:35pt;font-weight:bold;font-family:Alata,sans-serif;'>"
            + res.data[i].artist.name + "</h1><br/> <img src='"
            + res.data[i].artist.picture_big + "' </img><br/><br/>")
            }
    
        console.log(res.data[i].artist.name)
        console.log(artist)
        }
    });

});

$('#search').click(function () {

    let artist = document.getElementById('artist').value;
    let song = document.getElementById('song').value;

    var settings = {
        "async": true,
        "crossDomain": true,
        "dataType": "jsonp",
        "url": "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:" + artist + "&gsrlimit=1&redirects=1",
        "method": "GET"
    }

    $.ajax(settings).done(function (res) {
        let pg = Object.values(res.query.pages);
        let info = pg[0].extract;
        console.log(res)
        $('#art_ext').html(info)

    });

})
