const std = require("stdio");

const fse = require("fs-extra"), path = require("node:path");

const HTMLGenerator  = require("./js-modules/html-generator.js");

/** the folder name of the github repo @constant @type {string} */
const SITE_NAME = "ckefgisc-28th.github.io";

/**
 * 
 * @param {string} pageName the page title
 * @param {string} target the target web page
 * @param {string} source the source HTML file name
 */
var compile = async (pageName, target, source) => {
    if (target.startsWith("/"))
        target = target.slice(1);

    /** the output HTML file path @constant @type {string} */
    const outputPath = path.resolve(
        "./", SITE_NAME, target, "index.html"
    );

    /** the resource HTML file @conetant @type {string} */
    const resourcePath = path.resolve(
        "./pages/", source + ".html"
    );

    console.time("- Timer");

    fse.removeSync(path.join(SITE_NAME, "/static/"));
    fse.copySync("./static", path.join(SITE_NAME, "/static/"));
    //
    console.log("Cloned static files");

    /** the structure HTML @constant @type {string} */
    const structure = fse.readFileSync("./static/structure.html").toString();
    //
    console.log("- Loaded page structure");

    /** the placeholders in structure.html @type {string} */
    var cssImport = "",
        jsImport = "",
        pageData = "",
        pageHeader = fse.readFileSync("./static/html/page-header.html"),
        pageContent = fse.readFileSync(resourcePath),
        pageFooter = fse.readFileSync("./static/html/page-footer.html");
    //
    console.log("- Loaded HTML files")

    for (let cssFile of fse.readdirSync("./static/css")) {
        if (path.extname(cssFile) !== ".css")
            continue;

        cssImport += HTMLGenerator.css(`/static/css/${cssFile}`);
        // cssImport += `<style>${fse.readFileSync(`./static/css/${cssFile}`)}</style>`;
    }
    //
    console.log("- Loaded CSS files");

    for (let jsFile of fse.readdirSync("./static/js")) {
        if (path.extname(jsFile) !== ".js")
            continue;

        jsImport += HTMLGenerator.css(`/static/js/${jsFile}`);
        // jsImport += `<script>${fse.readFileSync(`./static/js/${jsFile}`)}</script>`;
    }
    //
    console.log("- Loaded JS files");

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
    );
    //
    console.log("- Done");
    console.timeLog("- Timer");
};

(async () => {
    /** how many files are compiled @type {number} */
    var n = 0;

    for (let [ i, compilerFile ] of fse.readdirSync("./auto-compilers").entries()) {
        if (path.extname(compilerFile) !== ".txt")
            continue;

        const compilerText = fse.readFileSync(`./auto-compilers/${compilerFile}`).toString();

        const [ pageName, target, source ] = compilerText.split(/\r\n|\r|\n/g);

        console.log(`Compiling no.${i}`)
        //
        compile(pageName, target, source);

        n++;
    }

    console.log(`Compiled ${n} files`);
})();