import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middleware.js"
import { cadastroLogin } from "../controllers/login.controllers.js"
import { cadastroSchemma } from "../schemmas/login.schemma.js"


const loginsRouter = Router()
loginsRouter.post("/signup", validateSchemma(cadastroSchemma), cadastroLogin)


export default loginsRouter