import { Router }   from "express"
import apiAppRouter from "../modules/api-app-router.js"

const routes = Router()
routes.get("/", (req, res) => res.respond(true, "HELLO WORLD!", "pages/landing.njk", {}))

const api = Router()
api.use(apiAppRouter("api"))
api.use(routes)

const app = Router()
app.use(apiAppRouter("app"))
app.use(routes)

export default { app, api }