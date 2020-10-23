import { clearOutput, onSuccess, validateConfig } from './util';
import { getConfig } from 'vscode-get-config';
import { spawn } from 'child_process';
import { window } from 'vscode';

const nslChannel = window.createOutputChannel('nsL Assembler');

/*
 *  Requires nsL Assembler
 *  https://sourceforge.net/projects/nslassembler/
 *  https://github.com/NSIS-Dev/nsl-assembler
 */
async function transpile(): Promise<void> {
  await clearOutput(nslChannel);

  if (window.activeTextEditor['_documentData']['_languageId'] !== 'nsl-assembler') {
    nslChannel.appendLine('This command is only available for nsL Assembler files');
    return;
  }

  const { customArguments, pathToJar, showNotifications } = getConfig();
  const document = window.activeTextEditor.document;

  if (customArguments.length) {
    validateConfig(customArguments);
  }

  document.save().then( () => {
    const nslJar = pathToJar;

    if (typeof nslJar === 'undefined' || nslJar === null) {
      return window.showErrorMessage('No valid `nsL.jar` was specified in your config');
    }

    const defaultArguments: Array<string> = ['-jar', nslJar];
    const compilerArguments = [ ...defaultArguments, ...customArguments, document.fileName ];

    // Let's build
    const nslCmd = spawn('java', compilerArguments);
    const stdErr = [];

    nslCmd.stdout.on('data', (line: Array<any>) => {
      nslChannel.appendLine(line.toString());
    });

    nslCmd.stderr.on('data', (line: Array<any>) => {
      stdErr.push(line);
      nslChannel.appendLine(line.toString());
    });

    nslCmd.on('exit', (code) => {
      if (stdErr.length === 0) {
        if (showNotifications) {
          window.showInformationMessage(`Transpiled successfully -- ${document.fileName}`, 'Open')
          .then(onSuccess);
        }
      } else {
        nslChannel.show(true);
        if (showNotifications) window.showErrorMessage('Transpile failed, see output for details');
        if (stdErr.length > 0) console.error(stdErr.join('\n'));
      }
    });
  });
}

export { transpile };
