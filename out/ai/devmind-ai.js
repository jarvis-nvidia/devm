"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevMindAI = void 0;
const axios_1 = __importDefault(require("axios"));
const vscode = __importStar(require("vscode"));
class DevMindAI {
    constructor() {
        this.apiKey = '';
        this.model = 'qwen/qwen3-32b:free';
        this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
    }
    async initialize() {
        try {
            // Get API key from configuration
            const config = vscode.workspace.getConfiguration('devmind');
            this.apiKey = config.get('apiKey', '');
            this.model = config.get('model', 'qwen/qwen3-32b:free');
            if (!this.apiKey) {
                return {
                    success: false,
                    error: 'OpenRouter API key not configured. Please set it in the extension settings.'
                };
            }
            // Test the connection
            const testResponse = await this.makeRequest('Hello, are you ready?');
            if (!testResponse.success) {
                return {
                    success: false,
                    error: `Failed to connect to Quen 3: ${testResponse.error}`
                };
            }
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: `Initialization error: ${error}`
            };
        }
    }
    async analyzeContext(context) {
        const prompt = this.buildContextAnalysisPrompt(context);
        const response = await this.makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error(`Context analysis failed: ${response.error}`);
        }
    }
    async refactorCode(code, language, context) {
        const prompt = this.buildRefactorPrompt(code, language, context);
        const response = await this.makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error(`Code refactoring failed: ${response.error}`);
        }
    }
    async debugCode(code, language, context) {
        const prompt = this.buildDebugPrompt(code, language, context);
        const response = await this.makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error(`Debug analysis failed: ${response.error}`);
        }
    }
    async generateDocumentation(code, language, context) {
        const prompt = this.buildDocumentationPrompt(code, language, context);
        const response = await this.makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error(`Documentation generation failed: ${response.error}`);
        }
    }
    async generateCommitMessage(context) {
        const prompt = this.buildCommitMessagePrompt(context);
        const response = await this.makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error(`Commit message generation failed: ${response.error}`);
        }
    }
    async makeRequest(prompt) {
        try {
            const response = await axios_1.default.post(this.baseUrl, {
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: this.getSystemPrompt()
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            const content = response.data.choices?.[0]?.message?.content;
            if (content) {
                return { success: true, content };
            }
            else {
                return { success: false, error: 'No response content received' };
            }
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || error.message || 'Unknown error'
            };
        }
    }
    getSystemPrompt() {
        return `You are DevMind, a context-aware AI developer assistant powered by Quen 3. You excel at:

1. **Code Analysis**: Understanding code structure, patterns, and intent
2. **Refactoring**: Improving code quality, readability, and performance
3. **Debugging**: Identifying and fixing issues with clear explanations
4. **Documentation**: Creating comprehensive, clear documentation
5. **Git Operations**: Generating meaningful commit messages and analyzing changes

Always provide:
- Clear, actionable advice
- Code examples when relevant
- Explanations of your reasoning
- Best practices and industry standards
- Security considerations when applicable

Be concise but thorough, and always consider the full context of the codebase.`;
    }
    buildContextAnalysisPrompt(context) {
        return `Analyze the following development context and provide insights:

**Current File**: ${context.currentFile}
**Language**: ${context.language}
**Project Structure**: ${context.projectStructure}
**Dependencies**: ${context.dependencies}
**Git Status**: ${context.gitStatus}

**Code Context**:
\`\`\`${context.language}
${context.currentCode}
\`\`\`

Please provide:
1. Code structure analysis
2. Potential improvements
3. Best practices recommendations
4. Security considerations
5. Performance insights`;
    }
    buildRefactorPrompt(code, language, context) {
        return `Refactor the following ${language} code to improve quality, readability, and maintainability:

**Context**: ${context.projectStructure}

**Code to Refactor**:
\`\`\`${language}
${code}
\`\`\`

Please provide the refactored code with:
1. Better variable/function naming
2. Improved structure and organization
3. Error handling where appropriate
4. Performance optimizations
5. Comments explaining complex logic`;
    }
    buildDebugPrompt(code, language, context) {
        return `Analyze the following ${language} code for potential issues and bugs:

**Context**: ${context.projectStructure}

**Code to Debug**:
\`\`\`${language}
${code}
\`\`\`

Please identify:
1. Syntax errors
2. Logic errors
3. Performance issues
4. Security vulnerabilities
5. Best practice violations
6. Suggested fixes for each issue found`;
    }
    buildDocumentationPrompt(code, language, context) {
        return `Generate comprehensive documentation for the following ${language} code:

**Context**: ${context.projectStructure}

**Code to Document**:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Function/class purpose and usage
2. Parameter descriptions
3. Return value explanations
4. Usage examples
5. Dependencies and requirements
6. Any important notes or warnings`;
    }
    buildCommitMessagePrompt(context) {
        return `Generate a clear, descriptive commit message based on the following context:

**Project**: ${context.projectStructure}
**Git Status**: ${context.gitStatus}
**Recent Changes**: ${context.recentChanges}

Please provide:
1. A concise subject line (50 chars or less)
2. A detailed description of changes
3. Any breaking changes or important notes
4. Related issue numbers if applicable

Follow conventional commit format: <type>(<scope>): <description>`;
    }
}
exports.DevMindAI = DevMindAI;
//# sourceMappingURL=devmind-ai.js.map