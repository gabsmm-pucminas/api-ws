const express = require('express')
const apicache = require('apicache')
const port = 3000;

const app = express()
const cache = apicache.middleware('5 minutes')

app.use(cache)

const resultados = {
    pessoas: [
        { id: 1, nome: "Marcelo" },
        { id: 2, nome: "João" },
        { id: 3, nome: "Maria" }
    ],
    carros: [
        { id: 1, modelo: "Fusca" },
        { id: 2, modelo: "Gol" },
        { id: 3, modelo: "Palio" }
    ],
    animais: [
        { id: 1, nome: "Cachorro" },
        { id: 2, nome: "Gato" },
        { id: 3, nome: "Papagaio" }
    ]
}

app.get('/', (req, res) => {
    res.send('OK - Sucesso na requisição')
})

app.get('/pessoas', (req, res) => {
    res.send(resultados.pessoas)

    //Exibir Retorno HTTP Status
    const retornoHTTPcode = res.statusCode
    const retornoHTTPMessage = res.statusMessage
    console.log(retornoHTTPcode + retornoHTTPMessage)
})

app.get('/pessoas/:id', (req, res) => {
    let id = req.params.id
    if (id) {
        const jsonFilter = resultados.pessoas.filter((item) => item.id == id)
        res.send(jsonFilter)
        return
    } else {
        res.send(resultados.pessoas.id)
        return
    }
})

app.get('/carros', (req, res) => {
    res.send(resultados.carros)
})

app.get('/carros/:id', (req, res) => {
    let id = req.params.id
    if (id) {
        const jsonFilter = resultados.carros.filter((item) => item.id == id)
        res.send(jsonFilter)
        return
    } else {
        res.send(resultados.carros.id)
        return
    }
})

app.get('/animais', (req, res) => {
    res.send(resultados.animais)
})

app.get('/animais/:id', (req, res) => {
    let id = req.params.id
    if (id) {
        const jsonFilter = resultados.animais.filter((item) => item.id == id)
        res.send(jsonFilter)
        return
    } else {
        res.send(resultados.animais.id)
        return
    }
})

//Configurar Porta
app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`)
})

// Clear cache
app.get('/api/clearCache', (req, res) => {
    apicache.clear()
    res.send('Cache limpo')
})
