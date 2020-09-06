'use strict';

import { window, WorkspaceConfiguration } from 'vscode';

import { clearOutput, getConfig, onSuccess, validateConfig } from './util';
import { spawn } from 'child_process';


const nslChannel = window.createOutputChannel('nsL Assembler');

/*
 *  Requires nsL Assembler
 *  https://sourceforge.net/projects/nslassembler/
 *  https://github.com/NSIS-Dev/nsl-assembler
 */
function transpile(): void {
  clearOutput(nslChannel);

  if (window.activeTextEditor['_documentData']['_languageId'] !== 'nsl-assembler') {
    nslChannel.appendLine('This command is only available for nsL Assembler files');
    return;
  }

  const config: WorkspaceConfiguration = getConfig();
  const document = window.activeTextEditor.document;

  if (config.customArguments.length) {
    validateConfig(config.customArguments);
  }

  document.save().then( () => {
    const nslJar = config.pathToJar;

    if (typeof nslJar === 'undefined' || nslJar === null) {
      return window.showErrorMessage('No valid `nsL.jar` was specified in your config');
    }

    const defaultArguments: Array<string> = ['-jar', nslJar];
    const customArguments = config.customArguments;
    const compilerArguments = [ ...defaultArguments, ...customArguments, document.fileName ];

    // Let's build
    const nslCmd = spawn('java', compilerArguments);

    let stdErr: string = '';

    nslCmd.stdout.on('data', (line: Array<any>) => {
      nslChannel.appendLine(line.toString());
    });

    nslCmd.stderr.on('data', (line: Array<any>) => {
      stdErr += '\n' + line;
      nslChannel.appendLine(line.toString());
    });

    nslCmd.on('exit', (code) => {
      if (stdErr.length === 0) {
        if (config.showNotifications) {
          window.showInformationMessage(`Transpiled successfully -- ${document.fileName}`, 'Open')
          .then(onSuccess);
        }
      } else {
        nslChannel.show(true);
        if (config.showNotifications) window.showErrorMessage('Transpile failed, see output for details');
        if (stdErr.length > 0) console.error(stdErr);
      }
    });
  });
}

export { transpile };
