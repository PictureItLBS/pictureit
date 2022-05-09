import argon2     from "argon2"
import { db }     from "../modules/database/handler.js"
import { Router } from "express"
import User       from "../models/User.js"

const Users = db.collection("users")

const auth = Router()

auth.get("/login",    (_, res) => res.respond(true, "Please log in...",   "pages/auth/login.njk",    {}))
auth.get("/register", (_, res) => res.respond(true, "Please register...", "pages/auth/register.njk", {}))

auth.post(
    "/register",
    async (req, res) => {
        const { username, password, confirmPass } = req.body

        if (!username)
            return res.respond(
                false,
                {
                    error: "Please enter a username!",
                },
                "pages/auth/register.njk",
                {}
            )

        if (!password)
            return res.respond(
                false,
                {
                    error: "Please enter a password!",
                    username
                },
                "pages/auth/register.njk",
                {}
            )

        if (password !== confirmPass)
            return res.respond(
                false,
                {
                    error: "Password and password confirmation do not match!",
                    username
                },
                "pages/auth/register.njk",
                {}
            )

        if (!username.match(/^\w{2,32}$/))
            return res.respond(
                false,
                {
                    error: "Username must be alphanumerical and between 2 and 32 characters!",
                    username
                },
                "pages/auth/register.njk",
                {}
            )

        if (await Users.findOne({ name: username }))
            return res.respond(
                false,
                {
                    error: "Username already taken!",
                    username
                },
                "pages/auth/register.njk",
                {}
            )

        User(username, password)
            .catch(
                err => res.respond(
                    false,
                    {
                        error: "Error while creating user!",
                        err,
                        username
                    },
                    "pages/auth/register.njk",
                    {}
                )
            ).then(
                async user => {
                    await Users.insertOne(user)
                        .catch(
                            err => res.respond(
                                false,
                                {
                                    error: "Error while creating user!",
                                    err,
                                    username
                                },
                                "pages/auth/register.njk",
                                {}
                            )
                        )

                    res.respond(
                        true,
                        `Successfully created account "${user.name}"`,
                        "pages/auth/userCreated.njk",
                        {}
                    )
                }
            )
    }
)

auth.post(
    "/login",
    async (req, res) =>{
        const { username, password } = req.body

        if (!username)
            return res.respond(
                false,
                {
                    error: "Please enter a username!",
                },
                "pages/auth/login.njk",
                {}
            )

        if (!password)
            return res.respond(
                false,
                {
                    error: "Please enter a password!",
                    username
                },
                "pages/auth/login.njk",
                {}
            )

        /**
         * @type {import("../models/User.js").User}
         */
        const user = await Users.findOne({ name: username })

        if (!user)
            return res.respond(
                false,
                {
                    error: "That user doesn't exist!",
                    username
                },
                "pages/auth/login.njk",
                {}
            )

        argon2.verify(user.password, password)
            .then(
                verified => {
                    if (!verified)
                        return res.respond(
                            false,
                            {
                                error: "Password is incorrect!",
                                username
                            },
                            "pages/auth/login.njk",
                            {}
                        )

                    // TODO: Implement COOKIE with JWT and so.

                    if (req.originalUrl.startsWith("/api"))
                        return res.send("Signed in...")

                    res.redirect("/app/feed")
                }
            ).catch(
                err => {
                    console.dir(err)
                    res.respond(
                        false,
                        {
                            error: "Password is incorrect!",
                            username
                        },
                        "pages/auth/login.njk",
                        {}
                    )
                }
            )
    }
)

export default auth