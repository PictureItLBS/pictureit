import cookieParser from "cookie-parser"
import chokidar     from "chokidar"
import debug        from "./routes/debug.js"
import docs         from "./routes/docs.js"
import express      from "express"
import fs           from "fs"
import getLogger    from "./modules/logger.js"
import nunjucks     from "nunjucks"
import routes       from "./routes/entrypoint.js"
import sass         from "sass"
import settings     from "./modules/settings.js"

// SETTINGS
const PORT = 12345
const log = getLogger("PictureIt", "magenta")

/**
 * This function compiles the SCSS into CSS.
 */
function compileScss() {
    const scssLog = getLogger("SCSS     ", "yellow")

    scssLog("Compiling SCSS...")

    try {
        const { css } = sass.compile(
            "./src/scss/main.scss",
            {
                sourceMap:  false,
                alertColor: true,
                alertAscii: false,
                style:      "compressed"
            }
        )

        fs.writeFileSync(
            "./app/static/main.css",
            css
        )

        scssLog("The SCSS is now compiled to CSS!")
    } catch (error) {
        scssLog("ENCONTERED AN ERROR!")
        console.dir(error)
    }
}

/**
 * This function, when ran, watches the scss-directory and makes sure to recompile
 * the SCSS every time it changes...
 */
function scssCompiler() {
    const scssLog = getLogger("SCSS     ", "yellow")

    scssLog("Starting up the SCSS-watcher-compiler...")

    chokidar.watch("./src/scss").on(
        "change",
        () => compileScss()
    )
}

function startServer(isDebugOn) {
    log("Starting up the server...")
    const server = express()

    nunjucks.configure(
        "./app/views",
        {
            autoescape:   true,
            lstripBlocks: true,
            trimBlocks:   true,
            express:      server,
            watch:        isDebugOn ?? false,
        }
    )

    server.use(cookieParser())
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))

    server.use("/api",    routes.api)
    server.use("/app",    routes.app)
    server.use("/docs",   docs)
    server.use("/images", express.static("./data/images"))
    server.use("/static", express.static("./app/static"))
    server.get("/",       (_, res) => res.redirect("/app"))

    if (isDebugOn)
        server.use("/debug", debug)

    // Make errors hidden from the web browser...
    server.use((err, req, res, next) => {
        console.error(err)
        res.status(500).send("Sorry, something seems to have gone wrong on the server side! :'c")
    })

    server.listen(
        PORT,
        () => {
            log(`Server started on http://localhost:${PORT}.`)
            log("Reach the app at '/app' and the api at '/api'.")
        }
    )
}

switch (process.argv[2] ?? null) {
    case "setup":
        log("Creating directories...")
        fs.mkdirSync("./data/post_pictures",    { recursive: true })
        fs.mkdirSync("./data/profile_pictures", { recursive: true })

        log("Compiling SCSS...")
        compileScss()

        log("Done!")
        break

    case "default_config":
        log("Creating default config...")
        fs.writeFileSync("config.json", JSON.stringify(settings, null, 2))
        log("Done!")
        break

    case "dev":
        compileScss()
        startServer(true)
        scssCompiler()
        break

    default:
        compileScss()
        startServer()
        break
}