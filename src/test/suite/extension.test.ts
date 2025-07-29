import * as assert from 'assert';
import * as vscode from 'vscode';

export async function run(): Promise<void> {
    console.log('🧠 DevMind Extension Test Suite');
    console.log('================================');

    try {
        // Test 1: Extension should be present
        console.log('Testing extension presence...');
        const extension = vscode.extensions.getExtension('devmind-ai-assistant');
        assert.ok(extension, 'Extension should be present');
        console.log('✅ Extension presence test passed');

        // Test 2: Commands should be registered
        console.log('Testing command registration...');
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('devmind.activate'), 'devmind.activate command should be registered');
        assert.ok(commands.includes('devmind.analyze'), 'devmind.analyze command should be registered');
        assert.ok(commands.includes('devmind.refactor'), 'devmind.refactor command should be registered');
        assert.ok(commands.includes('devmind.debug'), 'devmind.debug command should be registered');
        assert.ok(commands.includes('devmind.document'), 'devmind.document command should be registered');
        assert.ok(commands.includes('devmind.gitmate'), 'devmind.gitmate command should be registered');
        console.log('✅ Command registration test passed');

        console.log('🎉 All tests passed successfully!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        throw error;
    }
}
