import {
  commands,
  window,
  workspace
} from 'vscode';

import { basename, dirname, extname, join } from 'path';
import { getConfig } from 'vscode-get-config';

async function clearOutput(channel): Promise<void> {
  const { alwaysShowOutput } = await getConfig('nsl-assembler');

  channel.clear();
  if (alwaysShowOutput === true) {
    channel.show(true);
  }
}

function onSuccess(choice): void {
  let document = window.activeTextEditor.document;

  if (choice === 'Open') {
    let dirName = dirname(document.fileName);
    let extName = extname(document.fileName);
    let baseName = basename(document.fileName, extName);
    let outName = baseName + '.nsi';
    let nsisFile = join(dirName, outName);

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
