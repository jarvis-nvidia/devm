# 🚀 DevMind AI Assistant - Installation Guide

## Prerequisites

Before installing DevMind AI Assistant, ensure you have:

- **VS Code** version 1.74.0 or higher
- **Node.js** version 16 or higher
- **Git** (for Git integration features)
- **OpenRouter API Key** (for Quen 3 access)

## 📦 Installation Steps

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Sign up or log in to your account
3. Generate a new API key
4. Copy the API key (you'll need it for configuration)

### 2. Install the Extension

#### Option A: Install from VSIX (Development)
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd devmind-ai-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the extension:
   ```bash
   npm run compile
   ```

4. Package the extension:
   ```bash
   npm run package
   ```

5. Install the VSIX file in VS Code:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click the "..." menu and select "Install from VSIX..."
   - Choose the generated `.vsix` file

#### Option B: Install from Marketplace (Production)
*Coming soon - The extension will be available on the VS Code Marketplace*

### 3. Configure the Extension

1. Open VS Code Settings (Ctrl+,)
2. Search for "DevMind"
3. Configure the following settings:

   **Required:**
   - `devmind.apiKey`: Your OpenRouter API key

   **Optional:**
   - `devmind.model`: Quen 3 model variant (default: `qwen/qwen3-32b:free`)
   - `devmind.enableContextAnalysis`: Enable automatic context analysis (default: true)
   - `devmind.enableGitIntegration`: Enable Git-based historical memory (default: true)

### 4. Environment Configuration (Optional)

Create a `.env` file in your workspace root for additional configuration:

```env
OPENROUTER_API_KEY=your_api_key_here
QUEN_MODEL=qwen/qwen3-32b:free
ENABLE_CONTEXT_ANALYSIS=true
ENABLE_GIT_INTEGRATION=true
```

## 🎯 First Steps

### 1. Activate DevMind

1. Open the Command Palette (Ctrl+Shift+P)
2. Type "DevMind: Activate AI Assistant"
3. Press Enter to initialize the AI

### 2. Test the Installation

1. Open any code file in VS Code
2. Use the Command Palette to run "DevMind: Analyze Current Context"
3. You should see a new document with AI analysis

## 🛠️ Development Setup

### Building from Source

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd devmind-ai-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npm run compile
   ```

4. Start development mode:
   ```bash
   npm run watch
   ```

5. Press F5 in VS Code to launch the Extension Development Host

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## 🔧 Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Ensure you've set the `devmind.apiKey` in VS Code settings
   - Verify your OpenRouter API key is valid

2. **"Failed to connect to Quen 3" error**
   - Check your internet connection
   - Verify your API key has sufficient credits
   - Ensure the model name is correct

3. **Extension not activating**
   - Check VS Code version (requires 1.74.0+)
   - Restart VS Code after installation
   - Check the Developer Console for errors

4. **Git integration not working**
   - Ensure Git is installed and accessible
   - Verify the workspace is a Git repository
   - Check Git configuration

### Debug Mode

1. Open the Command Palette (Ctrl+Shift+P)
2. Run "Developer: Toggle Developer Tools"
3. Check the Console tab for error messages

### Logs

Extension logs can be found in:
- Windows: `%APPDATA%\Code\logs`
- macOS: `~/Library/Application Support/Code/logs`
- Linux: `~/.config/Code/logs`

## 📚 Next Steps

After installation, explore these features:

1. **Context Analysis**: Understand your codebase
2. **Code Refactoring**: Improve code quality
3. **Bug Detection**: Find and fix issues
4. **Documentation**: Generate comprehensive docs
5. **Git Operations**: Smart commit messages and changelogs

## 🤝 Support

- **Issues**: Report bugs on GitHub
- **Documentation**: Check the README.md for detailed feature descriptions
- **Community**: Join our Discord server (coming soon)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy coding with DevMind! 🧠✨**
