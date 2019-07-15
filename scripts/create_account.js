var validName = false;
var validEmail = false;
var validPassword = false;

function createAccount() {
    checkName();
    validateEmail();
    checkPasswords();

    if (validName && validEmail && validPassword) {
        alert("Account Successfully Created!");
        window.location.href = "market.html";
        return false;
    }
    else {
        // Stay on page
        return false;
    }
}

function checkName() {
    var nameEntered = document.getElementById("fullname").value;
    nameEntered = nameEntered.replace(/ /g, '');
    
    if ((nameEntered == "") || (/^[a-z]+$/i.test(nameEntered))) {
        document.getElementById("fullname-error").innerHTML = "";  
        document.getElementById("fullname").style.border = "none";
        validName = false;
    }
    else {
        var errorMessage = "Please enter letters only."
        document.getElementById("fullname-error").innerHTML = errorMessage;  
        document.getElementById("fullname").style.border = "2px solid red";
        validName = false;
    }

    if ((nameEntered != "") && (/^[a-z]+$/i.test(nameEntered))) {
        validName = true;
    }
}

function validateEmail() {
    var email = document.getElementById("email").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
        document.getElementById("email").style.border = "2px solid red";
        validEmail = false;
    }
    else {
        document.getElementById("email").style.border = "none";
        validEmail = true;
    }
}

function checkPasswords() {
    var password = document.getElementById("password").value;
    var confirmedPassword = document.getElementById("create-account__confirm-password").value;

    if ( (password != "") && (confirmedPassword != "") && (password === confirmedPassword) ) {
        validPassword = true;
        document.getElementById("password-error").innerHTML = "";
    }
    else{
        var errorMessage = "Passwords must match"
        document.getElementById("password-error").innerHTML = errorMessage;
        document.getElementById("password-error").style.color = "red";
    }
}

function emailFocus() {
    
    if (validEmail) {
        document.getElementById("email").style.boxShadow = "none";
        document.getElementById("email").style.border = "2px solid black";
    }
    else if (!document.getElementById("email").value == ""){
        document.getElementById("email").style.boxShadow = "none";
        document.getElementById("email").style.border = "2px solid red";
    }
    else {
        document.getElementById("email").style.border = "none";
    }
}

function nameFocus() {

    if (validName) {
        document.getElementById("fullname").style.boxShadow = "none";
        document.getElementById("fullname").style.border = "2px solid black";
    }
    else if (!document.getElementById("fullname").value == ""){
        document.getElementById("fullname").style.boxShadow = "none";
        document.getElementById("fullname").style.border = "2px solid red";
    }
    else {
        document.getElementById("fullname").style.border = "none";
    }
}