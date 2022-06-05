import { Router }    from "express"
import { db }        from "../../modules/database/handler.js"
import validateToken from "../../modules/validateToken.js"
import settings      from "./settings.js"

const userDB = db.collection("users")
const profile = Router()

profile.use(validateToken)
profile.use("/settings", settings)
profile.get("/", (req, res) => res.redirect(`./profile/${req.user.name}`))
profile.get(
    "/:user",
    async (req, res) => {
        const user = await userDB.findOne({ name: req.params.user })

        if (!user)
            return res.respond(false, { error: "Sorry this user doesn't exist!" }, "pages/profile/profile.njk", {})

        res.respond(true, { user }, "pages/profile/profile.njk",  { activeTab: user._id.toString() === req.user._id ? "profile" : "" })
    }
)

export default profile