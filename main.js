

const $botonStart = document.querySelector("#start");

let perdio = false;
let ronda = 0;
let JUGADASMAQUINA = [];
let JUGADASUSUARIO =[];




$botonStart.addEventListener("click",iniciarJuego);


function manejarRonda(){
    bloquearInputUsuario()
    mostrarDisplayMaquina()

    let elegido = obtenerJugadaAleatoria()
    JUGADASMAQUINA.push(elegido);

    const RETRASO_TURNO_JUGADOR = (JUGADASMAQUINA.length + 1)* 1000;
    
    JUGADASMAQUINA.forEach(function(bloque,index){
        const RETRASO_MAQUINA = (index + 1) * 1000;
        setTimeout(function(){
            resaltar(bloque);
        },RETRASO_MAQUINA);
    })

    setTimeout(function(){
        mostrarDisplayUsuario();
        desbloquearInputUsuario();
    },RETRASO_TURNO_JUGADOR);

    JUGADASUSUARIO =[];
    ronda++;
    actualizarNumeroRonda();
}

function bloquearInputUsuario(){
    document.querySelectorAll(".tablero div").forEach(function($bloque){
        $bloque.onclick= function(){ 
        };
    });
}
function desbloquearInputUsuario(){
    document.querySelectorAll(".tablero div").forEach(function($bloque){
        $bloque.onclick= manejarInputUsuario; 
    });
}




function manejarInputUsuario(e){
    const $bloque = e.target;
    let elegido = $bloque.className;
    resaltar(elegido);

    JUGADASUSUARIO.push(elegido);
    const $bloqueSistema = JUGADASMAQUINA[JUGADASUSUARIO.length-1];
    const index = JUGADASUSUARIO.length-1;
    if(JUGADASMAQUINA[index] !== JUGADASUSUARIO[index]){
        mostrarDisplayPerdio();
        bloquearInputUsuario();
        perdio=true;
        cambiarEstadoStart();
        return;
    }

    if (JUGADASMAQUINA.length === JUGADASUSUARIO.length){
        bloquearInputUsuario();
        setTimeout(manejarRonda,1000);
    }
}


function resaltar(elegido){
    const $botonElegido = document.querySelector(["."]+elegido);
    $botonElegido.classList.add("select");

    setTimeout(function(){
        $botonElegido.classList.remove("select");
    },500);

}

function actualizarNumeroRonda(){
    const $numeroRonda = document.querySelector("#numeroRonda");
    $numeroRonda.textContent=ronda;
}

function iniciarJuego(){
    ronda = 0;
    actualizarNumeroRonda()
    JUGADASMAQUINA = [];
    JUGADASUSUARIO =[];
    perdio=false;
    cambiarEstadoStart();
    manejarRonda();
}



function mostrarDisplayMaquina(){
    const $display = document.querySelector("#display");
    const $info = document.querySelector("#info");
    $display.classList.remove("turnoUsuario")
    $display.classList.add("turnoMaquina")
    $info.textContent = "Turno de la máquina";  
}

function mostrarDisplayUsuario(){
    const $display = document.querySelector("#display");
    const $info = document.querySelector("#info");
    $display.classList.remove("turnoMaquina");
    $display.classList.add("turnoUsuario");
    $info.textContent = "Turno del usuario/a"; 
}
function mostrarDisplayPerdio(){
    const $display = document.querySelector("#display");
    const $info = document.querySelector("#info");
    $display.classList.remove("turnoMaquina");
    $display.classList.remove("turnoUsuario");
    $display.classList.add("error");
    $info.textContent = `Perdiste! Tocá "Iniciar Juego" para iniciar`; 
}


function cambiarEstadoStart(){
    if(perdio === false){
        $botonStart.classList.add("reiniciar");
        $botonStart.textContent = "Reinciar"
    }else{
        $botonStart.classList.remove("reiniciar");
        $botonStart.textContent = "Iniciar Juego"
    } 
}


function obtenerJugadaAleatoria(){
    const $botones = document.querySelectorAll(".tablero div");
    let elegido;
    elegido = $botones[Math.floor(Math.random()*$botones.length)].className;
    return elegido;
}
