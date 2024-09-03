const fs = require('fs');
const path = require('path');
const { analyzeComponents } = require('./components/analyzeComponents');
const { analyzeComponentHierarchy } = require('./components/componentHierarchyAnalyzer');
const { analyzeComponentAppearances } = require('./components/componentAppearanceAnalyzer');
const { generateReport } = require('./components/componentReportGenerator');

const figmaResponsePath = path.join(__dirname, './api/output/figmaResponse.json');
const outputDir = path.join(__dirname, './output');

/**
 * Deletes specific files and directories after the analysis is complete.
 *
 * This function ensures that the `figmaResponse.json` file and all files in the output directory
 * except for `componentAppearanceReport.txt` are deleted after the process is completed.
 *
 * @returns {void} This function does not return a value.
 *
 * @throws {Error} Will throw an error if there is an issue deleting the files or directories.
 */
function cleanUp() {
    try {
        // Delete figmaResponse.json
        if (fs.existsSync(figmaResponsePath)) {
            fs.unlinkSync(figmaResponsePath);
            console.log(`Deleted file: ${figmaResponsePath}`);
        }

        // Delete files in the output directory except componentAppearanceReport.txt
        fs.readdirSync(outputDir).forEach(file => {
            const filePath = path.join(outputDir, file);
            if (file !== 'componentAppearanceReport.txt') {
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                    console.log(`Deleted directory: ${filePath}`);
                } else {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted file: ${filePath}`);
                }
            }
        });
    } catch (error) {
        console.error('Error during cleanup:', error);
        throw new Error('Failed to clean up output files.');
    }
}

/**
 * Main function that coordinates the analysis of components, component hierarchy, and appearances, 
 * and generates a final report.
 *
 * This function orchestrates the entire process of analyzing Figma components. It first analyzes the 
 * components of the selected canvas, then it analyzes the component hierarchy and appearances, 
 * and finally, it generates a comprehensive report.
 *
 * @async
 * @example
 * main();
 *
 * @process
 * - Step 1: Analyze the components of the selected canvas using `analyzeComponents`.
 * - Step 2: Analyze the component hierarchy using `analyzeComponentHierarchy`.
 * - Step 3: Analyze component appearances using `analyzeComponentAppearances`.
 * - Step 4: Generate the final report using `generateReport`.
 * - Step 5: Clean up unnecessary files after the process is complete.
 *
 * @returns {Promise<void>} This function does not return a value, but it writes a JSON file containing the component analysis report.
 *
 * @throws {Error} Will throw an error if any of the analysis steps fail or if the cleanup fails.
 */
async function main() {
    try {
        console.log("Starting component analysis...");

        // Analyze the components of the selected canvas
        await analyzeComponents();

        // Analyze the component hierarchy
        analyzeComponentHierarchy();

        // Analyze component appearances
        analyzeComponentAppearances();

        // Generate the final report
        generateReport();

        console.log("Process completed. The report has been generated in the output folder.");
    } catch (error) {
        console.error("An error occurred during the component analysis process:", error);
        throw new Error("Component analysis process failed.");
    } finally {
        // Clean up files after the process completes
        cleanUp();
    }
}

main();
