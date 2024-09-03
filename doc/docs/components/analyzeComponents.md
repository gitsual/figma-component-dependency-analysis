---
id: analyze-components
title: Analyze Components
sidebar_label: Analyze Components
---

# 🔎 Analyze Components

Welcome to the documentation for the `analyzeComponents.js` file! This module plays a crucial role in analyzing components within a Figma file, creating a component hierarchy, and saving it as a JSON file. Let's dive into the details of how this works. 🚀

## 📝 Overview

The `analyzeComponents.js` file contains the logic for extracting and processing components from a selected canvas within a Figma file. The main function, `analyzeComponents`, orchestrates the retrieval of data, user interaction, and the generation of a detailed component hierarchy. This hierarchy is then saved to the output directory for further use.

## ⚙️ Functions

### `analyzeComponents`

```javascript
async function analyzeComponents() { /* ... */ }
```

**Description:**

The primary function in this module, `analyzeComponents`, handles the entire process of fetching a Figma file, allowing the user to select a canvas, analyzing the components within that canvas, and then saving the resulting component hierarchy as a JSON file. It's the go-to function for kickstarting the component analysis.

**Returns:**

- `Promise<void>` - This function doesn’t return any value. Instead, it writes a JSON file to the output directory, which contains the complete component hierarchy.

**Throws:**

- `Error` - If there’s an issue retrieving the Figma file, analyzing components, or writing the output file, the function will throw an error, ensuring that any problems are promptly flagged.

**Example Usage:**

```javascript
await analyzeComponents();
```

### Internal Functions

To make `analyzeComponents` as powerful as it is, several helper functions work behind the scenes. Here’s a breakdown:

#### `askQuestion`

```javascript
function askQuestion(query) { /* ... */ }
```

**Description:**

Prompts the user with a question in the terminal and returns the answer. This function is key to selecting the desired canvas.

**Parameters:**

- `query` (string): The question to ask the user.

**Returns:**

- `Promise<string>` - A promise that resolves with the user's answer.

**Throws:**

- `Error` - If there’s an issue with the readline interface, the function throws an error, ensuring user input is managed correctly.

**Example Usage:**

```javascript
const answer = await askQuestion('Select a canvas: ');
console.log(`You selected: ${answer}`);
```

#### `normalizeName`

```javascript
function normalizeName(name) { /* ... */ }
```

**Description:**

Normalizes a component name by removing diacritics, replacing special characters, and converting the string to lowercase. This is essential for consistency across the analysis process.

**Parameters:**

- `name` (string): The name to normalize.

**Returns:**

- `string` - The normalized name.

**Throws:**

- `Error` - If the name cannot be normalized, an error is thrown to prevent inconsistencies.

**Example Usage:**

```javascript
const normalizedName = normalizeName('Botón = Principal');
console.log(normalizedName); // Outputs: 'boton = principal'
```

## 🛠️ Process Breakdown

Here's a step-by-step breakdown of what happens when you run `analyzeComponents`:

1. **Fetch Figma File:** The function starts by retrieving the Figma file using the Figma API. If the file can’t be retrieved, an error is thrown.
2. **Select Canvas:** Once the file is fetched, available CANVAS nodes are listed, and the user is prompted to select one.
3. **Analyze Components:** The selected canvas is analyzed to identify components, instances, and component sets. These are then structured into a hierarchy.
4. **Propagate Components:** Relationships between components are propagated across multiple levels, ensuring that the hierarchy reflects all dependencies.
5. **Save Output:** Finally, the resulting hierarchy is saved as a JSON file in the output directory.

## 🚨 Error Handling

Error handling is integral to the robustness of `analyzeComponents.js`. Each function within this module includes error management that:

- **Logs Errors:** Whenever an issue arises, the error is logged with a descriptive message.
- **Throws Descriptive Errors:** Rather than allowing silent failures, functions throw errors with detailed messages, making it easier to trace back the source of any problem.
