import { MongoClient, Db } from "mongodb"
import settings            from "../settings.js"
import getLogger           from "../logger.js"

const log    = getLogger("Database ", "blue")
const client = new MongoClient(settings.mongo_uri)

log("Connecting to database...")
await client.connect()
    .catch(
        err => {
            log("Can't start DB!")
            console.dir(err)
            process.exit(1)
        }
    )

log("Connected to the database!")
export const db = client.db(settings.db_name)