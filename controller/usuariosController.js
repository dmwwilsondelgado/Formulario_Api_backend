import Usuarios from "../models/usuarios.js";

class UsuariosController {

  static getAllUsuarios = async (req, res) => {
    const OBJUsuarios = new Usuarios();
    const usuarios = await OBJUsuarios.getAll();
    res.json(usuarios);
  }

  static createUsuarios = async(req,res) => {
    try {
      const { nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero } = req.body;
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.create(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static updateUsuarios = async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero } = req.body;
    try {
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.update(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero,id_usuario);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialUsuarios = async (req, res) => {
    const { id_usuario } = req.params;
    const campos = req.body;
    try {
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.updateParcial(campos,id_usuario);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteUsuarios = async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.delete(id_usuario);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UsuariosController;