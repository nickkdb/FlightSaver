var flights;
var pebbles = [];

$(document).ready(function(){

$("#comingFrom").on("change", function(e){
    e.preventDefault();
    var city1= $("#comingFrom").val();
    city1 = city1.split(',')[0];

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

$("#goingTo").on("change", function(e){
    e.preventDefault();
    var city2= $("#goingTo").val();
    city2 = city2.split(',')[0];

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
    });   
})
// Get the airport they're heading to 

$("#find").on("click", function(e) {
    e.preventDefault();
    var filler1 = $("#getAirportFrom option:selected").val();
    var filler2 = $("#getAirportTo option:selected").val();
    console.log(filler1);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + filler1 + "/" + filler2 + "/2020-11-03", //?inboundpartialdate=2020-11-08
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "48bf12c8d6msh0ac264695b8e047p12405fjsn64e8ea946e35"
        }
    };
    $.ajax(settings).done(function (response2) {
        console.log(response2);
        getFlights(response2);
        showFlights(pebbles);
    });

    displayMap();
})


function chooseOrigin(input) {
    for (var i=0; i < input.Places.length; i++) {
        $("<option>", {
            text: input.Places[i].PlaceName,
            class: "airports",
            value: input.Places[i].PlaceId
        }).appendTo("#getAirportFrom");
    }
}

function chooseArrival(input) {
    for (var i=0; i < input.Places.length; i++) {
        $("<option>", {
            text: input.Places[i].PlaceName,
            class: "airports",
            value: input.Places[i].PlaceId
        }).appendTo("#getAirportTo");
    }
    
}

function getFlights(input) {
    for (var i= 0; i < input.Quotes.length; i++) {
        var h = input.Quotes[i].OutboundLeg.CarrierIds[0];
        var x = {
            price: input.Quotes[i].MinPrice,
            direct: input.Quotes[i].Direct,
            carrier: "",
            quoteid: input.Quotes[i].QuoteId,
            fromId: input.Quotes[i].OutboundLeg.OriginId,
            toId: input.Quotes[i].OutboundLeg.DestinationId,
        }
        for (var j= 0; j < input.Carriers.length; j++) {
            if (h === input.Carriers[j].CarrierId) {
                x.carrier += input.Carriers[j].Name
            }
        }
        pebbles.push(x);
        console.log(pebbles);
    }
}

function showFlights(p) {
    for (var i= 0; i < p.length; i++) {
        $("<p>", {
            text: "Price: " + p[i].price,
            id: "Quote" + (i + 1)
        }).appendTo("#flight-info");
        $("<button>", {
            text: "Save this flight",
            class: "waves-effect waves-light btn-large",
            value: i
        }).appendTo("#Quote" + (i + 1)).css("float", "right");
        $("<p>", {
            text: "Carrier: " + p[i].carrier,
            id: "carrier" + (i + 1)
        }).appendTo("#Quote" + (i + 1));
        if (p[i].direct) {
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
        $("<br>").appendTo("#Quote" + (i + 1));
    }
}

$("#flight-info").on("click", "button", function(e) {
    e.preventDefault();
    var x = $(this).val();
    flights = JSON.parse(localStorage.getItem("flights"));
    console.log(flights);

    if (!flights) {
        flights = [];
        flights.push(pebbles[x]);
        localStorage.setItem("flights", JSON.stringify(flights));
    } else {        
        flights.push(pebbles[x]);
        localStorage.setItem("flights", JSON.stringify(flights));              
    }
   
});

displayCurrencies();

});