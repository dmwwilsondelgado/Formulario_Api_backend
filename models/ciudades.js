import connection from "../utils/db.js";

class Ciudades {
  // Método para obtener todas las categorías
  async getAll() {
    try {
      // const [rows] = await connection.query("")
      const [rows] = await connection.query("SELECT * FROM Ciudades");
      return rows; // Retorna las ciudades obtenidas
    } catch (error) {
      throw new Error("ERROR: AL OBTENER CIUDADES");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM Ciudades WHERE id_ciudades = ?",
        [id]
      );
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

  async create(nombre_ciudades) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Ciudades (nombre_ciudades) VALUES (?)",
        [nombre_ciudades]
      );
      return { id_ciudades: result.id_ciudades, nombre_ciudades };
    } catch (error) {
      throw new Error("ERROR: Al crear la Ciudad");
    }
  }

  async update(nombre_ciudades, id_ciudades) {
    try {
      const [result] = await connection.query(
        "UPDATE Ciudades SET nombre_ciudades = ? WHERE id_ciudades = ?",
        [nombre_ciudades, id_ciudades]
      );
      if (result.affectedRows === 0) {
        throw new Error("Ciudad no encontrada");
      }
      return { id_ciudades, nombre_ciudades };
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la Ciudad");
    }
  }

  async updateParcial(campos, id_ciudades) {
    try {
      let sql = "UPDATE Ciudades SET ";
      for (let cont = 0; cont < Object.keys(campos).length; cont++) {
        let value = Object.keys(campos)[cont];
        sql += `${value} = '${campos[value]}'`;
        if (cont == Object.keys(campos).length - 1) {
          sql += "";
        } else {
          sql += ",";
        }
      }
      sql += ` WHERE id_ciudades = ${id_ciudades}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) {
        throw new Error("Ciudad no encontrada");
      }
      return { mensaje: "Ciudad Actualizada" };
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la Ciudad parcialmente");
    }
  }

  async relacionadaConUsuarios(id_ciudades) {
    const [usuarios] = await connection.query(
      "SELECT * FROM Usuarios WHERE id_ciudades = ?",
      [id_ciudades]
    );
    return usuarios.length > 0;
  }

  async delete(id_ciudades) {
    const ciudadRelacionado = await this.relacionadaConUsuarios(id_ciudades);

    if (ciudadRelacionado) {
      return {
        error: true,
        mensaje:
          "No se puede eliminar la Ciudad por que se encuentra asociada a uno o mas Usuarios",
      };
    }

    const [result] = await connection.query(
      "DELETE FROM Ciudades WHERE id_ciudades = ?",
      [id_ciudades]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "Ciudad no encontrada",
      };
    }

    return {
      error: false,
      mensaje: "Ciudad eliminada de manera Exitosa",
    };
  }
  // Método para listar los productos de una categoría
  async ciudades(id_ciudades) {
    const [rows] = await connection.query(
      "SELECT * FROM Ciudades WHERE id_ciudades = ?",
      [id_ciudades]
    );
    return rows;
  }
}

export default Ciudades;
