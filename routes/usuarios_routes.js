import express from "express"
import usuariosControllers from "../controllers/usuarios_controllers.js"
import { verificarToken } from "../helpers/autenticacion.js"


const usuariosRoutes = express.Router()

usuariosRoutes.post("/login", usuariosControllers.login)
usuariosRoutes.post("/register", usuariosControllers.register)
usuariosRoutes.get("/profile", verificarToken, usuariosControllers.profile)
usuariosRoutes.delete("/profile/delete", verificarToken, usuariosControllers.profileDelete)
usuariosRoutes.delete("/profile/logout", verificarToken, usuariosControllers.logout)

export default usuariosRoutes;