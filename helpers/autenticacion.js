import jsonwebtoken from "jsonwebtoken"
import "dotenv/config"


export function generarToken(id) {
    try {
        return jsonwebtoken.sign({ id }, process.env.token_secreto, { expiresIn: "2h" })
    } catch (error) {
        console.error("No se pudo generar el token")
    }
}



export function verificarToken(req, res, next) {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({error:"No hay token de verificacion"})
    }
    try {
      const verificarToken= jsonwebtoken.verify(token,process.env.token_secreto)  
      req.idAutenticado=verificarToken.id
      next()
    } catch (error) {
        res.status(404).json({error:"Token invalido"})
    }
}
