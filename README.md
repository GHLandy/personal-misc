# personal-misc

> Just something miscellaneous for ghlandy personal usage.

## fnm

linux 安装 `fnm`

下载 https://github.com/Schniz/fnm/releases/download/v1.38.1/fnm-linux.zip 解压到 `$HOME/.local/fnm/` 下，并添加到 `$PATH`

windows 安装 `fnm`

下载 https://github.com/Schniz/fnm/releases/download/v1.38.1/fnm-windows.zip 解压到 `D:\Tools\fnm\`, 将该路径添加到 `PATH`

设置 PowerShell 的配置文件

```ps1
# code 为安装 vs code 之后的命令行打开方式
# $PROFILE 为 PowerShell 的配置文件
# 默认为 C:\Users\<USER>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
code $PROFILE

# 添加配置
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression

# 修改当前用户 PowerShell 执行策略
# https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4#change-the-execution-policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

设置 `.bashrc` (Git-Bash)

```bash
eval "$(fnm env --use-on-cd --shell bash)"
```

`fnm` 下载 nodejs

```bash
fnm install 20
```

项目中 `husky` 运行找不到 `node`、`npx` 的问题，在家目录添加 `.config/husky/init.sh` 文件, `https://typicode.github.io/husky/zh/how-to.html#启动文件`

```bash
eval "$(fnm env --use-on-cd --shell bash)"
```

## node-gyp

node-gyp 在 windows 需要的编译环境

1. python 环境

https://www.python.org/downloads/ 下载个 3.12 版本来安装即可

2. C++ 环境

https://visualstudio.microsoft.com/zh-hans/downloads/ 安装 Visual Studio 2022 社区版即可

运行安装后的 Visual Studio Installer 勾选单个组件:

- 适用于 v143 生成工具的 C++ ATL (x86 和 x64)
- MSBuild
- C# 和 Visual Basic Roslyn 编译器 (注: 勾选 MSBuild 后自动勾选的)
- MSVC v143 - VS 2022 C++ x64/x86 生成工具(最新)

## Google 浏览器下载

exe 下载地址：https://www.google.com/chrome/?standalone=1&platform=win64

https://dl.google.com/tag/s/appguid={8A69D345-D564-463C-AFF1-A69D9E530F96}&iid={C064B35C-3E24-8615-6F62-27B06F318835}&lang=zh-CN&browser=4&usagestats=0&appname=Google%20Chrome&needsadmin=prefers&ap=x64-statsdef_1&installdataindex=empty/chrome/install/ChromeStandaloneSetup64.exe

deb 包下载地址：

https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

rpm 包下载地址：

https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm

## Windows

系统版本信息 start msinfo32

https://kms.cx/

```reg
Windows Registry Editor Version 5.00

<!-- Windows 经典右键菜单，需要重启资源管理器 -->
[HKEY_CURRENT_USER\Software\Classes\CLSID\{86CA1AA0-34AA-4E8B-A509-50C905BAE2A2}\InprocServer32]
@=""
```

## Clash Verge

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/Clash.Verge_1.3.8_x64-setup.exe

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/clash-verge_1.3.8_amd64.deb

## HBuilderX

windows 配置路径 `%APPDATA%/HBuilder X/user/settings.json`

```json
{
  "editor.colorScheme": "Atom One Dark",
  "editor.fontSize": 13,
  "editor.formatOnSave": true,
  "editor.insertSpaces": true,
  "editor.longLineIndicator": true,
  "editor.longLineIndicatorColumn": 100,
  "editor.multiCursorModifier": "Alt",
  "editor.showDefaultEndOfLine": "\\n",
  "editor.tabSize": 2,
  "editor.wordWrap": true,
  "explorer.fontSize": "14",
  "software.update.settings": "manual",
  "terminal.type": "内置终端",
  "theme-custom.updatetime": "2023-03-23",
  "workbench.colorCustomizations": {
    "[Atom One Dark]": {
      "console.background": "",
      "editor.background": "#002B36",
      "editor.caretLine": "#274642",
      "editor.foldMarker.collapsed.background": "#2AA19899",
      "editor.foldMarker.expanded.background": "#2AA19899",
      "editor.foldMarker.expanded.foreground": "#002B36",
      "editor.linenumber": "#949494",
      "editor.selection": "#274642",
      "editor.unactive_selection.background": "",
      "editor.whitespace": "#002B36",
      "editorGroup.border": "#00212B",
      "editorGroupHeader.tabsBackground": "#004052",
      "editorSuggestWidget.background": "#00212B",
      "editorSuggestWidget.border": "#002B36",
      "editorSuggestWidget.selectedBackground": "#002B36",
      "extensionButton.prominentBackground": "#002B36",
      "extensionButton.prominentHoverBackground": "#002B36",
      "imageview.background": "#002B36",
      "imageview.foreground": "#002B36",
      "input.background": "#002B36",
      "inputList.hoverBackground": "#002B36",
      "inputOption.activeBorder": "#2AA19899",
      "inputValidation.infoBackground": "#00212B",
      "list.activeSelectionBackground": "#005A6F",
      "list.highlightForeground": "#1ebcc5",
      "list.hoverBackground": "#002B36",
      "minimap.handle.background": "#00212B",
      "notifications.background": "#00212B",
      "notifications.border": "#00212B",
      "outlineBackground": "#002B36",
      "scrollbarSlider.background": "#2AA19899",
      "scrollbarSlider.hoverBackground": "#2AA19899",
      "settings.dropdownBackground": "#003847",
      "settings.dropdownBorder": "#003847",
      "settings.textInputBackground": "#003847",
      "settings.textInputBorder": "#003847",
      "sideBar.background": "#00212B",
      "statusBar.background": "#00212B",
      "statusBar.foreground": "#93A1A1",
      "tab.activeBackground": "#002B37",
      "tab.border": "#003847",
      "tab.hoverBackground": "#004454",
      "tab.inactiveBackground": "#004052",
      "tab.inactiveForeground": "#93A1A1",
      "tab.unfocusedHoverBackground": "",
      "terminal.background": "",
      "titleBar.activeBackground": "#002C39",
      "toolBar.background": "#002B36",
      "toolBar.border": "#004052",
      "toolBar.hoverBackground": "#004052"
    }
  }
}
```
