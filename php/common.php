<?php

/* printStartingDoc($curPage): is a function that creates the opening document of each webpage,
starting from creating the doctype all up until the opening main tag (includes head, opening
body and header tag). $curPage takes in an argument that varies per page which matches  */

function printStartingDoc($curPage) {

    // Multidimensional array of page names and title
    $pages = [
        ["index", "Information"],
        ["game", "Game"],
        ["login", "Log In / Register"],
        ["ranks", "Rankings"]
    ];
    
    
    //finds the current page by comparing input with $pages array
    $findingPage = true;
    $x = 0;
    while ($findingPage && $x < count($pages)) {

        if ($curPage == $pages[$x][0]) {
            $curPage = $pages[$x];
            $findingPage = false;
        } else {
            $x++;
        }
        
    }
    
    //Print document openings and <head> tag
    echo '<!DOCTYPE html>';
    echo '<html>';
    echo '<head>';
    echo '<title>' . $curPage[1] . '</title>';
    
    /* creates link with stylesheet style.css, depending on
        the page, the address changes (index.php is stored in
        the main folder while other pages are all stored in
        the "webpages" folder) */
//    if ($curPage[0] == "index") {
//        echo '<link rel="stylesheet" href="css/style.css">';
//    } else {
//        echo '<link rel="stylesheet" href="../css/style.css"';
//    }
    echo '<link rel="stylesheet" href="';
    if ($curPage[0] != "index") {
        echo '../';
    }
    echo 'css/style.css">';

    echo '</head>';
    
    //Opening body tag and header
    //echo '<body>';
	switch ($curPage[0]) {
		case ("ranks"): echo '<body onload="refreshTable()">'; break;
		case ("game"): echo '<body onload="game.newGame()">'; break;
		case ("login"): echo '<body onload="checkLogin()">'; break;
		default: echo '<body>';
	}
    echo '<div class="grid-container">';
    echo '<!-- HEADER: contains page name and navigations -->';
    echo '<header>';
    echo '<h1>' . $curPage[1] . '</h1>';
    echo '<nav>';
    echo '<ul>';

    //prints the navigation section by looping through the $pages array
    for ($i = 0; $i < count($pages); $i++) {
        
        //opening list tag
        echo '<li class="menu-items skewed-buttons ';
        if ($pages[$i] == $curPage) { // add a selected class for the menu item when it is the current page
            echo ' selected';
        }
        echo '">';

        //opening hyperlink tag
        echo '<a href="';
        if ($pages[$i] == $curPage) { // If menu item is showing current page, don't add a link
            echo '#">';

        } elseif (!$i) { //links to index.php (pos:0 in array) located in a different folder
            echo '../index.php">';

        } else {

            
            if ($curPage[0] == "index") { //if the current page is index.php, move to link to other pages in folder webpages
                echo 'webpages/';
            }

            echo $pages[$i][0] . '.php">';

        }
        
        echo $pages[$i][1] . '</a>';
        
        //closing li tag.
        echo '</li>';
    }

    //closing header tags
    echo '</ul>';
    echo '</nav>';
	echo '<p id="showUsername"></p>';
    echo '</header>';

    //log-in page has an id in the main tag
    echo '<!-- Opening main tags -->';
    if ($curPage[0] == $pages[2][0]) {
        echo '<main id="login-page">';
    } else {
        echo '<main>';
    }
}

//outputFooter(): OUTPUTS FOOTER AND CLOSING TAGS
function outputFooter() {
    echo '</main>';
    echo '<!-- FOOTER: name and link to html report -->';
    echo '<footer>';
    echo '<p>Afka Naela Pranoto (M00647087) | <a href="html-report.html">HTML Report</a></p>';
    echo '</footer>';
    echo '</footer>';
    echo '</div>';
    echo '</body>';
    echo '</html>';
}
?>