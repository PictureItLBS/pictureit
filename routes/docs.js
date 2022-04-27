import { Router }     from "express"
import fs             from "fs/promises"
import { existsSync } from "fs"

const docs = Router()

docs.get(
    "/",
    (_, res) => 
        fs.readdir('app/views/docs/articles').then(
            articles => res.render(
                "docs/index.njk",
                {
                    articles: articles.map(article => article.replace(/\.njk$/g, ""))
                }
            )
        )
)
docs.get(
    "/:article",
    (req, res) => {
        const article = req.params.article

        if (existsSync(`app/views/docs/articles/${article}.njk`))
            return res.render(`docs/articles/${article}.njk`)

        fs.readdir('app/views/docs/articles').then(
            articles => res.render(
                "docs/index.njk",
                {
                    articles: articles.map(article => article.replace(/\.njk$/g, "")),
                    error:    `Article "${article}" does not exist!`
                }
            )
        )
    }
)

export default docs