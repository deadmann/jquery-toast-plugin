// updates package version last number

const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

const packageJsonPath = path.resolve(__dirname, "../package.json");

try {
    const packageJson = require(packageJsonPath);

    // Ensure there's a version field to work with
    if (!packageJson.version) {
        throw new Error("No version field found in package.json");
    }
    
    // Files to watch
    const filesToWatch = [
        "src/jquery.toast.js",
        "src/jquery.toast.css",
    ];

    // Get the status of the files in the staging area
    const status = execSync("git diff --cached --name-only").toString();

    // Check if any of the critical files were staged (modified)
    const hasChanges = filesToWatch.some((file) => status.includes(file));

    if (hasChanges) {
        // Increment patch version (the last number)
        const versionParts = packageJson.version.split(".");
        versionParts[2] = (parseInt(versionParts[2]) + 1).toString(); // Increment the last number
        packageJson.version = versionParts.join(".");

        // Write the updated version to the package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`Version updated to ${packageJson.version}`);
    }
} catch (error) {
    console.error("Error updating version:", error);
}
