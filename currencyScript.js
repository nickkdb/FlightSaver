
var currencies = ["USD", "SGD", "MYR", "EUR", "AUD", "JPY", "CNH", "HKD", "CAD", "INR", "DKK", "GBP", "RUB", "NZD", "MXN", "IDR", "TWD", "THB", "VND"];
var currenciesX = ["EUR", "AUD", "JPY", "CNH", "HKD", "CAD", "INR", "DKK", "GBP", "RUB", "NZD", "MXN", "USD", "SGD", "MYR", "IDR", "TWD", "THB", "VND"];

function displayCurrencies() {
for (var i = 0; i < currencies.length; i++) {
    var currencyOption = $('<option>').text(currencies[i]);
    $('#fromCurrency').append(currencyOption);
}
for (var i = 0; i < currencies.length; i++) {
    var currencyOption = $('<option>').text(currenciesX[i]);
    $('#toCurrency').append(currencyOption);
}
$('#getCurrency').on('click', function () {
    var fromCurrency = $('#fromCurrency option:selected').text();
    var toCurrency = $('#toCurrency option:selected').text();
    var queryString = '?from=' + fromCurrency + '&to=' + toCurrency + '&q=500.0';
    console.log(queryString);

    $.ajax({
        "async": true,
        "crossDomain": true,
        url: "https://rapidapi.p.rapidapi.com/exchange" + queryString,
        method: 'GET',
        "headers": {
            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
            "x-rapidapi-key": "48bf12c8d6msh0ac264695b8e047p12405fjsn64e8ea946e35"
        }
    }).then(function (response) {
        console.log(response);
        var amount = $('<h4>');
        var rounded = parseFloat(response);
        rounded = rounded.toFixed(2);
        amount.text(response);

        var desc = $('<p>');
        desc.text('For every 1 ' + fromCurrency + ', you get ~ ' + rounded + ' ' + toCurrency + ' in return.');
        $('#displayCurrency').empty();
        $('#displayCurrency').append(amount);
        $('#displayCurrency').append(desc);
    })
})
}

