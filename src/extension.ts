import * as vscode from 'vscode';
import { DevMindAI } from './ai/devmind-ai';
import { ContextAnalyzer } from './context/context-analyzer';
import { GitMate } from './agents/gitmate';
import { CodeSmith } from './agents/codesmith';
import { BugHunter } from './agents/bughunter';
import { DocGuru } from './agents/docguru';
import { Architect } from './agents/architect';
import { DevFlow } from './agents/devflow';

let devMindAI: DevMindAI;
let contextAnalyzer: ContextAnalyzer;

export function activate(context: vscode.ExtensionContext) {
    console.log('DevMind AI Assistant is now active!');

    // Initialize core components
    devMindAI = new DevMindAI();
    contextAnalyzer = new ContextAnalyzer();

    // Register commands
    let activateCommand = vscode.commands.registerCommand('devmind.activate', async () => {
        await activateDevMind();
    });

    let analyzeCommand = vscode.commands.registerCommand('devmind.analyze', async () => {
        await analyzeContext();
    });

    let refactorCommand = vscode.commands.registerCommand('devmind.refactor', async () => {
        await refactorCode();
    });

    let debugCommand = vscode.commands.registerCommand('devmind.debug', async () => {
        await debugIssues();
    });

    let documentCommand = vscode.commands.registerCommand('devmind.document', async () => {
        await generateDocumentation();
    });

    let gitmateCommand = vscode.commands.registerCommand('devmind.gitmate', async () => {
        await gitOperations();
    });

    context.subscriptions.push(
        activateCommand,
        analyzeCommand,
        refactorCommand,
        debugCommand,
        documentCommand,
        gitmateCommand
    );

    // Show welcome message
    vscode.window.showInformationMessage('🧠 DevMind AI Assistant activated! Use the command palette to get started.');
}

async function activateDevMind() {
    try {
        const status = await devMindAI.initialize();
        if (status.success) {
            vscode.window.showInformationMessage('✅ DevMind AI initialized successfully!');

            // Perform initial context analysis
            if (vscode.workspace.getConfiguration('devmind').get('enableContextAnalysis')) {
                await analyzeContext();
            }
        } else {
            vscode.window.showErrorMessage(`❌ Failed to initialize DevMind: ${status.error}`);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error initializing DevMind: ${error}`);
    }
}

async function analyzeContext() {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        vscode.window.showInformationMessage('🔍 Analyzing context...');

        const context = await contextAnalyzer.analyzeCurrentContext(editor);
        const analysis = await devMindAI.analyzeContext(context);

        // Display analysis in a new document
        const document = await vscode.workspace.openTextDocument({
            content: `# DevMind Context Analysis\n\n${analysis}`,
            language: 'markdown'
        });

        await vscode.window.showTextDocument(document);

    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error analyzing context: ${error}`);
    }
}

async function refactorCode() {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const codeSmith = new CodeSmith(devMindAI);

        const refactoredCode = await codeSmith.refactorCode(
            editor.document.getText(selection),
            editor.document.languageId,
            await contextAnalyzer.analyzeCurrentContext(editor)
        );

        await editor.edit(editBuilder => {
            editBuilder.replace(selection, refactoredCode);
        });

        vscode.window.showInformationMessage('✅ Code refactored successfully!');

    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error refactoring code: ${error}`);
    }
}

async function debugIssues() {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        const bugHunter = new BugHunter(devMindAI);
        const issues = await bugHunter.analyzeCode(
            editor.document.getText(),
            editor.document.languageId,
            await contextAnalyzer.analyzeCurrentContext(editor)
        );

        if (issues.length === 0) {
            vscode.window.showInformationMessage('✅ No issues found!');
        } else {
            // Create diagnostics
            const diagnostics: vscode.Diagnostic[] = issues.map(issue =>
                new vscode.Diagnostic(
                    new vscode.Range(issue.line, 0, issue.line, 0),
                    issue.description,
                    vscode.DiagnosticSeverity.Warning
                )
            );

            const collection = vscode.languages.createDiagnosticCollection('devmind');
            collection.set(editor.document.uri, diagnostics);

            vscode.window.showInformationMessage(`🔍 Found ${issues.length} potential issues. Check the Problems panel.`);
        }

    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error debugging code: ${error}`);
    }
}

async function generateDocumentation() {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        const docGuru = new DocGuru(devMindAI);
        const documentation = await docGuru.generateDocumentation(
            editor.document.getText(),
            editor.document.languageId,
            await contextAnalyzer.analyzeCurrentContext(editor)
        );

        // Create documentation file
        const docFileName = `${editor.document.fileName}.md`;
        const docUri = vscode.Uri.file(docFileName);

        const docDocument = await vscode.workspace.openTextDocument({
            content: documentation,
            language: 'markdown'
        });

        await vscode.window.showTextDocument(docDocument);

        vscode.window.showInformationMessage('📚 Documentation generated successfully!');

    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error generating documentation: ${error}`);
    }
}

async function gitOperations() {
    try {
        const gitMate = new GitMate(devMindAI);
        const operations = [
            'Generate commit message',
            'Analyze changes',
            'Create changelog',
            'Review code changes'
        ];

        const selected = await vscode.window.showQuickPick(operations, {
            placeHolder: 'Select Git operation'
        });

        if (!selected) {
            return;
        }

        const context = await contextAnalyzer.analyzeCurrentContext();
        let result: string;

        switch (selected) {
            case 'Generate commit message':
                result = await gitMate.generateCommitMessage(context);
                break;
            case 'Analyze changes':
                result = await gitMate.analyzeChanges(context);
                break;
            case 'Create changelog':
                result = await gitMate.createChangelog(context);
                break;
            case 'Review code changes':
                result = await gitMate.reviewChanges(context);
                break;
            default:
                return;
        }

        // Show result in new document
        const document = await vscode.workspace.openTextDocument({
            content: `# DevMind Git Analysis\n\n${result}`,
            language: 'markdown'
        });

        await vscode.window.showTextDocument(document);

    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error performing Git operation: ${error}`);
    }
}

export function deactivate() {
    console.log('DevMind AI Assistant deactivated.');
}
