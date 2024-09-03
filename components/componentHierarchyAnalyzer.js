// components/componentHierarchyAnalyzer.js
const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, '../output/componentHierarchy.json');
const outputFilePath = path.join(__dirname, '../output/componentAppearanceAnalysis.json');

/**
 * Loads a JSON file and parses it into an object.
 *
 * This function reads a JSON file from the specified file path, parses its contents, 
 * and returns the resulting object. If the file cannot be read or parsed, an error is thrown.
 *
 * @param {string} filePath - The path to the JSON file to load.
 * @returns {Object|null} The parsed object from the JSON file, or null if an error occurs.
 *
 * @throws {Error} Will throw an error if the file cannot be read or the JSON cannot be parsed.
 */
function loadComponentsFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing the JSON file:', error);
        throw new Error(`Failed to load or parse JSON file at ${filePath}: ${error.message}`);
    }
}

/**
 * Analyzes a component hierarchy and categorizes components by complexity.
 *
 * This function processes a component hierarchy, identifies atomic components, 
 * categorizes components by the number of children they have, and generates a report 
 * that maps these relationships. The result is saved as a JSON file.
 *
 * @returns {void} This function does not return a value, but writes the analysis to a JSON file.
 *
 * @throws {Error} Will throw an error if the component hierarchy cannot be loaded or if there is an issue writing the file.
 */
function analyzeComponentHierarchy() {
    try {
        const components = loadComponentsFromFile(inputFilePath);
        if (!components) {
            throw new Error('Component hierarchy could not be loaded.');
        }

        const atomicComponents = [];
        const componentComplexity = {};
        const componentHierarchy = {};

        /**
         * Counts the number of unique children for a given component.
         *
         * @param {string} componentId - The ID of the component to count children for.
         * @returns {number} The number of unique children.
         */
        function countComponentChildren(componentId) {
            const component = components[componentId];
            if (!component) return 0;

            const uniqueChildren = new Set();

            component.children.forEach(childId => {
                if (components[childId]) {
                    uniqueChildren.add(components[childId].name);
                }
            });

            return uniqueChildren.size;
        }

        // Iterate through components and categorize them
        for (const [id, component] of Object.entries(components)) {
            const childrenCount = countComponentChildren(id);

            if (childrenCount === 0) {
                atomicComponents.push(id);
            } else {
                if (!componentComplexity[childrenCount]) {
                    componentComplexity[childrenCount] = [];
                }
                componentComplexity[childrenCount].push(id);
            }

            const uniqueChildren = new Set();
            component.children.forEach(childId => {
                if (components[childId]) {
                    uniqueChildren.add(components[childId].name);
                }
            });

            componentHierarchy[id] = {
                name: component.name,
                children: Array.from(uniqueChildren).map(childName => {
                    for (const [childId, childComponent] of Object.entries(components)) {
                        if (childComponent.name === childName) {
                            return { name: childName, id: childId };
                        }
                    }
                })
            };
        }

        const result = {
            atomicComponents: atomicComponents.map(id => ({
                id,
                name: componentHierarchy[id].name
            })),
            componentsByComplexity: Object.keys(componentComplexity).sort((a, b) => a - b).map(count => ({
                childrenCount: count,
                components: componentComplexity[count].map(id => ({
                    id,
                    name: componentHierarchy[id].name,
                    children: componentHierarchy[id].children
                }))
            }))
        };

        try {
            fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2), 'utf8');
            console.log(`Component hierarchy saved to ${outputFilePath}`);
        } catch (error) {
            throw new Error(`Failed to write the component hierarchy to ${outputFilePath}: ${error.message}`);
        }
    } catch (error) {
        console.error('An error occurred during component hierarchy analysis:', error.message);
        throw error;
    }
}

module.exports = { analyzeComponentHierarchy };
