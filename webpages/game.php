<?php

//imports common.php and run printStartingDoc to output the html code up to <main>
include ('../php/common.php');
printStartingDoc("game");

?>

<div id="game-screen">
    <div id="event-box"></div>
    <div id="input">
        &gt; <input type="text" id="user-input" onkeydown="game.userInput(this)">
    </div>
</div>

<script src="../js/game.js"></script>
<!-- <script src="words.js"></script> -->
<!-- <script src="player.js"></script> -->
<script src="../js/stages.js"></script>
<script src="../js/parse.js"></script>


<?php

//closing tags
outputFooter();

?>