import mongoose from "mongoose";
import "dotenv/config"


class dataBase {
    constructor() {
        this.conectarDataBase()
    }

    async conectarDataBase() {
        try {
            const uri = `mongodb+srv://${process.env.usuario}:${encodeURIComponent(process.env.clave)}@${process.env.servidor}/practica_api?retryWrites=true&w=majority`
            await mongoose.connect(uri)
            console.log("Conectado a la base de datos")
        } catch (error) {
            console.error(`No se pudo conectar a la base de datos: ${error.message}`)
        }
    }

    async desconectarDataBase(){
        try {
            console.log("Desconectandose de la base de datos")
            await mongoose.disconnect()
            console.log("Desconectado de la base de datos")
        } catch (error) {
            console.error(`Hubo un problema al desconectarse de la base de datos: ${error.message}`)
        }
    }
}

export default new dataBase();