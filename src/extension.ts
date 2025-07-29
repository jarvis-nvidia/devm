import * as vscode from 'vscode';
import { DevMindAI } from './ai/devmind-ai';
import { ContextAnalyzer } from './context/context-analyzer';
import { GitMate } from './agents/gitmate';
import { CodeSmith } from './agents/codesmith';
import { BugHunter } from './agents/bughunter';
import { DocGuru } from './agents/docguru';
import { Architect } from './agents/architect';
import { DevFlow } from './agents/devflow';
import { DevMindWebView } from './webview';

let devMindAI: DevMindAI;
let contextAnalyzer: ContextAnalyzer;
let webview: DevMindWebView;

export function activate(context: vscode.ExtensionContext) {
    console.log('DevMind AI Assistant is now active!');

    // Initialize core components
    devMindAI = new DevMindAI(context.secrets);
    contextAnalyzer = new ContextAnalyzer();
    webview = new DevMindWebView();

    // Register commands
    let setApiKeyCommand = vscode.commands.registerCommand('devmind.setApiKey', async () => {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your OpenRouter API Key',
            password: true,
            ignoreFocusOut: true,
        });
        if (apiKey) {
            await context.secrets.store('devmind.apiKey', apiKey);
            vscode.window.showInformationMessage('API Key stored successfully.');
        }
    });

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
        setApiKeyCommand,
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
            const errorMsg = `Failed to initialize DevMind: ${status.error}. Please check your API key and network connection.`;
            vscode.window.showErrorMessage(errorMsg);
        }
    } catch (error: any) {
        const errorMsg = `Error initializing DevMind: ${error.message}. Please check the console for more details.`;
        vscode.window.showErrorMessage(errorMsg);
        console.error(error);
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

        // Display analysis in a webview
        webview.createOrShow(analysis, 'DevMind Context Analysis');

    } catch (error: any) {
        const errorMsg = `Error analyzing context: ${error.message}. Please check your API key and network connection.`;
        vscode.window.showErrorMessage(errorMsg);
        console.error(error);
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

    } catch (error: any) {
        const errorMsg = `Error refactoring code: ${error.message}. Please check your API key and network connection.`;
        vscode.window.showErrorMessage(errorMsg);
        console.error(error);
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

    } catch (error: any) {
        const errorMsg = `Error debugging code: ${error.message}. Please check your API key and network connection.`;
        vscode.window.showErrorMessage(errorMsg);
        console.error(error);
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

        // Display documentation in a webview
        webview.createOrShow(documentation, 'DevMind Documentation');

        vscode.window.showInformationMessage('📚 Documentation generated successfully!');

    } catch (error: any) {
        const errorMsg = `Error generating documentation: ${error.message}. Please check your API key and network connection.`;
        vscode.window.showErrorMessage(errorMsg);
        console.error(error);
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

        // Show result in a webview
        webview.createOrShow(result, 'DevMind Git Analysis');

    } catch (error: any) {
        const errorMsg = `Error performing Git operation: ${error.message}. Please check your API key and network connection.`;
        vscode.window.showErrorMessage(errorMsg);
        console.error(error);
    }
}

export function deactivate() {
    console.log('DevMind AI Assistant deactivated.');
}
