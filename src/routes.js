const express = require("express")
const CursoController = require("./controller/CursoController")
const DisciplinaController = require("./controller/DisciplinaController")
const router = express.Router()
const ProfessorController = require("./controller/ProfessorController")

const professorController = new ProfessorController()//Instanciando classe
const disciplinaController = new DisciplinaController()//Instanciando classe
const cursoController = new CursoController()//Instanciando classe


router.get("/professor",professorController.getProfessor)
router.get("/professores",professorController.getProfessores)
router.post("/professor",professorController.insertProfessor)
router.put("/professor",professorController.updateProfessor)
router.delete("/professor",professorController.deleteProfessor)



router.get("/disciplina",disciplinaController.getDisciplinas)
router.post("/disciplina",disciplinaController.insertDisciplina)
router.put("/disciplina",disciplinaController.updateDisciplina)
router.delete("/disciplina",disciplinaController.deleteDisciplina)




router.get("/curso",cursoController.getCursos)
router.post("/curso",cursoController.insertCurso)
router.put("/curso",cursoController.updateCurso)
router.delete("/curso",cursoController.deleteCurso)

module.exports = router