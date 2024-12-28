const fs = require("fs");
const path = require("path");
const { minify } = require("minify");

const inputDir = "src"; // Input directory
const outputDir = "dist"; // Output directory

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Supported file extensions for minification
const supportedExtensions = [".js", ".css"];

// Load minification configuration from minify.json
let minifyConfig = {};
try {
    // NOTE: UTF-8 BOM character is not supported, make sure UTF-8 NO BOM is used
    minifyConfig = JSON.parse(fs.readFileSync("./minify.json", "utf8"));
    console.log("Loaded minify config:", minifyConfig);
} catch (error) {
    console.warn("Could not load minify.json, proceeding with defaults. Error message: " + error.message);
}

// Function to minify files
const processFile = async (file) => {
    try {
        const ext = path.extname(file);
        if (!supportedExtensions.includes(ext)) return;

        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, file.replace(ext, `.min${ext}`));

        // Pass the minifyConfig explicitly to the minify function
        const minifiedContent = await minify(inputFile, minifyConfig);

        fs.writeFileSync(outputFile, minifiedContent);
        console.log(`Minified: ${outputFile}`);
    } catch (err) {
        console.error(`Error minifying ${file}:`, err);
    }
};

// Process files in the input directory
fs.readdirSync(inputDir)
    .filter((file) => supportedExtensions.includes(path.extname(file)))
    .forEach((file) => processFile(file));
