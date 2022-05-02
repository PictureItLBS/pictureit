import { db }     from "../modules/database/handler.js"
import { Router } from "express"
import User       from "../models/User.js"

const Users = db.collection("users")

const auth = Router()

// TODO: Make sure these paths is correct --------------------------------vvvvvvvvvvvvvvvvvvvv
auth.get("/login",    (_, res) => res.respond(true, "Please log in...",   "pages/auth/log.njk", {}))
auth.get("/register", (_, res) => res.respond(true, "Please register...", "pages/auth/log.njk", {}))

auth.post(
    "/login",
    async (req, res) => {
        const { username, password, confirmation } = req.body

        if (!username)
            return res.respond(
                false,
                {
                    error: "Please enter a username!",
                },
                "pages/auth/register",
                {}
            )

        if (!password)
            return res.respond(
                false,
                {
                    error: "Please enter a password!",
                    username
                },
                "pages/auth/register",
                {}
            )

        if (password !== confirmation)
            return res.respond(
                false,
                {
                    error: "Password and password confirmation do not match!",
                    username
                },
                "pages/auth/register",
                {}
            )

        if (!username.match(/^\w{2,32}$/))
            return res.respond(
                false,
                {
                    error: "Username must be alphanumerical and between 2 and 32 characters!",
                    username
                },
                "pages/auth/register",
                {}
            )

        if (await Users.findOne({ name: username }))
            return res.respond(
                false,
                {
                    error: "Username already taken!",
                    username
                },
                "pages/auth/register",
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
                    "pages/auth/register",
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
                                "pages/auth/register",
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
    "/register",
    (req, res) =>{

    }
)

export default auth