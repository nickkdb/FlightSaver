var dair= $("#dair");
var aair= $("#aair");
var originID;
var arrivalID;
var test = "";
var test2= "";

$("#dair").on("change", function(e){
    e.preventDefault();
    var city1= dair.val();

    const originCity = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + city1,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "d351f23910msh0c46724acf3eeffp1b963bjsn3528698c89bb"
        }
    };

    $.ajax(originCity).done(function (response) {
            console.log(response);          
            chooseOrigin(response);           
            
    
    });
})

$("#aair").on("change", function(e){
    e.preventDefault();
    var city2= aair.val();

    const arrivalCity = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + city2,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "d351f23910msh0c46724acf3eeffp1b963bjsn3528698c89bb"
        }
    };

        $.ajax(arrivalCity).done(function (data) {
            console.log(data);
            chooseArrival(data);
            $("#confirm").show();
            
    });   
})
// Get the airport they're heading to 

$("#select1").on("click", "p", function() {
    originID = $(this).text();
    console.log(originID);
})

$("#select2").on("click", "p", function() {
    arrivalID = this.textContent;
    console.log(arrivalID);
})

$("#confirm").on("click", function(e) {
    e.preventDefault();
    var filler1 = $("#getAirportFrom option:selected").text();
    var filler2 = $("#getAirportTo option:selected").text();
    console.log(filler1);
    $(".selector").hide();
    $("#confirm").hide();
    test= shortenID(filler1);
    test2= shortenID(filler2);
    console.log(test);
    console.log(test2);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + test + "/" + test2 + "/2020-11-01?inboundpartialdate=2020-11-01",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "48bf12c8d6msh0ac264695b8e047p12405fjsn64e8ea946e35"
        }
    };
    $.ajax(settings).done(function (response2) {
        console.log(response2);
        displayQuotes(response2);
        displayCarriers(response2);
        displayDirect(response2);
        displayFlightDate(response2);
    });
})


function chooseOrigin(input) {
    for (var i=0; i < input.Places.length; i++) {
        $("<option>", {
            text: input.Places[i].PlaceId + " - " + input.Places[i].PlaceName,
            class: "airports"
        }).appendTo("#getAirportFrom");
    }
}

function chooseArrival(input) {
    for (var i=0; i < input.Places.length; i++) {
        $("<option>", {
            text: input.Places[i].PlaceId + " - " + input.Places[i].PlaceName,
            class: "airports"
        }).appendTo("#getAirportTo");
    }
    
}

function shortenID(text) {
    var y = "";
    for (var i= 0; i < text.length; i++) {
        if (text[i] != " ") {
            y += text[i];
        } else {
            return y
        }
    }
}

function displayQuotes(input) {
    for (var i = 0; i < input.Quotes.length; i++) {
        $("<p>", {
            text: "Quote " + (i + 1) + " price: " + input.Quotes[i].MinPrice,
            id: "Quote" + (i + 1)
        }).appendTo("body");
    }
}

function displayCarriers(input) {
    for (var i= 0; i < input.Quotes.length; i++) {
        var holder = input.Quotes[i].OutboundLeg.CarrierIds[0];
        for (var j= 0; j < input.Carriers.length; j++) {
            if (holder === input.Carriers[j].CarrierId) {
                $("<p>", {
                    text: "Carrier: " + input.Carriers[j].Name
                }).appendTo("#Quote" + (i + 1));
            }
        }
    }
}

function displayDirect(input) {
    for (var i = 0; i < input.Quotes.length; i++) {
        var j = input.Quotes[i].Direct;
        if (j) {
            $("<p>", {
                text: "Nonstop: Yes",
                id: "direct" + (i + 1)
            }).appendTo("#Quote" + (i + 1));
        } else {
            $("<p>", {
                text: "Nonstop: No",
                id: "direct" + (i + 1)
            }).appendTo("#Quote" + (i + 1));
        }
    }
}