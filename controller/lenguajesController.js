import Lenguajes from "../models/lenguajes.js";

class LenguajesController {

  static getAllLenguajes = async (req, res) => {
    const OBJLenguajes = new Lenguajes();
    const lenguajes = await OBJLenguajes.getAll();
    res.json(lenguajes);
  }

  static createLenguajes = async(req,res) => {
    try {
      const { nombre_lenguaje } = req.body;
      const OBJLenguajes = new Lenguajes();
      const lenguajes = await OBJLenguajes.create(nombre_lenguaje);
      res.status(201).json(lenguajes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static updateLenguajes = async (req, res) => {
    const { id_lenguaje } = req.params;
    const { nombre_lenguaje } = req.body;
    try {
      const OBJLenguajes = new Lenguajes();
      const lenguajes = await OBJLenguajes.update(nombre_lenguaje, id_lenguaje);
      res.status(201).json(lenguajes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialLenguajes = async (req, res) => {
    const { id_lenguaje } = req.params;
    const campos = req.body;
    try {
      const OBJLenguajes = new Lenguajes();
      const lenguajes = await OBJLenguajes.updateParcial(campos,id_lenguaje);
      res.status(201).json(lenguajes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteLenguajes = async (req, res) => {
    try {
      const { id_lenguaje } = req.params;
      const OBJLenguajes = new Lenguajes();
      const lenguajes = await OBJLenguajes.delete(id_lenguaje);
      res.status(201).json(lenguajes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default LenguajesController;