import Generos from "../models/generos.js";

class GenerosController {
  static getAllGeneros = async (req, res) => {
    const OBJGeneros = new Generos();
    const generos = await OBJGeneros.getAll();
    res.json(generos);
  };

  static createGeneros = async (req, res) => {
    try {
      const { genero } = req.body;
      const OBJGeneros = new Generos();
      const generos = await OBJGeneros.create(genero);
      res.status(201).json(generos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateGeneros = async (req, res) => {
    const { id_genero } = req.params;
    const { genero } = req.body;
    try {
      const OBJGeneros = new Generos();
      const generos = await OBJGeneros.update(genero, id_genero);
      res.status(201).json(generos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateParcialGeneros = async (req, res) => {
    const { id_genero } = req.params;
    const campos = req.body;
    try {
      const OBJGeneros = new Generos();
      const generos = await OBJGeneros.updateParcial(campos, id_genero);
      res.status(201).json(generos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteGeneros = async (req, res) => {
    try {
      const { id_genero } = req.params;
      const OBJGeneros = new Generos();
      const generos = await OBJGeneros.delete(id_genero);
      res.status(201).json(generos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GenerosController;
