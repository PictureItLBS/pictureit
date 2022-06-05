import { Router }     from "express"
import { existsSync } from "fs"
import { readFile  }  from "fs/promises"

const images = Router()

images.get(
    "/pfp/:id",
    (req, res) => {
        // Make sure the user doesn't try to load a malicious path.
        const imageFile = req.params.id.replace(/\.\.+/g, "").replace(/[/\\]/g, "")
        const imagePath = `./data/profile_pictures/${imageFile}.webp`
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