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
        return res.respond(false, "You're not signed in!", "pages/auth/login.njk", {})

    if (!jwt.verify(token, settings.token_secret))
        return res.respond(false, "Your token is invalid!", "pages/auth/login.njk", {})

    next()
}