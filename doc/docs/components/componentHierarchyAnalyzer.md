---
id: component-hierarchy-analyzer
title: Component Hierarchy Analyzer
sidebar_label: Component Hierarchy Analyzer
---

# 🧩 Component Hierarchy Analyzer

Welcome to the documentation for the `componentHierarchyAnalyzer.js` file! This module is a key part of the process that breaks down and categorizes components within a Figma design file. It helps in understanding how components are structured, which ones are most complex, and how they relate to one another. Let's dive into the details! 🌟

## 📝 Overview

The `componentHierarchyAnalyzer.js` module is responsible for analyzing a component hierarchy, categorizing components by their complexity, and generating a report that outlines these relationships. The results are saved in a JSON file, making them easy to review and use for further analysis or decision-making.

## ⚙️ Functions

### `loadComponentsFromFile`

```javascript
function loadComponentsFromFile(filePath) { /* ... */ }
```

**Description:**

This function loads a JSON file from a specified path and parses its contents into a JavaScript object. It’s the first step in the process, providing the raw data that will be analyzed. If the file cannot be read or parsed, an error is thrown to ensure that the issue is identified and handled appropriately.

**Parameters:**

- **`filePath`** (string): The path to the JSON file to be loaded.

**Returns:**

- **`Object|null`**: The parsed object from the JSON file, or `null` if an error occurs.

**Throws:**

- **`Error`**: If the file cannot be read or the JSON cannot be parsed, this function will throw an error with a detailed message.

**Example Usage:**

```javascript
const components = loadComponentsFromFile('./output/componentHierarchy.json');
```

### `analyzeComponentHierarchy`

```javascript
function analyzeComponentHierarchy() { /* ... */ }
```

**Description:**

This is the main function of the module, responsible for analyzing the component hierarchy. It categorizes components by complexity—based on the number of children each component has—and identifies atomic components (those without any children). The results are then saved as a JSON file for further review.

**Returns:**

- **`void`**: This function does not return a value, but it writes the analysis results to a JSON file.

**Throws:**

- **`Error`**: If the component hierarchy cannot be loaded or if there is an issue writing the results to the output file, an error will be thrown.

**Example Usage:**

```javascript
analyzeComponentHierarchy();
```

## 🛠️ Process Breakdown

The `analyzeComponentHierarchy` function follows a detailed process to ensure that the component hierarchy is accurately analyzed and categorized:

1. **Loading the Component Hierarchy**: The function begins by loading the component hierarchy from a JSON file using the `loadComponentsFromFile` function. If this step fails, an error is thrown, stopping the process to prevent further issues.

2. **Identifying Atomic Components**: The function then identifies atomic components—those that have no children. These components are typically the simplest and are often reused throughout the design.

3. **Categorizing by Complexity**: Components are categorized by the number of children they have. This helps in understanding which components are more complex and likely require more attention during the design and review processes.

4. **Mapping Relationships**: The function creates a detailed map of the relationships between components, showing which components are composed of others. This is crucial for understanding the overall structure and flow of the design system.

5. **Saving the Results**: Finally, the function saves the analysis results, including the categorized components and their relationships, to a JSON file. This file can be used for further analysis, reporting, or optimization of the design system.

## 🚨 Error Handling

The module is designed with robust error handling to ensure that any issues are quickly identified and communicated:

- **File Loading**: If there is an issue loading the component hierarchy from the file, an error is thrown with a detailed message. This prevents the analysis from proceeding with incomplete or corrupted data.

- **Analysis Process**: Throughout the analysis process, errors are caught and logged, ensuring that any unexpected issues are handled gracefully without causing the application to crash.

- **File Saving**: If there is an issue saving the results to the output file, the function throws an error. This ensures that the user is aware of any issues and can take corrective action.
