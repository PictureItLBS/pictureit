import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const explore = Router()

explore.use(validateToken)
explore.get("/", (req, res) => res.respond(true, "EXPLORE", "pages/explore.njk", {}))

export default explore  