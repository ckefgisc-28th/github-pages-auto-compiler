const fse = require("fs-extra");

/**
 * a class that generates HTML for you
 * @exports @class
 */
module.exports = class HTMLGenerator {
    /**
     * @param {path} path the path to local file
     * @returns {string} the css import statement
     */
    static css = (path) => `<link rel="stylesheet" type="text/css" href="${path}" />\n`;

    /**
     * @param {path} path the path to local file
     * @returns {string} the generated HTML text
     */
    static rawCss = (path) => `<!-- generated from ${path} -->
        <style>\n${fse.readFileSync(path)}\n</style>\n`;

    /**
     * @param {path} path the path to local file
     * @returns {string} the js import statement
     */
    static js = (path) => `<!-- generated from ${path} -->
        <script src="${path}"></script>\n`;

    /**
     * @param {path} path the path to local file
     * @returns {string} the generated HTML text
     */
    static rawJs = (path) => `<script>\n${fse.readFileSync(path)}\n</script>\n`;

    /**
     * @param {string} text the title text
     * @returns {string} the title statement
     */
    static title = (text) => `<title>${text}</title>\n`;

    /**
     * @param {path} path the path to local file
     * @returns {string} the icon import statement
     */
    static icon = (path) => `<link rel="shortcut icon" href="${path}" type="image/ico" />\n`;
}