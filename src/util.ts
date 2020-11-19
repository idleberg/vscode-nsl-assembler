import {
  commands,
  window,
  workspace
} from 'vscode';

import { basename, dirname, extname, join } from 'path';
import { getConfig } from 'vscode-get-config';

// eslint-disable-next-line
async function clearOutput(channel: unknown): Promise<void> {
  const { alwaysShowOutput } = await getConfig('nsl-assembler');

  channel.clear();
  if (alwaysShowOutput === true) {
    channel.show(true);
  }
}

function onSuccess(choice: string): void {
  const document = window.activeTextEditor.document;

  if (choice === 'Open') {
    const dirName = dirname(document.fileName);
    const extName = extname(document.fileName);
    const baseName = basename(document.fileName, extName);
    const outName = baseName + '.nsi';
    const nsisFile = join(dirName, outName);

    workspace.openTextDocument(nsisFile)
    .then( (doc) => {
      window.showTextDocument(doc);
    });
  }
}

function validateConfig(setting: string): void {
  if (typeof setting === 'string') {
    window.showErrorMessage('The argument handling has been changed in a recent version of this extension. Please adjust your settings before trying again.', 'Open Settings')
    .then(choice => {
      if (choice === 'Open Settings') {
        commands.executeCommand('workbench.action.openSettings', '@ext:idleberg.nsl-assembler');
      }
    });

    process.exit();
  }
}

export {
  clearOutput,
  onSuccess,
  validateConfig
};
