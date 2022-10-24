import { MongoClient } from "mongodb"
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

log("Creating indexes...")
Promise.all([
    db.collection("users").createIndex({ name:    1 }),
    db.collection("posts").createIndex({ author:  1 }),
    db.collection("posts").createIndex({ caption: 1 }),
])
    .then(() => log("All indexes are created..."))
    .catch(err => console.error(err))