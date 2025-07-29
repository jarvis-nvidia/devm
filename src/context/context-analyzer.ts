import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { ContextData, ProjectContext } from '../types/context';
import { simpleGit, SimpleGit } from 'simple-git';

export class ContextAnalyzer {
    private git: SimpleGit;

    constructor() {
        this.git = simpleGit();
    }

    async analyzeCurrentContext(editor?: vscode.TextEditor): Promise<ContextData> {
        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        const currentEditor = editor || vscode.window.activeTextEditor;

        if (!currentEditor) {
            throw new Error('No active editor found');
        }

        const currentFile = currentEditor.document.fileName;
        const language = currentEditor.document.languageId;
        const currentCode = currentEditor.document.getText();

        const projectStructure = await this.analyzeProjectStructure(workspaceRoot);
        const dependencies = await this.analyzeDependencies(workspaceRoot);
        const gitStatus = await this.analyzeGitStatus(workspaceRoot);
        const recentChanges = await this.analyzeRecentChanges(workspaceRoot);

        return {
            currentFile,
            language,
            currentCode,
            projectStructure,
            dependencies,
            gitStatus,
            recentChanges,
            selection: currentEditor.selection,
            workspaceRoot
        };
    }

    private async analyzeProjectStructure(workspaceRoot?: string): Promise<string> {
        if (!workspaceRoot) {
            return 'No workspace root found';
        }

        try {
            const structure = await this.getFileStructure(workspaceRoot, 3);
            return this.formatProjectStructure(structure);
        } catch (error) {
            return `Error analyzing project structure: ${error}`;
        }
    }

    private async getFileStructure(dir: string, maxDepth: number, currentDepth: number = 0): Promise<string[]> {
        if (currentDepth >= maxDepth) {
            return [];
        }

        const items = await fs.promises.readdir(dir, { withFileTypes: true });
        const structure: string[] = [];

        for (const item of items) {
            if (item.isDirectory()) {
                if (!this.isIgnoredDirectory(item.name)) {
                    structure.push(`${'  '.repeat(currentDepth)}📁 ${item.name}/`);
                    const subItems = await this.getFileStructure(
                        path.join(dir, item.name),
                        maxDepth,
                        currentDepth + 1
                    );
                    structure.push(...subItems);
                }
            } else {
                if (!this.isIgnoredFile(item.name)) {
                    const ext = path.extname(item.name);
                    const icon = this.getFileIcon(ext);
                    structure.push(`${'  '.repeat(currentDepth)}${icon} ${item.name}`);
                }
            }
        }

        return structure;
    }

    private isIgnoredDirectory(name: string): boolean {
        const ignored = ['node_modules', '.git', '.vscode', 'dist', 'build', 'out', '.next'];
        return ignored.includes(name);
    }

    private isIgnoredFile(name: string): boolean {
        const ignored = ['.DS_Store', 'Thumbs.db', '.env.local', '.env.production'];
        return ignored.includes(name);
    }

    private getFileIcon(extension: string): string {
        const iconMap: { [key: string]: string } = {
            '.js': '📄',
            '.ts': '📄',
            '.jsx': '⚛️',
            '.tsx': '⚛️',
            '.json': '📋',
            '.md': '📝',
            '.html': '🌐',
            '.css': '🎨',
            '.scss': '🎨',
            '.py': '🐍',
            '.java': '☕',
            '.cpp': '⚙️',
            '.c': '⚙️',
            '.go': '🐹',
            '.rs': '🦀',
            '.php': '🐘',
            '.rb': '💎',
            '.yml': '⚙️',
            '.yaml': '⚙️',
            '.xml': '📄',
            '.sql': '🗄️'
        };
        return iconMap[extension] || '📄';
    }

    private formatProjectStructure(structure: string[]): string {
        return structure.join('\n');
    }

    private async analyzeDependencies(workspaceRoot?: string): Promise<string> {
        if (!workspaceRoot) {
            return 'No workspace root found';
        }

        try {
            const packageJsonPath = path.join(workspaceRoot, 'package.json');
            const requirementsPath = path.join(workspaceRoot, 'requirements.txt');
            const pomXmlPath = path.join(workspaceRoot, 'pom.xml');
            const cargoTomlPath = path.join(workspaceRoot, 'Cargo.toml');

            let dependencies = '';

            // Check for Node.js dependencies
            if (fs.existsSync(packageJsonPath)) {
                const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));
                dependencies += '📦 Node.js Dependencies:\n';
                if (packageJson.dependencies) {
                    dependencies += Object.entries(packageJson.dependencies)
                        .map(([name, version]) => `  - ${name}: ${version}`)
                        .join('\n') + '\n';
                }
                if (packageJson.devDependencies) {
                    dependencies += '🔧 Dev Dependencies:\n';
                    dependencies += Object.entries(packageJson.devDependencies)
                        .map(([name, version]) => `  - ${name}: ${version}`)
                        .join('\n') + '\n';
                }
            }

            // Check for Python dependencies
            if (fs.existsSync(requirementsPath)) {
                const requirements = await fs.promises.readFile(requirementsPath, 'utf8');
                dependencies += '🐍 Python Dependencies:\n';
                dependencies += requirements.split('\n')
                    .filter(line => line.trim() && !line.startsWith('#'))
                    .map(line => `  - ${line.trim()}`)
                    .join('\n') + '\n';
            }

            // Check for Java dependencies
            if (fs.existsSync(pomXmlPath)) {
                dependencies += '☕ Java Maven project detected\n';
            }

            // Check for Rust dependencies
            if (fs.existsSync(cargoTomlPath)) {
                dependencies += '🦀 Rust Cargo project detected\n';
            }

            return dependencies || 'No dependencies found';
        } catch (error) {
            return `Error analyzing dependencies: ${error}`;
        }
    }

    private async analyzeGitStatus(workspaceRoot?: string): Promise<string> {
        if (!workspaceRoot) {
            return 'No workspace root found';
        }

        try {
            const gitDir = path.join(workspaceRoot, '.git');
            if (!fs.existsSync(gitDir)) {
                return 'Not a Git repository';
            }

            const status = await this.git.status();
            const branch = await this.git.branch();

            let gitInfo = `🌿 Branch: ${branch.current}\n`;
            gitInfo += `📊 Status:\n`;
            gitInfo += `  - Modified: ${status.modified.length}\n`;
            gitInfo += `  - Added: ${status.created.length}\n`;
            gitInfo += `  - Deleted: ${status.deleted.length}\n`;
            gitInfo += `  - Renamed: ${status.renamed.length}\n`;
            gitInfo += `  - Staged: ${status.staged.length}\n`;

            return gitInfo;
        } catch (error) {
            return `Error analyzing Git status: ${error}`;
        }
    }

    private async analyzeRecentChanges(workspaceRoot?: string): Promise<string> {
        if (!workspaceRoot) {
            return 'No workspace root found';
        }

        try {
            const gitDir = path.join(workspaceRoot, '.git');
            if (!fs.existsSync(gitDir)) {
                return 'Not a Git repository';
            }

            const log = await this.git.log({ maxCount: 5 });

            let changes = '📝 Recent Commits:\n';
            log.all.forEach(commit => {
                changes += `  - ${commit.hash.substring(0, 7)}: ${commit.message}\n`;
            });

            return changes;
        } catch (error) {
            return `Error analyzing recent changes: ${error}`;
        }
    }

    async getProjectContext(workspaceRoot?: string): Promise<ProjectContext> {
        if (!workspaceRoot) {
            throw new Error('No workspace root found');
        }

        const name = path.basename(workspaceRoot);
        const structure = await this.getFileStructure(workspaceRoot, 2);

        // Determine project type based on files
        let type: ProjectContext['type'] = 'other';
        let framework: string | undefined;
        let language = 'unknown';

        if (fs.existsSync(path.join(workspaceRoot, 'package.json'))) {
            type = 'web';
            language = 'JavaScript/TypeScript';
            if (fs.existsSync(path.join(workspaceRoot, 'next.config.js'))) {
                framework = 'Next.js';
            } else if (fs.existsSync(path.join(workspaceRoot, 'angular.json'))) {
                framework = 'Angular';
            } else if (fs.existsSync(path.join(workspaceRoot, 'vue.config.js'))) {
                framework = 'Vue.js';
            } else if (fs.existsSync(path.join(workspaceRoot, 'react-scripts'))) {
                framework = 'React';
            }
        } else if (fs.existsSync(path.join(workspaceRoot, 'requirements.txt'))) {
            type = 'api';
            language = 'Python';
            if (fs.existsSync(path.join(workspaceRoot, 'manage.py'))) {
                framework = 'Django';
            } else if (fs.existsSync(path.join(workspaceRoot, 'app.py'))) {
                framework = 'Flask';
            }
        } else if (fs.existsSync(path.join(workspaceRoot, 'pom.xml'))) {
            type = 'api';
            language = 'Java';
            framework = 'Maven';
        } else if (fs.existsSync(path.join(workspaceRoot, 'Cargo.toml'))) {
            type = 'api';
            language = 'Rust';
            framework = 'Cargo';
        }

        return {
            name,
            type,
            framework,
            language,
            dependencies: [],
            structure: []
        };
    }
}
