import { Router }   from "express"
import apiAppRouter from "../modules/api-app-router.js"
import auth         from "./auth.js"
import feed         from "./feed.js"

const routes = Router()
routes.get("/", (_, res) => res.respond(true, "HELLO WORLD!", "pages/landing.njk", {}))
routes.use("/auth", auth)
routes.use("/feed", feed)

const api = Router()
api.use(apiAppRouter("api"))
api.use(routes)

const app = Router()
app.use(apiAppRouter("app"))
app.use(routes)

export default { app, api }