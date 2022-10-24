import { generateInviteCodes } from "../modules/inviteCode.js"

export function test() {
    console.log("Testing invite code uniqueness...")
    const lengthPerCode     = 6
    const iterations        = 250
    const codesPerIteration = 10000

    for (let i = 0; ++i; i < iterations) {
        const codes = generateInviteCodes(codesPerIteration, lengthPerCode)
        if (codes.length !== codesPerIteration) {
            console.log("\n\nCONFLICTING CODES FOUND!")
            console.log("Iteration:", i)
            console.log("Non-unique this iteration:", codesPerIteration - codes.length)
            console.log("Codes generated this iteration:", codesPerIteration, "\n\n")
            break
        }

        console.log("\n\nAll codes are unique this iteration!")
        console.log("Iteration:", i)
        console.log("Codes generated this iteration:", codesPerIteration, "\n\n")
    }

    console.log("If there is no conflict above, it is safe to assume this is *random enough*...")

    return true
}