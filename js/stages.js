/*
 * STAGES - Array
 * ================
 * Each index of the array consists of a level object. This information gets passed through the parseText function
 * 
 */

const stages = [
    {
        level: 0,
        prompt: "You are standing inside a small room with a locked door on the other end. A table sits between you and the door with a key and a piece of paper laying atop it. Try to pick up the paper.",
        scenes: {
            a: {
                cond: ["take", "key"],
                prereq: function () {if (game.inventory.indexOf(words.noun.items.key) < 0) {return true;} else {return false;}},
                
                response: "You take the key and pocket it. It feels cold to the touch.",
                points: 30,
                action: function () {
                    parse.action.addInventory(words.noun.items.key);
                }
            },
            b: {
                cond: ["use", "key"],
                prereq: function () {for (i in game.inventory) {if (game.inventory[i].name == "key") {return true;}} return false;},
                
                response: "You slot the key into the door. The lock clicks open easily and the door swings open.",
                points: 30,
                action: function () {
                    parse.action.clearInventory();
                    parse.action.nextLevel();
                }
            },
            c: {
                cond: ["take", "paper"],
                prereq: function () {if (game.inventory.indexOf(words.noun.items.paper) < 0) {return true;} else {return false;}},
                
                response: "you see some writing on the piece of paper and went to pick it up. Try using 'read' to see its content.",
                points: 0,
                action: function() {
                    parse.action.addInventory(words.noun.items.paper);
                }
            },
            d: {
                cond: ["read", "paper"],
                prereq: function () {for (i in game.inventory) {if (game.inventory[i].name == "paper") {return true;}} return false;},
                
                response: "The paper reads: 'congratulations on being able to read this paper! Nearly everything in this game is done by passing a command of sorts to advance. For this level, try to use that key from the table<br>P.S. 'help' is also a pretty useful command to start with'",
                points: 10,
                action: function () {
                    //
                }
            }
        }
    },
    
    {
        level: 1,
        prompt: "You opened the door and walked in to be greeted by another room not unlike the last. There's another door on the other end, except now you don't see any locks, or knobs for that matter. <br> You do see another table however, and another piece of paper lying on it.",
        scenes: {
            a: {
                cond: ["take", "paper"],
                prereq: function () {if (game.inventory.indexOf(words.noun.items.key) < 0) {return true;} else {return false;}},
                
                response: "You take the paper.",
                points: 10,
                action: function () {
                    parse.action.addInventory(words.noun.items.paper);
                }
            },
            b: {
                cond: ["read", "paper"],
                prereq: function () {for (i in game.inventory) {if (game.inventory[i].name == "paper") {return true;}} return false;},
                
                response: "It reads:<br> 'Motion activated<br>Leads to hallway'",
                points: 30,
                action: function () {
                    //
                }
            },
            c: {
                cond: ["move", "hallway"],
                prereq: function () {return true;},
                
                responses: "You make your way to the door and it slides open without sound.",
                points: 100,
                action: function () {
                    parse.action.nextLevel();
                }
            }
        }
    },
    
    {
        level: 2,
        prompt: "You make your way out onto the hallway and the door quickly shuts itself. You hear the soft click and you know that it's locked itself. The hallway is empty save for two doors on opposite ends, one is marked as 'room3' and the other 'room6'. Which way would you like to go?",
        scenes: {
            a: {
                cond: ["move", "room3"],
                prereq: function () {return true;},
                
                response: "room3 does look a bit more appealing to you",
                points: 0,
                action: function () {
                    game.room_game = true;
                    parse.action.nextLevel();
                }
            },
            b: {
                cond: ["move", "room6"],
                prereq: function () {return true;},
                
                response: "room6 seems like the way to go",
                points: 0,
                action: function() {
                    game.current_level = 6;
                    game.startLevel();
                }
            }
        }
    },
    {
        level: 3,
        prompt: "Inside the room you are greeted by an owl. 'I am the guardian of this room,' the owl hoots. 'Answer my riddle and you shall pass:<br>What 8 letter word can have a letter taken away and it still makes a word. Take another letter away and it still makes a word. Keep on doing that until you have one letter left. What is the word?'",
        
        action: function (msg) {
            if (msg == "starting") {
                parse.action.nextLevel();
                game.room_game = false;
                game.score += 100;
            } else {
                parse.action.sendMessage("INCORRECT!");
            }
        }
    },
    {
        level: 4,
        prompt: "The owl lets you pass. You honestly don't care much. Exit back to the hallway to continue",
        scenes: {
            a: {
                cond: ["move", "hallway"],
                prereq: function () {return true},
                
                response: "You exit to the hallway",
                points: 150,
                action: function () {
                    parse.action.nextLevel();
                }
            }
        }
    },
    {
        level: 5,
        prompt: "Congratulations! You have finished the game!."
    },
    {
        level: 6,
        prompt: "The door closes behind you. There's a single controller connected to a box that, in turn, is connected to a tv",
        
        scenes: {
            a: {
                cond: ["take", "controller"],
                prereq: function () {return true},
                
                response: "You sit down in front of the tv to pick up the controller. It feels oddly nostalgic.",
                points: 0,
                action: function () {
                    game.room_game = true;
                    stages[6].scenes.startTV("start");
                }
            },
            //gets called when user tries to take the controller
            startTV: function (x) {
                //
                switch (x) {
                    case "start":
                    document.getElementById("event-box").innerHTML = '<canvas id="tv"></canvas>';
                    
                    var canvas = document.getElementById("tv");
                    var context = canvas.getContext("2d");
                    
                    var dimensions = {
                        width: document.getElementById("event-box").clientWidth - 100,
                        height: document.getElementById("event-box").clientHeight - 100,
                    }
                    canvas.width = dimensions.width;
                    canvas.height = dimensions.height;
                
                    
                    function drawCircle() {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        
                        //background
                        context.fillStyle = "#232324";
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        
                        //draw circle
                        context.beginPath();
                        
                        var radius = 40;
                        context.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2, false);
                        context.closePath();
                        
                        //circle color
                        context.fillStyle = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);
                        context.fill();
                    }
                    // drawCircle();
                    setInterval(drawCircle, 200);
                    
                    // var dimensions = {
                    //     width: 200,
                    //     height: 200,
                    // }
                    // canvas.width = dimensions.width;
                    // canvas.height = dimensions.height;
                    
                    // var maxNum = 30;
                    // var particles = [];
                    
                    // function randomizeColor() {
                    //     var c = Math.floor((Math.random() * 255));
                    //     return "rgb(" + c + ", " + c + ", " + c + ")";
                    // }
                    
                    // for (var i = 0; i < maxNum; i++) {
                    //     particles.push( {
                    //         xPos: Math.random() * dimensions.width,
                    //         yPos: Math.random() * dimensions.height,
                    //         rad: Math.random() * 5 + 1,
                    //         density: Math.random() * maxNum,
                    //         colour: randomizeColor()
                    //     })
                    // }
                    
                    // function animateScreen() {
                    //     context.clearRect(0, 0, dimensions.width, dimensions.height);
                    
                    //     for (var i = 0; i < maxNum; i++) {
                    //         var p = particles[i];
                    
                    //         context.beginPath();
                    
                    //         context.fillStyle = p.color;
                    
                    //         context.moveTo(p.xPos, p.yPos);
                    
                    //         context.fill();
                    //     }
                    //     update();
                    // }
                    
                    // function update() {
                    //     for (i = 0; i < maxNum; i++) {
                    //         particles[i].yPos -= 10;
                    //     }
                    // }
                    
                    // setInterval(animateScreen, 30);
                    
                    
                    
                    break;
                    
                    case "end":
                    game.room_game = false;
                    parse.action.jumpTo(2);
                    game.startLevel();
                    break;
                    default:
                    //
                }
                
            }
        }
    },
]