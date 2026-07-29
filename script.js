// ===============================
// CLASSIC RACER
// SCRIPT BAGIAN 1
// ===============================


// CANVAS

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// HUD

const speedText = document.getElementById("speed");
const rpmText = document.getElementById("rpm");
const scoreText = document.getElementById("score");
const highText = document.getElementById("high");



// ===============================
// CANVAS SIZE
// ===============================


function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


resize();


window.addEventListener(
    "resize",
    resize
);




// ===============================
// KEY SYSTEM
// ===============================


const keys = {};



// KEYBOARD

window.addEventListener(
"keydown",
(e)=>{


    let key = e.key.toLowerCase();


    keys[key]=true;


    if(
        [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright"
        ].includes(key)
    ){

        e.preventDefault();

    }


});


window.addEventListener(
"keyup",
(e)=>{


    keys[e.key.toLowerCase()]=false;


});





// ===============================
// TOUCH BUTTON
// ===============================



function buttonControl(id,key){


    const btn=document.getElementById(id);



    btn.addEventListener(
        "touchstart",
        (e)=>{

            e.preventDefault();

            keys[key]=true;

        }
    );



    btn.addEventListener(
        "touchend",
        ()=>{

            keys[key]=false;

        }
    );


}



buttonControl("gas","arrowup");

buttonControl("brake","arrowdown");

buttonControl("left","arrowleft");

buttonControl("right","arrowright");





// ===============================
// PLAYER CAR
// ===============================


const player={


    x:0,

    y:0,


    width:55,

    height:95,


    speed:0,


    maxSpeed:220,


    acceleration:0.8,


    brake:1.5,


    friction:0.5


};





// POSISI MOBIL


function resetPlayer(){


    player.x = canvas.width/2;


    player.y =
    canvas.height -
    player.height -
    50;


}


resetPlayer();





// ===============================
// GAME DATA
// ===============================


let rpm = 800;


let score = 0;


let highScore =
Number(
localStorage.getItem("highscore")
)
||0;



highText.textContent=highScore;




// ===============================
// UPDATE PLAYER
// ===============================


function updatePlayer(){



    // GAS

    if(keys["arrowup"]){


        player.speed +=
        player.acceleration;


    }



    // REM

    else if(keys["arrowdown"]){


        player.speed -=
        player.brake;


    }



    // FRICTION

    else{


        player.speed -=
        player.friction;


    }



    // BATAS SPEED


    if(player.speed<0)
        player.speed=0;



    if(player.speed>player.maxSpeed)
        player.speed=player.maxSpeed;




    // BEL0K


    let steer=8;



    if(keys["arrowleft"]){


        player.x-=steer;


    }



    if(keys["arrowright"]){


        player.x+=steer;


    }



    // BATAS JALAN


    let leftLimit =
    canvas.width/2-170;


    let rightLimit =
    canvas.width/2+170;



    if(player.x<leftLimit)
        player.x=leftLimit;



    if(player.x>rightLimit)
        player.x=rightLimit;





    // RPM


    rpm =
    Math.floor(
        800+
        (player.speed/player.maxSpeed)*7200
    );




    // HUD


    speedText.textContent =
    Math.floor(player.speed);


    rpmText.textContent =
    rpm;



}





// ===============================
// GAME UPDATE
// ===============================


function update(){


    updatePlayer();


}






// ===============================
// GAME LOOP
// ===============================


function loop(){


    update();


    requestAnimationFrame(loop);


}



loop();
// ===============================
// ROAD SYSTEM
// ===============================


let roadOffset = 0;



function drawGrass(){


    ctx.fillStyle="#2e8b57";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


}




function drawRoad(){


    // jalan

    ctx.fillStyle="#555";


    ctx.fillRect(

        canvas.width/2-170,

        0,

        340,

        canvas.height

    );




    // garis putih

    ctx.strokeStyle="white";

    ctx.lineWidth=8;



    for(
        let y=-80;
        y<canvas.height;
        y+=80
    ){


        let lineY =
        y + roadOffset % 80;



        // kiri

        ctx.beginPath();

        ctx.moveTo(
            canvas.width/2-110,
            lineY
        );

        ctx.lineTo(
            canvas.width/2-110,
            lineY+40
        );

        ctx.stroke();





        // tengah

        ctx.beginPath();

        ctx.moveTo(
            canvas.width/2,
            lineY
        );

        ctx.lineTo(
            canvas.width/2,
            lineY+40
        );

        ctx.stroke();





        // kanan

        ctx.beginPath();

        ctx.moveTo(
            canvas.width/2+110,
            lineY
        );

        ctx.lineTo(
            canvas.width/2+110,
            lineY+40
        );

        ctx.stroke();



    }



}






// ===============================
// CAR DRAW
// ===============================



function drawCar(x,y,color){



    // badan mobil

    ctx.fillStyle=color;


    ctx.fillRect(

        x-27,

        y,

        54,

        95

    );





    // kaca

    ctx.fillStyle="#aee8ff";


    ctx.fillRect(

        x-17,

        y+10,

        34,

        25

    );





    // lampu depan

    ctx.fillStyle="yellow";


    ctx.fillRect(
        x-18,
        y+2,
        8,
        6
    );


    ctx.fillRect(
        x+10,
        y+2,
        8,
        6
    );





    // ban

    ctx.fillStyle="#111";


    ctx.fillRect(
        x-33,
        y+15,
        10,
        25
    );


    ctx.fillRect(
        x+23,
        y+15,
        10,
        25
    );


    ctx.fillRect(
        x-33,
        y+65,
        10,
        25
    );


    ctx.fillRect(
        x+23,
        y+65,
        10,
        25
    );


}







function drawPlayer(){


    drawCar(

        player.x,

        player.y,

        "#ff3030"

    );


}






// ===============================
// DRAW ALL
// ===============================



function draw(){


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    drawGrass();


    drawRoad();


    drawPlayer();




    // animasi jalan

    roadOffset += player.speed * 0.15;



}
// ===============================
// ENEMY CAR SYSTEM
// ===============================


let enemies = [];

let spawnTimer = 0;




// posisi jalur

function getLanes(){

    return [

        canvas.width/2-110,

        canvas.width/2,

        canvas.width/2+110

    ];

}




// buat musuh


function spawnEnemy(){


    let lanes = getLanes();


    let lane =
    Math.floor(Math.random()*3);



    enemies.push({


        x:lanes[lane],


        y:-150,


        width:55,


        height:95,


        speed:
        5 + Math.random()*4,



        color:
        `hsl(${Math.random()*360},80%,50%)`



    });



}






// update musuh


function updateEnemies(){



    spawnTimer++;



    // spawn setiap waktu tertentu

    if(spawnTimer>80){


        spawnTimer=0;


        spawnEnemy();


    }





    for(
        let i=enemies.length-1;
        i>=0;
        i--
    ){



        let enemy=enemies[i];



        enemy.y +=
        enemy.speed +
        player.speed*0.08;





        // keluar layar

        if(enemy.y > canvas.height+150){



            enemies.splice(i,1);



            score +=10;



            scoreText.textContent=score;



            if(score>highScore){


                highScore=score;


                localStorage.setItem(
                    "highscore",
                    highScore
                );


                highText.textContent=
                highScore;


            }



        }



    }



}






// gambar musuh


function drawEnemies(){



    for(let enemy of enemies){



        drawCar(

            enemy.x,

            enemy.y,

            enemy.color

        );


    }



}
