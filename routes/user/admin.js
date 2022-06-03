import { Router } from "express"

const admin = Router()

admin.get("/", (req, res) => res.respond(true, "ADMIN", "pages/admin/panel.njk", { activeTab: "admin" }))

export default admin