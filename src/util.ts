import { access, constants } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { type OutputChannel, window, workspace } from 'vscode';
import { getConfig } from 'vscode-get-config';

// eslint-disable-next-line
export async function clearOutput(channel: OutputChannel): Promise<void> {
	const { alwaysShowOutput } = await getConfig('nsl-assembler');

	channel.clear();
	if (alwaysShowOutput === true) {
		channel.show(true);
	}
}

export async function onSuccess(choice: string): Promise<void> {
	const editor = window.activeTextEditor;

	if (!editor) {
		return;
	}

	const document = editor.document;

	if (choice === 'Open') {
		const dirName = dirname(document.fileName);
		const extName = extname(document.fileName);
		const baseName = basename(document.fileName, extName);
		const outName = `${baseName}.nsi`;
		const nsisFile = join(dirName, outName);

		const doc = await workspace.openTextDocument(nsisFile);
		await window.showTextDocument(doc);
	}
}

export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath, constants.F_OK);
	} catch {
		return false;
	}

	return true;
}
