import express from "express";
import GenerosController from "../controller/generosController.js";

const router = express.Router();

router.get('/', GenerosController.getAllGeneros);
router.post('/', GenerosController.createGeneros);
router.put('/:id_genero', GenerosController.updateGeneros);
router.patch('/:id_genero', GenerosController.updateParcialGeneros);
router.delete('/:id_genero', GenerosController.deleteGeneros);


export default router;