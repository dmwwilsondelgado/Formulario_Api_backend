import Ciudades from "../models/ciudades.js";
// import { ResponseProvider } from "/providers/ResponseProviders.js";
import { ResponseProvider } from "../providers/responseProviders.js";

import CiudadService from "../services/CiudadService.js";
class CiudadesController {
  static getAllCiudades = async (req, res) => {
    try {
      // Llamamos al servicio para obtener las ciudades
      const response = await CiudadService.getCiudades();
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.sucess(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR: AL INTERNO DEL SERVIDOR", 500);
    }
  };
  static getCiudadById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener las ciudades
      const response = await CiudadService.getCiudadById(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.sucess(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR: AL INTERNO DEL SERVIDOR", 500);
    }
  };

  static createCiudades = async (req, res) => {
    try {
      const { nombre_ciudades } = req.body;
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.create(nombre_ciudades);
      res.status(201).json(ciudades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateCiudades = async (req, res) => {
    const { id_ciudad } = req.params;
    const { nombre_ciudades } = req.body;

    console.log("ID recibido:", id_ciudad);
    console.log("Nombre recibido:", nombre_ciudades);

    try {
      const ciudadInstance = new Ciudades();
      const result = await ciudadInstance.update(nombre_ciudades, id_ciudad);
      res.status(200).json({
        success: true,
        message: "Ciudad actualizada",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  static updateParcialCiudades = async (req, res) => {
    const { id_ciudades } = req.params;
    const campos = req.body;
    try {
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.updateParcial(campos, id_ciudades);
      res.status(201).json(ciudades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteCiudades = async (req, res) => {
    try {
      const { id_ciudades } = req.params;
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.delete(id_ciudades);
      res.status(201).json(ciudades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default CiudadesController;
