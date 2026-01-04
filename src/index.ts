import * as vscode from 'vscode';
import { transpile } from './transpiler';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('extension.nsl-assembler.transpile', async () => {
			return transpile();
		}),
	);
}
