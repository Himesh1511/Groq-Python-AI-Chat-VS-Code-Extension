const vscode = require('vscode');
const cp = require('child_process');
const path = require('path');

function activate(context) {
    let panel;
    context.subscriptions.push(
        vscode.commands.registerCommand('groqPythonAI.openChat', () => {
            panel = vscode.window.createWebviewPanel(
                'groqPythonAI',
                'Groq Python AI Chat',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );
            const htmlPath = path.join(context.extensionPath, 'webview.html');
            panel.webview.html = require('fs').readFileSync(htmlPath, 'utf8');

            panel.webview.onDidReceiveMessage(
                async (message) => {
                    if (message.command === 'askGroq') {
                        const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';
                        const scriptPath = `"${path.join(context.extensionPath, 'python_backend.py')}"`;
                        const pythonCommand = `${pythonExecutable} ${scriptPath}`;

                        const python = cp.spawn(pythonCommand, { shell: true });

                        python.stdin.write(JSON.stringify({ prompt: message.text }) + '\n');
                        python.stdin.end();

                        let data = '';
                        python.stdout.setEncoding('utf8');

                        python.stdout.on('data', (chunk) => {
                            data += chunk;
                        });

                        python.stdout.on('end', () => {
                            console.log("Raw Python output:", data);
                            try {
                                const cleanedData = data.trim().split('\n').pop();
                                const result = JSON.parse(cleanedData);
                                panel.webview.postMessage({ command: 'groqResponse', text: result.answer });
                            } catch (e) {
                                console.error("JSON parse error:", e);
                                panel.webview.postMessage({ command: 'groqResponse', text: "Error parsing response from Python." });
                            }
                        });

                        python.stderr.on('data', (err) => {
                            console.error("Python stderr:", err.toString());
                            panel.webview.postMessage({ command: 'groqResponse', text: "Python error: " + err.toString() });
                        });
                    }
                },
                undefined,
                context.subscriptions
            );
        })
    );
}

function deactivate() {}

module.exports = { activate, deactivate };
