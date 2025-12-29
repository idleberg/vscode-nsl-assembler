import { spawn } from 'node:child_process';
import { window } from 'vscode';
import { getConfig } from 'vscode-get-config';
import { clearOutput, onSuccess, validateConfig } from './util.ts';

const nslChannel = window.createOutputChannel('nsL Assembler');

/*
 *  Requires nsL Assembler
 *  https://sourceforge.net/projects/nslassembler/
 *  https://github.com/NSIS-Dev/nsl-assembler
 */
export async function transpile(): Promise<void> {
	await clearOutput(nslChannel);

	if (!window.activeTextEditor) {
		window.showErrorMessage('No active editor found');
		return;
	}

	const editor = window.activeTextEditor;

	if (editor.document.languageId !== 'nsl-assembler') {
		nslChannel.appendLine('This command is only available for nsL Assembler files');
		return;
	}

	const { customArguments, pathToJar, showNotifications } = getConfig('nsl-assembler');
	const document = window.activeTextEditor.document;

	if (customArguments?.length) {
		await validateConfig(customArguments);
	}

	await document.save();

	const nslJar = pathToJar;

	if (typeof nslJar === 'undefined' || nslJar === null) {
		window.showErrorMessage('No valid `nsL.jar` was specified in your config');
		return;
	}

	const defaultArguments: Array<string> = ['-jar', nslJar];
	const compilerArguments = [...defaultArguments, ...customArguments, document.fileName];

	// Let's build
	const nslCmd = spawn('java', compilerArguments);
	const stdErr: Array<unknown> = [];

	nslCmd.stdout.on('data', (line: Array<unknown>) => {
		nslChannel.appendLine(line.toString());
	});

	nslCmd.stderr.on('data', (line: Array<unknown>) => {
		stdErr.push(line);
		nslChannel.appendLine(line.toString());
	});

	await new Promise<void>((resolve) => {
		nslCmd.on('exit', async () => {
			if (stdErr.length === 0) {
				if (showNotifications) {
					const choice = await window.showInformationMessage(`Transpiled successfully -- ${document.fileName}`, 'Open');
					if (choice) {
						await onSuccess(choice);
					}
				}
			} else {
				nslChannel.show(true);
				if (showNotifications) window.showErrorMessage('Transpile failed, see output for details');
				if (stdErr.length > 0) console.error(stdErr.join('\n'));
			}
			resolve();
		});
	});
}
