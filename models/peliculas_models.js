import mongoose from "mongoose";
import Pelicula from "../schemas/peliculas_schemas.js"


class peliculasModels {

    async getAll(idUsuario) {
        return await Pelicula.find({ user: new mongoose.Types.ObjectId(idUsuario) })
    }

    async create(pelicula) {
        return await Pelicula.create(pelicula)
    }

    async update(id, pelicula) {
        return await Pelicula.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, pelicula, { new: true })
    }

    async deleteOne(id){
        return await Pelicula.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

    async deleteAll(idUsuario){
        return await Pelicula.deleteMany({user: new mongoose.Types.ObjectId(idUsuario)})
    }
}


export default new peliculasModels();
