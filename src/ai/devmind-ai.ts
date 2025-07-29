import axios from 'axios';
import * as vscode from 'vscode';
import { ContextData } from '../types/context';
import { Cache } from '../cache';

export interface AIResponse {
    success: boolean;
    content?: string;
    error?: string;
}

export interface InitializationStatus {
    success: boolean;
    error?: string;
}

export class DevMindAI {
    private apiKey: string = '';
    private model: string = 'qwen/qwen3-32b:free';
    private baseUrl: string = 'https://openrouter.ai/api/v1/chat/completions';
    private cache: Cache;

    constructor(private secretStorage: vscode.SecretStorage) {
        this.cache = new Cache();
    }

    async initialize(): Promise<InitializationStatus> {
        try {
            // Get API key from secret storage
            this.apiKey = await this.secretStorage.get('devmind.apiKey') || '';
            const config = vscode.workspace.getConfiguration('devmind');
            this.model = config.get('model', 'qwen/qwen3-32b:free');

            if (!this.apiKey) {
                return {
                    success: false,
                    error: 'OpenRouter API key not configured. Please run the "DevMind: Set API Key" command.'
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
        } catch (error) {
            return {
                success: false,
                error: `Initialization error: ${error}`
            };
        }
    }

    async analyzeContext(context: ContextData): Promise<string> {
        const prompt = this.buildContextAnalysisPrompt(context);
        const response = await this.makeRequest(prompt);

        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error(`Context analysis failed: ${response.error}`);
        }
    }

    async refactorCode(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = this.buildRefactorPrompt(code, language, context);
        const response = await this.makeRequest(prompt);

        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error(`Code refactoring failed: ${response.error}`);
        }
    }

    async debugCode(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = this.buildDebugPrompt(code, language, context);
        const response = await this.makeRequest(prompt);

        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error(`Debug analysis failed: ${response.error}`);
        }
    }

    async generateDocumentation(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = this.buildDocumentationPrompt(code, language, context);
        const response = await this.makeRequest(prompt);

        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error(`Documentation generation failed: ${response.error}`);
        }
    }

    async generateCommitMessage(context: ContextData): Promise<string> {
        const prompt = this.buildCommitMessagePrompt(context);
        const response = await this.makeRequest(prompt);

        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error(`Commit message generation failed: ${response.error}`);
        }
    }

    private async makeRequest(prompt: string): Promise<AIResponse> {
        const cachedResponse = this.cache.get(prompt);
        if (cachedResponse) {
            return { success: true, content: cachedResponse };
        }

        try {
            const response = await axios.post(
                this.baseUrl,
                {
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
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const content = response.data.choices?.[0]?.message?.content;
            if (content) {
                this.cache.set(prompt, content);
                return { success: true, content };
            } else {
                return { success: false, error: 'No response content received' };
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error?.message || error.message || 'Unknown error'
            };
        }
    }

    private getSystemPrompt(): string {
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

    private buildContextAnalysisPrompt(context: ContextData): string {
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

    private buildRefactorPrompt(code: string, language: string, context: ContextData): string {
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

    private buildDebugPrompt(code: string, language: string, context: ContextData): string {
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

    private buildDocumentationPrompt(code: string, language: string, context: ContextData): string {
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

    private buildCommitMessagePrompt(context: ContextData): string {
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
