import express from "express";
import CiudadesController from "../controller/ciudadesController.js";


const router = express.Router();

router.get('/', CiudadesController.getAllCiudades);

// aca el crud 
router.get('/:id', CiudadesController.getCiudadById);
router.post('/', CiudadesController.createCiudades);
router.put('/:id_ciudad', CiudadesController.updateCiudades);
router.patch('/:id_ciudad', CiudadesController.updateParcialCiudades);
router.delete('/:id_ciudad', CiudadesController.deleteCiudades);


export default router;