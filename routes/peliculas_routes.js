import express from "express"
import { verificarToken } from "../helpers/autenticacion.js"
import peliculasControllers from "../controllers/peliculas_controllers.js"

const peliculasRoutes= express.Router()

peliculasRoutes.get("/",verificarToken,peliculasControllers.getAll)
peliculasRoutes.post("/",verificarToken,peliculasControllers.create)
peliculasRoutes.put("/:id",verificarToken,peliculasControllers.update)
peliculasRoutes.delete("/:id",verificarToken,peliculasControllers.deleteOne)
peliculasRoutes.delete("/",verificarToken,peliculasControllers.deleteAll)

export default peliculasRoutes;