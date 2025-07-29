import { DevMindAI } from '../ai/devmind-ai';
import { ContextData, CodeIssue } from '../types/context';

export class BugHunter {
    private ai: DevMindAI;

    constructor(ai: DevMindAI) {
        this.ai = ai;
    }

    async analyzeCode(code: string, language: string, context: ContextData): Promise<CodeIssue[]> {
        try {
            const analysis = await this.ai.debugCode(code, language, context);
            return this.parseIssuesFromAnalysis(analysis, code);
        } catch (error) {
            throw new Error(`Failed to analyze code: ${error}`);
        }
    }

    async fixIssues(code: string, language: string, issues: CodeIssue[]): Promise<string> {
        try {
            const fixedCode = await this.generateFixedCode(code, language, issues);
            return fixedCode;
        } catch (error) {
            throw new Error(`Failed to fix issues: ${error}`);
        }
    }

    async suggestFixes(code: string, language: string, context: ContextData): Promise<string> {
        try {
            const suggestions = await this.generateFixSuggestions(code, language, context);
            return suggestions;
        } catch (error) {
            throw new Error(`Failed to generate fix suggestions: ${error}`);
        }
    }

    private parseIssuesFromAnalysis(analysis: string, code: string): CodeIssue[] {
        const issues: CodeIssue[] = [];
        const lines = code.split('\n');

        // Simple parsing - in a real implementation, you'd want more sophisticated parsing
        const issuePatterns = [
            /line (\d+):/gi,
            /line (\d+)/gi,
            /at line (\d+)/gi
        ];

        for (const pattern of issuePatterns) {
            const matches = analysis.matchAll(pattern);
            for (const match of matches) {
                const lineNumber = parseInt(match[1]);
                if (lineNumber > 0 && lineNumber <= lines.length) {
                    issues.push({
                        line: lineNumber,
                        description: this.extractIssueDescription(analysis, lineNumber),
                        severity: 'warning',
                        category: 'logic'
                    });
                }
            }
        }

        return issues;
    }

    private extractIssueDescription(analysis: string, lineNumber: number): string {
        // Extract description around the line number mention
        const lines = analysis.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`line ${lineNumber}`)) {
                return lines[i].trim();
            }
        }
        return `Issue found at line ${lineNumber}`;
    }

    private async generateFixedCode(code: string, language: string, issues: CodeIssue[]): Promise<string> {
        const issuesDescription = issues.map(issue =>
            `Line ${issue.line}: ${issue.description}`
        ).join('\n');

        const prompt = `Fix the following issues in the ${language} code:

**Issues to Fix**:
${issuesDescription}

**Original Code**:
\`\`\`${language}
${code}
\`\`\`

Please provide the corrected code with all issues fixed. Return only the corrected code in a code block.`;

        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return this.extractCodeFromResponse(response.content, language);
        } else {
            throw new Error('Failed to generate fixed code');
        }
    }

    private async generateFixSuggestions(code: string, language: string, context: ContextData): Promise<string> {
        const prompt = `Analyze the following ${language} code for potential bugs and provide fix suggestions:

**Context**: ${context.projectStructure}

**Code to Analyze**:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Potential bugs and issues
2. Specific line numbers where issues occur
3. Detailed explanations of each issue
4. Suggested fixes with code examples
5. Prevention strategies for similar issues
6. Best practices to follow

Be thorough in your analysis and provide actionable suggestions.`;

        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            throw new Error('Failed to generate fix suggestions');
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
