var tacoOne = document.getElementsByClassName('taco')[0];
var tacoTwo = document.getElementsByClassName('taco')[0];

//close window if clicked on 'Exit' button
function closeWindow() {
    window.close();
}

//clear the menu 
function clearMenu() {
    //turn off display for menu
    document.getElementById("menu").style.display = "none";
    //turn on display score board
    document.getElementById("score").style.display = "block";
    //turn on display game
    document.getElementById("game").style.display = "block";
    //turn on display right side bar
    document.getElementById("basketBar").style.display = "block";
    //var buttons = document.getElementById("interaction");

}

//start game
function start_game() {
    // document.getElementById('play').style.display = "none";
    //animate the tacos
    addTacos();

}

//add taco sto screen and move the taco from position to center
var id = null;

function addTacos() {
    //var tacoOne = {"positionY" : }
    tacoOne.classList.add('traverseRight');


    tacoTwo.classList.add("traverseRight");

    /*
    //taco will always start on the left-hand side
    var posX = 0;
    //randomize the y corrdinate of taco
    var posY = Math.floor(Math.random() * 15);
    //position the taco
    randTaco.top = posY * 40;
    randTaco.left = posX;
    //make taco visible to player
    randTaco.style.display("block");

    clearInterval(id);
    id = setInterval(function frame() {
        if (posX > 550) {
            clearInterval(id);
        } else {
            posX++;
            randTaco.style.left = posX;
        }
    }, 20);*/



}

function displayScore() {
    var currentScore = document.getElementById("score");
    currentScore.innerHTML = "Score: " + totalScore.number;
}

function checkScore() {
    var basket = document.querySelector("img");
    //get taco info
    let tacoSpotX = getPositionX(tacoOne);
    console.log("PositionTacoX:" + tacoSpotX);
    let tacoSpotY = getPositionY(tacoOne);
    console.log("PositionTacoY:" + tacoSpotY);
    //get basket info
    let basketSpot = getPositionY(basket);
    console.log("PositionBasket:" + basketSpot);
    //check for if taco hits basket
    if (tacoSpotX >= 570 && ((tacoSpotY - basketSpot <= 50) && (tacoSpotY - basketSpot >= -50))) {
        totalScore.number += 1;
    }
}

//get y position 
function getPositionY(element) {
    var posY = 0;

    while (element) {
        if (element.tagName == "BODY") {
            var scrollY = element.scrollTop;

            posY += (element.offsetTop - scrollY + element.clientTop);
        } else {
            posY += (element.offsetTop - element.scrollTop + element.clientTop);
        }
        element = element.offsetParent;
    }
    return posY;
}
//get x position
function getPositionX(element) {
    var posX = 0;

    while (element) {
        if (element.tagName == "BODY") {
            var scrollX = element.scrollTop;

            posX += (element.offsetTop - scrollX + element.clientTop);
        } else {
            posX += (element.offsetTop - element.scrollTop + element.clientTop);
        }
        element = element.offsetParent;
    }
    return posX;
}

//move basket up
function moveUp() {
    $(button).onmousedown(function() {

    });
}

//move basket down
function moveDown() {
    $(button).onmousedown(function() {

    });
}

class playerScore {
    constructor() {
        this.number = 0;
    }
}

//check if tacos are in basket
let totalScore = new playerScore();
setInterval(checkScore, 10);