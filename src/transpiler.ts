import { spawn } from 'node:child_process';
import { window } from 'vscode';
import { getConfig } from 'vscode-get-config';
import { clearOutput, fileExists, onSuccess } from './util.ts';

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

	const { customArguments, pathToJar } = getConfig('nsl-assembler');
	const document = window.activeTextEditor.document;

	await document.save();

	const nslJar = pathToJar;

	if (typeof nslJar !== 'string' || nslJar.length === 0) {
		window.showErrorMessage('No valid `nsL.jar` was specified in your config');
		return;
	}

	if (!(await fileExists(nslJar))) {
		window.showErrorMessage('The specified `nsL.jar` does not exist');
		return;
	}

	const defaultArguments: Array<string> = ['-jar', nslJar];
	const compilerArguments = [...defaultArguments, ...(customArguments || []), document.fileName];

	// Let's build
	const nslCmd = spawn('java', compilerArguments);
	const stdErr: Array<string> = [];

	nslCmd.stdout.on('data', (line: Array<Buffer>) => {
		const lineString: string = line.toString().trim();

		nslChannel.appendLine(lineString);
	});

	nslCmd.stderr.on('data', (line: Array<Buffer>) => {
		const lineString: string = line.toString().trim();

		stdErr.push(lineString);
		nslChannel.appendLine(lineString);
	});

	await new Promise<void>((resolve) => {
		nslCmd.on('exit', async () => {
			if (stdErr.length > 0) {
				handleTranspileError(stdErr);
			} else {
				await handleTranspileSuccess(document.fileName);
			}
			resolve();
		});
	});
}

function handleTranspileError(stdErr: string[]): void {
	nslChannel.show(true);

	window.showErrorMessage('Transpile failed, see output for details');
	console.error(stdErr.join('\n'));
}

async function handleTranspileSuccess(fileName: string): Promise<void> {
	const choice = await window.showInformationMessage(`Transpiled successfully -- ${fileName}`, 'Open');

	if (choice) {
		await onSuccess(choice);
	}
}
