# vscode-nsl-assembler

[![Version](https://img.shields.io/github/v/release/idleberg/vscode-nsl-assembler?style=for-the-badge)](https://github.com/idleberg/vscode-nsl-assembler/releases)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/idleberg.nsl-assembler?style=for-the-badge&label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=idleberg.nsl-assembler)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/idleberg/nsl-assembler?style=for-the-badge&label=Open%20VSX)](https://open-vsx.org/extension/idleberg/nsl-assembler)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/vscode-nsl-assembler/default.yml?style=for-the-badge)](https://github.com/idleberg/vscode-nsl-assembler/actions)

Language syntax, snippets and build system for
[nsL Assembler](https://github.com/NSIS-Dev/nsl-assembler).

## Installation

### Extension Marketplace

Launch Quick Open, paste the following command, and press <kbd>Enter</kbd>

`ext install nsl-assembler`

### Packaged Extension

Download the package extension from the the
[release page](https://github.com/idleberg/vscode-nsl-assembler/releases) and
install it from the command-line:

```bash
$ code --install-extension nsl-assembler-*.vsix
```

Alternatively, you can download the packaged extension from the
[Open VSX Registry](https://open-vsx.org/) or install it using the
[`ovsx`](https://www.npmjs.com/package/ovsx) command-line tool:

```bash
$ ovsx get idleberg.nsl-assembler
```

### Clone Repository

Change to your Visual Studio Code extensions directory:

```powershell
# Windows Powershell
cd $Env:USERPROFILES\.vscode\extensions

# Windows Command Prompt
$ cd %USERPROFILE%\.vscode\extensions
```

```bash
# Linux & macOS
$ cd ~/.vscode/extensions/
```

Clone repository as `nsl-assembler`:

```bash
$ git clone https://github.com/idleberg/vscode-nsl-assembler nsl-assembler
```

## Usage

To transpile [nsL Assembler][nsl], use the _nsL Assembler: Transpile code_
command from the
[command-palette](https://code.visualstudio.com/docs/editor/codebasics#_command-palette).
The path to `nsL.jar` is specified in your
[user settings](https://code.visualstudio.com/docs/customization/userandworkspace).

**Example:**

```json
{
	"nsl-assembler.pathToJar": "path\\to\\nsL.jar",
	"nsl-assembler.customArguments": [
		"/nomake",
		"/nopause"
	]
}
```

## License

This work is dual-licensed under
[The MIT License](https://opensource.org/licenses/MIT) and the
[GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)
