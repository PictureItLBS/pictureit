import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const feed = Router()

feed.use(validateToken)
feed.get("/", (_, res) => res.respond(true, "FEED", "pages/feed.njk", { activeTab: "feed" }))

export default feed