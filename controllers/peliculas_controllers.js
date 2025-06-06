import peliculasModels from "../models/peliculas_models.js";

class peliculasControllers {

    async getAll(req, res) {
        try {
            const data = await peliculasModels.getAll(req.idAutenticado)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async create(req, res) {
        try {
            const { nombre, puntuacion, categoria } = req.body
            const data = await peliculasModels.create({
                nombre,
                puntuacion,
                categoria,
                user: req.idAutenticado
            })
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const data = await peliculasModels.update(id, req.body)
            if (!data) {
                throw new Error("No se encontra el registro a actualizar");
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            const data = await peliculasModels.deleteOne(id)
            if (!data) {
                throw new Error("No se encontra el registro a eliminar");
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async deleteAll(req, res) {
        try {
            const data = await peliculasModels.deleteAll(req.idAutenticado)
            if (data.deletedCount ===0) {
                return res.status(401).json({error:"No habia datos que eliminar"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default new peliculasControllers();