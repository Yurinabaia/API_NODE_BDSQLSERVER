const DisciplinaModel = require("../models/DisciplinaModel")

class DisciplinaController 
{
    async getDisciplinas(req, res){
        const disciplanaModel = new DisciplinaModel()
        const diciplinas = await disciplanaModel.getDisciplinas()
        res.status(200).json(diciplinas)
    }
    async updateDisciplina(req, res){
        const disciplanaModel = new DisciplinaModel()
        const diciplina = req.body//Alterar qualquer valor.
        await disciplanaModel.updateDisciplina(diciplina)
        res.status(200).json({message: "Sucesso"})
    }
    async insertDisciplina(req, res){
        const disciplanaModel = new DisciplinaModel()
        const diciplina = req.body//Alterar qualquer valor.
        await disciplanaModel.insertDisciplina(diciplina)
        res.status(200).json({message: "Sucesso"})
    }
    async deleteDisciplina(req, res){
        const disciplanaModel = new DisciplinaModel()
        const {idDisciplina} = req.query//Alterar qualquer valor.
        await disciplanaModel.deleteDisciplina(idDisciplina)
        res.status(200).json({message: "Sucesso"})
    }

}
module.exports = DisciplinaController 