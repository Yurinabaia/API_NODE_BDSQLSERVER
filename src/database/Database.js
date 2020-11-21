const mssql = require("mssql")//Chamadas de lib

class Database {
    config = {}

    constructor() {
        //PROCESS.ENV variavel de ambiente, ocultar valores a vista.
        //Env o aquivo está oculto, variavel de ambiente.
        this.config = {
            user: process.env.DATABASE_USER,//Usuario banco
            password: process.env.DATABASE_PASSWORD,//Senha do bd
            server: process.env.DATABASE_SERVER,//Servidor do bd
            port: parseInt(process.env.DATABASE_PORT),//Porta do banco
            database: process.env.DATABASE_NAME//Nome do banco
        }
    }

    getConnection(){
        return new mssql.ConnectionPool(this.config,(error)=>{console.log(error)}).connect()//Conectando com banco de dados.
    }
}

module.exports = Database
