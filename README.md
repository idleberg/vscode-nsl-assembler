⚠️ **This package was once part of [vscode-nsis](https://github.com/idleberg/vscode-nsis), but has been outsourced to prepare its deprecation**

# nsL Assembler for Visual Studio Code

[![The MIT License](https://flat.badgen.net/badge/license/MIT/orange)](http://opensource.org/licenses/MIT)
[![GNU General Public License](https://flat.badgen.net/badge/license/GPL%20v2/orange)](http://www.gnu.org/licenses/gpl-2.0.html)
[![GitHub](https://flat.badgen.net/github/release/idleberg/vscode-nsl-assembler)](https://github.com/idleberg/vscode-nsl-assembler/releases)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/idleberg.nsl-assembler.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=idleberg.nsl-assembler)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/vscode-nsl-assembler)](https://circleci.com/gh/idleberg/vscode-nsl-assembler)
[![David](https://flat.badgen.net/david/dep/idleberg/vscode-nsl-assembler)](https://david-dm.org/idleberg/vscode-nsl-assembler)
[![Gitter](https://flat.badgen.net/badge/chat/on%20gitter/ff69b4)](https://gitter.im/NSIS-Dev/vscode)

Language syntax, IntelliSense and build system for [nsL Assembler](https://github.com/NSIS-Dev/nsl-assembler).

## Installation

### Extension Marketplace

Launch Quick Open, paste the following command, and press <kbd>Enter</kbd>

`ext install nsl-assembler`

### Packaged Extension

Download the package extension from the the [release page](https://github.com/idleberg/vscode-nsl-assembler/releases) and install it from the command-line:

```bash
$ code --install-extension nsl-assembler-*.vsix
```

### Clone Repository

Change to your Visual Studio Code extensions directory:

```bash
# Windows
$ cd %USERPROFILE%\.vscode\extensions

# Linux & macOS
$ cd ~/.vscode/extensions/
```

Clone repository as `nsl-assembler`:

```bash
$ git clone https://github.com/idleberg/vscode-nsl-assembler nsl-assembler
```

## Usage

To transpile [nsL Assembler][nsl], use the *nsL Assembler: Transpile code* command from the [command-palette](https://code.visualstudio.com/docs/editor/codebasics#_command-palette). The path to `nsL.jar` is specified in your [user settings](https://code.visualstudio.com/docs/customization/userandworkspace).

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

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)
