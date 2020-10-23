'use strict';

import * as vscode from 'vscode';

// Load package components
import { transpile } from './transpiler';

async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('extension.nsl-assembler.transpile', async () => {
      return transpile();
    })
  );
};

export { activate };
