// components/componentReportGenerator.js

const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, '../output/componentAppearanceAnalysis.json');
const outputFilePath = path.join(__dirname, '../output/componentAppearanceReport.txt');

/**
 * Loads the component appearances analysis from a JSON file.
 *
 * This function reads a JSON file containing the component appearances analysis and parses it into an object.
 * If the file cannot be read or parsed, it throws an error.
 *
 * @param {string} filePath - The path to the JSON file containing the component appearances analysis.
 * @returns {Object|null} The parsed object containing the component appearances analysis, or null if an error occurs.
 *
 * @throws {Error} Will throw an error if the file cannot be read or the JSON cannot be parsed.
 *
 * @example
 * const analysis = loadComponentAppearancesFromFile('./output/componentAppearanceAnalysis.json');
 */
function loadComponentAppearancesFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing the JSON file:', error);
        throw new Error(`Failed to load or parse JSON file at ${filePath}: ${error.message}`);
    }
}

/**
 * Generates a readable report from the component appearances analysis.
 *
 * This function processes the component appearances analysis to generate a human-readable report that
 * categorizes components based on the number of other components they appear in. The report is structured
 * by complexity, making it easier to understand the relationships between components.
 *
 * @param {Object} analysis - The object containing the component appearances analysis.
 * @returns {string} A formatted string representing the readable report.
 *
 * @example
 * const report = generateReadableReport(analysis);
 */
function generateReadableReport(analysis) {
    const componentsByComplexity = {};

    for (const componentId in analysis.componentAppearances) {
        const component = analysis.componentAppearances[componentId];
        const complexity = component.appearsIn.length;

        if (!componentsByComplexity[complexity]) {
            componentsByComplexity[complexity] = [];
        }

        componentsByComplexity[complexity].push(component);
    }

    let report = '';

    Object.keys(componentsByComplexity).sort((a, b) => a - b).forEach(complexity => {
        const components = componentsByComplexity[complexity];
        components.forEach(component => {
            report += `- ${component.name}\n`;
            component.appearsIn.forEach(appearance => {
                report += `    - ${appearance.parentName}\n`;
            });
        });
        report += '\n';
    });

    return report;
}

/**
 * Generates the final readable report and saves it to a text file.
 *
 * This function loads the component appearances analysis from a file, generates a readable report,
 * and then writes the report to a specified output file. If any step fails, an error is thrown.
 *
 * @returns {void} This function does not return a value, but it writes the report to a file.
 *
 * @throws {Error} Will throw an error if the component appearances analysis cannot be loaded, the report cannot be generated, or the file cannot be written.
 *
 * @example
 * generateReport();
 */
function generateReport() {
    try {
        const analysis = loadComponentAppearancesFromFile(inputFilePath);
        if (!analysis) {
            throw new Error('Component appearances analysis could not be loaded.');
        }

        const readableReport = generateReadableReport(analysis);
        try {
            fs.writeFileSync(outputFilePath, readableReport, 'utf8');
            console.log(`Readable report saved to ${outputFilePath}`);
        } catch (error) {
            throw new Error(`Failed to write the readable report to ${outputFilePath}: ${error.message}`);
        }
    } catch (error) {
        console.error('An error occurred while generating the report:', error.message);
        throw error;
    }
}

module.exports = { generateReport };
