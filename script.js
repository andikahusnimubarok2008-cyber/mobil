// ================================
// CLASSIC RACER
// Bagian 1
// ================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// HUD
const speedText = document.getElementById("speed");
const rpmText = document.getElementById("rpm");
const scoreText = document.getElementById("score");
const highText = document.getElementById("high");

const gameOverUI = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Keyboard
const keys = {};
// ================================
// TOUCH CONTROL
// ================================

function press(key){

    keys[key]=true;

}


function release(key){

    keys[key]=false;

}


// Tombol maju
const up=document.getElementById("up");

up.addEventListener("touchstart",()=>{
    press("arrowup");
});

up.addEventListener("touchend",()=>{
    release("arrowup");
});


// Tombol mundur
const down=document.getElementById("down");

down.addEventListener("touchstart",()=>{
    press("arrowdown");
});

down.addEventListener("touchend",()=>{
    release("arrowdown");
});


// Tombol kiri
const left=document.getElementById("left");

left.addEventListener("touchstart",()=>{
    press("arrowleft");
});

left.addEventListener("touchend",()=>{
    release("arrowleft");
});


// Tombol kanan
const right=document.getElementById("right");

right.addEventListener("touchstart",()=>{
    press("arrowright");
});

right.addEventListener("touchend",()=>{
    release("arrowright");
});
// High Score
let highScore = Number(localStorage.getItem("highscore")) || 0;
highText.textContent = highScore;

// ================================
// PLAYER
// ================================

const player = {

    width:55,
    height:95,

    x:canvas.width/2,
    y:0,

    speed:0,
    maxSpeed:220,

    acceleration:0.9,
    brake:1.2,
    friction:0.45

};

// ================================
// GAME DATA
// ================================

let rpm = 800;

let score = 0;

let gameOver = false;

let roadOffset = 0;

let enemies = [];

let spawnCounter = 0;

// ================================
// RESIZE
// ================================

function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    player.y = canvas.height-player.height-40;

}

resize();

window.addEventListener("resize",resize);

// ================================
// KEYBOARD
// ================================

window.addEventListener("keydown",(e)=>{

    const key = e.key.toLowerCase();

    keys[key]=true;

    if([
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        " "
    ].includes(key)){

        e.preventDefault();

    }

    if(gameOver && key==="enter"){

        restart();

    }

});

window.addEventListener("keyup",(e)=>{

    keys[e.key.toLowerCase()]=false;

});

// ================================
// BUTTON RESTART
// ================================

restartBtn.addEventListener("click",restart);

// ================================
// LANE
// ================================

const laneX = ()=>[
    canvas.width/2-110,
    canvas.width/2,
    canvas.width/2+110
];

// ================================
// SPAWN MOBIL MUSUH
// ================================

function spawnEnemy(){

    const lane = laneX();

    enemies.push({

        lane:Math.floor(Math.random()*3),

        x:0,

        y:-150,

        width:55,

        height:95,

        speed:7+Math.random()*3,

        color:`hsl(${Math.random()*360},80%,50%)`

    });

    enemies[enemies.length-1].x =
        lane[enemies[enemies.length-1].lane];

}

// ================================
// UPDATE PLAYER
// ================================

function updatePlayer(){

    // Gas

    if(keys["arrowup"] || keys["w"]){

        player.speed+=player.acceleration;

    }

    // Rem

    else if(keys["arrowdown"] || keys["s"]){

        player.speed-=player.brake;

    }

    // Lepas gas

    else{

        player.speed-=player.friction;

    }

    // Batas

    if(player.speed<0)
        player.speed=0;

    if(player.speed>player.maxSpeed)
        player.speed=player.maxSpeed;

    // Belok

    const steer=8;

    if(keys["arrowleft"] || keys["a"]){

        player.x-=steer;

    }

    if(keys["arrowright"] || keys["d"]){

        player.x+=steer;

    }

    const left =
        canvas.width/2-170+player.width/2;

    const right =
        canvas.width/2+170-player.width/2;

    if(player.x<left)
        player.x=left;

    if(player.x>right)
        player.x=right;

    // RPM

    rpm =
        Math.floor(
            800+
            (player.speed/player.maxSpeed)*7200
        );

    // Jalan

    roadOffset+=player.speed*0.18;

    // HUD

    speedText.textContent=Math.floor(player.speed);

    rpmText.textContent=rpm;

}
// ================================
// UPDATE MUSUH
// ================================

function updateEnemies(){

    spawnCounter++;

    // Spawn musuh
    if(spawnCounter>=55){

        spawnCounter=0;

        spawnEnemy();

    }

    for(let i=enemies.length-1;i>=0;i--){

        const e=enemies[i];

        // Gerakan musuh
        e.y += e.speed + player.speed*0.08;

        // Lolos dari layar
        if(e.y > canvas.height + 120){

            enemies.splice(i,1);

            score += Math.max(
                10,
                Math.floor(player.speed/2)
            );

            scoreText.textContent = score;

            if(score>highScore){

                highScore=score;

                localStorage.setItem(
                    "highscore",
                    highScore
                );

                highText.textContent=highScore;

            }

            continue;

        }

        // ==========================
        // TABRAKAN
        // ==========================

        const playerLeft =
            player.x-player.width/2;

        const playerRight =
            player.x+player.width/2;

        const enemyLeft =
            e.x-e.width/2;

        const enemyRight =
            e.x+e.width/2;

        if(

            playerLeft < enemyRight &&
            playerRight > enemyLeft &&
            player.y < e.y + e.height &&
            player.y + player.height > e.y

        ){

            gameOver = true;

            // tampilkan skor akhir
            finalScore.textContent = score;

            gameOverUI.style.display = "flex";

            return;

        }

    }

}

// ================================
// RESTART GAME
// ================================

function restart(){

    score = 0;

    player.speed = 0;

    player.x = canvas.width/2;

    enemies = [];

    spawnCounter = 0;

    roadOffset = 0;

    rpm = 800;

    gameOver = false;

    scoreText.textContent = 0;

    speedText.textContent = 0;

    rpmText.textContent = 800;

    finalScore.textContent = 0;

    gameOverUI.style.display = "none";

}

// ================================
// UPDATE GAME
// ================================

function update(){

    if(gameOver) return;

    updatePlayer();

    updateEnemies();

}
// ================================
// GAMBAR RUMPUT
// ================================

function drawGrass(){

    ctx.fillStyle="#2e8b57";

    ctx.fillRect(
        0,
        0,
        canvas.width/2-170,
        canvas.height
    );

    ctx.fillRect(
        canvas.width/2+170,
        0,
        canvas.width,
        canvas.height
    );

}

// ================================
// GAMBAR JALAN
// ================================

function drawRoad(){

    ctx.fillStyle="#555";

    ctx.fillRect(
        canvas.width/2-170,
        0,
        340,
        canvas.height
    );

    ctx.strokeStyle="white";
    ctx.lineWidth=8;

    for(let y=-80;y<canvas.height+80;y+=80){

        const yy=y+(roadOffset%80);

        // tengah
        ctx.beginPath();
        ctx.moveTo(canvas.width/2,yy);
        ctx.lineTo(canvas.width/2,yy+40);
        ctx.stroke();

        // kiri
        ctx.beginPath();
        ctx.moveTo(canvas.width/2-110,yy);
        ctx.lineTo(canvas.width/2-110,yy+40);
        ctx.stroke();

        // kanan
        ctx.beginPath();
        ctx.moveTo(canvas.width/2+110,yy);
        ctx.lineTo(canvas.width/2+110,yy+40);
        ctx.stroke();

    }

}

// ================================
// GAMBAR MOBIL
// ================================

function drawCar(x,y,color){

    // Body
    ctx.fillStyle=color;

    ctx.fillRect(
        x-27,
        y,
        54,
        95
    );

    // Atap
    ctx.fillStyle="#aee8ff";

    ctx.fillRect(
        x-17,
        y+8,
        34,
        24
    );

    // Kap depan
    ctx.fillRect(
        x-15,
        y+40,
        30,
        18
    );

    // Lampu
    ctx.fillStyle="yellow";

    ctx.fillRect(x-18,y+2,8,5);
    ctx.fillRect(x+10,y+2,8,5);

    // Lampu belakang
    ctx.fillStyle="red";

    ctx.fillRect(x-18,y+88,8,5);
    ctx.fillRect(x+10,y+88,8,5);

    // Ban
    ctx.fillStyle="#111";

    ctx.fillRect(x-33,y+8,10,20);
    ctx.fillRect(x+23,y+8,10,20);

    ctx.fillRect(x-33,y+67,10,20);
    ctx.fillRect(x+23,y+67,10,20);

}

// ================================
// PLAYER
// ================================

function drawPlayer(){

    drawCar(
        player.x,
        player.y,
        "#ff2d2d"
    );

}

// ================================
// MUSUH
// ================================

function drawEnemies(){

    for(const e of enemies){

        drawCar(
            e.x,
            e.y,
            e.color
        );

    }

}

// ================================
// DRAW
// ================================

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawGrass();

    drawRoad();

    drawEnemies();

    drawPlayer();

}

// ================================
// GAME LOOP
// ================================

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
