function clase(str){
    return document.querySelector(str);
}

var palabras = [["redbull", "f1"], ["ferrari","f1"], ["mercedez", "f1"], ["alphine", "f1"], ["mclaren", "f1"], ["alfaromeo", "f1"], ["hass","f1"], ["alphatauri", "f1"], ["astonmartin","f1"], ["williams", "f1"]];
// Palabra a averiguar
let palabra = "";
let guion;

// Imagen
let imagenAhorcado= clase('.imagen-ahorcado');

// Numero aleatorio
let random;

// Elemento html de la palabra
let parrafoPalabra = clase(".parrafo-palabra");

// Contador de intentos
let intentos = clase('.intentos');
let conteoAciertos = 0;
let conteoErrores = 6;

// Boton de reset
const nuevojuego = clase(".nuevo-juego");

// Botones de iniciar, agregar, pista y desistir
const btnIniciar = clase(".btn-iniciar");
const btnInicioAgregar = clase(".btn-inicio-agregar");
const btnPista = clase('.btn-pista');
const btnDesistir = clase('.desistir');

// Abecedario
const letrasAbecedario = document.querySelectorAll('#btn-letra');
let boton;
let letra;
let intentosFin = clase('.intentos-finjuego');
let spanPista = clase('.span-pista');

// Secciones
const sectionIniciar = clase('.section-iniciar');
const sectionJuegoAhorcado = clase('.section-juego-ahorcado');
const sectionAgregar = clase('.section-agregar-palabra');
const divAhorcado = clase('.div-imagen-ahrcado');
let inputAgregarPalabra = clase('.input-agregar-palabra');
let inputAgregarPista = clase('.input-agregar-pista');
let descripcionAgregar = clase('.descripcion-agregar-palabra');
const btnAgregarJugar = clase('.btn-agregar-jugar');
const btnCancelar = clase('.btn-cancelar');


//funcion de agregar palabra
function SectionAgregarPalabra(){
    btnAgregarJugar.disabled='true';
    sectionIniciar.style.display='none';
    sectionAgregar.style.display='flex';
    inputAgregarPalabra.value='';
    //inputAgregarPista.value='';
}

function esValido(c) {
    c = c.charCodeAt(0);
    return (c >= 97 && c <= 122) || (c >=65 && c <=90);
}
function validarEntrada(cadena) {
    for (var i = 0; i < cadena.length; i++) {
    if (!esValido(cadena[i])) {
        break;
        }
    }
    return i == cadena.length;
}   
function validarInput(elem) {
    let txt = elem.value;
    if (!validarEntrada(txt)||inputAgregarPalabra.value=="") {
        elem.classList.add('invalido');
        btnAgregarJugar.disabled=true;
        descripcionAgregar.textContent='Máximo 11 caracteres. Sólo letras.';
        } else {
        elem.classList.remove('invalido');
        btnAgregarJugar.disabled=false;        
    }
}

function agregarJugar(){
    palabras.push([inputAgregarPalabra.value]);
    iniciarJuegoAhorcado();
    palabraAzar();
}

function cancelar(){
    sectionIniciar.style.display='flex';
    sectionAgregar.style.display='none';
    inputAgregarPalabra.value='';
    //inputAgregarPista.value='';
    inputAgregarPalabra.classList.remove('invalido');
    descripcionAgregar.textContent='Las palabras que agregues se eliminarán cuando refresques la página.';
}

btnInicioAgregar.onclick= SectionAgregarPalabra;
btnAgregarJugar.onclick = agregarJugar;
btnCancelar.onclick = cancelar;

// Iniciar juego
btnIniciar.onclick = function(){
    palabraAzar();
    iniciarJuegoAhorcado();   
}

function iniciarJuegoAhorcado(){

    sectionIniciar.style.display='none';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='flex';
    divAhorcado.style.display='flex';
}


//Generar palabra al azar
function palabraAzar(){
    imagenAhorcado.src='imgs/hombre6.png';
    conteoAciertos=0;
    conteoErrores=6;
    spanPista.innerHTML='';
    //btnPista.disabled=false;
    intentosFin.innerHTML=('Intentos restantes: '+ conteoErrores);
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=false;
    }
    parrafoPalabra.textContent='';
    random = Math.floor(Math.random()*palabras.length);
    palabra = palabras[random][0].toUpperCase();
    for(i=0;i<palabra.length; i++){
        let espacio = document.createElement('span');
        guion=document.createTextNode('_');
        espacio.appendChild(guion);
        parrafoPalabra.appendChild(espacio);
    } 
   
    spanPista.innerHTML = palabras[random][1];
    spanPista.style.visibility='hidden';
    palabras.splice(palabras.indexOf(palabras[random]),1); 
}

nuevojuego.onclick=palabraAzar;

//Funcion al hacer click en las letras
for(i=0;i<letrasAbecedario.length;i++){
    letrasAbecedario[i].addEventListener('click', clickLetras);
}
function clickLetras(event){
    const guiones = document.querySelectorAll('.parrafo-palabra span');
    boton = event.target;
    boton.disabled=true;
    letra=boton.innerHTML.toUpperCase();
    let acierto = false;
    for(i=0;i<palabra.length;i++){
        if(letra==palabra[i]){
            acierto=true;
            guiones[i].innerHTML=letra;
            conteoAciertos++;
        }
    }
    if(acierto==false){
        conteoErrores--;
        let Asource = `imgs/hombre${conteoErrores}.png`;
        imagenAhorcado.src = Asource;
        intentosFin.innerHTML=('Intentos restantes: '+ conteoErrores);
    }
    
    if(conteoErrores==0){
        intentosFin.innerHTML=('FALLASTE😢 La palabra era:');
        parrafoPalabra.innerHTML=(palabra);
        gameOver();
    }else if(conteoAciertos==palabra.length){
        intentosFin.innerHTML=('Felicidades😊 HAS GANADO!🎊');
        gameOver();
    }
}

// Fin del juego, deshabilitar letras
function gameOver(){
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=true;
    }
    //btnPista.disabled=true;
    spanPista.innerHTML='';
}

// Desistir y volver al inicio
btnDesistir.onclick= desistir;
function desistir(){
    sectionIniciar.style.display='flex';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='none';
    //toggle.style.display='flex';
    conteoErrores=6;
}
