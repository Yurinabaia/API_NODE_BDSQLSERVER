const mssql = require("mssql")

const Database = require("../database/Database")
class ProfessorModel {
    async getProfessores() {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `SELECT nomeProfessor, cpf, quantidadeDisciplina FROM Professores`

            const results = await connection.request().query(query)

            return results.recordset //Pegar todoas as colunas, um vetor

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async getProfessor(cpf) {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `SELECT nomeProfessor, cpf, quantidadeDisciplina FROM Professores
            WHERE cpf = @CPF ` 

            const results = await connection.request()
            .input("CPF", mssql.VarChar, cpf).query(query)//Buscando valor esepecifico, sem SQL INJECTION

            return results.recordset[0] //Pegar todoas as colunas, um vetor

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }
    async updateProfessor(professor) {
        try {
            const database = new Database()
            const connection = await database.getConnection()
            
            /*
            const query = `UPDATE Professores
            SET NomeProfessor = @NomeProfesor, 
            QuantidadeDisciplina = (SELECT COUNT(*)  
            FROM DisciplinasProfessor WHERE ProfessorCPF = @CPF) WHERE cpf = @CPF` 
            */

            const query = `UPDATE Professores
            SET NomeProfessor = @NomeProfesor, 
            QuantidadeDisciplina = @QuantidadeDisciplina WHERE cpf = @CPF`
            const results = await connection.request()
            .input("NomeProfesor", mssql.VarChar, professor.nome)
            .input("QuantidadeDisciplina", mssql.Int, professor.quantiDisciplina)
            .input("CPF", mssql.VarChar, professor.cpf).query(query)//Buscando valor esepecifico, sem SQL INJECTION


            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async insertProfessor(professor) {
        try {
            const database = new Database()
            const connection = await database.getConnection()
            
            const query = `INSERT INTO Professores VALUES(@NomeProfessor, @CPF, @QuantidadeDisciplina)` 
            
            const results = await connection.request()
            .input("NomeProfessor", mssql.VarChar, professor.nome)
            .input("QuantidadeDisciplina", mssql.VarChar, professor.quantiDisciplina)
            .input("CPF", mssql.VarChar, professor.cpf).query(query)//Buscando valor esepecifico, sem SQL INJECTION

            await professor.disciplinas.map(d=> {
                this.insertDisciplinaProfessor(professor.cpf, d, connection)
            })
            /*
            if(results.rowsAffected[0] > 0){
                const queryUpdate = `UPDATE Professores
                SET QuantidadeDisciplina = (SELECT COUNT(*)  
                FROM DisciplinasProfessor WHERE ProfessorCPF = @CPF) WHERE cpf = @CPF` 
                
                const resultsUpdate = await connection.request()
                .input("CPF", mssql.VarChar, professor.cpf).query(queryUpdate)//Buscando valor esepecifico, sem SQL INJECTION
            }*/
            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }

    async insertDisciplinaProfessor(cpf, IdDisciplina, connection){
        try{
            const query = `INSERT INTO DisciplinasProfessor VALUES(@CPF, @IdDisciplina)` 
                
            const results = await connection.request()
            .input("CPF", mssql.VarChar, cpf)
            .input("IdDisciplina", mssql.Int, IdDisciplina).query(query)//Buscando valor esepecifico, sem SQL INJECTION
        }
        catch(error){
            console.log("Banco " + error)
        }
    }


    async deleteProfessor(cpf) {
        try {
            const database = new Database()
            const connection = await database.getConnection()

            const query = `DELETE Professores WHERE CPF = @CPF` 

            const results = await connection.request()
            .input("CPF", mssql.VarChar, cpf).query(query)//Buscando valor esepecifico, sem SQL INJECTION

            return results.rowsAffected[0] //Afetar varias linhas

        }
        catch (error) {
            console.log("Banco " + error)
        }
    }
}
module.exports = ProfessorModel