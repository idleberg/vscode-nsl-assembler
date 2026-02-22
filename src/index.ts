import { commands, type ExtensionContext } from 'vscode';
import { transpile } from './transpiler';

export async function activate(context: ExtensionContext): Promise<void> {
	context.subscriptions.push(
		commands.registerTextEditorCommand('extension.nsl-assembler.transpile', async () => {
			return transpile();
		}),

		commands.registerCommand('extension.nsl-assembler.openSettings', async () => {
			commands.executeCommand('workbench.action.openSettings', '@ext:idleberg.nsl-assembler');
		}),
	);
}
