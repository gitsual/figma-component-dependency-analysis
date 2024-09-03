// components/componentAppearanceAnalyzer.js

const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, '../output/componentAppearanceAnalysis.json');
const outputFilePath = path.join(__dirname, '../output/componentAppearanceAnalysis.json');

/**
 * Loads and parses a JSON file containing the component hierarchy.
 *
 * This function reads a JSON file from the specified file path and parses its contents into a JavaScript object.
 * If the file cannot be read or parsed, an error is logged, and null is returned.
 *
 * @param {string} filePath - The path to the JSON file to be loaded.
 * @returns {Object|null} The parsed JSON object, or null if an error occurred.
 *
 * @throws {Error} Will throw an error if there is an issue reading or parsing the file.
 */
function loadComponentHierarchyFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing the JSON file:', error.message);
        throw new Error(`Failed to load component hierarchy from file: ${filePath}`);
    }
}

/**
 * Analyzes the appearances of components in the component hierarchy.
 *
 * This function processes the component hierarchy to determine where each component appears within other components.
 * It calculates the complexity of each component and estimates the time required to analyze all components.
 * The results are saved as a JSON file.
 *
 * @returns {void} This function does not return a value, but it writes a JSON file containing the analysis results.
 *
 * @throws {Error} Will throw an error if the component hierarchy cannot be loaded or if there is an issue writing the results to the output file.
 *
 * @example
 * analyzeComponentAppearances();
 *
 * @process
 * - Step 1: Load the component hierarchy from the specified input file.
 * - Step 2: Analyze the appearances of each component in the hierarchy.
 * - Step 3: Calculate the estimated time required to analyze all components.
 * - Step 4: Save the analysis results to the specified output file.
 */
function analyzeComponentAppearances() {
    let componentHierarchy;
    try {
        componentHierarchy = loadComponentHierarchyFromFile(inputFilePath);
        if (!componentHierarchy) {
            throw new Error('Component hierarchy is null or undefined.');
        }
    } catch (error) {
        console.error('Failed to load component hierarchy:', error.message);
        throw error;
    }

    const componentAppearances = {};

    const components = [
        ...(componentHierarchy.atomicComponents || []),
        ...(componentHierarchy.componentsByComplexity || []).flatMap(group => group.components)
    ];

    components.forEach(component => {
        componentAppearances[component.id] = {
            name: component.name,
            appearsIn: []
        };

        components.forEach(otherComponent => {
            if (otherComponent.children && Array.isArray(otherComponent.children)) {
                if (otherComponent.children.some(child => child.id === component.id)) {
                    componentAppearances[component.id].appearsIn.push({
                        parentId: otherComponent.id,
                        parentName: otherComponent.name
                    });
                }
            }
        });
    });

    const timePerComponent = 10; // Time estimation in minutes per component
    const totalComponents = components.length;
    const totalTime = totalComponents * timePerComponent;

    const analysisResult = {
        componentAppearances,
        timeEstimation: {
            totalComponents,
            hours: Math.floor(totalTime / 60),
            minutes: totalTime % 60
        }
    };

    try {
        fs.writeFileSync(outputFilePath, JSON.stringify(analysisResult, null, 2), 'utf8');
        console.log(`Component appearance analysis saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Failed to write the component appearance analysis:', error.message);
        throw new Error(`Failed to save analysis results to ${outputFilePath}`);
    }
}

module.exports = { analyzeComponentAppearances };
