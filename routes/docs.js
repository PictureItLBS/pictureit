import { Router } from "express"

const docs = Router()

docs.get("/", (_, res) => res.render("docs/index.njk"))

export default docs