
// Assigning variables to main parts of game.
let eevee = document.getElementById("eevee");

let berryPoint = document.getElementById("berry-point");

let thunderstone = document.getElementById("thunderstone")

let berryTime = document.getElementById("berry-time");

let imgBP = document.getElementById("BP");

let imgBT = document.getElementById("BT");

let imgJolteon = document.getElementById("jolteon");

let totalScore = document.getElementById("scoreCount");

let $time = document.getElementById("countdown");

let time = 20;

let scoreCount = [];

let overallScore =[];


// let level = [1, 2, 3, 4, 5];

// for (const i of level) {
//     if (i == 1){
//         time = 20;
//         // Ending the game in 30seconds
//         setTimeout(() => {
//             timeUp(time);
//         }, 30000);
        
//     } else if (i == 2){
//         time = 15;
//         // Ending the game in 25 seconds

//     } else if (i == 3){
//         time = 10;
//         // Ending the game in 20 seconds

//     } else if (i == 4){
//         time = 5;
//         // Ending the game in 15 seconds

//     } else if (i == 5){
//         time = 0;
//         // Ending the game in 10 seconds

//     }
    
// }


let jump = ()=>  {
    eevee.classList.remove("runIn");

    if(eevee.classList !== null){
        eevee.classList.add("jump");
    }

    setTimeout(function(){
        eevee.classList.remove("jump");
    }, 500)
}

window.addEventListener("keydown", event => {
    console.log(event);
    if (event.code === "Space"){
        jump(eevee);
    }
});
let point = 5;

let checkPoints = setInterval(function(){
    let eeveeTop = parseInt(window.getComputedStyle(eevee).getPropertyValue("top"));
    let BTRight = parseInt(window.getComputedStyle(berryTime).getPropertyValue("left"));
    let BPRight = parseInt(window.getComputedStyle(berryPoint).getPropertyValue("left"));
    let TSRight = parseInt(window.getComputedStyle(thunderstone).getPropertyValue("left"));

    if (eeveeTop <= 200 && BPRight < 200 && BPRight > 100){
        berryPoint.classList.remove("bpMove");
        berryPoint.style.display = "none";
        // call function to add show total score in the div?
        addPoint(point);   
    }
    if (eeveeTop <= 200 && BTRight < 200 && BTRight > 100){
        berryTime.classList.remove("btMove");
        berryTime.style.display = "none";
        time+= 5;
        // call function to add time * multiplier to score?
    }
    if (eeveeTop <= 200 && TSRight < 200 && TSRight > 100){
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


// Timer
(function countDown() {
    $time.textContent = time + " second" + (time == 1 ? "" : "s")
    if (time-- > 0) setTimeout(countDown, 2000) 
// this 2000 means 2000miliseconds, can write a function to drop the time
})();


function gameEnd(){
    eevee.style.display = "none";
    berryPoint.style.display = "none";
    berryTime.style.display = "none";
}

// create function to carry time over from previous stage.
// maybe set another variable to add time left and new stage time
// yups. Do I have a fail mechanic?


// this function is created to check for time up.
function timeUp(time) {
    if (time){
        overallScore.push(totalScore.innerText)
        let overallSum = overallScore.reduce(function(a,b){
            return a+b;
        })

        // saving value of overall score as an int.
        let overallScoreInt = overallSum;
    }
}
