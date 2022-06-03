import { Router }    from "express"
import validateToken from "../../modules/validateToken.js"
import settings      from "./settings.js"

const profile = Router()

profile.use(validateToken)
profile.use("/settings", settings)
profile.get("/", (_, res) => res.respond(true, "FEED", "pages/profile/profile.njk",  { activeTab: "profile" }))

export default profile