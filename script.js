//referensi //referensi : https://youtu.be/K8Rh5x3c9Pw?si=F-nZzG64Fk-1rrW8
const papangame = document.querySelector(".papangame");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");


let gameover = false;
let makananX, makananY;
let ularX = 5, ularY = 5;
let badanUlar = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;



//bagian variabel konstan untuk mengatur letak dari makanan
const letakmakanan = () => {
    makananX = Math.floor(Math.random() * 30) + 1;
    makananY = Math.floor(Math.random() * 30) + 1;
}

//variabel konstan untuk gameover
const handlegameover = () => {
    clearInterval(setIntervalId);
    alert("NT bang");
    location.reload();
}


// bagian variabel konstan untuk mengubah arah dari ular
const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


const initGame = () => {
    if(gameover) return handlegameover();
    let htmlMarkup = `<div class="makanan" style="grid-area: ${makananY} / ${makananX}"></div>`;

    // logika untuk ular ketika bertemu makanan
    if(ularX === makananX && ularY === makananY) {
        letakmakanan();
        badanUlar.push([makananX, makananY]);
        //skor bertambah satu
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }


    for(let i = badanUlar.length - 1; i > 0; i--) {
        badanUlar[i] = badanUlar[i - 1];
    }
    
    badanUlar[0]= [ularX, ularY];

    //bagian untuk merubah posisi dari kepala ular
    ularX += velocityX;
    ularY += velocityY;

    //logika ketika ular menabrak ujung lapanagan maka gameover
    if(ularX <= 0 || ularX > 30 || ularY <= 0 || ularY > 30){
        gameover = true;
    }

    //jika ular menyentuh tubuhnya makan akan gameover
    for (let i = 0; i < badanUlar.length; i++) {
    htmlMarkup += `<div class="kepalaular" style="grid-area: ${badanUlar[i][1]} / ${badanUlar[i][0]}"></div>`;
    if(i !== 0 && badanUlar[0][1] === badanUlar[i][1] && badanUlar [0][0] === badanUlar[i][0]) {
        gameover = true;
    }
    }

    papangame.innerHTML = htmlMarkup;
 }


 letakmakanan();
 setIntervalId = setInterval(initGame, 70);
document.addEventListener("keydown", changeDirection);