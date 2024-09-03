// output/figmaService.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN; // Load from .env
const FILE_ID = process.env.FILE_ID; // Load from .env

// Path to the output directory and response file
const outputDir = path.join(__dirname, 'output');
const responseOutputFilePath = path.join(outputDir, 'figmaResponse.json');

/**
 * Fetches a Figma file using the Figma API and saves the response as a JSON file.
 *
 * This function uses the Figma API to retrieve a file based on the provided FILE_ID and FIGMA_API_TOKEN.
 * The response is saved as a JSON file in the specified output directory. If the directory does not exist, 
 * it will be created.
 *
 * @async
 * @returns {Promise<Object|null>} Returns the data from the Figma API as a JSON object, or null if the request fails.
 *
 * @throws {Error} Throws an error if the API request fails or if there is an issue writing the file.
 *
 * @example
 * const figmaData = await getFigmaFile();
 * if (figmaData) {
 *   console.log("Figma data successfully retrieved.");
 * } else {
 *   console.log("Failed to retrieve Figma data.");
 * }
 */
async function getFigmaFile() {
    try {
        const response = await axios.get(`https://api.figma.com/v1/files/${FILE_ID}`, {
            headers: {
                'X-Figma-Token': FIGMA_API_TOKEN
            }
        });

        // Ensure the 'output' directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save the response to a JSON file
        fs.writeFileSync(responseOutputFilePath, JSON.stringify(response.data, null, 2), 'utf8');
        console.log(`Figma API response saved to ${responseOutputFilePath}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching file from Figma API:', error);
        throw new Error('Failed to fetch Figma file or save the response.');
    }
}

module.exports = {
    getFigmaFile
};
