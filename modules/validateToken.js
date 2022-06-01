import jwt      from "jsonwebtoken"
import settings from "./settings.js"
import {
    request,
    response
} from "express"

/**
 * This function validates the api-token cookie.
 * @param {request}  req
 * @param {response} res
 * @param {Function} next
 */
export default function validateToken(req, res, next) {
    const token = req.cookies["api-token"] ?? null

    if (!token)
        return res.respond(
            false,
            {
                msg: "You're not signed in!",
                error: "You need to be logged in to do this..."
            },
            "pages/auth/login.njk",
            {
                urlRedir: req.originalUrl
            }
        )

    if (!jwt.verify(token, settings.token_secret))
        return res.respond(
            false,
            {
                msg: "Your api-token is invalid!",
                error: "Seems as if your login-session has ran out..."
            },
            "pages/auth/login.njk",
            {
                urlRedir: req.originalUrl
            }
        )

    req.user = jwt.verify(token, settings.token_secret) ?? {}

    next()
}

/**
 * This function gets user info from the 'api-token' cookie.
 * @param {request} req A regular express request.
 * @returns {Object} User info.
 */
export function getUserInfo(req) {
    const token = req.cookies["api-token"] ?? null

    if (!token)
        return {}

    if (!jwt.verify(token, settings.token_secret))
        return {}

    const user = jwt.verify(token, settings.token_secret)

    return user
}