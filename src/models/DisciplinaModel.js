const mssql = require("mssql")

const Database = require("../database/Database")
class DisciplinaModel {
    async getDisciplinas() {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `SELECT idDisciplina, nomeDisciplina, regimeDisciplina, 
            idPeriodo, tipoDisciplina FROM Disciplinas`

            const results = await connection.request().query(query)

            return results.recordset //Pegar todoas as colunas, um vetor

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async updateDisciplina(disciplina) {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `UPDATE Disciplinas SET nomeDisciplina = @NomeDisciplina, 
            regimeDisciplina = @RegimeDisciplina, 
            idPeriodo = @IdPeriodo, tipoDisciplina = @TipoDisciplina WHERE idDisciplina = @IdDisciplina` 

            const results = await connection.request()
            .input("NomeDisciplina", mssql.VarChar, disciplina.nome)
            .input("RegimeDisciplina", mssql.VarChar, disciplina.regime)
            .input("IdPeriodo", mssql.Int, disciplina.idPerido)
            .input("TipoDisciplina", mssql.VarChar, disciplina.tipoDisciplina)
            .input("IdDisciplina", mssql.Int, disciplina.idDisciplina).query(query)//Buscando valor esepecifico, sem SQL INJECTION


            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async insertDisciplina(disciplina) {
        try {
            const database = new Database()
            const connection = await database.getConnection()
            
            const query = `INSERT INTO Disciplinas VALUES(@NomeDisciplina, @IdDisciplina, 
                '@RegimeDisciplina', @IdPeriodo, '@TipoDisciplina')` 
            
            const results = await connection.request()
            .input("NomeDisciplina", mssql.VarChar, disciplina.nome)
            .input("IdDisciplina", mssql.Int, disciplina.idDisciplina)
            .input("RegimeDisciplina", mssql.VarChar, disciplina.regime)
            .input("IdPeriodo", mssql.Int, disciplina.idPerido)
            .input("TipoDisciplina", mssql.VarChar, disciplina.tipo).query(query)//Buscando valor esepecifico, sem SQL INJECTION
            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }
    async deleteDisciplina(idDisciplina) {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `DELETE Disciplinas WHERE idDisciplina = @IdDisciplina` 

            const results = await connection.request()
            .input("IdDisciplina", mssql.VarChar, idDisciplina).query(query)//Buscando valor esepecifico, sem SQL INJECTION

            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }
}
module.exports = DisciplinaModel