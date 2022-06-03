import { Router }   from "express"
import { ObjectId } from "mongodb"
import { db }       from "../../modules/database/handler.js"

const userDB = db.collection("users")
const settings = Router()

settings.get(
    "/",
    (req, res) => {
        userDB.findOne({ _id: ObjectId(req.user._id) })
            .then(user => {
                delete user._id
                delete user.password
                delete user.joinedAt
                delete user.isAdmin
                res.respond(true, user, "pages/profile/settings.njk", { activeTab: "settings" })
            }
        )
    }
)

settings.post(
    "/username",
    async (req, res) => {
        const { username } = req.body

        if (!username)
            return res.respond(false, { error: "You need to enter a username!" }, "pages/profile/settings.njk", { activeTab: "settings", usernameError: true })

        if (!username.match(/^\w{2,32}$/))
            return res.respond(false, { error: "Your username needs to be between 2 and 32 alphanumeric characters!" }, "pages/profile/settings.njk", { activeTab: "settings", usernameError: true })

        const usernameTaken = await userDB.findOne({ name: username })
        if (usernameTaken)
            return res.respond(false, { error: "That username is already taken!" }, "pages/profile/settings.njk", { activeTab: "settings", usernameError: true })

        userDB.updateOne(
            { _id: ObjectId(req.user._id) },
            {
                $set: { name: username }
            }
        )

        res.clearCookie("api-token")

        return res.respond(true, "Succesfully changed username! Please sign in again!", "pages/auth/changedUsername.njk", {})
    }
)

export default settings