import fs            from "fs"
import { Router }    from "express"
import validateToken from "../modules/validateToken.js"

const news = Router()

news.use(validateToken)
news.get(
    "/",
    (req, res) => {
        const newsFiles = fs.readdirSync("./app/views/news").reverse()
        const news = newsFiles.map(newsFile => fs.readFileSync(`./app/views/news/${newsFile}`).toString())
        res.respond(true, { news }, "pages/news.njk", { activeTab: "news" })
    }
)

export default news