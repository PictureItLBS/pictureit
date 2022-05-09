const test = await import(`./${process.argv[2]}.test.js`)
console.log(`Running test from "tests/${process.argv[2]}.test.js"...`)

const timeStart = Date.now()
const result    = await test.test()
const timeEnd   = Date.now()
const elapsed   = timeEnd - timeStart

console.log("\nThis was the result:")
console.dir(result, { depth: null })
console.log(`\nTest took ${elapsed / 1000} seconds.`)