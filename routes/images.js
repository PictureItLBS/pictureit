import { Router }     from "express"
import { existsSync } from "fs"
import { readFile  }  from "fs/promises"

const images = Router()

images.get(
    "/pfp/:id",
    (req, res) => {
        const imagePath = `./data/profile_pictures/${req.params.id}.webp`
        if (existsSync(imagePath))
            return readFile(imagePath)
                .then(
                    imageBuffer => res.set("Content-Type", "image/webp").send(imageBuffer)
                )
                .catch(
                    () => res.status(500).send("Sorry, couldn't load the image!")
                )

        res.status(404).send("Sorry, this profile picture doesn't exist!")
    }
)

export default images