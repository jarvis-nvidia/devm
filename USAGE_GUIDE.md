# 🧠 DevMind AI Assistant - Complete Usage Guide

## 📋 **Table of Contents**
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Getting Started](#getting-started)
4. [Available Commands](#available-commands)
5. [Feature Walkthrough](#feature-walkthrough)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Usage](#advanced-usage)

---

## 🚀 **Installation**

### Prerequisites
- **VS Code** version 1.74.0 or higher
- **Node.js** version 16 or higher (for development)
- **Git** (for Git integration features)
- **OpenRouter API Key** (for Quen 3 access)

### Step 1: Get OpenRouter API Key
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Sign up or log in to your account
3. Generate a new API key
4. Copy the API key (you'll need it for configuration)

### Step 2: Install the Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Click the "..." menu (three dots)
4. Select "Install from VSIX..."
5. Choose `devmind-ai-assistant-0.1.0.vsix`
6. Click "Install"

### Step 3: Restart VS Code
- Restart VS Code to ensure the extension is properly loaded

---

## ⚙️ **Configuration**

### Step 1: Configure API Key
1. Open VS Code Settings (Ctrl+,)
2. Search for "DevMind"
3. Find "Devmind: Api Key" setting
4. Enter your OpenRouter API key
5. Save the settings

### Step 2: Optional Configuration
You can also configure these settings:
- **Model**: Choose Quen 3 model variant (default: `qwen/qwen3-32b:free`)
- **Enable Context Analysis**: Auto-analyze context (default: true)
- **Enable Git Integration**: Use Git history (default: true)

### Step 3: Environment Variables (Optional)
Create a `.env` file in your workspace root:
```env
OPENROUTER_API_KEY=your_api_key_here
QUEN_MODEL=qwen/qwen3-32b:free
ENABLE_CONTEXT_ANALYSIS=true
ENABLE_GIT_INTEGRATION=true
```

---

## 🎯 **Getting Started**

### Step 1: Activate DevMind
1. Open Command Palette (Ctrl+Shift+P)
2. Type "DevMind: Activate AI Assistant"
3. Press Enter
4. You should see: "✅ DevMind AI initialized successfully!"

### Step 2: Test with Sample Code
Create a new file with this sample code:
```javascript
// Sample code for testing DevMind
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

function processUserData(user) {
    if (user.age > 18) {
        console.log("User is adult");
    } else {
        console.log("User is minor");
    }

    return {
        name: user.name,
        age: user.age,
        status: user.age > 18 ? "adult" : "minor"
    };
}
```

---

## 🎮 **Available Commands**

### Core Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `DevMind: Activate AI Assistant` | Initialize the AI system | First command to run |
| `DevMind: Analyze Current Context` | Analyze current code context | Run on any code file |
| `DevMind: Refactor Code` | AI-powered code refactoring | Select code first |
| `DevMind: Debug Issues` | Find and fix bugs | Run on code with issues |
| `DevMind: Generate Documentation` | Create comprehensive docs | Run on any code file |
| `DevMind: Git Operations` | Smart Git assistance | Make changes first |

### How to Use Commands
1. **Open Command Palette**: Ctrl+Shift+P
2. **Type command name**: Start typing "DevMind"
3. **Select command**: Use arrow keys and Enter
4. **Follow prompts**: Some commands have additional options

---

## 🔍 **Feature Walkthrough**

### 1. Context Analysis
**Purpose**: Understand your entire codebase and current context

**Steps**:
1. Open any code file
2. Run "DevMind: Analyze Current Context"
3. A new document opens with analysis including:
   - Code structure overview
   - Quality assessment
   - Performance insights
   - Security considerations
   - Best practices recommendations

**Example Output**:
```markdown
# DevMind Context Analysis

## Code Structure
- Function: calculateTotal (lines 1-7)
- Function: processUserData (lines 9-22)

## Quality Assessment
✅ Good: Clear function names
⚠️  Improve: Add error handling
✅ Good: Consistent formatting

## Performance Insights
- Consider using reduce() for calculateTotal
- Add input validation for processUserData

## Security Considerations
- Validate user input in processUserData
- Add type checking for items array
```

### 2. Code Refactoring
**Purpose**: Improve code quality, readability, and performance

**Steps**:
1. Select code you want to refactor
2. Run "DevMind: Refactor Code"
3. The selected code is replaced with improved version

**Example Before**:
```javascript
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}
```

**Example After**:
```javascript
/**
 * Calculate the total price of all items
 * @param {Array} items - Array of items with price property
 * @returns {number} Total price
 */
function calculateTotal(items) {
    if (!Array.isArray(items)) {
        throw new Error('Items must be an array');
    }

    return items.reduce((total, item) => {
        if (typeof item.price !== 'number') {
            throw new Error('Item price must be a number');
        }
        return total + item.price;
    }, 0);
}
```

### 3. Bug Detection
**Purpose**: Find potential issues and suggest fixes

**Steps**:
1. Open a file with potential issues
2. Run "DevMind: Debug Issues"
3. Check the Problems panel for issues
4. Issues are marked with line numbers and descriptions

**Example Issues Found**:
- Line 5: Potential null reference
- Line 12: Missing error handling
- Line 18: Inconsistent return type

### 4. Documentation Generation
**Purpose**: Create comprehensive documentation

**Steps**:
1. Open any code file
2. Run "DevMind: Generate Documentation"
3. A new document with detailed documentation is created

**Example Output**:
```markdown
# Function Documentation

## calculateTotal
**Purpose**: Calculates the total price of items in an array

**Parameters**:
- `items` (Array): Array of objects with price property

**Returns**:
- `number`: Total price of all items

**Example Usage**:
```javascript
const items = [{price: 10}, {price: 20}, {price: 30}];
const total = calculateTotal(items); // Returns 60
```

**Dependencies**: None
**Performance**: O(n) time complexity
```

### 5. Git Operations
**Purpose**: Smart Git assistance and commit management

**Steps**:
1. Make changes to your code
2. Run "DevMind: Git Operations"
3. Choose from available options:
   - Generate commit message
   - Analyze changes
   - Create changelog
   - Review code changes

**Example Commit Message Generated**:
```
feat: improve calculateTotal function with error handling

- Add input validation for items array
- Add type checking for price property
- Use reduce() method for better performance
- Add JSDoc documentation
- Include error handling for invalid inputs

Breaking changes: Function now throws errors for invalid input
```

---

## 🛠️ **Troubleshooting**

### Common Issues

#### 1. "API key not configured" Error
**Problem**: Extension can't find your OpenRouter API key
**Solution**:
1. Open VS Code Settings (Ctrl+,)
2. Search "DevMind"
3. Set the API key in "devmind.apiKey"
4. Restart VS Code

#### 2. "Failed to connect to Quen 3" Error
**Problem**: Can't connect to OpenRouter API
**Solutions**:
1. Check your internet connection
2. Verify API key is valid
3. Check API key has sufficient credits
4. Ensure model name is correct

#### 3. Extension Not Responding
**Problem**: Commands don't work
**Solutions**:
1. Restart VS Code
2. Check Developer Console (Help > Toggle Developer Tools)
3. Verify extension is installed correctly
4. Try running "DevMind: Activate AI Assistant" first

#### 4. No AI Response
**Problem**: Commands run but no AI response
**Solutions**:
1. Check network connection
2. Verify API key configuration
3. Check VS Code Output panel for errors
4. Try a different command

### Debug Mode
1. Open Command Palette (Ctrl+Shift+P)
2. Run "Developer: Toggle Developer Tools"
3. Check Console tab for error messages
4. Check Network tab for API calls

### Logs Location
Extension logs can be found in:
- **Windows**: `%APPDATA%\Code\logs`
- **macOS**: `~/Library/Application Support/Code/logs`
- **Linux**: `~/.config/Code/logs`

---

## 🚀 **Advanced Usage**

### 1. Working with Large Codebases
- Use context analysis on main files first
- Run refactoring on smaller functions
- Use Git operations to track changes
- Generate documentation for key modules

### 2. Team Collaboration
- Share generated documentation
- Use Git operations for consistent commit messages
- Run code reviews with DevMind analysis
- Standardize code quality with refactoring

### 3. Performance Optimization
- Use context analysis to identify bottlenecks
- Run refactoring for performance improvements
- Use bug detection to find optimization opportunities
- Generate performance-focused documentation

### 4. Security Auditing
- Run context analysis for security insights
- Use bug detection to find vulnerabilities
- Generate security-focused documentation
- Review code changes for security implications

### 5. Custom Workflows
1. **Code Review Workflow**:
   - Analyze context → Generate documentation → Review changes
2. **Refactoring Workflow**:
   - Analyze context → Refactor code → Generate tests
3. **Documentation Workflow**:
   - Analyze context → Generate docs → Create README

---

## 📊 **Success Indicators**

You'll know DevMind is working correctly when:

✅ **Commands appear** in Command Palette
✅ **AI responses** are generated
✅ **Code is refactored** successfully
✅ **Documentation is created**
✅ **Git operations work**
✅ **No error messages** in console
✅ **Context analysis** provides insights

---

## 🎯 **Best Practices**

### 1. Start Small
- Begin with context analysis
- Test on simple functions first
- Gradually use more advanced features

### 2. Review AI Suggestions
- Always review refactored code
- Verify generated documentation
- Test suggested fixes

### 3. Use Git Integration
- Commit changes regularly
- Use generated commit messages
- Review changelogs

### 4. Maintain Context
- Keep related files open
- Use workspace folders
- Maintain consistent coding style

---

## 📚 **Additional Resources**

- **Project Overview**: See `PROJECT_OVERVIEW.md`
- **Installation Guide**: See `INSTALLATION.md`
- **Demo Examples**: See `DEMO.md`
- **API Documentation**: OpenRouter API docs
- **VS Code Extension API**: VS Code documentation

---

## 🆘 **Support**

If you encounter issues:
1. Check this troubleshooting guide
2. Review the documentation files
3. Check VS Code console for errors
4. Verify your API key and configuration

---

**Happy coding with DevMind! 🧠✨**
