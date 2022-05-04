import { Router } from "express"

const feed = Router()

feed.get("/", (req, res) => res.respond(true, "FEED", "pages/feed.njk", {}))

export default feed