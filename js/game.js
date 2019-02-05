var game = {

    //Player states
    current_level: 0,
    inventory: [],
    score: 0,
    room_game: false,


    startLevel: function () {
        parse.action.clearEvents();
    },

    newGame: function () {
        this.current_level = 0;
        this.inventory = [];
        this.startLevel();
    },
    

    //updates score by taking the object value of logged in user (parsed from a string form), changes its score to match the score in game, and converting it back into a string and assigning it to the local storage value
    updatesScore: function () {
        if (localStorage["loggedInUser"] !== undefined) {
            var user = JSON.parse(localStorage[localStorage.loggedInUser]);

            user.score = this.score;

            localStorage.setItem(user.username, JSON.stringify(user));
        }
    },
    
    /* newMessage:
    creates a new event for the users to read in the event-box */
    newMessage: function (txt, from) {
        document.getElementById("event-box").innerHTML += '<div class="msg ' + from + '">' + txt + '</div>';
    },
    
    /* userInput:
    gets called whenever the player finishes typing into the textbox and after pressing enter. It takes in one argument that it then passes on to function parseText to process */
    userInput: function (msg) {
        var command_input = "";
        
        if (event.key === 'Enter') {
            command_input = msg.value; //assigns the value of user-input to command_input
            
            this.newMessage("&gt " + command_input, "user"); //prints user input onto the event box
            
            document.getElementById("user-input").value = ""; // erases the textbox
            
            parse.parseText(command_input); //calls parseText to process input
        }
    }
}