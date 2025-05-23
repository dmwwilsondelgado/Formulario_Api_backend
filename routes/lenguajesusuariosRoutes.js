import express from "express";
import Lenguajes_Usuarios from "../controller/lenguajesusuariosController.js";

const router = express.Router();

router.get('/', Lenguajes_Usuarios.getAllLenguajesUsuarios);
router.post('/', Lenguajes_Usuarios.createLenguajesUsuarios);
router.put('/:id', Lenguajes_Usuarios.updateLenguajesUsuarios);
router.patch('/:id_usuario', Lenguajes_Usuarios.updateParcialLenguajesUsuarios);
router.delete('/:id_usuario', Lenguajes_Usuarios.deleteLenguajesUsuarios);

export default router;