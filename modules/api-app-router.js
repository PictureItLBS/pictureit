import { response } from "express"
import jwt          from "jsonwebtoken"
import settings     from "./settings.js"

const respondFuncs = {
    /**
     * Gets an app-responder. (HTML)
     * @param {response} res
     * @param {Object}   user
     * @returns {Function} Renders the response as HTML.
     */
    app: (res, user) => (_, data, template, options={}) => {
        options.user = user
        res.render(template, { data, options })
    },

    /**
     * Gets an api-responder. (JSON)
     * @param {response} res
     * @returns {Function}
     */
    api: (res, user) => (success, data) =>
        res.json({ success, data, user }),
}

/**
 * Creates an express middleware that creates a `res.respond`
 * function that can handle the same input for both JSON
 * or HTML responses.
 * ---
 * res.respond (
 *   success:  Bool,
 *   data:     *,
 *   template: String (Path to template),
 *   options:  Object (Options for template)
 * )
 * ---
 * @param {"app" | "api"} type The type of bye-function to use.)
 * @returns {Function}
 */
export default function apiAppRouter(type) {
    const respondFunc = respondFuncs[type] ?? respondFuncs.api

    return (req, res, next) => {
        res.respond = respondFunc(res, req.user ?? {})
        next()
    }
}