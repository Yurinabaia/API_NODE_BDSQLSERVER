/*module.exports.getProfessor = async () => {

}
module.exports.updateProfessor = async() => {

}
module.exports.insertProfessor = async() => {

}
module.exports.deleteProfessor = async() => {

}*/
const ProfessorModel = require("../models/ProfessorModel")

class ProfessorController 
{
    async getProfessores(req, res){
        const professorModel = new ProfessorModel()
        const professores = await professorModel.getProfessores()
        res.status(200).json(professores)
    }
    async getProfessor(req, res){
        const professorModel = new ProfessorModel()
        const {cpf} = req.query//Buscando um campo especifico, destrutura.  
        const professor = await professorModel.getProfessor(cpf)
        res.status(200).json(professor)
    }
    async updateProfessor(req, res){
        const professorModel = new ProfessorModel()
        const professor = req.body//Alterar qualquer valor.
        await professorModel.updateProfessor(professor)
        res.status(200).json({message: "Sucesso"})
    }
    async insertProfessor(req, res){
        const professorModel = new ProfessorModel()
        const professor = req.body//Alterar qualquer valor.
        await professorModel.insertProfessor(professor)
        res.status(200).json({message: "Sucesso"})
    }
    async deleteProfessor(req, res){
        const professorModel = new ProfessorModel()
        const {cpf} = req.query//Alterar qualquer valor.
        await professorModel.deleteProfessor(cpf)
        res.status(200).json({message: "Sucesso"})
    }

}
module.exports = ProfessorController 