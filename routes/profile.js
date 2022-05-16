import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const profile = Router()

profile.use(validateToken)
profile.get("/", (req, res) => res.respond(true, "FEED", "pages/profile.njk", {}))

export default profile