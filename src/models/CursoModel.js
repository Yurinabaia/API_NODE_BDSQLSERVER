const mssql = require("mssql")

const Database = require("../database/Database")
class CursoModel {
    async getCursos() {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `SELECT idCurso, nomeCurso, idCalendario FROM Cursos`

            const results = await connection.request().query(query)

            return results.recordset //Pegar todoas as colunas, um vetor

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async updateCurso(curso) {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `UPDATE Cursos SET nomeCurso = @NomeCurso, 
            idCalendario = @IdCalendario WHERE idCurso = @IdCurso` 

            const results = await connection.request()
            .input("NomeCurso", mssql.VarChar, curso.nome)
            .input("IdCalendario", mssql.Int, curso.idCalendario)
            .input("IdCurso", mssql.Int, curso.idCurso).query(query)//Buscando valor esepecifico, sem SQL INJECTION


            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async insertCurso(curso) {
        try {
            const database = new Database()
            const connection = await database.getConnection()
            1, 'Sistemas de Informação', 1
            const query = `INSERT INTO Cursos VALUES(@IdCurso, @NomeCurso, @IdCalendario)` 
            
            const results = await connection.request()
            .input("NomeCurso", mssql.VarChar, curso.nome)
            .input("IdCalendario", mssql.Int, curso.idCalendario)
            .input("IdCurso", mssql.Int, curso.idCurso).query(query)//Buscando valor esepecifico, sem SQL INJECTION
            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }
    async deleteCurso(idCurso) {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `DELETE Cursos WHERE idCurso = @IdCurso` 

            const results = await connection.request()
            .input("IdCurso", mssql.VarChar, idCurso).query(query)//Buscando valor esepecifico, sem SQL INJECTION

            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }
}
module.exports = CursoModel