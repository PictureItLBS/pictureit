import User from "../models/User.js"

export async function test() {
    const userIn = {
        name:     "Bob",
        password: "VerySecurePassword1234"
    }

    const userOut   = await User(userIn.name, userIn.password)
    return userOut
}