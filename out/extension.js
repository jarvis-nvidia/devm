"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const devmind_ai_1 = require("./ai/devmind-ai");
const context_analyzer_1 = require("./context/context-analyzer");
const gitmate_1 = require("./agents/gitmate");
const codesmith_1 = require("./agents/codesmith");
const bughunter_1 = require("./agents/bughunter");
const docguru_1 = require("./agents/docguru");
let devMindAI;
let contextAnalyzer;
function activate(context) {
    console.log('DevMind AI Assistant is now active!');
    // Initialize core components
    devMindAI = new devmind_ai_1.DevMindAI();
    contextAnalyzer = new context_analyzer_1.ContextAnalyzer();
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
    context.subscriptions.push(activateCommand, analyzeCommand, refactorCommand, debugCommand, documentCommand, gitmateCommand);
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
        }
        else {
            vscode.window.showErrorMessage(`❌ Failed to initialize DevMind: ${status.error}`);
        }
    }
    catch (error) {
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
    }
    catch (error) {
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
        const codeSmith = new codesmith_1.CodeSmith(devMindAI);
        const refactoredCode = await codeSmith.refactorCode(editor.document.getText(selection), editor.document.languageId, await contextAnalyzer.analyzeCurrentContext(editor));
        await editor.edit(editBuilder => {
            editBuilder.replace(selection, refactoredCode);
        });
        vscode.window.showInformationMessage('✅ Code refactored successfully!');
    }
    catch (error) {
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
        const bugHunter = new bughunter_1.BugHunter(devMindAI);
        const issues = await bugHunter.analyzeCode(editor.document.getText(), editor.document.languageId, await contextAnalyzer.analyzeCurrentContext(editor));
        if (issues.length === 0) {
            vscode.window.showInformationMessage('✅ No issues found!');
        }
        else {
            // Create diagnostics
            const diagnostics = issues.map(issue => new vscode.Diagnostic(new vscode.Range(issue.line, 0, issue.line, 0), issue.description, vscode.DiagnosticSeverity.Warning));
            const collection = vscode.languages.createDiagnosticCollection('devmind');
            collection.set(editor.document.uri, diagnostics);
            vscode.window.showInformationMessage(`🔍 Found ${issues.length} potential issues. Check the Problems panel.`);
        }
    }
    catch (error) {
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
        const docGuru = new docguru_1.DocGuru(devMindAI);
        const documentation = await docGuru.generateDocumentation(editor.document.getText(), editor.document.languageId, await contextAnalyzer.analyzeCurrentContext(editor));
        // Create documentation file
        const docFileName = `${editor.document.fileName}.md`;
        const docUri = vscode.Uri.file(docFileName);
        const docDocument = await vscode.workspace.openTextDocument({
            content: documentation,
            language: 'markdown'
        });
        await vscode.window.showTextDocument(docDocument);
        vscode.window.showInformationMessage('📚 Documentation generated successfully!');
    }
    catch (error) {
        vscode.window.showErrorMessage(`❌ Error generating documentation: ${error}`);
    }
}
async function gitOperations() {
    try {
        const gitMate = new gitmate_1.GitMate(devMindAI);
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
        let result;
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
    }
    catch (error) {
        vscode.window.showErrorMessage(`❌ Error performing Git operation: ${error}`);
    }
}
function deactivate() {
    console.log('DevMind AI Assistant deactivated.');
}
//# sourceMappingURL=extension.js.map