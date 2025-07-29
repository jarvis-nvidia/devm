"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeSmith = void 0;
class CodeSmith {
    constructor(ai) {
        this.ai = ai;
    }
    async refactorCode(code, language, context) {
        try {
            const refactoredCode = await this.ai.refactorCode(code, language, context);
            return this.extractCodeFromResponse(refactoredCode, language);
        }
        catch (error) {
            throw new Error(`Failed to refactor code: ${error}`);
        }
    }
    async optimizeCode(code, language, context) {
        try {
            const optimizedCode = await this.generateOptimizedCode(code, language, context);
            return this.extractCodeFromResponse(optimizedCode, language);
        }
        catch (error) {
            throw new Error(`Failed to optimize code: ${error}`);
        }
    }
    async generateTests(code, language, context) {
        try {
            const tests = await this.generateTestCode(code, language, context);
            return tests;
        }
        catch (error) {
            throw new Error(`Failed to generate tests: ${error}`);
        }
    }
    async suggestImprovements(code, language, context) {
        try {
            const suggestions = await this.generateImprovementSuggestions(code, language, context);
            return suggestions;
        }
        catch (error) {
            throw new Error(`Failed to generate suggestions: ${error}`);
        }
    }
    extractCodeFromResponse(response, language) {
        // Look for code blocks in the response
        const codeBlockRegex = new RegExp(`\`\`\`${language}\\s*([\\s\\S]*?)\`\`\``, 'i');
        const match = response.match(codeBlockRegex);
        if (match && match[1]) {
            return match[1].trim();
        }
        // If no code block found, return the entire response
        return response;
    }
    async generateOptimizedCode(code, language, context) {
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
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate optimized code');
        }
    }
    async generateTestCode(code, language, context) {
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
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate test code');
        }
    }
    async generateImprovementSuggestions(code, language, context) {
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
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate improvement suggestions');
        }
    }
}
exports.CodeSmith = CodeSmith;
//# sourceMappingURL=codesmith.js.map