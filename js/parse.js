/* 
 * WORDS - Object
 * ====================
 * words object contains a list of words acceepted by the game and contains some additional properties for some
 * 
 */
var words = {
    verb: {
        take: ["take", "get", "pick"],
        move: ["move", "go", "walk"],
        use: ["use", "put"],
        describe: ["describe", "examine"],
        read: ["read"]
    },
    noun: {
        items: {
            key: {name: "key", description: "a small, silver key. Could it be used to open something?"},
            banana: {name: "banana", description: "it's just a banana. still fresh... I think."},
            paper: {name: "paper", description: "a sheet of paper. There might be writing on them. Try using the command 'read paper'"},
            controller: {name: "controller", description: "It's not a PS4 controller. It's not an XBox controller. It's an N64 controller."},
        },
        locations: {
            hallway: {name: "hallway"},
            room3: {name: "room3"},
            room6: {name: "room6"}
        }
    },
    SC: { //special commands
        clear: ["clear", "clr"],
        inventory: ["inventory", "inv", "i"],
        help: ["help", "h"],
        end: ["end"]
    }
}

/*
 * PARSE - Object
 * ============================
 * The heart of the entire thing.
 * action - Object: contains various functions that get called time and time again
 * checks - Object: different tester functions, mainly used for filtering
 * get - Object: getter
 * parseText(cmd): a function that processes input passed in by the user
 * 
 */
var parse = {
    
    action: {
        sendMessage: function (msg) {
            game.newMessage(msg, "comp");
        },
        clearEvents: function () {
            document.getElementById("event-box").innerHTML = "";
            this.sendMessage(stages[game.current_level].prompt);
        },
        help: function () {
            parse.action.sendMessage("'h' or 'help': Bring up this list");
            parse.action.sendMessage("describe &ltitem&gt: to learn more about a particular item");
            parse.action.sendMessage("use &ltitem&gt: to use an item");
            parse.action.sendMessage("move &ltdirection&gt: to go to an area/room");
        },
        listInventory: function () {
            let text = "you have: ";
            
            if (! game.inventory.length) {
                text += "nothing.";
            } else {
                for (var i in game.inventory) {
                    if (i == game.inventory.length - 1) {
                        text += game.inventory[i].name;
                    } else {
                        text += game.inventory[i].name + ", ";
                    }
                }
            }
            
            this.sendMessage(text);
        },
        addInventory: function (item) {
            game.inventory.push(item);
            this.sendMessage(item.name + " added to inventory");
        },
        clearInventory: function () {
            game.inventory = [];
        },
        nextLevel: function () {
            this.jumpTo(game.current_level + 1);
        },
        jumpTo: function (val) {
            game.current_level = val;
            // window.setTimeout(game.startLevel(), 5000)
            game.startLevel();
        },
        describeItem: function (item) {
            this.sendMessage(item.description);
        },
        gameEnded: function () {
            //
        }
    },
    
    get: {
        getVerb: function (str) {
            var verbs = Object.keys(words.verb);
            for (i of verbs) {
                for (j of words.verb[i]) {
                    if (str == j) {
                        return words.verb[i];
                    }
                }
            }
        },
    },

    checks: {
        isVerb: function(str) {
            var verbs = Object.keys(words.verb);
            for (i of verbs) {
                for (j of words.verb[i]) {
                    if (str == j) {
                        return true;
                    }
                }
            }
            return false;
        },
        
        isItem: function (str) {
            var items = Object.keys(words.noun.items);
            for (i of items) {
                if (str == words.noun.items[i].name) {
                    return true;
                }
            }
            return false;
        },
        
        isLocation: function (str) {
            var directions = Object.keys(words.noun.locations);
            for (i of directions) {
                if (str == words.noun.locations[i].name) {
                    return true;
                }
            }
            return false;
        },
        
        arraysAreEquals: function (arr1, arr2) {
            return (arr1.join('') == arr2.join(''));
        },
        
        checkSC: function (cmd) {
            const clr = words.SC.clear;
            const inv = words.SC.inventory;
            const hlp = words.SC.help;
            const end = words.SC.end;
            
            for (i in clr) {
                if (cmd == clr[i]) {
                    parse.action.clearEvents();
                    return true;
                };
            }
            for (i in inv) {
                if (cmd == inv[i]) {
                    parse.action.listInventory();
                    return true;
                };
            }
            for (i in hlp) {
                if (cmd == hlp[i]) {
                    parse.action.help();
                    return true;
                }
            }
            for (i in end) {
                if (cmd == end[i]) {
                    parse.action.gameEnded();
                    return true;
                }
            }
            
            return fstalse;
        }
    },
    

    parseText: function (cmd) {

        if (game.room_game) {

            stages[game.current_level].action(cmd);

        } else {
            //converts user input into an array and converts them all to lower case letters
            var arrayInput = cmd.toLowerCase().split(" ");
            
            if (arrayInput.length > 1) {
                
                //filters out input so that it only contains the accepted set of strings
                arrayInput = arrayInput.filter(function (a) {
                    if (parse.checks.isVerb(a) || parse.checks.isItem(a) || parse.checks.isLocation(a)) {return true;}
                })
                
                //if verb is describe
                for (var i in words.verb.describe) {
                    if (arrayInput[0] == words.verb.describe[i]) {
                        for (j in game.inventory) {
                            if (game.inventory[j].name == arrayInput[1]) {
                                parse.action.describeItem(game.inventory[j]);
                            }
                        }
                    }
                }
                
                arrayInput[0] = this.get.getVerb(arrayInput[0])[0];

                
                var levelScenes = stages[game.current_level].scenes;
                
                //loops through the scenes to check whether commad satisfies any conditions.
                for (var i of Object.keys(levelScenes)) {
                    
                    if (parse.checks.arraysAreEquals(levelScenes[i].cond, arrayInput) && levelScenes[i].prereq()) {
                        
                        this.action.sendMessage(levelScenes[i].response);

                        game.score += levelScenes[i].points;

                        console.log("in here");
                        game.updatesScore();
                        
                        levelScenes[i].action();
                        break;
                        
                    }
                }
                
            } else {
                if (! parse.checks.checkSC(arrayInput)) {
                    this.action.sendMessage("command not understood")
                }
            }
        }
    }
}