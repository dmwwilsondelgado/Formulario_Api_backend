import Lenguajes_Usuarios from "../models/lenguajesusuarios.js";

class LenguajesUsuariosController {

  static getAllLenguajesUsuarios = async (req, res) => {
    const OBJLenguajesUsuarios = new Lenguajes_Usuarios();
    const lenguajesUsuarios = await OBJLenguajesUsuarios.getAll();
    res.json(lenguajesUsuarios);
  }

  static createLenguajesUsuarios = async(req,res) => {
    try {
      const {  id_usuario, id_lenguaje } = req.body;
      const OBJLenguajesUsuarios = new Lenguajes_Usuarios();
      const lenguajesUsuarios = await OBJLenguajesUsuarios.create( id_usuario, id_lenguaje);
      res.status(201).json(lenguajesUsuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static updateLenguajesUsuarios = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, id_lenguaje } = req.body;
    try {
      const OBJLenguajesUsuarios = new Lenguajes_Usuarios();
      const lenguajesUsuarios = await OBJLenguajesUsuarios.update(id_usuario, id_lenguaje, id);
      res.status(201).json(lenguajesUsuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialLenguajesUsuarios = async (req, res) => {
    const { id_usuario } = req.params;
    const campos = req.body;
    try {
      const OBJLenguajesUsuarios = new Lenguajes_Usuarios();
      const lenguajesUsuarios = await OBJLenguajesUsuarios.updateParcial(campos,id_usuario);
      res.status(201).json(lenguajesUsuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteLenguajesUsuarios = async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const OBJLenguajesUsuarios = new Lenguajes_Usuarios();
      const lenguajesUsuarios = await OBJLenguajesUsuarios.delete(id_usuario);
      res.status(201).json(lenguajesUsuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default LenguajesUsuariosController;