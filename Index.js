const env = require("dotenv")
const express = require("express")
const bodyParse = require("body-parser")

const routes = require("./src/routes")

env.config()


const app = express()
app.use(express.json())
app.use(routes)

const porta = process.env.SERVER_PORT
app.listen(porta||8080,()=>console.log(`Serve está rodando na porta ${porta || 8080} `))


