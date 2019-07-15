//DOM ELEMENTS
var market_table = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0]
var searchBar_input = document.getElementById("body_input_search-bar")
var noData_tableRow= document.getElementById("table_row_no-data")
//Variables
var coins = [["BTC","BitCoin", "detail.html"],
            ["ETH","Ethereum","ethereumDetail.html"], 
            ["MIOTA","IOTA","iotaDetail.html"]]

//Methods
$(document.body).on("click", "tr[data-href]", function(){
    window.location.href = this.dataset.href
})

function createRequestURL(){
    var fsyms = ""
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms={COINS}&tsyms=USD"
    for(var index = 0; index<coins.length-1; index++){
        fsyms += coins[index][0]+","
    }
    fsyms += coins[index][0];
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
            var targetCoin = coins[index][0]
            var ticker = targetCoin
            var name = coins[index][1]
            var usdValue = response[targetCoin]["USD"]["PRICE"].replace("$","")
            var changePercent = response[targetCoin]["USD"]["CHANGEPCT24HOUR"]
            
            var row = containsCoin(ticker)
            if(row != null){
                updateRow(row, usdValue, changePercent)
            }
            else{
                insertRow(ticker, name, usdValue, changePercent, coins[index][2])
            }
        }
    }
    };
    xhr.send();
}

function insertRow(ticker, name, usdValue, change,href){

    var newRow = market_table.insertRow()
    newRow.dataset.href = href

    var tickerCell = newRow.insertCell(0)
    var nameCell = newRow.insertCell(1)
    var usdValueCell = newRow.insertCell(2)
    var changeCell = newRow.insertCell(3)

    tickerCell.innerHTML = ticker
    nameCell.innerHTML = name
    usdValueCell.innerHTML = usdValue
    if(change.includes("-")){
        changeCell.style.color = '#EA0070' //red
        changeCell.innerHTML = change +"%"
    }
    else{
        changeCell.style.color = '#7EAF2C' //green
        changeCell.innerHTML = "+" + change +"%"
    }
}
function containsCoin(targetTicker){
    var rows = market_table.getElementsByTagName("tr")
    for(var index = 1; index < rows.length; index++){
        var row = rows[index]
        var currentTicker = row.getElementsByTagName("td")[0].innerText.toLowerCase().trim()
        if(currentTicker == targetTicker.toLowerCase().trim()){
            return row
        }
    }
    return null 
}
function updateRow(row, usdValue, change){
    var cells = row.getElementsByTagName("td")
    var usdValueCell = cells[2]
    var changeCell = cells[3]
    usdValueCell.innerHTML = usdValue
    if(change.includes("-")){
        changeCell.style.color = '#EA0070' //red
        changeCell.innerHTML = change +"%"
    }
    else{
        changeCell.style.color = '#7EAF2C' //green
        changeCell.innerHTML = "+" + change +"%"
    }
}

function numberOfVisisbleRows(){
    var rows = market_table.getElementsByTagName("tr")
    var count = 0;
    for(var index = 1; index < rows.length; index++){
        if(rows[index].style.display != "none"){
            count ++;
        }
    }
    return count;
}
function filterSearch(){
    var rows = market_table.getElementsByTagName("tr")
    var filter = searchBar_input.value.toLowerCase().trim()
    for(var index = 1; index < rows.length; index++){
        var row = rows[index]
        var ticker = row.getElementsByTagName("td")[0].innerText.toLowerCase().trim()
        var name = row.getElementsByTagName("td")[1].innerText.toLowerCase().trim()
        var price = row.getElementsByTagName("td")[2].innerText.toLowerCase().trim()
        var change = row.getElementsByTagName("td")[3].innerText.toLowerCase().trim()
        if(ticker.indexOf(filter) > -1 || name.indexOf(filter) > -1 || price.indexOf(filter) > -1 || change.indexOf(filter) > -1){
            row.style.display = ""
        }
        else{
            row.style.display = "none"
        }
    }
    if(numberOfVisisbleRows() == 0){
        noData_tableRow.hidden = false
    }
    else{
        noData_tableRow.hidden = true
    }
}

//Setup
noData_tableRow.hidden = true
fetchCoinData()
setInterval(function(){
    fetchCoinData()}, 5000)
