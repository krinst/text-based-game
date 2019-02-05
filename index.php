<?php
//common.php contains code for functions printStartingDoc and outputFooter
include ('php/common.php');
printStartingDoc("index");
?>


<!--code starts after opening <main> tag;
    page contains intructions for how to play the game-->
<h2>About the Game</h2>

<p>This is an interactive fiction game where you play a character onboard a dying ship.</p>

<h2>How to Play</h2>

<p>The commands change as the game progresses, and you'll learn new commands
as you go along. Most is common sense and figuring out all the commands is part of the
fun. What's a puzzle game if the solutions are all laid out already? If you're that
worried, know that a tutorial is provided at the beginning of the game, but here
are some helpful commands to help you get a head start:</p>


<ul class="vertical-margins"> <!-- vertical-margins give space between li lines so the
code isn't cramped -->

    <li><code>describe <i>&lt item || room &gt</i> </code>: to learn more about a particular
    item or room</li>

    <li><code>exit</code>: to leave a room (if possible)</li>

    <li><code>use <i>&lt item &gt</i></code>: to use an item</li>
    
</ul>


<?php
// closing tags
outputFooter();
?>