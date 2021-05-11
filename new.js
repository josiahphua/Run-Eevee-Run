
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
    let BTRight = parseInt(window.getComputedStyle(berryTime).getPropertyValue("right"));
    let BPRight = parseInt(window.getComputedStyle(berryPoint).getPropertyValue("right"));
    let TSRight = parseInt(window.getComputedStyle(thunderstone).getPropertyValue("right"));

    if (eeveeTop <= 200 && BPRight < 835 && BPRight > 720){
        berryPoint.classList.remove("bpMove");
        berryPoint.style.display = "none";
        // call function to add show total score in the div?
        addPoint(point);   
    }
    if (eeveeTop <= 200 && BTRight < 835 && BTRight > 720){
        berryTime.classList.remove("btMove");
        berryTime.style.display = "none";
        time+= 5;
        // call function to add time * multiplier to score?
    }
    if (eeveeTop <= 200 && TSRight < 835 && TSRight > 720){
        thunderstone.classList.remove("bpMove");
        thunderstone.style.display = "none";
        imgJolteon.src = "/images/jolteon.gif";
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
    console.log(berryPoint.style.display);
}

setTimeout(() => {
gameEnd()
    
}, 30000);



