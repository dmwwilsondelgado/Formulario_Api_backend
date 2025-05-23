import Ciudades from "../models/ciudades.js";
class CiudadService {
  static async getCiudades()
  {
    try {
      const ciudadInstance = new Ciudades();
      const ciudades = await ciudadInstance.getAll();
      if (ciudades.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY CIUDADES REGISTRADAS"
        };
      }
      return {
        error: false,
        code: 200,
        message: "CIUDADES OBTENIDAS CORRECTAMENTE",
        data: ciudades,
      };
    } catch (error) {
      return {
        error: false,
        code: 200,
        message: "ERROR: AL OBTENER LAS CIUDADES",
        data: ciudades,
      };
    }
  }
  static async getCiudadById(id)
  {
    try {
      const ciudadInstance = new Ciudades();
      const ciudades = await ciudadInstance.getById(id);
      // Validamos si no hay ciudades
      if (ciudades.length === 0) {
        return {
          error: true,
          code: 404,
          message: "CIUDAD NO ENCONTRADA"
        };
      }
      // Consultamos los usuarios asociados a la ciudad
      const usuarios = await ciudadInstance.ciudades(id);
      // Agregamos la propiedad usuarios al objeto ciudades
      ciudades.usuarios = usuarios;
      // Retornamos la ciudad obtenida
      return {
        error: false,
        code: 200,
        message: "CIUDAD OBTENIDA CORRECTAMENTE",
        data: ciudades,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER LA CIUDAD",
      };
    }
  }
}

export default CiudadService;