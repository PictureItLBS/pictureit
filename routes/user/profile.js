import { Router }    from "express"
import validateToken from "../../modules/validateToken.js"

const profile = Router()

profile.use(validateToken)
profile.get("/",         (_, res) => res.respond(true, "FEED", "pages/profile/profile.njk",  { activeTab: "profile" }))
profile.get("/settings", (_, res) => res.respond(true, "FEED", "pages/profile/settings.njk", { activeTab: "settings" }))

export default profile