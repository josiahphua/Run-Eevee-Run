
// Assigning variables to main parts of game.
let game = document.getElementById("game");
let eevee = document.getElementById("eevee");
let berryPoint = document.getElementById("berry-point");
let thunderstone = document.getElementById("thunderstone")
let pokeBall = document.getElementById("pokeball");
let imgBP = document.getElementById("BP");
let imgPB = document.getElementById("PB");
let imgJolteon = document.getElementById("jolteon");
let totalScore = document.getElementById("scoreCount");
let $time = document.getElementById("countdown");
let overlay = document.getElementById("overlay");
let textBox = document.getElementById("text-box");
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
    game.style.display = "none";
    overlay.style.display = "block";
    textBox.style.display = "block";
    textBox.innerText = "Click on the Eevee to go to the next level"
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

    
    let point = num * 2;

    let checkPoints = setInterval(function(){
        let eeveeTop = parseInt(window.getComputedStyle(eevee).getPropertyValue("top"));
        let PBLeft = parseInt(window.getComputedStyle(pokeBall).getPropertyValue("left"));
        let BPLeft = parseInt(window.getComputedStyle(berryPoint).getPropertyValue("left"));
        let TSLeft = parseInt(window.getComputedStyle(thunderstone).getPropertyValue("left"));

        if (eeveeTop <= 200 && BPLeft < 200 && BPLeft > 100){
            berryPoint.classList.remove("bpMove");
            berryPoint.style.display = "none";
            // call function to add show total score in the div?
            addPoint(point);   
        }
        if (eeveeTop > 300 && eeveeTop <= 400 && PBLeft < 200 && PBLeft > 100){
            pokeBall.classList.add("pbMove");
            pokeBall.style.display = "none";
            addPoint(point * -1);
        }
        if (eeveeTop <= 200 && TSLeft < 200 && TSLeft > 100){
            thunderstone.classList.remove("TS");
            thunderstone.style.display = "none";
            imgJolteon.src = "./images/jolteon.gif";
            addPoint(point*2);   
            setTimeout(() => {
                imgJolteon.src = "./images/shiny-eevee.gif"
            }, 5000);
        }
    
    }, 10);

    let generateBerryP = setInterval(function(){
        berryPoint.classList.add("bpMove");
        berryPoint.style.display = "block";
    }, 1000);
    
    function addPoint(points){
        scoreCount.push(points);
        let sum = scoreCount.reduce(function(a,b){
            return a+b;
        })
        totalScore.innerText = sum
        overallScore.push(sum)
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
    if (level == 1) {
        newGame(level);
        setTimeout(() => {
            gameEnd();
        }, parseInt((25-(level *5)) * 1000));
        removeTS();
        levelUp();
    } else if (level == 2){
        gTS();
        newGame(level);
        setTimeout(() => {
            gameEnd();
        }, parseInt((25-(level *5)) * 1000));
        levelUp();
    } else if (level == 3){
        gPokeball();
        gTS();
        newGame(level);
        setTimeout(() => {
            gameEnd();
            // levelUp();
        }, parseInt((25-(level *5)) * 1000));
        levelUp();
    } else if (level == 4){
        gPokeball();
        gTS();
        newGame(level);
        setTimeout(() => {
            gameEnd();
            // levelUp();
        }, parseInt((25-(level *5)) * 1000));
        levelUp();
    } else if (level >=5) {
        textBox.innerText = "Thank you for playing all 4 levels!"
    }
});

// Level mechanic?
function levelUp(){
    level++;
}

function gPokeball() {
    let generatePokeball = setInterval(function(){
        pokeBall.classList.add("pbMove");
        pokeBall.style.display = "block";
    }, 1000);
}

function gTS (){
    let generateTS = setInterval(function(){
        thunderstone.classList.add("pbMove");
        thunderstone.style.display = "block";
    }, 10000);
}

function removeTS(){
    thunderstone.classList.remove("pbMove");
    thunderstone.style.display = "none";
}