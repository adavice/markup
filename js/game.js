
// document.getElementsByTagName('a').style['pointer-events'] = 'none';
// Cheching of login/profile window

window.onbeforeunload = function(e) {
    (e || window.event).returnValue = null;
    return null;
};
var leaders_display = document.getElementById('leader_time');
var user_new_time = document.getElementById('user_new_time');

const cards = Array.from(document.querySelectorAll('.memory-card'));
var card_faces = document.querySelectorAll('.front-face');
cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('game_screen').style.display = 'flex';
document.getElementById('result').style.display = 'none';

function hideGame(){
document.getElementById('game_screen').style.display = 'none';
document.getElementById('result').style.display = 'block';
}
let hasFlippedCard = false;
var lockBoard = true;
let firstCard, secondCard;
var level_counter = 0;

function start_game() {
	user.credits = user.credits - price;
	updateCredits();
	lockBoard = false;
	level_counter = 1;
	displayLevel();
	watch.start();

}
shuffle();

setTimeout(start_game, 3000);
displayLevel();

function shuffle() {
	cards.forEach(card => {
	card.dataset.match = 0;
	let randomPos = Math.floor(Math.random() * 20);
	card.style.order = randomPos;
	});
};
// can be used in console to skip levels
function levelUp() {
	cards.forEach(card => card.dataset.match = 0);
	cards.forEach(card => card.classList.remove('flip'));
	level_counter = level_counter + 1;
	displayLevel();
	resetBoard();
	setTimeout(shuffle, 500);
	setTimeout(imgChange, 500);
	setTimeout(cards.forEach(card => card.addEventListener('click', flipCard)), 500);
	if (level_counter == 4) {
		watch.stop();

	}
}

function displayLevel(){
var level_display = '-';
if (level_counter == 0) {level_display = 'Get ready!'};
if (level_counter == 1) {level_display = 'Level 1'};
if (level_counter == 2) {level_display = 'Level 2'};
if (level_counter == 3) {level_display = 'Level 3'};
if (level_counter == 4) {level_display = 'Complete!'};
document.getElementById('level_count').innerText = level_display;
}

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');
	if(!hasFlippedCard){
// 1st click
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
// 2nd click
	hasFlippedCard = false;
	secondCard = this;
	checkForMatch();
}
//Match check
function checkForMatch() {
	let isMatch = firstCard.dataset.image === 
	secondCard.dataset.image;
	if (isMatch) {
		disableCards();
		winCondition();
		} else { unflipCards();
	}
}
//prevent card action
function disableCards () {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	firstCard.dataset.match = 1;
	secondCard.dataset.match = 1;
	
}
function unflipCards() {
	lockBoard = true;
	setTimeout (() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1500);
}
function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}
//level 2 images
const l2_images = [
"./images/game/portraits/curie.png",
"./images/game/portraits/curie.png",
"./images/game/portraits/einstein.png",
"./images/game/portraits/einstein.png",
"./images/game/portraits/ford.png",
"./images/game/portraits/ford.png",
"./images/game/portraits/hawking.png",
"./images/game/portraits/hawking.png",
"./images/game/portraits/oppenheimer.png",
"./images/game/portraits/oppenheimer.png",
"./images/game/portraits/tesla.png",
"./images/game/portraits/tesla.png",
"./images/game/portraits/marconi.png",
"./images/game/portraits/marconi.png",
"./images/game/portraits/dalen.png",
"./images/game/portraits/dalen.png",
"./images/game/portraits/washington.png",
"./images/game/portraits/washington.png",
"./images/game/portraits/eddison.png",
"./images/game/portraits/eddison.png",

];
//level 3 images
const l3_images = [
"./images/game/figures/obj1.png",
"./images/game/figures/obj1.png",
"./images/game/figures/obj2.png",
"./images/game/figures/obj2.png",
"./images/game/figures/obj3.png",
"./images/game/figures/obj3.png",
"./images/game/figures/obj4.png",
"./images/game/figures/obj4.png",
"./images/game/figures/obj5.png",
"./images/game/figures/obj5.png",
"./images/game/figures/obj6.png",
"./images/game/figures/obj6.png",
"./images/game/figures/obj7.png",
"./images/game/figures/obj7.png",
"./images/game/figures/obj8.png",
"./images/game/figures/obj8.png",
"./images/game/figures/obj9.png",
"./images/game/figures/obj9.png",
"./images/game/figures/obj10.png",
"./images/game/figures/obj10.png",
];

// level completion check
function winCondition() {
	if ( cards.every(card => card.dataset.match == 1) ) {

    setTimeout(levelUp, 1000);
   
	} return;
}


//replacing images from arrays

function imgChange(){

if (level_counter == 2) {
		l2_images.forEach((l2_image, i) =>{
		card_faces[i].src = l2_image;
		});
} else {
	if (level_counter == 3) {
		l3_images.forEach((l3_image, i) =>{
		card_faces[i].src = l3_image;
		});
	} else {
		setTimeout(hideGame, 2000);

		}
	}
}

// stopwatch
var timer = document.getElementById('timer');
var watch = new Stopwatch(timer);
function Stopwatch(timer) {
  var time = 0;
  var offset;
  var interval;

  function update() {
    if (this.isOn) {
      time += delta();

    }
   timer.textContent = timeFormatter(time);
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;

    offset = now;

    return timePassed;
  }





  this.start = function() {
    interval = setInterval(update.bind(this), 9);
    offset = Date.now();
    this.isOn = true;

  };

  this.stop = function() {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
    user.score = time;
    if (user.score < user.best_score || user.best_score == null) {
		user.best_score = user.score
	};
	if (user.best_score < leader.best_score || leader.best_score == null){
	leader.best_score = user.best_score
	};
    user_new_time.innerText = timeFormatter(time);
    leaders_display.innerText = timeFormatter(leader.best_score);


    
  };

  this.reset = function() {
    time = 0;
    update();
  };

  this.isOn = false;
}
