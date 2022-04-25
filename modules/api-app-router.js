import { response } from "express"

const respondFuncs = {
    /**
     * Gets an app-responder. (HTML)
     * @param {response} res 
     * @returns {Function} Renders the response as HTML.
     */
    app: res => (_, data, template, options={}) =>
            res.render(template, { data, options }),

    /**
     * Gets an api-responder. (JSON)
     * @param {response} res 
     * @returns {Function}
     */
    api: res => (success, data) =>
            res.json({ success, data })
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

    return (_, res, next) => {
        res.respond = respondFunc(res)
        next()
    }
}