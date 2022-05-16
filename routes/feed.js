import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const feed = Router()

feed.use(validateToken)
feed.get("/", (req, res) => res.respond(true, "FEED", "pages/feed.njk", {}))

export default feed