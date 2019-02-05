function refreshTable() {
    
    //allUsers is an array that will contain all the user objects from localStorage
    var allUsers = [];

    //element IDs
    const userPositionIds = ["u-1", "u-2", "u-3", "u-4", "u-5"];
    const scorePositionIds = ["s-1", "s-2", "s-3", "s-4", "s-5"];

    //push contents from localStorage to allUsers
	var getKey = Object.keys(localStorage);
	for (i = 0; i < getKey.length; i++ ) {
			allUsers.push( localStorage[getKey[i]] );
    }

    //filters out non objects (gets rid of loggedInUser value)
    allUsers = allUsers.filter( function (x) {return x.indexOf("{") >= 0});
    
    //converts values of allUsers from strings to objects
	allUsers = allUsers.map( function (x) {return JSON.parse(x)});
    
    //sort by score
    allUsers.sort( function (x, y) {
        return x.score - y.score;
    })

    //displays scores and usernames on rankings table
    for (i in allUsers.reverse()) {
        document.getElementById(userPositionIds[i]).innerHTML = allUsers[i].username;
        document.getElementById(scorePositionIds[i]).innerHTML = allUsers[i].score;
    }
}