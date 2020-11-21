const CursoModel = require("../models/CursoModel")

class CursoController 
{
    async getCursos(req, res){
        const cursoModel = new CursoModel()
        const curso = await cursoModel.getCursos()
        res.status(200).json(curso)
    }
    async updateCurso(req, res){
        const cursoModel = new CursoModel()
        const curso = req.body//Alterar qualquer valor.
        await cursoModel.updateCurso(curso)
        res.status(200).json({message: "Sucesso"})
    }
    async insertCurso(req, res){
        const cursoModel = new CursoModel()
        const curso = req.body//Alterar qualquer valor.
        await cursoModel.insertCurso(curso)
        res.status(200).json({message: "Sucesso"})
    }
    async deleteCurso(req, res){
        const cursoModel = new CursoModel()
        const {idCurso} = req.query//Alterar qualquer valor.
        await cursoModel.deleteCurso(idCurso)
        res.status(200).json({message: "Sucesso"})
    }

}
module.exports = CursoController 