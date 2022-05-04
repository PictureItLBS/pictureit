import { db }     from "../modules/database/handler.js"
import { Router } from "express"
import User       from "../models/User.js"

const Users = db.collection("users")

const auth = Router()

auth.get("/login",    (_, res) => res.respond(true, "Please log in...",   "pages/auth/login.njk",    {}))
auth.get("/register", (_, res) => res.respond(true, "Please register...", "pages/auth/register.njk", {}))

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

        if (password !== confirmation)
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
    "/register.njk",
    (req, res) =>{
        const { username, password } = req.body

    }
)

export default auth