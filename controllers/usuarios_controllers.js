import usuariosModels from "../models/usuarios_models.js"
import bcrypt from "bcrypt"
import { generarToken } from "../helpers/autenticacion.js"
import "dotenv/config"

class usuarioControllers {

    async register(req, res) {
        try {
            const { email, nombre, clave } = req.body
            const usuarioExiste = await usuariosModels.getByEmail(email)
            if (usuarioExiste) {
                return res.status(401).json({ error: "El email ya corresponde a un usuario" })
            }

            const claveEncriptada = await bcrypt.hash(clave, 10)
            const data = await usuariosModels.create({
                email,
                nombre,
                clave: claveEncriptada
            })

            const token = generarToken(data._id)

            if (token) {
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
                })
                res.status(201).json({ nombre: data.nombre })
            } else {
                throw new Error("Ocurrio un problema con el servidor en el proceso de registro");
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async login(req, res) {
        try {
            const { email, clave } = req.body
            const usuarioExiste = await usuariosModels.getByEmail(email)
            if (!usuarioExiste) {
                return res.status(401).json({ error: "El usuario no existe" })
            }
            const verificarClave = await bcrypt.compare(clave, usuarioExiste.clave)
            if (!verificarClave) {
                return res.status(404).json({ error: "Contraseña incorrecta" })
            }

            const token = generarToken(usuarioExiste._id)
            

            if (token) {
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
                })
                res.status(200).json({ nombre: usuarioExiste.nombre })
            } else {
                throw new Error("Ocurrio un problema con el servidor en el proceso de iniciar sesion");
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async profile(req, res) {
        try {
            const data = await usuariosModels.getById(req.idAutenticado)
            if (!data) {
                throw new Error("El usuario no ha sido encontrado");
            }
            res.status(200).json({ nombre: data.nombre })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async profileDelete(req, res) {
        try {
            const eliminarUsuario = await usuariosModels.delete(req.idAutenticado)
            if (!eliminarUsuario) {
                throw new Error("El usuario no ha sido encontrado para ser eliminado");
            }
            res.status(200).json({ message: "Usuario eliminado" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
            })
            res.status(200).json({ message: "Sesion cerrada" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default new usuarioControllers();
