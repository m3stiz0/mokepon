const express = require("express")

const app = express()

const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }
}

/* End Point */
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)
    jugadores.push(Jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send("Hola desde el  servidor -> " + id)
})
app.listen(8080, () => {
    console.log('Servidor funcionando')
})