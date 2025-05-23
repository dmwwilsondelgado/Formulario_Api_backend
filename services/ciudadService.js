import Ciudades from "../models/ciudades.js";
class CiudadService {
  static async getCiudades() {
    try {
      const ciudadInstance = new Ciudades();
      const ciudades = await ciudadInstance.getAll();
      if (ciudades.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY CIUDADES REGISTRADAS",
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
  static async getCityById(id)
  {
    try {
      const ciudadInstance = new Ciudad();
      const ciudad = await ciudadInstance.getById(id);
      // Validamos si no hay ciudades
      if (ciudad.length === 0) {
        return {
          error: true,
          code: 404,
          message: "CIUDAD NO ENCONTRADA"
        };
      }
      // Consultamos los usuarios asociados a la ciudad
      const usuarios = await ciudadInstance.usuarios(id);
      // Agregamos la propiedad usuarios al objeto ciudad
      ciudad.usuarios = usuarios;
      // Retornamos la ciudad obtenida
      return {
        error: false,
        code: 200,
        message: "CIUDAD OBTENIDA CORRECTAMENTE",
        data: ciudad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER LA CIUDAD",
      };
    }
  }
  static async createCity(nombre_ciudad)
  {
    try {
      const ciudadInstance = new Ciudad();
      const ciudad = await ciudadInstance.create(nombre_ciudad);
      // Validamos si no se pudo crear la categoría
      if (ciudad === null) {
        return {
          error: true,
          code: 400,
          message: "ERROR AL CREAR LA CIUDAD",
        };
      }
      // Retornamos la nueva ciudad creada
      return {
        error: false,
        code: 201,
        message: "CIUDAD CREADA CORRECTAMENTE",
        data: ciudad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL CREAR LA CIUDAD",
      };
    }
  }
  static async updateCity(id, campos)
  {
    try {
      const ciudadInstance = new Ciudad();
      // Consultamos la ciudad por id
      const ciudadExistente = await ciudadInstance.getById(id);
      // Validamos si no existe la ciudad
      if (ciudadExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "CIUDAD NO ENCONTRADA",
        };
      }
      const ciudad = await ciudadInstance.update(id, campos);
      // Validamos si no se pudo actualizar la ciudad
      if (ciudad === null) {
        return{
          error: true,
          code: 400,
          message: "ERROR AL ACTUALIZAR LA CIUDAD",
        };
      }
      // Retornamos la ciudad actualizada
      return {
        error: false,
        code: 200,
        message: "CIUDAD ACTUALIZADA CORRECTAMENTE",
        data: ciudad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ACTUALIZAR LA CIUDAD",
      };
    }
  }
  static async deleteCity(id) {
    try {
      const ciudadInstance = new Ciudad();
      // Consultamos la ciudad por id
      const ciudadExistente = await ciudadInstance.getById(id);
      // Validamos si no existe la ciudad
      if (ciudadExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "CIUDAD NO ENCONTRADA",
        };
      }
      // Consultamos las ciudades asociados a un usuario
      const ciudades = await ciudadInstance.usuarios(id);
      // Validamos si no se pudo actualizar la ciudad
      if (ciudades.length > 0) {
        return {
          error: true,
          code: 404,
          message: "NO SE PUEDE ELIMINAR LA CIUDAD, TIENE UNO O VARIOS USUARIOS ASOCIADOS.",
        };
      }
      // Procedemos a eliminar la ciudad
      const resultado = await ciudadInstance.delete(id);
      // Validamos si no se pudo eliminar la ciudad
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "CIUDAD ELIMINADA CORRECTAMENTE",
        data: ciudadExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ELIMINAR LA CIUDAD",
      };
    }
  }
}

export default CiudadService;
