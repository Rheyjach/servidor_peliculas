import express from "express"
import "dotenv/config"
import usuariosRoutes from "./routes/usuarios_routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import dataBase from "./config/dataBase.js"
import peliculasRoutes from "./routes/peliculas_routes.js"



const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/peliculas/usuarios", usuariosRoutes)
app.use("/peliculas/funcionalidades", peliculasRoutes)


try {
    const port = process.env.PORT || 5100
    app.listen(port, () => console.log(`El servidor esta conectado en el puerto ${port}`))
} catch (error) {
    console.error(`No se pudo conectar con el servidor: ${error.message}`)
}


process.on("SIGINT", async () => {
    await dataBase.desconectarDataBase()
    process.exit(0)
})
