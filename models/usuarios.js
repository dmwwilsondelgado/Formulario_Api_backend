import connection from "../utils/db.js";

class Usuarios{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de los usuarios en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios");
      return rows;
    } catch (error) {
      throw new Error("ERROR: Al obtener los Usuarios");
    }
  }

  async create(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero) {
    try {
      const [result] = await connection.query("INSERT INTO usuarios (nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero]);
      return { id_usuario: result.id_usuario,
        nombre, 
        apellido, 
        telefono, 
        documento, 
        usuario, 
        contrasena, 
        id_ciudad, 
        id_genero 
      }
    } catch (error) {
      throw new Error("ERROR: Al crear el Usuario");
    }
  }

  async update(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero,id_usuario) {
    try {
      const [result] = await connection.query("UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ?, documento = ?, usuario = ?, contrasena = ?,id_ciudad = ?, id_genero = ? WHERE id_usuario = ?", 
        [nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero,id_usuario]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }
      return { 
        id_usuario,
        nombre, 
        apellido, 
        telefono, 
        documento, 
        usuario, 
        contrasena, 
        id_ciudad, 
        id_genero  
      }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Usuario");
    }
  }

  async updateParcial(campos, id_usuario) {
    try {
      let sql = "UPDATE usuarios SET ";
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
      sql += ` WHERE id_usuario = ${id_usuario}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Usuario no encontrado"); }
      return { mensaje: "Usuario Actualizado" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Usuario Parcialmente");
    }
  }
  
  async relacionadaConUsuarios(id_usuario) {
    const [usuarios] = await connection.query("SELECT * FROM lenguaje_usuario WHERE id_usuario = ?",[id_usuario]);
    return usuarios.length > 0;
  }
  
  async delete(id_usuario) {

    const usuariosRelacionado = await this.relacionadaConUsuarios(id_usuario);

    if (usuariosRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar el Usuario por que se encuentra asociado a uno o mas Lenguajes"
      };
    }

    const [result] = await connection.query("DELETE FROM usuarios WHERE id_usuario = ?",[id_lenguaje]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Usuario no encontrado"
      };
    }
    
    return{
      error: false,
      mensaje: "Usuario eliminado de manera Exitosa"
    }
  }
}

export default Usuarios;