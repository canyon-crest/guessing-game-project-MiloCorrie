// global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

let startTime;
let totalTime = 0;
let fastestTime = null;
let userName = "";
let timerInterval;

// event listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function setName() {
    userName = nameInput.value;

    if (userName === "") {
        alert("Please enter your name.");
        return;
    }

    playerName.textContent = "Player: " + userName;

    nameInput.disabled = true;
    nameBtn.disabled = true;
}

nameBtn.addEventListener("click", setName);

function play(){
    startTime = new Date().getTime();
    score = 0; // sets score to 0 every new game
    playBtn.disabled = true;
    guessBtn.disabled = false;

    startTime = new Date().getTime();

    timer.textContent = "Time: 0.0 seconds";

    timerInterval = setInterval(function () {
    let currentTime = new Date().getTime();
    let timeElapsed = (currentTime - startTime) / 1000;
    timer.textContent = "Time: " + timeElapsed.toFixed(1) + " seconds";
    }, 100);
    
    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }

    msg.textContent = "Guess a number from 1-" + level;
    answer = Math.floor(Math.random()*level) + 1;
    guess.placeholder = answer; // place holder
}

function makeGuess(){
    let userGuess = parseInt(guess.value);

    let endTime = new Date().getTime();
    let gameTime = (endTime - startTime) / 1000;

    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Enter a valid number 1-" + level;
        return;
    }
    score++;
    if(userGuess < answer){
        msg.textContent = "Too Low! Try again.";
    }
    else if(userGuess > answer){
        msg.textContent = "Too High! Try again.";
    }
    else{

        totalTime += gameTime;

        if (fastestTime === null || gameTime < fastestTime) {
        fastestTime = gameTime;
        fastest.textContent = "Fastest Time: " + fastestTime.toFixed(2) + "s";
        }

        


        let scoreMessage = "";

        if (score <= level / 3) {
        scoreMessage = "That score was great!";
        // celebration for great scores
        launchConfetti();
        }
        else if (score <= level / 2) {
        scoreMessage = "That score was okay.";
        }
        else {
        scoreMessage = "That score was bad.";
        }

        msg.textContent = "Nice job " + userName + "! You took " + score + " tries in " + gameTime.toFixed(2) + " seconds. " + scoreMessage;

        updateScore();

        let avgTime = totalTime / scoreArr.length;
        avgTimeP.textContent = "Average Time: " + avgTime.toFixed(2) + "s";

        reset();
    }
}


function reset(){
    guessBtn.disabled = true;
    guess.disabled = false;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    for(let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
    clearInterval(timerInterval);
}

function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b); //sort by increasing order
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    for(let i = 0; i < scoreArr.length; i++){
        sum += scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average score: " + avg.toFixed(2);
}

/* Confetti: create small colored elements that fall and then clean up */
function launchConfetti(){
    const colors = ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590"];
    const count = 30;
    for(let i=0;i<count;i++){
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random()*100 + '%';
        el.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        const size = 6 + Math.random()*10;
        el.style.width = size + 'px';
        el.style.height = (size*0.6) + 'px';
        el.style.opacity = (0.7 + Math.random()*0.3).toString();
        el.style.transform = `translateY(-20vh) rotate(${Math.random()*360}deg)`;
        el.style.animationDelay = (Math.random()*0.4) + 's';
        document.body.appendChild(el);
        // remove after animation
        setTimeout(()=>{ if(el && el.parentNode) el.parentNode.removeChild(el); }, 2600);
    }
}

function showDateTime() {
    const d = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let day = d.getDate();
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    let time = d.toLocaleTimeString();
    date.textContent = months[d.getMonth()] + " " + day + suffix + ", " + d.getFullYear() + " " + time;
}

setInterval(showDateTime, 1000);