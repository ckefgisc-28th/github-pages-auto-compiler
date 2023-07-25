const std = require("stdio");

const fse = require("fs-extra"), path = require("node:path");

const HTMLGenerator = require("./js-modules/html-generator.js");

/** the folder name of the github repo @constant @type {string} */
const SITE_NAME = "ckefgisc-28th.github.io";

(async () => {
    /** the page title @type {string} */
    const pageName = await std.ask("Page name");

    /** the output HTML file path @constant @type {string} */
    const outputPath = path.resolve(
        "./", SITE_NAME, await std.ask("Which page to compile to"), "index.html"
    );

    /** the resource HTML file @conetant @type {string} */
    const resourcePath = path.resolve(
        "./pages/", await std.ask("Which page to read from") + ".html"
    );

    console.time("Timer");

    if (false) {
        fse.removeSync(path.join(SITE_NAME, "/static/"));
        fse.copySync("./static", path.join(SITE_NAME, "/static/"));
        //
        console.log("Cloned static files");
    }

    /** the structure HTML @constant @type {string} */
    const structure = fse.readFileSync("./static/structure.html").toString();
    //
    console.log("Loaded page structure");

    /** the placeholders in structure.html @type {string} */
    var cssImport = "",
        jsImport = "",
        pageData = "",
        pageHeader = fse.readFileSync("./static/html/page-header.html"),
        pageContent = fse.readFileSync(resourcePath),
        pageFooter = fse.readFileSync("./static/html/page-footer.html");
    //
    console.log("Loaded HTML files")

    for (let cssFile of fse.readdirSync("./static/css")) {
        if (path.extname(cssFile) !== ".css")
            continue;

        cssImport += `<style>${fse.readFileSync(`./static/css/${cssFile}`)}</style>`;
    }
    //
    console.log("Loaded CSS files");

    for (let jsFile of fse.readdirSync("./static/js")) {
        if (path.extname(jsFile) !== ".js")
            continue;

        jsImport += `<script>${fse.readFileSync(`./static/js/${jsFile}`)}</script>`;
    }
    //
    console.log("Loaded JS files");

    pageData += HTMLGenerator.title(`${pageName} | 建北電資 28th`);
    pageData += HTMLGenerator.icon("/static/images/chicken.png");

    /** output HTML @type {string} */
    const output = structure
        .replace("%css-import%",   cssImport)
        .replace("%js-import%",    jsImport)
        .replace("%css-import%",   cssImport)
        .replace("%page-data%",    pageData)
        .replace("%page-header%",  pageHeader)
        .replace("%page-content%", pageContent)
        .replace("%page-footer%",  pageFooter);

    fse.writeFileSync(
        outputPath, 
        output
            .replaceAll(/\r\n|\r|\n/g, "")
            .trim()
    );
    //
    console.log("Done");
    console.timeLog("Timer");
})();