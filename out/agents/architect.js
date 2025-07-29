"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Architect = void 0;
class Architect {
    constructor(ai) {
        this.ai = ai;
    }
    async designArchitecture(context) {
        try {
            const architecture = await this.generateArchitectureDesign(context);
            return architecture;
        }
        catch (error) {
            throw new Error(`Failed to design architecture: ${error}`);
        }
    }
    async suggestPatterns(code, language, context) {
        try {
            const patterns = await this.generatePatternSuggestions(code, language, context);
            return patterns;
        }
        catch (error) {
            throw new Error(`Failed to suggest patterns: ${error}`);
        }
    }
    async analyzeScalability(code, language, context) {
        try {
            const analysis = await this.generateScalabilityAnalysis(code, language, context);
            return analysis;
        }
        catch (error) {
            throw new Error(`Failed to analyze scalability: ${error}`);
        }
    }
    async recommendStructure(context) {
        try {
            const recommendations = await this.generateStructureRecommendations(context);
            return recommendations;
        }
        catch (error) {
            throw new Error(`Failed to recommend structure: ${error}`);
        }
    }
    async generateArchitectureDesign(context) {
        const prompt = `Design a modular architecture for the following project context:

**Project Structure**: ${context.projectStructure}
**Dependencies**: ${context.dependencies}
**Git Status**: ${context.gitStatus}
**Recent Changes**: ${context.recentChanges}

Please provide:
1. High-level architecture overview
2. Component breakdown and responsibilities
3. Data flow diagrams
4. Interface definitions
5. Module dependencies
6. Scalability considerations
7. Security architecture
8. Deployment strategy
9. Technology stack recommendations
10. Best practices for the chosen architecture

Make it comprehensive and actionable.`;
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate architecture design');
        }
    }
    async generatePatternSuggestions(code, language, context) {
        const prompt = `Suggest appropriate design patterns for the following ${language} code:

**Context**: ${context.projectStructure}

**Code**:
\`\`\`${language}
${code}
\`\`\`

Please suggest:
1. Applicable design patterns
2. Implementation examples
3. Benefits of each pattern
4. When to use each pattern
5. Anti-patterns to avoid
6. Refactoring suggestions
7. Code examples for pattern implementation
8. Performance implications

Be specific and provide practical examples.`;
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate pattern suggestions');
        }
    }
    async generateScalabilityAnalysis(code, language, context) {
        const prompt = `Analyze the scalability of the following ${language} code:

**Context**: ${context.projectStructure}

**Code**:
\`\`\`${language}
${code}
\`\`\`

Please analyze:
1. Current scalability limitations
2. Bottlenecks and performance issues
3. Horizontal vs vertical scaling considerations
4. Database scalability concerns
5. Caching strategies
6. Load balancing requirements
7. Microservices considerations
8. Cloud-native patterns
9. Monitoring and observability
10. Specific recommendations for improvement

Provide actionable insights and specific recommendations.`;
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate scalability analysis');
        }
    }
    async generateStructureRecommendations(context) {
        const prompt = `Recommend an optimal project structure based on the following context:

**Current Structure**: ${context.projectStructure}
**Dependencies**: ${context.dependencies}
**Git Status**: ${context.gitStatus}
**Recent Changes**: ${context.recentChanges}

Please provide:
1. Recommended directory structure
2. File organization principles
3. Naming conventions
4. Module separation guidelines
5. Configuration management
6. Asset organization
7. Testing structure
8. Documentation organization
9. Build and deployment structure
10. Migration plan from current structure

Make recommendations specific to the project type and technology stack.`;
        const response = await this.ai['makeRequest'](prompt);
        if (response.success && response.content) {
            return response.content;
        }
        else {
            throw new Error('Failed to generate structure recommendations');
        }
    }
}
exports.Architect = Architect;
//# sourceMappingURL=architect.js.map