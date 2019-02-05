<?php

//imports common.php and run printStartingDoc to output the html code up to <main>
include ('../php/common.php');
printStartingDoc("login");

?>

<!-- LOG IN -->
<div>
    <!-- TODO: add action and method property to form; link with username/password storage file -->
    <form id="loginForm" onsubmit="login()">
        <h2>Log In</h2>

        <div class="username">
            <label for="loginUsername"> Username: </label>
            <input type="text" name="username" id="loginUsername" required>
        </div>

        <div class="password">
            <label for="loginPassword"> Password: </label>
            <input type="password" name="password" id="loginPassword" required>
        </div>

        <div class="button">
            <button type="submit" class="skewed-buttons"> Log In </button>
        </div>

        <!-- <label for="loginUsername"> Username: </label>
        <input type="text" name="username" id="loginUsername">

        <label for="loginPassword"> Password: </label>
        <input type="password" name="password" id="loginPassword">

        <button type="submit" class="skewed-buttons"> Log In</button> -->
        <!-- TODO? add forgot password option -->
    </form>
    <p id="loginMessage"></p>
</div>

<!-- REGISTER -->
<div>

    <!-- TODO: add action and method property to form and connect it to a local storage -->
    <form id="registerForm" onsubmit="registration()">
        <h2>Register</h2>

        <div class="username">
            <label for="registerUsername"> Username: </label>
            <input type="text" name="username" id="registerUsername" required>
        </div>

        <div class="password">
            <label for="registerPassword"> Password: </label>
            <input type="password" name="password" id="registerPassword" required>
        </div>
        
        <div class="button">
            <button type="submit" class="skewed-buttons"> Register </button>
        </div>

        <!-- <label for="registerUsername"> Username: </label>
        <input type="text" name="username" id="registerUsername">

        <label for="registerPassword"> Password: </label>
        <input type="password" name="password" id="registerPassword">

        <button type="submit" class="skewed-buttons"> Register </button> -->
        <!-- TODO? add a "confirm password" field -->
    </form>
    <p id="registerMessage"></p>

</div>

<script src="../js/login.js"></script>

<?php

//closing tags
outputFooter();

?>