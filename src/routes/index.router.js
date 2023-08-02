import { Router } from "express"
import loginsRouter from "./login.routes.js"


const router = Router()
router.use(loginsRouter)




export default router