import * as vscode from 'vscode';

export class DevMindWebView {
    private panel: vscode.WebviewPanel | undefined;

    public createOrShow(content: string, title: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (this.panel) {
            this.panel.reveal(column);
            this.panel.webview.html = this.getHtmlForWebview(content, title);
        } else {
            this.panel = vscode.window.createWebviewPanel(
                'devmind',
                title,
                column || vscode.ViewColumn.One,
                {
                    enableScripts: true,
                }
            );

            this.panel.webview.html = this.getHtmlForWebview(content, title);

            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }

    private getHtmlForWebview(content: string, title:string): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            padding: 20px;
            font-family: var(--vscode-font-family);
            color: var(--vscode-editor-foreground);
            background-color: var(--vscode-editor-background);
        }
        h1 {
            color: var(--vscode-text-link-foreground);
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    ${content}
</body>
</html>`;
    }
}
