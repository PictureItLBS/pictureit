import { ObjectId } from "mongodb"
import argon2       from "argon2"

/**
 * @typedef  {Object}   User        A user of PictureIt.
 * @property {ObjectId} _id         The id of the user.
 * @property {String}   name        The name of the user.
 * @property {String}   password    The user's password. (SALTED and HASHED!)
 * @property {Date}     joinedAt    The date when the user's account was created.
 * @property {Boolean}  isAdmin     Whether or not the account is an admin.
 * @property {Object}   profile     The user's profile.
 * @property {String}   profile.bio The user's biography.
 * @property {[String]} following   An array of `User._id`s that the user follows.
 */

/**
 * This function creates a user from a name and password. (This function does not save the user to the database!)
 * @param   {string} name     The name of the created password.
 * @param   {string} password The password (plaintext) for the user. (Will be SALTED and HASHED!)
 * @returns {Promise<User>}   The newly created user. (NOT SAVED to the DATABASE.)
 */
export default function User(name, password) {
    return new Promise(
        async (resolve, reject) => {
            const hash = await argon2.hash(
                password,
                {
                    memoryCost: 32 * 1024,
                    hashLength: 64,
                    timeCost:   16,
                }
                ).catch(err => reject(err))

            /**
             * @type {User}
             */
            const user = {
                name:     name,
                password: hash,
                joinedAt: new Date(Date.now()),
                isAdmin: false,
                profile: {
                    bio: ""
                },
                following: []
            }

            resolve(user)
        }
    )
}