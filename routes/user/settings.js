import { Router }    from "express"
import { ObjectId }  from "mongodb"
import { db }        from "../../modules/database/handler.js"
import upload        from "../../modules/fileUpload.js"
import webp          from "webp-converter"
import { writeFile } from "fs/promises"
import { isValidImageMimetype } from "../../modules/fileUpload.js"

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

// Set a new username
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

settings.post(
    "/bio",
    (req, res) =>
        userDB.updateOne(
            { _id: ObjectId(req.user._id) },
            {
                $set: { profile: { bio: req.body.bio } }
            }
        ).then(
            () => {
                if (req.url.startsWith("/app"))
                    return res.redirect("/profile/settings")

                res.respond(true, "Succesfully changed bio!", "pages/profile/settings.njk", {})
            }
        )
)

settings.post(
    "/pfp",
    upload.single("pfp"),
    (req, res) => {
        if (!req.file)
            return res.respond(false, { error: "You need to upload an image!" }, "pages/profile/settings.njk", { activeTab: "settings", pfpError: true })

        const { buffer, mimetype } = req.file
        if (!isValidImageMimetype(mimetype))
            return res.respond(false, { error: "That isn't a valid image format!" }, "pages/profile/settings.njk", { activeTab: "settings", pfpError: true })

        webp.buffer2webpbuffer(buffer, mimetype.replace("image/", ""), "-q 90 -mt -m 5")
            .then(
                webpBuffer => writeFile(`./data/profile_pictures/${req.user._id}.webp`, webpBuffer)
            ).then(
                () => {
                    if (req.url.startsWith("/app"))
                        return res.redirect("/profile/settings")

                    res.respond(true, "Succesfully changed profile picture!", "pages/profile/settings.njk", {})
                }
            ).catch(
                () => res.respond(false, { error: "There was an error while saving your profile picture!" }, "pages/profile/settings.njk", { activeTab: "settings", pfpError: true })
            )
    }
)

export default settings