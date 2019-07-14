if (window.canRunAds == undefined) {
    showFallbackImage();
}

function showFallbackImage() {
    var popupMessage = "This website uses a widget which gets blocked by common adblockers. \n \n Please turn off adblock for this website. \n \n Trust us! There are no hidden ads!! :)";
    alert(popupMessage);
}