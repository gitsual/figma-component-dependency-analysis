---
id: component-report-generator
title: Component Report Generator
sidebar_label: Component Report Generator
---

# 📄 Component Report Generator

Welcome to the documentation for the `componentReportGenerator.js` file! 🎉 This module is the final piece in the puzzle 🧩 that generates a human-readable report based on the analysis of component appearances within a Figma design file. Let's dive into the details of how this works, step by step!

## 📝 Overview

The `componentReportGenerator.js` file is designed to take the output from the component appearances analysis and transform it into a clean, organized report that is easy for humans to read. This report categorizes components based on their complexity, which is determined by how often they appear in other components.

## ⚙️ Functions

### `loadComponentAppearancesFromFile`

```javascript
function loadComponentAppearancesFromFile(filePath) { /* ... */ }
```

**Description:**

This function reads a JSON file that contains the results of the component appearances analysis. It parses the file into a JavaScript object, making the data accessible for further processing.

**Parameters:**

- **`filePath`** (`string`): The path to the JSON file containing the component appearances analysis.

**Returns:**

- **`Object|null`**: Returns the parsed JSON object if successful, or `null` if an error occurs.

**Throws:**

- **`Error`**: Throws an error if the file cannot be read or if there is an issue with parsing the JSON.

**Example Usage:**

```javascript
const analysis = loadComponentAppearancesFromFile('./output/componentAppearanceAnalysis.json');
```

### `generateReadableReport`

```javascript
function generateReadableReport(analysis) { /* ... */ }
```

**Description:**

This function processes the component appearances analysis and generates a human-readable report 📑. The report is structured to categorize components based on the number of other components they appear in, providing insights into their complexity.

**Parameters:**

- **`analysis`** (`Object`): The object containing the component appearances analysis.

**Returns:**

- **`string`**: A formatted string that represents the readable report.

**Example Usage:**

```javascript
const report = generateReadableReport(analysis);
```

### `generateReport`

```javascript
function generateReport() { /* ... */ }
```

**Description:**

This is the main function of the module 🧩. It orchestrates the process of loading the component appearances analysis, generating a readable report, and saving that report to a file. It handles all the heavy lifting so that you end up with a polished, user-friendly report.

**Returns:**

- **`void`**: This function does not return a value, but it writes the generated report to a text file.

**Throws:**

- **`Error`**: Throws an error if the component appearances analysis cannot be loaded, the report cannot be generated, or the file cannot be written.

**Example Usage:**

```javascript
generateReport();
```

## 🛠️ Process Breakdown

1. **Load the Analysis**: The `generateReport` function starts by loading the component appearances analysis from a JSON file using `loadComponentAppearancesFromFile`.

2. **Generate the Report**: The loaded analysis is then passed to `generateReadableReport`, which converts it into a structured, easy-to-read text format.

3. **Save the Report**: Finally, the generated report is saved to a specified output file, making it ready for review and presentation.

## 🚨 Error Handling

Each function in this module is equipped with robust error handling 🛡️. If something goes wrong—whether it’s a file that can’t be read, an issue with parsing, or a problem writing the report—the error is caught, logged with a helpful message, and re-thrown to ensure that it can be properly addressed.
