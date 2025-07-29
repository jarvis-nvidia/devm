import { DevMindAI } from '../ai/devmind-ai';
import { ContextData, DocumentationResult } from '../types/context';

export class DocGuru {
    private ai: DevMindAI;

    constructor(ai: DevMindAI) {
        this.ai = ai;
    }

    async generateDocumentation(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const documentation = await this.ai.generateDocumentation(code, language, context);
            return documentation;
        } catch (error) {
            throw new Error(`Failed to generate documentation: ${error}`);
        }
    }

    async generateReadme(context: ContextData): Promise<string> {
        try {
            const readme = await this.generateReadmeContent(context);
            return readme;
        } catch (error) {
            throw new Error(`Failed to generate README: ${error}`);
        }
    }

    async generateApiDocs(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const apiDocs = await this.generateApiDocumentation(code, language, context);
            return apiDocs;
        } catch (error) {
            throw new Error(`Failed to generate API docs: ${error}`);
        }
    }

    async generateInlineComments(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const commentedCode = await this.generateCommentedCode(code, language, context);
            return commentedCode;
        } catch (error) {
            throw new Error(`Failed to generate inline comments: ${error}`);
        }
    }

    private async generateReadmeContent(context: ContextData): Promise<string> {
        const prompt = `Generate a comprehensive README.md file based on the following project context:

**Project Structure**: ${context.projectStructure}
**Dependencies**: ${context.dependencies}
**Git Status**: ${context.gitStatus}
**Recent Changes**: ${context.recentChanges}

Please include:
1. Project title and description
2. Installation instructions
3. Usage examples
4. API documentation (if applicable)
5. Contributing guidelines
6. License information
7. Troubleshooting section
8. Changelog or version history

Make it professional and comprehensive.`;

        const response = await (this.ai as any).makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error('Failed to generate README content');
        }
    }

    private async generateApiDocumentation(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = `Generate comprehensive API documentation for the following ${language} code:

**Context**: ${context.projectStructure}

**Code**:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Function/class documentation
2. Parameter descriptions with types
3. Return value documentation
4. Usage examples
5. Error handling information
6. Dependencies and requirements
7. Performance considerations
8. Security notes (if applicable)

Format as proper API documentation.`;

        const response = await (this.ai as any).makeRequest(prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error('Failed to generate API documentation');
        }
    }

    private async generateCommentedCode(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = `Add comprehensive inline comments to the following ${language} code:

**Context**: ${context.projectStructure}

**Code to Comment**:
\`\`\`${language}
${code}
\`\`\`

Please add:
1. Function/class purpose comments
2. Parameter explanations
3. Logic explanations for complex sections
4. TODO comments for potential improvements
5. FIXME comments for known issues
6. Performance notes where relevant
7. Security considerations

Return the code with inline comments in a code block.`;

        const response = await (this.ai as any).makeRequest(prompt);
        if (response.success && response.content) {
            return this.extractCodeFromResponse(response.content, language);
        } else {
            throw new Error('Failed to generate commented code');
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
}
