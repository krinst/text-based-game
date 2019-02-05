//Called when registering
function registration() {
    //create user object
    var userObject = {};
    userObject.username = document.getElementById("registerUsername").value;
    userObject.password = document.getElementById("registerPassword").value;
	userObject.score = 0;
    
    //makes sure username hasn't been used yet
    /* if (localStorage[username] === undefined) {
        //store user in the form of stringed object
        localStorage[userObject.username] = JSON.stringify(userObject);
        console.log("Registered" + localStorage[userObject]);
        
        //inform user of result
        document.getElementById("registerMessage").innerHTML = "<i>Registration successful.</i>";
    } else {
        document.getElementById("registerMessage").innerHTML = "Register failed: username is taken";
    } */
	
	localStorage[userObject.username] = JSON.stringify(userObject);
    console.log("Registered" + localStorage[userObject]);
        
    //inform user of result
    document.getElementById("registerMessage").innerHTML = "Registration successful.";
}


//checkLogin is called on page load
function checkLogin() {
    
    if (localStorage.loggedInUser !== undefined) {
        //get user details
        var userObject = JSON.parse(localStorage[localStorage.loggedInUser]);
        
        //show logged in user
        document.getElementById("showUsername").innerHTML = "Logged in as " + userObject.username;
    }
    
}


//Called when login button is pressed
function login() {
    //get username
    var username = document.getElementById("loginUsername").value;
    
    //checks username validity
    if (localStorage[username] === undefined) { //if username doesn't exist in save
    document.getElementById("loginMessage").innerHTML = "Username not recognized";
    return;
    
} else { //checks password
    var usrObj = JSON.parse(localStorage[username]);
    var password= document.getElementById("loginPassword").value;
    
    //if password is correct
    if (password === usrObj.password) {
        document.getElementById("showUsername").innerHTML = usrObj.username + " logged in";
        document.getElementById("loginMessage").innerHTML = "";
        localStorage.loggedInUser = usrObj.username;
    } else {
        document.getElementById("loginMessage").innerHTML = "Incorrect password";
    }
    
}
}