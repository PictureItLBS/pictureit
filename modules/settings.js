import fs from "fs"

if (!fs.existsSync("config.json"))
    fs.writeFileSync("config.json", "{}")

const configFile = fs.readFileSync("config.json")
const config     = JSON.parse(configFile.toString())

const settings = {
    mongo_uri:    config.mongo_uri    ?? "mongodb://user:password@localhost:27017/database",
    db_name:      config.db_name      ?? "pictureit",
    port:         config.port         ?? 12345,
    token_secret: config.token_secret ?? "SUPAH SECRAT"
}

export default settings
