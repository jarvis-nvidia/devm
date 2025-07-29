#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧠 DevMind AI Assistant - Setup Script');
console.log('=====================================\n');

// Check if Node.js is installed
try {
    const nodeVersion = process.version;
    console.log(`✅ Node.js version: ${nodeVersion}`);

    // Check if npm is available
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
    console.error('❌ Node.js or npm not found. Please install Node.js first.');
    process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
}

// Compile TypeScript
console.log('\n🔨 Compiling TypeScript...');
try {
    execSync('npm run compile', { stdio: 'inherit' });
    console.log('✅ TypeScript compiled successfully');
} catch (error) {
    console.error('❌ Failed to compile TypeScript');
    process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
    console.log('\n📝 Creating .env file...');
    const envContent = `# DevMind AI Assistant Configuration
# Get your API key from: https://openrouter.ai/keys

OPENROUTER_API_KEY=your_api_key_here
QUEN_MODEL=qwen/qwen3-32b:free
ENABLE_CONTEXT_ANALYSIS=true
ENABLE_GIT_INTEGRATION=true
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
    console.log('⚠️  Please update the .env file with your OpenRouter API key');
} else {
    console.log('✅ .env file already exists');
}

// Run tests
console.log('\n🧪 Running tests...');
try {
    execSync('npm test', { stdio: 'inherit' });
    console.log('✅ Tests passed');
} catch (error) {
    console.log('⚠️  Some tests failed, but setup can continue');
}

// Package extension
console.log('\n📦 Packaging extension...');
try {
    execSync('npm run package', { stdio: 'inherit' });
    console.log('✅ Extension packaged successfully');
} catch (error) {
    console.error('❌ Failed to package extension');
    process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Get your OpenRouter API key from: https://openrouter.ai/keys');
console.log('2. Update the .env file with your API key');
console.log('3. Open VS Code and install the generated .vsix file');
console.log('4. Configure the extension in VS Code settings');
console.log('5. Use the Command Palette to activate DevMind');
console.log('\n📚 For more information, see INSTALLATION.md');
console.log('\nHappy coding with DevMind! 🧠✨');
