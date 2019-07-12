// Get the current price value of the specified Crypto Coin and set its value in HTML.

var currentPrice = new XMLHttpRequest();

try {
    currentPrice.open('GET',
        'https://api.gdax.com/products/BTC-USD/book', true);
    currentPrice.onreadystatechange = function() {
        if (currentPrice.readyState == 4) {
            var ticker = JSON.parse(currentPrice.responseText);
            var price = ticker.bids[0][0];
            document.getElementById('body_row__btcPrice').innerHTML = "$" + price;
        }
        else {
            document.getElementById('body_row__btcPrice').innerHTML = "$11570";
        }
    }    
    currentPrice.send();
}
catch(DOMException) {

}



