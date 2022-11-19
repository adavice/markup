
var user = {
	number: null,
	isAuthorized: true,
	credits: 1,
	best_score: null,
	score: null,
}
var leader = {
best_score : null,
}
var price = 1;
//login icon visual change depends on login status
let login_icon = document.getElementById('login_icon')
if (!user.isAuthorized) {
login_icon.style.opacity = '0.5';
}

let play_button = document.getElementById('play_button');
if (play_button) {
  play_button.addEventListener("click", ballanceCheck)
}

function ballanceCheck() {
  if (user.credits >= price) {
    window.location.replace('./game.html')
  } else { 
    popUp();
  }
}
// credits needed to play

var popUpLimit = document.getElementById('popUpLimit');
function popUp () {
  if (popUpLimit) {popUpLimit.style.display = 'block'

  } return;
}

let credit_counter = document.getElementById('credit_counter');
function updateCredits(){
if(credit_counter) {
    if (user.credits > 1 || user.credits == 0){
    credit_counter.innerText = (user.credits +' tries left');
    } else {
      credit_counter.innerText = (user.credits +' try left');
    }
  }
}

if (!user.isAuthorized) {
  credit_counter.style.display = "none";
  } else { updateCredits();
}
if (popUpLimit){
    if (price > user.credits) {
    document.getElementById('popUpLimit').style.display = "block"
    };
    
    var close_pop_button = document.getElementById('close')
    close_pop_button.addEventListener('click', closePop);

    function closePop(){
    document.getElementById('popUpLimit').style.display = "none"
    };

}


var user_best_time = document.getElementById('user_best_time');
if (user_best_time != null && user.best_score != null) {
	user_best_time.innerText = timeFormatter(user.best_score);
}
var leaders_display = document.getElementById('leader_time');
if (leaders_display != null && leader.best_score) {
	leaders_display.innerText = timeFormatter(leader.best_score);
}

function timeFormatter(time) {
    time = new Date(time);

    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds;
    }

    return minutes + ':' + seconds + '.' + milliseconds;
  }

// if there is a calc check



