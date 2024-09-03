// components/analyzeComponents.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { getFigmaFile } = require('../api/figmaService');

const outputFilePath = path.join(__dirname, '../output/componentHierarchy.json');

/**
 * Prompts the user with a question in the terminal and returns the answer.
 *
 * @param {string} query - The question to ask the user.
 * @returns {Promise<string>} A promise that resolves with the user's answer.
 *
 * @example
 * const answer = await askQuestion('Select a canvas: ');
 * console.log(`You selected: ${answer}`);
 *
 * @throws {Error} Will throw an error if there is an issue with the readline interface.
 */
function askQuestion(query) {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => rl.question(query, answer => {
            rl.close();
            resolve(answer);
        }));
    } catch (error) {
        console.error('Error with readline interface:', error);
        throw new Error('Failed to prompt the user with a question.');
    }
}

/**
 * Normalizes a component name by removing diacritics, replacing special characters, and converting to lowercase.
 *
 * @param {string} name - The name to normalize.
 * @returns {string} The normalized name.
 *
 * @example
 * const normalizedName = normalizeName('Botón = Principal');
 * console.log(normalizedName); // Outputs: 'boton = principal'
 *
 * @throws {Error} Will throw an error if the name cannot be normalized.
 */
function normalizeName(name) {
    try {
        return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ñ/g, 'n')
            .replace(/Ñ/g, 'N')
            .toLowerCase();
    } catch (error) {
        console.error('Error normalizing name:', error);
        throw new Error('Failed to normalize the component name.');
    }
}

/**
 * Analyzes the components in a Figma file, generates a component hierarchy, and saves it to a JSON file.
 *
 * This function fetches a Figma file using the Figma API, allows the user to select a canvas, and then
 * recursively analyzes the components, instances, and component sets within the selected canvas. The result
 * is a hierarchical structure that is saved as a JSON file for further analysis.
 *
 * @async
 * @returns {Promise<void>} This function does not return a value, but it writes a JSON file containing the component hierarchy.
 *
 * @example
 * await analyzeComponents();
 *
 * @process
 * - Step 1: Fetch the Figma file using the Figma API.
 * - Step 2: Filter and display available CANVAS nodes for user selection.
 * - Step 3: Recursively analyze components, instances, and component sets.
 * - Step 4: Propagate components through multiple levels to build the hierarchy.
 * - Step 5: Save the resulting hierarchy to a JSON file.
 *
 * @throws {Error} Will throw an error if there is an issue retrieving the Figma file, analyzing components, or writing the output file.
 */
async function analyzeComponents() {
    try {
        const figmaFile = await getFigmaFile();
        if (!figmaFile) {
            console.log('Could not retrieve the Figma file.');
            return;
        }

        const document = figmaFile.document;
        const canvases = document.children.filter(node => node.type === 'CANVAS');
        if (canvases.length === 0) {
            console.log('No CANVAS nodes were found in the Figma file.');
            return;
        }

        console.log('Available CANVAS:');
        canvases.forEach((canvas, index) => {
            console.log(`${index + 1}: ${canvas.name}`);
        });

        const answer = await askQuestion('Select a CANVAS by number: ');
        const selectedIndex = parseInt(answer, 10) - 1;

        if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= canvases.length) {
            console.log('Invalid selection. Exiting.');
            return;
        }

        const selectedCanvas = canvases[selectedIndex];
        console.log(`You selected: ${selectedCanvas.name}`);

        const componentHierarchy = {};
        const nameToIdMap = {};

        /**
         * Recursively collects components and their IDs within a node.
         *
         * @param {Object} node - The node to analyze.
         */
        function collectComponents(node) {
            try {
                if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
                    const normalizedNodeName = normalizeName(node.name);
                    nameToIdMap[normalizedNodeName] = node.id;
                }

                if (node.children) {
                    node.children.forEach(child => collectComponents(child));
                }
            } catch (error) {
                console.error('Error collecting components:', error);
                throw new Error('Failed to collect components from the node.');
            }
        }

        /**
         * Recursively analyzes a node to build the component hierarchy.
         *
         * @param {Object} node - The node to analyze.
         * @param {string} [parentName=''] - The name of the parent node.
         */
        function analyzeNode(node, parentName = '') {
            try {
                if (node.type === 'COMPONENT' || node.type === 'INSTANCE' || node.type === 'COMPONENT_SET') {
                    let nodeName = node.name;

                    if (nodeName.includes('=') && parentName && !nodeName.startsWith(parentName)) {
                        nodeName = `${parentName} / ${nodeName}`;
                    }

                    const normalizedNodeName = normalizeName(nodeName);
                    const componentId = nameToIdMap[normalizedNodeName] || node.id;

                    if (!componentHierarchy[componentId]) {
                        componentHierarchy[componentId] = {
                            name: nodeName,
                            children: []
                        };
                    }

                    const uniqueChildren = new Set(componentHierarchy[componentId].children);

                    (node.children || []).forEach(child => {
                        const childId = nameToIdMap[normalizeName(child.name)] || child.id;
                        uniqueChildren.add(childId);
                        analyzeNode(child, nodeName);
                    });

                    componentHierarchy[componentId].children = Array.from(uniqueChildren);
                }

                if (node.children) {
                    node.children.forEach(child => analyzeNode(child, node.name));
                }
            } catch (error) {
                console.error('Error analyzing node:', error);
                throw new Error('Failed to analyze the node and build the component hierarchy.');
            }
        }

        /**
         * Propagates component relationships through multiple levels in the hierarchy.
         */
        function propagateComponents() {
            try {
                let hasChanged = true;

                while (hasChanged) {
                    hasChanged = false;

                    for (const [componentId, component] of Object.entries(componentHierarchy)) {
                        const originalChildren = [...component.children];

                        for (const childId of originalChildren) {
                            const childComponent = componentHierarchy[childId];
                            if (childComponent) {
                                const newChildren = childComponent.children.filter(c => !component.children.includes(c));
                                if (newChildren.length > 0) {
                                    component.children.push(...newChildren);
                                    hasChanged = true;
                                }
                            }
                        }

                        componentHierarchy[componentId].children = [...new Set(component.children)];
                    }
                }
            } catch (error) {
                console.error('Error propagating components:', error);
                throw new Error('Failed to propagate components through the hierarchy.');
            }
        }

        collectComponents(selectedCanvas);
        analyzeNode(selectedCanvas);
        propagateComponents();

        try {
            fs.writeFileSync(outputFilePath, JSON.stringify(componentHierarchy, null, 2), 'utf8');
            console.log(`The component hierarchy has been saved to ${outputFilePath}`);
        } catch (error) {
            console.error('Error writing to output file:', error);
            throw new Error('Failed to save the component hierarchy to the output file.');
        }
    } catch (error) {
        console.error('Error during component analysis:', error);
        throw new Error('Component analysis failed.');
    }
}

module.exports = { analyzeComponents };
