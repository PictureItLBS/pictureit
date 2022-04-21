import colors from 'colors'

/**
 * Takes any amount of arguments and prints them to the log...
 * @typedef {Function} Logger
 * @argument {string} string The string to be logged.
 */

/**
 * This function creates logger - A function that auto-prefixes log messages.
 * @param {string} prefix The prefix of the logger. I.e. MAIN, DATABASE, ETC.
 * @returns {Logger}
 */
export default function getLogger(prefix, clr="blue") {
    const color = colors[clr] ? clr : "blue"
    return function(...args) {
        console.log(colors[color](`${prefix} |`), ...args)
    }
}