import fs         from "fs"
import { Router } from "express"

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

export default debug