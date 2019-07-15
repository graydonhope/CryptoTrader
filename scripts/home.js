var coinSummary_divs = document.getElementsByClassName("body_coin-summary")
var coins = ["BTC",
            "ETH", 
            "MIOTA"]
function createRequestURL(){
    var fsyms = ""
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms={COINS}&tsyms=USD"
    for(var index = 0; index<coins.length-1; index++){
        fsyms += coins[index]+","
    }
    fsyms += coins[index];
    url = url.replace("{COINS}",fsyms)
    return url
}
            
function fetchCoinData(){
    console.log("Upadting data")
    var xhr = new XMLHttpRequest(),
    method = "GET",
    url = createRequestURL();

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText).DISPLAY;
        for (var index = 0; index < coins.length; index++){
            var targetCoin = coins[index]
            var usdValue = response[targetCoin]["USD"]["PRICE"].replace("$","")
            var changePercent = response[targetCoin]["USD"]["CHANGEPCT24HOUR"]
            updateDiv(findCoinSummaryDiv(targetCoin), usdValue, changePercent)
        }
    }
    };
    xhr.send();
}
function findCoinSummaryDiv(targetTicker){
    for(var index =0; index < coinSummary_divs.length; index++){
        var ticker = coinSummary_divs[index].getElementsByTagName("h3")[0].innerText
        if(ticker == targetTicker){
            return coinSummary_divs[index]
        }
    }
    return null
}
function updateDiv(div, usdValue, change){
    if(div == null){
        return
    }
    var usd_p = div.getElementsByTagName("p")[0]
    var change_p = div.getElementsByTagName("p")[1]
    usd_p.innerHTML = usdValue.trim() + " USD"
    if(change.includes("-")){
        change_p.style.color = '#EA0070' //red
        change_p.innerHTML = change + "%"
    }
    else{
        change_p.style.color = '#7EAF2C' //green
        change_p.innerHTML = "+" + change + "%"
    }
}
function goToMarket(){
    window.location.href = "market.html"
}
function goToBTC(){
    window.location.href = "detail.html"
}

function goToMIOTA(){
    window.location.href = "iotaDetail.html"
}
function goToETH(){
    window.location.href = "ethereumDetail.html"

}
fetchCoinData()
setInterval(function(){
    fetchCoinData()}, 5000)
