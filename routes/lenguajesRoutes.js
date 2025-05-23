import express from "express";
import LenguajesController from "../controller/lenguajesController.js";

const router = express.Router();
router.get('/', LenguajesController.getAllLenguajes);
router.post('/', LenguajesController.createLenguajes);
router.put('/:id_lenguaje', LenguajesController.updateLenguajes);
router.patch('/:id_lenguaje', LenguajesController.updateParcialLenguajes);
router.delete('/:id_lenguaje', LenguajesController.deleteLenguajes);
export default router;