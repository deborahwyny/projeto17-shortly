import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middleware.js"
import { cadastroLogin, loginUser } from "../controllers/login.controllers.js"
import { cadastroSchemma, loginSchemma } from "../schemmas/login.schemma.js"


const loginsRouter = Router()
loginsRouter.post("/signup", validateSchemma(cadastroSchemma), cadastroLogin)
loginsRouter.post("/signin", validateSchemma(loginSchemma), loginUser)


export default loginsRouter