import * as vscode from 'vscode';

export interface ContextData {
    currentFile: string;
    language: string;
    currentCode: string;
    projectStructure: string;
    dependencies: string;
    gitStatus: string;
    recentChanges: string;
    selection?: vscode.Selection;
    workspaceRoot?: string;
}

export interface CodeIssue {
    line: number;
    description: string;
    severity: 'error' | 'warning' | 'info';
    category: 'syntax' | 'logic' | 'performance' | 'security' | 'style';
    suggestion?: string;
}

export interface RefactorResult {
    originalCode: string;
    refactoredCode: string;
    improvements: string[];
    explanations: string[];
}

export interface DocumentationResult {
    title: string;
    description: string;
    usage: string;
    examples: string[];
    parameters: ParameterInfo[];
    returnValue?: string;
    notes: string[];
}

export interface ParameterInfo {
    name: string;
    type: string;
    description: string;
    required: boolean;
    defaultValue?: string;
}

export interface GitAnalysis {
    commitMessage: string;
    changes: string[];
    impact: 'low' | 'medium' | 'high';
    breakingChanges: boolean;
    suggestions: string[];
}

export interface ProjectContext {
    name: string;
    type: 'web' | 'mobile' | 'desktop' | 'library' | 'api' | 'other';
    framework?: string;
    language: string;
    dependencies: DependencyInfo[];
    structure: FileStructure[];
}

export interface DependencyInfo {
    name: string;
    version: string;
    type: 'production' | 'development' | 'peer';
    description?: string;
}

export interface FileStructure {
    path: string;
    type: 'file' | 'directory';
    language?: string;
    size?: number;
    lastModified?: Date;
}
