# 🧠 DevMind AI Assistant - Demo Guide

## 🚀 Quick Start Demo

This guide will walk you through using the DevMind AI Assistant extension in VS Code.

### Prerequisites
- VS Code installed
- DevMind extension installed (from the `.vsix` file)
- OpenRouter API key

### Step 1: Install the Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Click the "..." menu (three dots)
4. Select "Install from VSIX..."
5. Choose `devmind-ai-assistant-0.1.0.vsix`

### Step 2: Configure the Extension

1. Open VS Code Settings (Ctrl+,)
2. Search for "DevMind"
3. Set your OpenRouter API key in `devmind.apiKey`

### Step 3: Test the Extension

#### Demo 1: Context Analysis
1. Open any code file in VS Code
2. Open Command Palette (Ctrl+Shift+P)
3. Type "DevMind: Analyze Current Context"
4. Press Enter
5. A new document will open with AI analysis of your code

#### Demo 2: Code Refactoring
1. Select some code in your editor
2. Open Command Palette (Ctrl+Shift+P)
3. Type "DevMind: Refactor Code"
4. Press Enter
5. The selected code will be refactored by AI

#### Demo 3: Bug Detection
1. Open a code file with potential issues
2. Open Command Palette (Ctrl+Shift+P)
3. Type "DevMind: Debug Issues"
4. Press Enter
5. Check the Problems panel for AI-detected issues

#### Demo 4: Documentation Generation
1. Open a code file
2. Open Command Palette (Ctrl+Shift+P)
3. Type "DevMind: Generate Documentation"
4. Press Enter
5. A new document with comprehensive documentation will be created

#### Demo 5: Git Operations
1. Make some changes to your code
2. Open Command Palette (Ctrl+Shift+P)
3. Type "DevMind: Git Operations"
4. Choose from:
   - Generate commit message
   - Analyze changes
   - Create changelog
   - Review code changes

## 🎯 Sample Code for Testing

Here's a sample JavaScript file you can use to test the extension:

```javascript
// Sample code for DevMind testing
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

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProduct(id) {
        return this.products.find(p => p.id === id);
    }

    removeProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }
}
```

## 🔍 Expected Results

### Context Analysis
- Project structure overview
- Code quality assessment
- Performance insights
- Security considerations
- Best practices recommendations

### Code Refactoring
- Improved variable naming
- Better code structure
- Error handling
- Performance optimizations
- Comments and documentation

### Bug Detection
- Potential issues identified
- Security vulnerabilities
- Performance problems
- Code style violations
- Suggested fixes

### Documentation
- Function descriptions
- Parameter documentation
- Usage examples
- Return value explanations
- Dependencies and requirements

## 🛠️ Troubleshooting

### Extension Not Working
1. Check if API key is configured
2. Verify internet connection
3. Check VS Code console for errors
4. Restart VS Code

### API Errors
1. Verify OpenRouter API key is valid
2. Check API key has sufficient credits
3. Ensure model name is correct

### No Response from AI
1. Check network connection
2. Verify API key configuration
3. Try a different command
4. Check VS Code output panel

## 📚 Next Steps

After trying the demos:

1. **Explore Advanced Features**:
   - Use with different programming languages
   - Test with larger codebases
   - Try Git integration features

2. **Customize Settings**:
   - Adjust AI model settings
   - Configure context analysis options
   - Set up Git integration preferences

3. **Integrate into Workflow**:
   - Use for code reviews
   - Generate documentation
   - Optimize existing code
   - Debug complex issues

## 🎉 Success Indicators

You'll know the extension is working correctly when:

- ✅ Commands appear in Command Palette
- ✅ AI responses are generated
- ✅ Code is refactored successfully
- ✅ Documentation is created
- ✅ Git operations work
- ✅ No error messages in console

---

**Happy coding with DevMind! 🧠✨**
