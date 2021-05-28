//global variables
let hasBlackJack = false;
let tieLoss = false;
let dealerRole = false;
let checker = false;
let roleChance = 0;
let cards = [];
let dealerCards = [];
let dealerSum = 0;
let wager = 0;
let playerSum = 0;
let isAlive = true;
let dealerMessage;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let dealerTotalEl = document.getElementById("dealerTotal-el");
let playerChipsEl = document.getElementById("playerChips-el");
let wagerMessage = document.getElementById("wagerMessage-el");
let stayMessage = document.getElementById("stayMessage-el");
let cardImage = document.getElementById("img1-el");
let dealerImage = document.getElementById("img2-el");
let moneyImage = document.getElementById("moneyImage-el");
let jack = false;
let queen = false;
let king = false;
let player = {
    money: 1000
};

document.getElementById("hit-btn").disabled = true;
document.getElementById("stay-btn").disabled = true;


// draws a card
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;

    // logic to turn face cards to 10 and ace to 11 while keeping same picture
    if (randomNumber === 10) {
        return 10;
    } else if (randomNumber === 11) {
        jack = true;
        return 10;
    } else if (randomNumber === 12) {
        queen = true;
        return 10;
    } else if (randomNumber === 13) {
        king = true;
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

// Starts a new game
function startNewGame() {

    // resetting face pics
    jack = false;
    queen = false;
    king = false;

    //generating player cards
    let firstPlayerCard = getRandomCard();
    let secondPlayerCard = getRandomCard();
    cards = [firstPlayerCard, secondPlayerCard];

    //generating dealers cards
    let firstDealerCard = getRandomCard();
    let secondDealerCard = getRandomCard();
    dealerCards = [firstDealerCard, secondDealerCard];

    //getting the sums 
    playerSum = firstPlayerCard + secondPlayerCard;
    dealerSum = firstDealerCard + secondDealerCard;

    //re-enabling the buttons
    document.getElementById("hit-btn").disabled = false;
    document.getElementById("stay-btn").disabled = false;

    //clears the cards
    clearCards();

    //run render
    renderRole();

    stayMessage.innerHTML = "";

    messageEl.innerHTML = "Do you want to hit or stay?";

    //displaying heading
    let = heading1 = document.getElementById("playerHeading-el");
    let heading2 = document.getElementById("dealerHeading-el");

    heading1.innerHTML = "Your Cards";
    heading2.innerHTML = "Dealer Cards";

    renderMoney();
}

function renderRole() {

    //displaying sums
    sumEl.textContent = "Player Sum: " + playerSum;
    dealerTotalEl.textContent = "Dealer Sum: " + dealerSum;

    //checking player total
    if (playerSum > 21) {
        messageEl.textContent = "BUST";
        player.money = player.money - wager;
        checker = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stay-btn").disabled = true;
        isAlive = false;
    } else if (playerSum == 21) {
        messageEl.textContent = "BLACKJACK!";
        player.money = player.money + (wager * 2);
        checker = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stay-btn").disabled = true;
        hasBlackJack = true;
    } else if (dealerSum > 21) {
        messageEl.textContent = "Dealer busted. You win!";
        player.money = player.money + (wager * 1.5);
        checker = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stay-btn").disabled = true;
    } else if (dealerSum == 21) {
        messageEl.textContent = "Dealer has BlackJack! You lose";
        player.money = player.money - wager;
        checker = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stay-btn").disabled = true;
        isAlive = false;
    } else if (dealerSum > 21 && playerSum > 21) {
        messageEl.textContent = "You both lose!"
        player.money = player.money - (wager / 2);
        checker = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stay-btn").disabled = true;
        tieLoss = true;
    } else if (dealerSum == 21 & playerSum == 21) {
        messageEl.textContent = "Both have BlackJack!"
        player.money = player.money + (wager * 1.5);
        checker = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stay-btn").disabled = true;
    } else {
        isAlive = true;
        hasBlackJack = false;
        checker = false;
    }

    //Showing money owned
    playerChipsEl.textContent = "$" + player.money;

    // Showing players cards img
    for (i = 0; i < cards.length; i++) {
        if (cards[i] === 11) {
            cardImage.innerHTML += '<img class="card1" src="img/card14.png" alt="test">';
        } else if (cards[i] === 2) {
            cardImage.innerHTML += '<img class="card1" src="img/card2.png" alt="test">';
        } else if (cards[i] === 3) {
            cardImage.innerHTML += '<img class="card1" src="img/card3.png" alt="test">';
        } else if (cards[i] === 4) {
            cardImage.innerHTML += '<img class="card1" src="img/card4.png" alt="test">';
        } else if (cards[i] === 5) {
            cardImage.innerHTML += '<img class="card1" src="img/card5.png" alt="test">';
        } else if (cards[i] === 6) {
            cardImage.innerHTML += '<img class="card1" src="img/card6.png" alt="test">';
        } else if (cards[i] === 7) {
            cardImage.innerHTML += '<img class="card1" src="img/card7.png" alt="test">';
        } else if (cards[i] === 8) {
            cardImage.innerHTML += '<img class="card1" src="img/card8.png" alt="test">';
        } else if (cards[i] === 9) {
            cardImage.innerHTML += '<img class="card1" src="img/card9.png" alt="test">';
        } else if (cards[i] === 10 && jack === true) {
                cardImage.innerHTML += '<img class="card1" src="img/card11.png" alt="test">';
        } else if (cards[i] === 10 && queen === true) {
                cardImage.innerHTML += '<img class="card1" src="img/card12.png" alt="test">';
        } else if (cards[i] === 10 && king === true) {
                cardImage.innerHTML += '<img class="card1" src="img/card13.png" alt="test">';
        } else {
                cardImage.innerHTML += '<img class="card1" src="img/card10.png" alt="test">';
            }
        }

        // Showing dealer cards img
    for (i = 0; i < dealerCards.length; i++) {
        if (dealerCards[i] === 11) {
            dealerImage.innerHTML += '<img class="card1" src="img/card14.png" alt="test">';
        } else if (dealerCards[i] === 2) {
            dealerImage.innerHTML += '<img class="card1" src="img/card2.png" alt="test">';
        } else if (dealerCards[i] === 3) {
            dealerImage.innerHTML += '<img class="card1" src="img/card3.png" alt="test">';
        } else if (dealerCards[i] === 4) {
            dealerImage.innerHTML += '<img class="card1" src="img/card4.png" alt="test">';
        } else if (dealerCards[i] === 5) {
            dealerImage.innerHTML += '<img class="card1" src="img/card5.png" alt="test">';
        } else if (dealerCards[i] === 6) {
            dealerImage.innerHTML += '<img class="card1" src="img/card6.png" alt="test">';
        } else if (dealerCards[i] === 7) {
            dealerImage.innerHTML += '<img class="card1" src="img/card7.png" alt="test">';
        } else if (dealerCards[i] === 8) {
            dealerImage.innerHTML += '<img class="card1" src="img/card8.png" alt="test">';
        } else if (dealerCards[i] === 9) {
            dealerImage.innerHTML += '<img class="card1" src="img/card9.png" alt="test">';
        } else if (dealerCards[i] === 10 && jack === true) {
                dealerImage.innerHTML += '<img class="card1" src="img/card11.png" alt="test">';
        } else if (dealerCards[i] === 10 && queen === true) {
                dealerImage.innerHTML += '<img class="card1" src="img/card12.png" alt="test">';
        } else if (dealerCards[i] === 10 && king === true) {
                dealerImage.innerHTML += '<img class="card1" src="img/card13.png" alt="test">';
        } else {
                dealerImage.innerHTML += '<img class="card1" src="img/card10.png" alt="test">';
            }
        }

        renderMoney();
    }

// gives player another card
function hit() {
    
    if (isAlive === true && hasBlackJack === false) {
        let playerNewCard = getRandomCard()
        cards.push(playerNewCard);
        playerSum += playerNewCard;
    }

    if (dealerSum < 17) {
        let dealerNewCard = getRandomCard();
        dealerCards.push(dealerNewCard);
        dealerSum += dealerNewCard;
        stayMessage.innerHTML = "The dealer draws a card as well.";
        disabler();
    } else if (dealerSum >= 17) {
        roleChance =  Math.floor(Math.random() * 2) + 1;
        if (roleChance == 1) {
            let roleCard = getRandomCard();
            dealerCards.push(roleCard);
            dealerSum += roleCard;
            dealerRole = true;
            stayMessage.innerHTML = "The dealer chose to draw another card.";
            disabler();
        } else {
            stayMessage.innerHTML = "The dealer chose to stay."
            disabler();
        }
    }    
    
    //clears cards
    cardImage.innerHTML = "";
    dealerImage.innerHTML = "";

    renderRole();
    noWinner();
}

// stay function
function stay() {

    messageEl.textContent = "You chose to stay";

    if (dealerSum < 17) {
        let newCard = getRandomCard();
        dealerCards.push(newCard);
        dealerSum += newCard;
        stayMessage.innerHTML = "The dealer drew another card.";
        disabler();
        renderRole();
    } else {
        let roler =  Math.floor(Math.random() * 3) + 1;
        if (roler === 1) {
            let newCard = getRandomCard();
            dealerCards.push(newCard);
            dealerSum += newCard;
            disabler();
            renderRole();
            stayMessage.innerHTML = "The dealer chose to draw a card.";
        } else {
            stayMessage.innerHTML = "The dealer chose to stay";
            disabler();
            renderRole();
        }
    }

    noWinner();
    clearCards();
    renderRole();
}

//bet input
function inputBet() {
    wager = document.getElementById("test").value;

    if (wager == "") {
        wagerMessage.innerHTML = "You have to enter a number.";
        console.log(wager);
    } else if (wager >= 0) {
        wagerMessage.innerHTML = "Your wager is set to $" + wager;
    } else {
        wagerMessage.innerHTML = "ERROR";
    }


}


//clearing card images
function clearCards() {
        //clearing player cards
        cardImage.innerHTML = "";

        //clearing dealer cards
        dealerImage.innerHTML = "";
}

// disables hit me and stay
function disabler() {
    document.getElementById("hit-btn").disabled = true;
    document.getElementById("stay-btn").disabled = true;
}

//under 21
function noWinner() {
        //who's closer?
    if (playerSum > dealerSum && playerSum < 21 && checker === false) {
        stayMessage.innerHTML += "</br>You were closer to 21. You win!";
        messageEl.innerHTML = "";
        player.money = player.money + (wager * 1.5);
        disabler();
    } else if (dealerSum > playerSum && playerSum < 21 && checker === false) {
        stayMessage.innerHTML += "</br>The dealer was closer to 21. You lose!";
        messageEl.innerHTML = "";
        player.money = player.money - wager;
        disabler();
    } else if (playerSum === dealerSum && checker === false) {
        stayMessage.innerHTML += "</br>It was a tie!";
        messageEl.innerHTML = "";
        disabler();
    }

    renderMoney();
}

//render money
function renderMoney() {

    if (player.money >= 1 && player.money < 1000) {
        moneyImage.innerHTML = '<img class="moneyIm" src="img/100s.png" alt="yourMoney">';
    } else if (player.money >= 1000 && player.money < 10000) {
        moneyImage.innerHTML = '<img class="moneyIm" src="img/thousand.png" alt="yourMoney">';
    } else if (player.money >= 10000) {
        moneyImage.innerHTML = '<img class="moneyIm" src="img/tenthousands.png" alt="yourMoney">';
    } else if (player.money <= 0) {
        moneyImage.innerHTML = '<img class="moneyIm" src="img/wat2.png" alt="yourMoney">';
    }

}