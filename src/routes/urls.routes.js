import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middleware.js"
import { urlSchemma } from "../schemmas/url.shemma.js"
import { deleteUrl, getUrlId, openUrl, ranking, urlShorten, usersMe } from "../controllers/urls.controllers.js"


const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchemma(urlSchemma), urlShorten)
urlRouter.get("/urls/:id", getUrlId)
urlRouter.get("/urls/open/:shortUrl", openUrl)
urlRouter.delete("/urls/:id", deleteUrl)
urlRouter.get("/users/me", usersMe)
urlRouter.get("/ranking", ranking)


export default urlRouter
