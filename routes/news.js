import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const news = Router()

news.use(validateToken)
news.get("/", (req, res) => res.respond(true, "FEED", "pages/news.njk", { activeTab: "news" }))

export default news