import { DevMindAI } from '../ai/devmind-ai';
import { ContextData, GitAnalysis } from '../types/context';

export class GitMate {
    private ai: DevMindAI;

    constructor(ai: DevMindAI) {
        this.ai = ai;
    }

    async generateCommitMessage(context: ContextData): Promise<string> {
        try {
            const commitMessage = await this.ai.generateCommitMessage(context);
            return `# Generated Commit Message\n\n${commitMessage}`;
        } catch (error) {
            throw new Error(`Failed to generate commit message: ${error}`);
        }
    }

    async analyzeChanges(context: ContextData): Promise<string> {
        try {
            const analysis = await this.ai.analyzeContext(context);
            return `# Git Changes Analysis\n\n${analysis}`;
        } catch (error) {
            throw new Error(`Failed to analyze changes: ${error}`);
        }
    }

    async createChangelog(context: ContextData): Promise<string> {
        try {
            const changelog = await this.generateChangelogContent(context);
            return `# Changelog\n\n${changelog}`;
        } catch (error) {
            throw new Error(`Failed to create changelog: ${error}`);
        }
    }

    async reviewChanges(context: ContextData): Promise<string> {
        try {
            const review = await this.generateCodeReview(context);
            return `# Code Review\n\n${review}`;
        } catch (error) {
            throw new Error(`Failed to review changes: ${error}`);
        }
    }

    private async generateChangelogContent(context: ContextData): Promise<string> {
        const prompt = `Generate a changelog entry based on the following context:

**Project**: ${context.projectStructure}
**Recent Changes**: ${context.recentChanges}
**Git Status**: ${context.gitStatus}

Please provide:
1. A summary of changes
2. New features added
3. Bug fixes
4. Breaking changes (if any)
5. Migration notes (if needed)

Format as a proper changelog entry.`;

        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            return 'Unable to generate changelog content.';
        }
    }

    private async generateCodeReview(context: ContextData): Promise<string> {
        const prompt = `Perform a code review based on the following context:

**Current File**: ${context.currentFile}
**Language**: ${context.language}
**Code**:
\`\`\`${context.language}
${context.currentCode}
\`\`\`

**Project Context**: ${context.projectStructure}

Please provide:
1. Code quality assessment
2. Potential issues or bugs
3. Performance considerations
4. Security concerns
5. Best practices recommendations
6. Suggested improvements

Be thorough but constructive in your review.`;

        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        } else {
            return 'Unable to generate code review.';
        }
    }
}
