//Variables globales
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const bontonMascotaJugador = document.getElementById('boton-mascota')
const botonReinicar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas =document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []

let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones

let inputHipodoge
let inputCapipepo
let inputRatigueya

let botonFuego
let botonAgua
let botonTierra

let botones = []

let mascotaJugador
let mascotaJugadorObjeto

let victoriasJugador = 0
let victoriasEnemigos = 0
let vidasJugador = 3
let vidasEnemigo = 3

let ataquesMokepon
let ataquesMokeponEnemigo

let nombreAtaquesEnemigo

let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")

let intervalo

let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10){
        this.nombre=nombre
        //this.tipo=tipo
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.victorias = []
        this.x = x
        this.y = y
        this.ancho = 50
        this.alto = 50
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
        this.mapaFoto, 
        this.x,
        this.y,
        this.ancho,
        this.alto
    )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodogeC.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/capipepoC.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueyaC.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/hipodogeC.png', 5, './assets/hipodoge.png', 270, 190)
let capipepoEnemigo = new Mokepon('Capipepo', './assets/capipepoC.png', 5, './assets/capipepo.png', 270, 140)
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/ratigueyaC.png', 5, './assets/ratigueya.png', 220, 165)

/* let langostelvis = new Mokepon('Langostelvis','fuego', './assets/langostelvis.png')
let pydos = new Mokepon('Pydos','agua', './assets/pydos.png')
let tucapalma = new Mokepon('Tucapalma','tierra', './assets/tucapalma.png') */
hipodoge.ataques.push(
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'}
)
capipepo.ataques.push(
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'}
)
ratigueya.ataques.push(
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🌱', id: 'boton-tierra'}
)
/* langostelvis.ataques.push(
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🌱', id: 'boton-tierra'}
)
pydos.ataques.push(
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'}
)
tucapalma.ataques.push(
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'}
) */

mokepones.push(hipodoge, capipepo, ratigueya/* , langostelvis, pydos, tucapalma */)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"

    sectionVerMapa.style.display = 'none'

    mokepones.forEach(
        (mokepon) => {
            opcionDeMokepones = `
                <input type="radio" name="mascota" id=${mokepon.nombre}>
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
            `
        contenedorTarjetas.innerHTML += opcionDeMokepones
            inputHipodoge = document.getElementById('Hipodoge')
            inputCapipepo = document.getElementById('Capipepo')
            inputRatigueya = document.getElementById('Ratigueya')
        }
    )

    bontonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReinicar.addEventListener('click', reiniciarJuego)
}
function seleccionarMascotaJugador(){
    //sectionSeleccionarAtaque.style.display = "flex"    retiro esto y agrego el canva
    sectionSeleccionarMascota.style.display = "none"

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert('Seleccionaste PERDER')
    }
    
    extraerAtaques(mascotaJugador)

    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    //console.log(ataques)
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones = document.querySelectorAll('.BAtaque')
}
function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            
            //console.log('Jugador', ataqueJugador) 
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    ataqueAleatorio = aleatorio(0, mokepones.length - 1)

    nombreAtaquesEnemigo = ataquesMokeponEnemigo[ataqueAleatorio].nombre

    if(nombreAtaquesEnemigo === '🔥'){
        ataqueEnemigo.push('FUEGO')
    }else if(nombreAtaquesEnemigo === '💧'){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    //console.log('Enemigo', ataqueEnemigo)
    inciarPelea()
}
function inciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate(){

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("Hay un empate")
            /* Cuando  hay empate no se suman victorias */
            /* victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador */
        } else if((ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')){
            indexAmbosOponentes(index, index)
            crearMensaje("Felicidades has ganado esta ronda")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("Has perdido esta ronda")
            victoriasEnemigos++
            spanVidasEnemigo.innerHTML = victoriasEnemigos
        }
        revisarVidas()
    }
}
function revisarVidas(){
    if(victoriasJugador === victoriasEnemigos){
        crearMensajeFinal('Esto fue un empate, gran lucha!!!') 
    }else if(victoriasJugador > victoriasEnemigos){
        crearMensajeFinal('La gloria es tuya, haz ganado 🎉')
    }else{
        crearMensajeFinal('Se perdio la batalla, pero no la guerra. Vuelve a intentarlo')
    }
}
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = 'Tú mascota atacó con <strong>' + ataqueJugador + '</strong>, la mascota del enemigo atacó con <strong>' + ataqueEnemigo + '</strong> - ' + resultado
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = '<strong>'+resultadoFinal+'</strong>'
    sectionReiniciar.style.display = "block"

}
function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Pinta el personaje
function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
}
//Se mueve el personaje en el canva
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = - 5
}
function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = - 5
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(e){
    console.log(e.key)
    switch (e.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
    
        default:
            break;
    }
}
function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}
window.addEventListener('load', iniciarJuego)

