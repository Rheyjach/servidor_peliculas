import mongoose, { mongo } from "mongoose";

const peliculaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    puntuacion: {
        type: Number,
        trim: true,
        required: true
    },
    categoria: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        trim: true,
        required: true,
        ref: "usuario_peliculas"
    }
}, { timestamps: true })

export default mongoose.model("peliculas",peliculaSchema)