<?php

//imports common.php and run printStartingDoc to output the html code up to <main>
include ('../php/common.php');
printStartingDoc("ranks");

?>

        <!-- TODO: Actually get the rankings page working +
        have javascript autonumber the cells for a cleaner look(?) +
        make top 10(?) -->
    
    <!-- rankings table -->
    <table class="block-center">
        <!-- table header - column names -->
            <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Score</th>
            </tr>
    
            <!-- table data -->
            <tr>
            <td>1</td> <!-- TODO: make own image -->
            <td id="u-1">AAA</td>
            <td id="s-1">000</td>
            </tr>
    
            <tr>
            <td>2</td>
            <td id="u-2">AAA</td>
            <td id="s-2">000</td>
            </tr>
    
            <tr>
            <td>3</td>
            <td id="u-3">AAA</td>
            <td id="s-3">000</td>
            </tr>
    
            <tr>
            <td>4</td>
            <td id="u-4">AAA</td>
            <td id="s-4">000</td>
            </tr>
    
            <tr>
            <td>5</td>
            <td id="u-5">AAA</td>
            <td id="s-5">000</td>
        </tr>
    
    </table>

	<script src="../js/ranks.js"></script>

<?php

//closing tags
outputFooter();

?>