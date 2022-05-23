import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const profile = Router()

profile.use(validateToken)
profile.get("/", (_, res) => res.respond(true, "FEED", "pages/profile.njk", { activeTab: "profile" }))

export default profile