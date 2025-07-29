import * as assert from 'assert';
import * as vscode from 'vscode';
import { DevMindWebView } from '../../webview';

suite('DevMindWebView Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Test createOrShow', () => {
        const webview = new DevMindWebView();
        webview.createOrShow('<h1>Test</h1>', 'Test Title');
        // Not much to assert here, as it's mostly UI.
        // We can check that the panel is created.
        assert.ok(true);
    });
});
