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
exports.run = run;
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
async function run() {
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
    }
    catch (error) {
        console.error('❌ Test failed:', error);
        throw error;
    }
}
//# sourceMappingURL=extension.test.js.map