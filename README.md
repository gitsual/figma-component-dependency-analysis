# 🎉 Figma Component Dependency Analysis

Welcome to the **Figma Component Dependency Analysis** project! 🎉

This project is a powerful tool designed to help you understand and optimize the dependencies between components in your Figma design files. By analyzing how components depend on each other, you can identify the most critical components, plan development order, and improve the efficiency of your design system.

## 🚀 What is Figma Component Dependency Analysis?

The Figma Component Dependency Analysis project is a cutting-edge tool designed to help you understand the intricate dependencies between components in your Figma designs. By analyzing how components rely on each other, this tool enables you to identify the most critical components, plan development order, and optimize your design system for better reusability and efficiency.

## 🌟 Why This Project?

In today's fast-paced design environment, understanding dependencies is crucial. The Figma Component Dependency Analysis project is designed to provide you with the clarity needed to manage complex design systems, prioritize critical components, and streamline your development process. By focusing on dependencies, this tool helps ensure that your design system is both scalable and maintainable.

## 🛠️ Key Features

- **Dependency Analysis**: Identify and visualize the dependencies between components, from atomic components to those that rely on multiple others, giving you a clear picture of your design's architecture.
- **Component Usage Insights**: Discover which components are most used across your design, helping you prioritize and optimize these key elements.
- **Development Order Guidance**: Understand the order in which components should be developed based on their dependencies, ensuring a smooth and efficient workflow.
- **High-Quality Reports**: Generate detailed and actionable reports that provide clear insights into your component structure, making it easier to communicate with your team.
- **Scalable Growth**: Designed with future growth in mind, this tool has the potential to evolve into a comprehensive plugin, enhancing its capabilities and integration within the Figma ecosystem.

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- A Figma API token and the file ID of the Figma file you wish to analyze

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gitsual/figma-component-dependency-analysis.git
   cd figma-component-dependency-analysis
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Figma API token and file ID:

   ```plaintext
   FIGMA_API_TOKEN=your-figma-api-token
   FILE_ID=your-figma-file-id
   ```

#### Setting Up Your .env File

Before you begin using the Figma Component Dependency Analysis tool, you'll need to configure your environment by setting up a `.env` file in the root directory of your project. This file will store sensitive information such as your Figma API token and the ID of the Figma file you wish to analyze.

Your `.env` file should look like this:

```plaintext
FIGMA_API_TOKEN=figd_XXX_XXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXX
FILE_ID=YYYYYYYYYYYYYYYYYYYYYY
```

##### Obtaining Your FIGMA_API_TOKEN

1. **Log in to Figma**: Start by logging into your Figma account.
2. **Access Your Account Settings**: Click on your profile picture in the top-right corner, and select "Settings."
3. **Generate a Personal Access Token**: Scroll down to the "Personal Access Tokens" section and click "Create a new token." You will be prompted to give your token a name. Once created, copy the token—this is your `FIGMA_API_TOKEN`.
4. **Store the Token Securely**: Paste the token into the `.env` file as shown above. Ensure that this file is not shared publicly, as it contains sensitive information.

##### Finding Your FILE_ID

1. **Open the Figma File**: Navigate to the Figma file you want to analyze.
2. **Copy the File ID from the URL**: The `FILE_ID` is part of the URL when viewing your file. For example, if your file's URL is `https://www.figma.com/file/YYYYYYYYYYYYYYYYYYYYYY/My-Design-File`, then `YYYYYYYYYYYYYYYYYYYYYY` is your `FILE_ID`.
3. **Add the FILE_ID to Your .env File**: Copy the ID and paste it into the `.env` file under `FILE_ID`.

### Running the Analysis

To run the analysis, execute the following command:

```bash
npm start
```

This will analyze the dependencies within your Figma file and generate detailed reports in the `output` directory.

## 📚 Running the Docusaurus Documentation

To run and view the Docusaurus documentation locally, follow these steps:

1. Navigate to the documentation directory:
```bash
cd doc
```

2. Start the Docusaurus local server:

```bash
npm run start
```

3. View the documentation: Open your browser and navigate to http://localhost:3000. You will see the documentation homepage where you can explore all the guides and references.

This setup allows you to easily update and view changes to the documentation in real-time as you work on your project.

## 🎯 Example Workflow

Here’s a quick overview of how you might use the Figma Component Dependency Analysis project in your workflow:

1. **Set up your environment**: Ensure all configurations, including your Figma API token and `FILE_ID`, are correctly set up in your `.env` file.
2. **Run the Dependency Analysis**: Execute the main script to analyze the dependencies within your Figma file. The process will guide you through selecting the relevant canvas and generating detailed reports.
3. **Review Dependency Reports**: Once the analysis is complete, examine the reports to understand which components are most dependent on others and how they are used throughout your design.
4. **Plan Development**: Use the insights gained from the reports to plan the development order of components, starting with the most foundational elements.
5. **Output Improvement**: As the project grows, focus on enhancing the quality and clarity of the reports, and consider contributing to the development of a plugin.

## 🙌 Get Involved!

This project is open-source and thrives on collaboration. As we aim to evolve this tool into a powerful plugin, your contributions and ideas are invaluable. Check out the repository, and don't hesitate to submit issues, improvements, or pull requests.

## 🚦 Ready to Start?

Navigate through the sidebar to explore the details of each module, or begin with the setup guide to get everything up and running. Happy analyzing, and let's build something great together! 🎉

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/gitsual/figma-component-dependency-analysis/blob/main/LICENSE) file for details.

## 📬 Contact

- GitHub: [gitsual](https://github.com/gitsual)
- Twitter: [@sanz_sual](https://twitter.com/sanz_sual)
- Instagram: [@sanz_sual](https://instagram.com/sanz_sual)

## 🌟 Acknowledgements

Special thanks to the open-source community for their contributions and support!
