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
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const anchoMaximoMapa = 350

let jugadorId = null

let mokepones = []
let mokeponesEnemigos = []

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

let alturabuscada
let anchoDelMapa = window.innerWidth - 20

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}
alturabuscada = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturabuscada


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        //this.tipo=tipo
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.victorias = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
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

/* let langostelvis = new Mokepon('Langostelvis','fuego', './assets/langostelvis.png')
let pydos = new Mokepon('Pydos','agua', './assets/pydos.png')
let tucapalma = new Mokepon('Tucapalma','tierra', './assets/tucapalma.png') */

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' }
]
capipepo.ataques.push(CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

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
) 

hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
)
capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' }
)
ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)*/

mokepones.push(hipodoge, capipepo, ratigueya/* , langostelvis, pydos, tucapalma */)

function iniciarJuego() {
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

    unirseAljuego()
}
/*Peticion asincrona GET*/
function unirseAljuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            //console.log(res)
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })

}

function seleccionarMascotaJugador() {
    //sectionSeleccionarAtaque.style.display = "flex"    retiro esto y agrego el canva
    sectionSeleccionarMascota.style.display = "none"

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Seleccionaste PERDER')
    }

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)

    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

/*Peticion asincrona POST*/
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    //console.log(ataques)
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
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
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }

            //console.log('Jugador', ataqueJugador) 
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    nombreAtaquesEnemigo = ataquesMokeponEnemigo[ataqueAleatorio].nombre
    //console.log('Ataque enemigo' + nombreAtaquesEnemigo)

    if (nombreAtaquesEnemigo === '🔥') {
        ataqueEnemigo.push('FUEGO')
    } else if (nombreAtaquesEnemigo === '💧') {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    //console.log('Enemigo', ataqueEnemigo)
    inciarPelea()
}
function inciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("Hay un empate")
            /* Cuando  hay empate no se suman victorias */
            /* victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador */
        } else if ((ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA')
            || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO')
            || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')) {
            indexAmbosOponentes(index, index)
            crearMensaje("Felicidades has ganado esta ronda")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("Has perdido esta ronda")
            victoriasEnemigos++
            spanVidasEnemigo.innerHTML = victoriasEnemigos
        }
        revisarVidas()
    }
}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigos) {
        crearMensajeFinal('Esto fue un empate, gran lucha!!!')
    } else if (victoriasJugador > victoriasEnemigos) {
        crearMensajeFinal('La gloria es tuya, haz ganado 🎉')
    } else {
        crearMensajeFinal('Se perdio la batalla, pero no la guerra. Vuelve a intentarlo')
    }
}
function crearMensaje(resultado) {
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
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = '<strong>' + resultadoFinal + '</strong>'
    sectionReiniciar.style.display = "block"

}
function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Pinta el personaje
function pintarCanvas() {
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

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokeponEnemigo) {
        mokeponEnemigo.pintarMokepon()
    })

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null

                            const mokeponNombre = enemigo.mokepon.nombre || "Desconocido"
                            if (mokeponNombre === 'Hipodoge') {
                                mokeponEnemigo = new Mokepon('Hipodoge', './assets/hipodogeC.png', 5, './assets/hipodoge.png')
                            } else if (mokeponNombre === 'Capipepo') {
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/capipepoC.png', 5, './assets/capipepo.png')
                            } else if (mokeponNombre === 'Ratigueya') {
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/ratigueyaC.png', 5, './assets/ratigueya.png')
                            }
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
                    })
            }
        })
}
//Se mueve el personaje en el canva
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(e) {
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
function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    //console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    /*En esta condición no hay colisión*/
    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    //alert('Hay choque ' + enemigo.nombre)
}
window.addEventListener('load', iniciarJuego)

