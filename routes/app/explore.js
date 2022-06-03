import { Router }    from "express"
import validateToken from "../../modules/validateToken.js"

const explore = Router()

explore.use(validateToken)
explore.get("/", (_, res) => res.respond(true, "EXPLORE", "pages/explore.njk", { activeTab: "explore" }))

export default explore