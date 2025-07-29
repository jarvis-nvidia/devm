import { DevMindAI } from '../ai/devmind-ai';
import { ContextData, RefactorResult } from '../types/context';

export class CodeSmith {
    private ai: DevMindAI;

    constructor(ai: DevMindAI) {
        this.ai = ai;
    }

    async refactorCode(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const refactoredCode = await this.ai.refactorCode(code, language, context);
            return this.extractCodeFromResponse(refactoredCode, language);
        } catch (error) {
            throw new Error(`Failed to refactor code: ${error}`);
        }
    }

    async optimizeCode(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const optimizedCode = await this.generateOptimizedCode(code, language, context);
            return this.extractCodeFromResponse(optimizedCode, language);
        } catch (error) {
            throw new Error(`Failed to optimize code: ${error}`);
        }
    }

    async generateTests(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const tests = await this.generateTestCode(code, language, context);
            return tests;
        } catch (error) {
            throw new Error(`Failed to generate tests: ${error}`);
        }
    }

    async suggestImprovements(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const suggestions = await this.generateImprovementSuggestions(code, language, context);
            return suggestions;
        } catch (error) {
            throw new Error(`Failed to generate suggestions: ${error}`);
        }
    }

    private extractCodeFromResponse(response: string, language: string): string {
        // Look for code blocks in the response
        const codeBlockRegex = new RegExp(`\`\`\`${language}\\s*([\\s\\S]*?)\`\`\``, 'i');
        const match = response.match(codeBlockRegex);

        if (match && match[1]) {
            return match[1].trim();
        }

        // If no code block found, return the entire response
        return response;
    }

    private async generateOptimizedCode(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = `Optimize the following ${language} code for better performance, readability, and maintainability:

**Context**: ${context.projectStructure}

**Code to Optimize**:
\`\`\`${language}
${code}
\`\`\`

Please provide the optimized code with:
1. Performance improvements
2. Better memory usage
3. Cleaner code structure
4. Improved readability
5. Better error handling
6. Comments explaining optimizations

Return only the optimized code in a code block.`;

        const response = await (this.ai as any).makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error('Failed to generate optimized code');
        }
    }

    private async generateTestCode(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = `Generate comprehensive unit tests for the following ${language} code:

**Context**: ${context.projectStructure}

**Code to Test**:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Unit tests covering all functions/methods
2. Edge case testing
3. Error condition testing
4. Mock/stub examples where needed
5. Test setup and teardown
6. Clear test descriptions

Use appropriate testing framework for ${language}.`;

        const response = await (this.ai as any).makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error('Failed to generate test code');
        }
    }

    private async generateImprovementSuggestions(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = `Analyze the following ${language} code and provide improvement suggestions:

**Context**: ${context.projectStructure}

**Code to Analyze**:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Code quality improvements
2. Performance optimizations
3. Security enhancements
4. Best practices recommendations
5. Design pattern suggestions
6. Specific code examples for improvements

Be specific and actionable in your suggestions.`;

        const response = await (this.ai as any).makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error('Failed to generate improvement suggestions');
        }
    }
}
