/* =========================
   RESET
========================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

html,
body{
    width:100%;
    height:100%;
    overflow:hidden;
    background:#111;
}

/* =========================
   CANVAS
========================= */

canvas{
    display:block;
    width:100vw;
    height:100vh;
    background:#87CEEB;
}

/* =========================
   HUD
========================= */

#hud{

    position:fixed;

    top:20px;
    left:20px;

    z-index:999;

    color:#fff;

    background:rgba(0,0,0,.35);

    padding:18px 24px;

    border-radius:16px;

    backdrop-filter:blur(8px);

    border:2px solid rgba(255,255,255,.15);

    min-width:240px;

}

.hud-item{

    font-size:22px;

    font-weight:bold;

    margin:10px 0;

    text-shadow:2px 2px 4px #000;

}

.unit{

    font-size:16px;

    opacity:.85;

}

/* =========================
   GAME OVER
========================= */

#gameOver{

    position:fixed;

    inset:0;

    display:none;

    justify-content:center;

    align-items:center;

    flex-direction:column;

    background:rgba(0,0,0,.75);

    z-index:2000;

    color:#fff;

    text-align:center;

}

#gameOver h1{

    font-size:72px;

    color:#ff4040;

    margin-bottom:20px;

    text-shadow:0 0 20px red;

}

#gameOver p{

    font-size:28px;

    margin-top:10px;

}

#finalScore{

    font-size:60px;

    color:gold;

    margin:20px 0;

    text-shadow:0 0 15px gold;

}

#restartBtn{

    margin-top:20px;

    padding:15px 45px;

    border:none;

    border-radius:12px;

    cursor:pointer;

    font-size:24px;

    font-weight:bold;

    background:#00c853;

    color:#fff;

    transition:.25s;

}

#restartBtn:hover{

    transform:scale(1.05);

    background:#00e676;

}

.hint{

    margin-top:25px;

    font-size:20px;

    opacity:.8;

}

/* =========================
   RESPONSIVE
========================= */

@media(max-width:700px){

#hud{

    min-width:180px;

    padding:14px;

}

.hud-item{

    font-size:18px;

}

#gameOver h1{

    font-size:48px;

}

#finalScore{

    font-size:42px;

}

#restartBtn{

    font-size:18px;

    padding:12px 30px;

}

}
#controls{
    position:fixed;
    left:0;
    right:0;
    bottom:25px;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    padding:0 25px;
    z-index:9999;
    pointer-events:none;
}

.steer{
    display:flex;
    gap:18px;
}

.drive{
    display:flex;
    flex-direction:column;
    gap:18px;
    align-items:center;
}

#controls button{
    pointer-events:auto;
    user-select:none;

    border:none;
    border-radius:50%;

    background:rgba(0,0,0,.45);
    backdrop-filter:blur(8px);

    color:#fff;

    box-shadow:
    0 5px 15px rgba(0,0,0,.35);

    transition:.1s;
}

#controls button:active{
    transform:scale(.92);
}

/* Tombol kiri kanan */
#left,
#right{
    width:95px;
    height:95px;
    font-size:42px;
}

/* Tombol GAS */
#up{
    width:120px;
    height:120px;
    font-size:54px;
    background:#19b64b;
}

/* Tombol REM */
#down{
    width:90px;
    height:90px;
    font-size:40px;
    background:#d63031;
}

@media(max-width:600px){

    #left,
    #right{
        width:80px;
        height:80px;
        font-size:36px;
    }

    #up{
        width:110px;
        height:110px;
        font-size:50px;
    }

    #down{
        width:80px;
        height:80px;
        font-size:34px;
    }

}

#controls button{

    width:70px;
    height:70px;

    border-radius:50%;

    border:3px solid white;

    background:rgba(0,0,0,0.5);

    color:white;

    font-size:35px;

    pointer-events:auto;

    user-select:none;

}


.steer,
.drive{
    display:flex;
    flex-direction:row;
    gap:20px;
    align-items:flex-end;
}

}


/* HP portrait */
@media(max-width:600px){

    #controls button{

        width:60px;
        height:60px;

        font-size:28px;

    }

}
