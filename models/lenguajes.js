import connection from "../utils/db.js";

class Lenguajes{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de los lenguajes en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguajes");
      return rows;
    } catch (error) {
      throw new Error("ERROR: Al obtener los Lenguajes");
    }
  }

  async create(nombre_lenguaje) {
    try {
      const [result] = await connection.query("INSERT INTO lenguajes (nombre_lenguaje) VALUES (?)",
        [nombre_lenguaje]);
      return { id_lenguaje: result.id_lenguaje, nombre_lenguaje }
    } catch (error) {
      throw new Error("ERROR: Al crear el Lenguaje");
    }
  }

  async update(nombre_lenguaje, id_lenguaje) {
    try {
      const [result] = await connection.query("UPDATE lenguajes SET nombre_lenguaje = ? WHERE id_lenguaje = ?", 
        [nombre_lenguaje, id_lenguaje]);
      if (result.affectedRows === 0) {
        throw new Error("Lenguaje no encontrado");
      }
      return { id_lenguaje, nombre_lenguaje }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Lenguaje");
    }
  }

  async updateParcial(campos, id_lenguaje) {
    try {
      let sql = "UPDATE lenguajes SET ";
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
      sql += ` WHERE id_lenguaje = ${id_lenguaje}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Lenguaje no encontrado"); }
      return { mensaje: "Lenguaje Actualizado" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Lenguaje Parcialmente");
    }
  }
  
  async relacionadaConUsuarios(id_lenguaje) {
    const [usuarios] = await connection.query("SELECT * FROM lenguajes WHERE id_lenguaje = ?",[id_lenguaje]);
    return usuarios.length > 0;
  }
  
  async delete(id_lenguaje) {

    const lenguajeRelacionado = await this.relacionadaConUsuarios(id_lenguaje);

    if (lenguajeRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar el Lenguaje por que se encuentra asociado a uno o mas Usuarios"
      };
    }

    const [result] = await connection.query("DELETE FROM lenguajes WHERE id_lenguaje = ?",[id_lenguaje]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Lenguaje no encontrado"
      };
    }
    
    return{
      error: false,
      mensaje: "Lenguaje eliminado de manera Exitosa"
    }
  }
}

export default Lenguajes;