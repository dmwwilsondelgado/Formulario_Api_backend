import connection from "../utils/db.js";

class Generos{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de los generos en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM generos");
      return rows;
    } catch (error) {
      throw new Error("ERROR: al obtener los Generos");
    }
  }

  async create(genero) {
    try {
      const [result] = await connection.query("INSERT INTO generos (genero) VALUES (?)",
        [genero]);
      return { id_genero: result.id_genero, genero }
    } catch (error) {
      throw new Error("ERROR: Al crear el Genero");
    }
  }

  async update(genero, id_genero) {
    try {
      const [result] = await connection.query("UPDATE generos SET genero = ? WHERE id_genero = ?", 
        [genero, id_genero]);
      if (result.affectedRows === 0) {
        throw new Error("Genero no encontrado");
      }
      return { id_genero, genero }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Genero");
    }
  }

  async updateParcial(campos,id_genero) {
    try {
      let sql = "UPDATE generos SET ";
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
      sql += ` WHERE id_genero = ${id_genero}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Genero no encontrado"); }
      return { mensaje: "Genero Actualizado" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Genero parcialmente");
    }
  }
  
  async relacionadaConUsuarios(id_genero) {
    const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_ciudad = ?",[id_genero]);
    return usuarios.length > 0;    
  }
  
  async delete(id_genero) {

    const generoRelacionado = await this.relacionadaConUsuarios(id_genero);

    if (generoRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar el Genero por que se encuentra asociado a uno o mas Usuarios"
      };
    }

    const [result] = await connection.query("DELETE FROM generos WHERE id_genero = ?",[id_genero]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Genero no encontrado"
      };
    }
    
    return{
      error: false,
      mensaje: "Genero eliminado de manera Exitosa"
    }
  }
}

export default Generos;