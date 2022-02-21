
function registerTabFunction() {
    event.preventDefault();
    var loginBox = document.getElementById("login");
    var regBox = document.getElementById("register");
    var forgetBox = document.getElementById("forgot");

    var loginTab = document.getElementById("lt");
    var regTab = document.getElementById("rt");

    regBox.style.visibility = "visible";
    loginBox.style.visibility = "hidden";
    forgetBox.style.visibility = "hidden";

    regTab.style.backgroundColor = "rgb(12, 132, 189)";
    loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function loginTabFunction() {
    event.preventDefault();
    var loginBox = document.getElementById("login");
    var regBox = document.getElementById("register");
    var forgetBox = document.getElementById("forgot");

    var loginTab = document.getElementById("lt");
    var regTab = document.getElementById("rt");

    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible";
    forgetBox.style.visibility = "hidden";

    loginTab.style.backgroundColor = "rgb(12, 132, 189)";
    regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function forgetTabFunction() {
    event.preventDefault();
    var loginBox = document.getElementById("login");
    var regBox = document.getElementById("register");
    var forgetBox = document.getElementById("forgot");

    var loginTab = document.getElementById("lt");
    var regTab = document.getElementById("rt");

    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "hidden";
    forgetBox.style.visibility = "visible";

    regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
    loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";

}

function register() {
    event.preventDefault();

    var email = document.getElementById("re").value;
    var firstname = document.getElementById("rf").value;
    var lastname = document.getElementById("rl").value;
    var address = document.getElementById("ra").value;
    var password = document.getElementById("rp").value;
    var passwordRetype = document.getElementById("rrp").value;

    var getSelectedValue = document.querySelector('input[name="Gender"]:checked');
    if (getSelectedValue != null) {
        var gender = getSelectedValue.value;
    }

    const person = { Email: email, firstName: firstname, lastName: lastname, Gender: gender, Address: address, Password: password };

    document.querySelector("#rd").addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("CurrentLoggedInPersonPhoto", reader.result);
        });

        reader.readAsDataURL(this.files[0]);
    });
    console.log(person);
    if (email == "") {
        document.getElementById('error1').innerHTML = "*Please enter a email ID*";
        return false;
    }
    else {
        document.getElementById('error1').innerHTML = "";
    }
    if (firstname == "") {
        document.getElementById('error2').innerHTML = "*Username must have alphabet characters only*";
        return false;
    }
    else {
        document.getElementById('error2').innerHTML = "";
    }
    if (lastname == "") {
        document.getElementById('error3').innerHTML = "*Username must have alphabet characters only*";
        return false;
    }
    else {
        document.getElementById('error3').innerHTML = "";
    }
    if (gender == "") {
        document.getElementById('error4').innerHTML = "*Please select a gender*";
        return false;
    }
    else {
        document.getElementById('error4').innerHTML = "";
    }
    if (address == "") {
        document.getElementById('error5').innerHTML = "*Please enter a address*";
        return false;
    }
    else {
        document.getElementById('error5').innerHTML = "";
    }
    if (password == "") {
        document.getElementById('error6').innerHTML = "*Please enter a password of 8 to 12 characters*";
        return false;
    }
    else {
        document.getElementById('error6').innerHTML = "";
    }
    if (passwordRetype == "") {
        document.getElementById('error7').innerHTML = "*Re write password and password are not same*";
        return false;
    }
    else {
        document.getElementById('error7').innerHTML = "";
    }

    if (password != passwordRetype) {
        document.getElementById('error6').innerHTML = "*Password and re write passwords should be same*";
        return false;
    }

    if (ValidateEmail(email)) {
        if (passwordValidation(password, 8, 12)) {
            if (allLetter(firstname) && allLetter(lastname)) {
                if (genderValidation(gender)) {
                    if (localStorage.getItem(email) == null) {
                        localStorage.setItem(email, JSON.stringify(person));
                        window.location.reload()
                        alert(email + "  Thanks for registration. \nTry to login Now");
                    }
                    else {
                        alert(email + " is already register.");
                        return;
                    }
                }
            }
        }
    }
    return false;
}

function passwordValidation(password, mx, my) {
    var password_len = password.length;
    if (password_len == 0 || password_len >= my || password_len < mx) {
        document.getElementById('error6').innerHTML = "*Please enter a password of 8 to 12 characters*";
        return false;

    }
    document.getElementById('error6').innerHTML = "";
    return true;
}

function allLetter(name) {
    var letters = /^[A-Za-z]+$/;
    if (name.match(letters)) {
        document.getElementById('error2').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('error2').innerHTML = "*Username must have alphabet characters only*";
        return false;
    }
}

function ValidateEmail(email) {
    var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.match(mailformat)) {
        document.getElementById('error1').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('error1').innerHTML = "*Please enter a EmailID*";
        return false;
    }
}

function genderValidation(gender) {

    if (gender == 'Male' || gender == 'male' || gender == 'Female' || gender == 'female') {
        document.getElementById('error4').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('error4').innerHTML = "*Please enter a Gender*";
        return false;
    }
}

function login() {
    event.preventDefault();

    var email = document.getElementById("se").value;
    var password = document.getElementById("sp").value;

    const person = JSON.parse(localStorage.getItem(email));

    if (localStorage.getItem(email) == null) {
        if (email == "") {
            alert("Email required.");
            return;
        }
        alert("Email does not exist.");
        return;
    }
    else if (person.Password != password) {
        if (password == "") {
            alert("Password required.");
            return;
        }
        alert("Password does not match.");
        return;
    }
    else {
        localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(person));
        alert(email + " yor are login Now \n welcome to our website.");
        window.location.href = "./profile.html";
        document.getElementById("se").value = "";
        document.getElementById("sp").value = "";
        return;
    }
}



function forgot() {
    event.preventDefault();

    var email = document.getElementById("fe").value;

    if (localStorage.getItem(email) == null) {
        if (email == "") {
            alert("Email required.");
            return;
        }
        alert("Email does not exist.");
        return;
    }

    alert("email is send to your email check it in 24hr. \n Thanks");
    document.getElementById("fe").value = "";
}

// function loadprofile() {
//     const personwewant = JSON.parse(localStorage.getItem("CurrentLoggedInPerson"));
//     if (personwewant == null) {
//         alert("Please first login into our website to create your own ToDOList");
//     }
// }


