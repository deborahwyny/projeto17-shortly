import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middleware.js"
import { urlSchemma } from "../schemmas/url.shemma.js"
import { getUrlId, urlShorten } from "../controllers/urls.controllers.js"


const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchemma(urlSchemma), urlShorten)
urlRouter.get("/urls/:id", validateSchemma(urlSchemma), getUrlId)


export default urlRouter
