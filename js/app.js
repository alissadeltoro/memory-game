/*
 * Create a list that holds all of your cards
 */
function cardList() {
    let list = document.getElementsByClassName("deck");
    //console.log(list);
    let cardLi = Array.from(list.item(0).children);
    let newCardLi = shuffle(cardLi);
    list.item(0).innerHTML = "";
    for (const item of newCardLi) {
        list.item(0).appendChild(item);
    }
}

cardList();

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Include a refresh of the page if you click on the refresh button

// Event listeners added to each card

// Display the card's symbol when card is clicked


function cardClicked() {
    var card = document.getElementsByClassName('card');
    for (var i = 0; i < card.length; i++) {
        card[i].addEventListener("click", showCard);
    }
}

// Add card to a *list* of "open" cards
var openList = [];
function showCard(event) {
    // Change card to show
    event.target.classList.add("open", "show");
    console.log(event);
    let newOpen = event.target;
    openList.push(newOpen);
    console.log(openList);
    isMatch(openList);
}

// If the list already has a card, check to see if the 2 cards match
function isMatch(openList) {
    console.log(openList.length);

    if (openList.length == 2) {
        let firstCard = openList[0];
        let secondCard = openList[1];

        if (firstCard.children[0].className == secondCard.children[0].className) {
            // Interaction of green starry cards
            firstCard.classList.add("bounce", "match");
            secondCard.classList.add("bounce", "match");

            window.setTimeout(function () {
                // Flip card back over
                firstCard.classList.remove("open", "bounce");
                secondCard.classList.remove("open", "bounce");
            }, 1000);
            console.log(firstCard.classList);
        }
        else {
            // Have cards undergo no match process
            noMatch(firstCard, secondCard);
        }
        addMoves(firstCard);
        openList = openList.splice(0, 2);
        
    }
}

function noMatch(firstCard, secondCard) {
    // Interaction of red shaky card
    console.log(firstCard);
    firstCard.classList.add("bounce", "noMatch");
    secondCard.classList.add("bounce", "noMatch");
    window.setTimeout(function () {
        // Flip card back over
        firstCard.classList.remove("open", "show", "bounce", "noMatch");
        secondCard.classList.remove("open", "show", "bounce", "noMatch");
    }, 1000);
    console.log(firstCard.classList);

}

let moves = 0;
function addMoves(firstCard) {
    // Add number of moves to a counter
    let tally = document.getElementsByClassName("moves");
    moves++;
    console.log(moves);
    tally.item(0).innerHTML = "" + moves;
    console.log(tally);

    // Update stars based on number of moves
    let stars = document.getElementsByClassName("fa-star");
    console.log(stars);
    console.log(stars.item(0).classList);

    stars.item(0).classList.replace("fa-star", "fa-star-o");

    console.log(firstCard.classList);
    // Add to completed game if cards are a match
    if (firstCard.classList.contains("match")) {
        isCompletedGame();
    }
}

let completion = 8;
function isCompletedGame() {
    completion--;
    console.log(completion);
    if (completion == 0) {
        
        var elem = document.getElementById("completeGame");
        console.log(elem);
        elem.style.display = "block";

        // Modal & refresh the game
        return console.log("End Game");
    }
}

cardClicked();