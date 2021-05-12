
// Assigning variables to main parts of game.
let game = document.getElementById("game");
let eevee = document.getElementById("eevee");
let berryPoint = document.getElementById("berry-point");
let thunderstone = document.getElementById("thunderstone")
let berryTime = document.getElementById("berry-time");
let imgBP = document.getElementById("BP");
let imgBT = document.getElementById("BT");
let imgJolteon = document.getElementById("jolteon");
let totalScore = document.getElementById("scoreCount");
let $time = document.getElementById("countdown");
let overlay = document.getElementById("overlay");
let textBox = document.getElementById("text-box");
let point = 5;
let time;
let scoreCount = [];
let overallScore =[];
let level = 1;

// Functions.

let jump = ()=>  {
    eevee.classList.remove("runIn");

    if(eevee.classList !== null){
        eevee.classList.add("jump");
    }

    setTimeout(function(){
        eevee.classList.remove("jump");
    }, 500)
}

// Timer
function countDown() {
    $time.textContent = time + " second" + (time == 1 ? "" : "s")
    if (time-- > 0) setTimeout(countDown, 1000) 
// this 2000 means 2000miliseconds, can write a function to drop the time
};

function gameEnd(){
    // eevee.style.display = "none";
    // berryPoint.style.display = "none";
    // berryTime.style.display = "none";
    // totalScore.style.display = "none";
    // thunderstone.style.display = "none";
    game.style.display = "none";
    overlay.style.display = "block";
    textBox.style.display = "block";
    textBox.innerText = "Click on Charmander to go to the next level"
}

// this function is created to check for time up.
function timeUp(time) {
    if (time == 0){
        overallScore.push(totalScore.innerText)
        let overallSum = overallScore.reduce(function(a,b){
            return a+b;
        })

        // saving value of overall score as an int.
        let overallScoreInt = overallSum;
        console.log(overallScoreInt);
    }
}

// this plays out a new game. 
let newGame = (num) => {
    time = 25 - (num * 5);
    game.style.display = "block";
    overlay.style.display = "none";
    textBox.style.display = "none";

    let checkPoints = setInterval(function(){
        let eeveeTop = parseInt(window.getComputedStyle(eevee).getPropertyValue("top"));
        let BTLeft = parseInt(window.getComputedStyle(berryTime).getPropertyValue("left"));
        let BPLeft = parseInt(window.getComputedStyle(berryPoint).getPropertyValue("left"));
        let TSLeft = parseInt(window.getComputedStyle(thunderstone).getPropertyValue("left"));
    
        if (eeveeTop <= 200 && BPLeft < 200 && BPLeft > 100){
            berryPoint.classList.remove("bpMove");
            berryPoint.style.display = "none";
            // call function to add show total score in the div?
            addPoint(point);   
        }
        if (eeveeTop <= 200 && BTLeft < 200 && BTLeft > 100){
            berryTime.classList.remove("btMove");
            berryTime.style.display = "none";
            addPoint(-5);
            // call function to add time * multiplier to score?
        }
        if (eeveeTop <= 200 && TSLeft < 200 && TSLeft > 100){
            thunderstone.classList.remove("TS");
            thunderstone.style.display = "none";
            imgJolteon.src = "./images/jolteon.gif";
            // call function to add show total score in the div?
            addPoint(point*2);   
        }
    
    }, 10);

    let generateBP = setInterval(function(){
        berryPoint.classList.add("bpMove");
        berryPoint.style.display = "block";
    }, 1000);
    
    function addPoint(points){
        scoreCount.push(points);
        let sum = scoreCount.reduce(function(a,b){
            return a+b;
        })
        totalScore.innerText = sum
    }

    window.addEventListener("keydown", event => {
        console.log(event);
        if (event.code === "Space"){
            jump(eevee);
        }
    });
    countDown();

}


// Start & stop Mechanic
overlay.addEventListener("click", function(){
    newGame(level);

    setTimeout(() => {
        gameEnd();
        levelUp();
    }, 10000);
});

// Level mechanic?
function levelUp(){
    level++;
}
