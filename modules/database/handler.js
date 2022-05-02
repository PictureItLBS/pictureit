import { MongoClient, Db } from "mongodb"
import settings            from "../settings.js"
import getLogger           from "../logger.js"

const log    = getLogger("Database ", "blue")
const client = new MongoClient(settings.mongo_uri)

/**
 * @type {Db}
 */
export let db = undefined

/**
 * This function connects to the database.
 * !! IT SHOULD ONLY BE RAN ONCE WHEN THE SERVER IS STARTING !!
 * @returns {Promise} This promise resolves on success, and fails on errors.
 */
export function initDB() {
    return new Promise(
        async (resolve, reject) => {
            log("Connecting to the database...")
            client.connect()
                .catch(reject)
                .then(() => {
                    log("Connected to the database!")
                    db = client.db(settings.db_name)
                    resolve()
               })
        }
    )
}