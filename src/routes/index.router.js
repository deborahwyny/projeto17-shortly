import { Router } from "express"
import loginsRouter from "./login.routes.js"
import urlRouter from "./urls.routes.js"


const router = Router()
router.use(loginsRouter)
router.use(urlRouter)



export default router