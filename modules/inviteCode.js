import { readFileSync, writeFileSync } from "fs"

/**
 * Generates a random character in [0-9, a-z, A-Z].
 * @returns {String}
 */
function randomChar() {
    const char = Math.random().toString(36).charAt(2)
    return Math.round(Math.random()) ? char.toUpperCase() : char
}

/**
 * This function generates an invite code of specified length
 * @param {Number} length Must be at least 6 for codes to be "guaranteed" unique.
 * @returns {String} Code of $length.
 */
export function generateInviteCode(length) {
    return Array(length)
        .fill()
        .map(_ => randomChar())
        .join('')
}

/**
 * Generates many invite codes at once.
 * @param {Number} amount The amount of codes to generate.
 * @param {Number} lengthPerCode The length of each code. (Must be at least 6 for codes to be "guaranteed" unique.)
 * @returns {[String]} An array of all generated codes...
 */
export function generateInviteCodes(amount, lengthPerCode) {
    const codes = Array(amount)
        .fill()
        .map(_ => generateInviteCode(lengthPerCode))

    //                               v-- Just trust that this checks if all codes are unique.
    const uniqueCodes = codes.filter((v, i, arr) => arr.indexOf(v) === i)

    return uniqueCodes.length === amount ? codes : generateInviteCodes(amount, lengthPerCode)
}

/**
 * Saves codes persistently... (In './data/invite_codes.json')
 * @param {[String]} codes The array of invite codes to save...
 */
export function saveInviteCodes(codes) {
    writeFileSync("./data/invite_codes.json", JSON.stringify(codes))
}

/**
 * Gets all invite codes from './data/invite_codes.json'
 * @returns {[String]}
 */
export function getInviteCodes() {
    const codes = JSON.parse(readFileSync("./data/invite_codes.json").toString())
    return codes
}

/**
 * Verifies if an invite code is valid or not. (Checks codes in './data/invite_codes.json')
 * @param {String} code The code to verify.
 * @returns {Boolean} Returns true if the code is valid.
 */
export function isValidInviteCode(code) {
    const codes = JSON.parse(readFileSync("./data/invite_codes.json").toString())
    return codes.some(code)
}

/**
 * Invalidates a token. (Aka removing it from './data/invite_codes.json')
 * @param {String} code The code to invalidate.
 */
export function invalidateInviteCode(code) {
    const codes     = JSON.parse(readFileSync("./data/invite_codes.json").toString())
    const codesLeft = codes.filter(_code => _code !== code)
    saveInviteCodes(codesLeft)
}