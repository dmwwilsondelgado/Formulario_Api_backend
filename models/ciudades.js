import connection from "../utils/db.js";

class Ciudades{

  // Método para obtener todas las categorías
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM ciudades");
      return rows; // Retorna las ciudades obtenidas
    } catch (error) {
      throw new Error("ERROR: AL OBTENER CIUDADES");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM ciudades WHERE id_ciudad = ?",[id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra la ciudad
        return [];
      }
      // Retorna la ciudad encontrada
      return rows[0];
    } catch (error) {
      throw new Error("ERROR AL OBTENER LA CIUDAD");
    }
  }

  async create(nombre_ciudad) {
    try {
      const [result] = await connection.query("INSERT INTO ciudades (nombre_ciudad) VALUES (?)",
        [nombre_ciudad]);
      return { id_ciudad: result.id_ciudad, nombre_ciudad }
    } catch (error) {
      throw new Error("ERROR: Al crear la Ciudad");
    }
  }

  async update(nombre_ciudad, id_ciudad) {
    try {
      const [result] = await connection.query("UPDATE ciudades SET nombre_ciudad = ? WHERE id_ciudad = ?", 
        [nombre_ciudad, id_ciudad]);
      if (result.affectedRows === 0) {
        throw new Error("Ciudad no encontrada");
      }
      return { id_ciudad, nombre_ciudad }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la Ciudad");
    }
  }

  async updateParcial(campos,id_ciudad) {
    try {
      let sql = "UPDATE ciudades SET ";
      for (let cont = 0; cont < Object.keys(campos).length; cont++) {
        let value = Object.keys(campos)[cont];
        sql += `${value} = '${campos[value]}'`;
        if (cont == Object.keys(campos).length - 1) {
          sql += "";
        }
        else {
          sql += ",";
        }
      }
      sql += ` WHERE id_ciudad = ${id_ciudad}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Ciudad no encontrada"); }
      return { mensaje: "Ciudad Actualizada" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la Ciudad parcialmente");
    }
  }
  
  async relacionadaConUsuarios(id_ciudad) {
    const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_ciudad = ?",[id_ciudad]);
    return usuarios.length > 0;    
  }
  
  async delete(id_ciudad) {

    const ciudadRelacionado = await this.relacionadaConUsuarios(id_ciudad);

    if (ciudadRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar la Ciudad por que se encuentra asociada a uno o mas Usuarios"
      };
    }

    const [result] = await connection.query("DELETE FROM ciudades WHERE id_ciudad = ?",[id_ciudad]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Ciudad no encontrada"
      };
    }
    
    return{
      error: false,
      mensaje: "Ciudad eliminada de manera Exitosa"
    }
  }
  // Método para listar los productos de una categoría
  async ciudades(id_ciudad) {
    const [rows] = await connection.query(
      "SELECT * FROM ciudades WHERE id_ciudad = ?",
      [id_ciudad]
    );
    return rows;
  }
}

export default Ciudades;