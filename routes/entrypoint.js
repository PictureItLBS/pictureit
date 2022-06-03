import { Router }   from "express"
import apiAppRouter from "../modules/api-app-router.js"
import admin        from "./user/admin.js"
import auth         from "./user/auth.js"
import feed         from "./app/feed.js"
import explore      from "./app/explore.js"
import news         from "./news.js"
import profile      from "./user/profile.js"

const routes = Router()
routes.get("/", (_, res) => res.respond(true, "HELLO WORLD!", "pages/landing.njk", {}))
routes.use("/admin",   admin)
routes.use("/auth",    auth)
routes.use("/feed",    feed)
routes.use("/explore", explore)
routes.use("/news",    news)
routes.use("/profile", profile)

const api = Router()
api.use(apiAppRouter("api"))
api.use(routes)

const app = Router()
app.use(apiAppRouter("app"))
app.use(routes)

export default { app, api }