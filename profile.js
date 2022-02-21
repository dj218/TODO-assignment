const personwewant = JSON.parse(localStorage.getItem("CurrentLoggedInPerson"));
if (personwewant == null) {
    window.location.href = "./register.html";
    alert("Please first login into our website to create your own ToDOList");
}
document.getElementById("myspan").textContent = personwewant.firstName;
document.getElementById("myspan2").textContent = personwewant.Email;
window.addEventListener('DOMContentLoaded', () => {
    const recentImageDataUrl = localStorage.getItem("CurrentLoggedInPersonPhoto");

    if (recentImageDataUrl) {
        document.querySelector("#imageid").setAttribute("src", recentImageDataUrl);
    }

})

function toggleRdate() {
    var myDiv = document.getElementById('RDIV');
    var displaySetting = myDiv.style.display;

    if (displaySetting == 'block') {
        myDiv.style.display = 'none';
    }
    else {
        myDiv.style.display = 'block';
    }
}

te.value = personwewant.Email;
tf.value = personwewant.firstName;
tl.value = personwewant.lastName;
ta.value = personwewant.Address;
tg.value = personwewant.Gender;
tp.value = personwewant.Password;
tc.value = personwewant.Password;


function newElement() {
    event.preventDefault();

    var title = document.getElementById("myInput").value;
    var category = document.getElementById("myCategory").value;
    var date = document.getElementById("inputDate").value;
    var rdate = document.getElementById("ReminderDate").value;
    var ipublic = $("#inputPublic").is(":checked") ? "true" : "false";

    if (formValidation(title, category, date)) {

        var finaltodo = personwewant.Email;
        const obj = { Title: title, Category: category, Date: date, Rdate: rdate, Ipublic: ipublic, IsComplete: "false" };
        document.querySelector("#rd").addEventListener("change", function () {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                obj.pict = reader.result;
            });

            reader.readAsDataURL(this.files[0]);
        });
        let result = "todolist" in personwewant;


        if (result == false) {
            const arr = new Array();
            arr.push(obj);
            personwewant.todolist = arr;
        }
        else {
            const arr = personwewant.todolist;
            var i = arr.length;
            while (i--) {
                if (arr[i] && JSON.stringify(arr[i]) === JSON.stringify(obj)) {
                    alert("This Item already exist in TODO list");
                    return false;
                }
            }
            arr.push(obj);
            personwewant.todolist = arr;
        }


        localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
        localStorage.setItem(finaltodo, JSON.stringify(personwewant));
        const x = JSON.parse(localStorage.getItem(finaltodo));
        window.location.href = "./todolist.html";
    }
    return false;
}

function formValidation(title, category, date, rdate) {
    var l1 = title.length;
    if (l1 == 0) {
        alert("Title is not there");
        return false;
    }

    var l2 = category.length;
    if (l2 == 0) {
        alert("Category is not there");
        return false;
    }

    var l3 = date.length;
    if (l3 == 0) {
        alert("Completion Date is not there");
        return false;
    }

    var d1 = new Date(date);
    var d2 = new Date(rdate);
    if (d1 < d2) {
        alert("Reminder date is greater than Completion Date .... it should be less than Completion Date");
        return false;
    }

    return true;
}

function resetthevalues() {

    event.preventDefault();

    var firstname = document.getElementById("tf").value;
    var lastname = document.getElementById("tl").value;
    var address = document.getElementById("ta").value;
    var password = document.getElementById("tp").value;
    var confirmpassword = document.getElementById("tc").value;
    var gender = document.getElementById('tg').value;

    if (firstname == "") {
        document.getElementById('error2').innerHTML = "*Username must have alphabet characters only*";
        tf.value = personwewant.firstName;
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
    if (gender == "Male" || gender == "Female" || gender == "male" || gender == "female") {

        document.getElementById('error5').innerHTML = "";
    }
    else {
        document.getElementById('error5').innerHTML = "*Please enter a gender*";
        return false;
    }
    if (address == "") {
        document.getElementById('error4').innerHTML = "*Please enter a address*";
        return false;
    }
    else {
        document.getElementById('error4').innerHTML = "";
    }
    if (password == "") {
        document.getElementById('error6').innerHTML = "*Please enter a password of 8 to 12 characters*";
        return false;
    }
    else {
        document.getElementById('error6').innerHTML = "";
    }
    if (confirmpassword == "") {
        document.getElementById('error7').innerHTML = "*Please enter a password of 8 to 12 characters*";
        return false;
    }
    else {
        document.getElementById('error7').innerHTML = "";
    }

    if (password == confirmpassword) {
        if (passwordValidation(password, 8, 12)) {
            if (allLetter(firstname) && allLetter(lastname)) {
                if (genderValidation(gender)) {
                    personwewant.firstName = firstname;
                    personwewant.lastName = lastname;
                    personwewant.Gender = gender;
                    personwewant.Address = address;
                    personwewant.Password = password;
                    document.getElementById('error7').innerHTML = "";
                }

            }
        }
    }
    else {
        document.getElementById('error7').innerHTML = "*Password and re write passwords should be same*";
        return false;
    }
    var email = personwewant.Email;
    localStorage.setItem("CurrentLoggedInPerson", JSON.stringify(personwewant));
    localStorage.setItem(email, JSON.stringify(personwewant));

    document.getElementById("myspan").textContent = personwewant.firstName;
    document.getElementById("myspan2").textContent = personwewant.Email;
    console.log(personwewant);
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
        document.getElementById('error3').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('error3').innerHTML = "*Username must have alphabet characters only*";
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

function logout() {
    alert("Thanks for using our website");
    localStorage.removeItem("CurrentLoggedInPerson");
    window.location.href = "./register.html";
}

function loggedIN() {
    alert("You are already registered and logged in .... First logout to register more or log in");
    return;
}