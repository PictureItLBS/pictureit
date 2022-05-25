import fs         from "fs"
import { Router } from "express"
import { generateInviteCodes, saveInviteCodes } from "../modules/inviteCode.js"

const debug = Router()

debug.get(
    "/page/*",
    (req, res) => {
        const path = req.path.replace(/^\/page/, "pages") + ".njk"
        console.log(path)
        if (fs.existsSync(`./app/views/${path}`))
            return res.render(
                path,
                {
                    options: req.params,
                    data:    req.params
                }
            )

        res.send("FILE DOES NOT EXIST!")
    }
)

debug.get(
    "/generateCodes",
    (req, res) => {
        const inviteCodes = generateInviteCodes(100, 6)
        saveInviteCodes(inviteCodes)
        res.json(inviteCodes)
    }
)

export default debug