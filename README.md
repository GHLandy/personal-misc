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

<!-- 微软拼音 -->
[HKEY_CURRENT_USER\Software\Microsoft\InputMethod\CandidateWindow\CHS\1]
"EnableFixedCandidateCountMode"=dword:00000001
"MaxCandidates"=dword:00000005
"FontStyleTSF3"="16.00pt;Regular;;Microsoft YaHei UI"

[HKEY_CURRENT_USER\Software\Microsoft\InputMethod\Settings\CHS]
"Enable Cloud Candidate"=dword:00000000
"Enable Dynamic Candidate Ranking"=dword:00000001
"EnableExtraDomainType"=dword:00000001
"Enable self-learning"=dword:00000001
"EnableSmartSelfLearning"=dword:00000001
"EnableLiveSticker"=dword:00000000
"Enable EUDP"=dword:00000001
"Default Mode"=dword:00000001

```

## Clash Verge

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/Clash.Verge_1.3.8_x64-setup.exe

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/clash-verge_1.3.8_amd64.deb

## 环境变量

- `JAVA_HOME‌` JDK 目录

  具体看下载 JDK 后解压到哪个目录，比如 `$HOME/jdk17.0.12_7`，一般把 `$JAVA_HOME/bin` 添加到 `PATH`

- `ANDROID_HOME‌` Android SDK 目录

  具体看 Android SDK 下载时自己选择放在哪个目录就设置哪个目录，比如 `$HOME/Android/Sdk`，一般把 `$ANDROID_HOME/tools`、`$ANDROID_HOME/platform-tools` 添加到 `PATH`

- `GRADLE_USER_HOME‌` Gradle 全局配置和缓存目录

  默认是 `$HOME/.gradle`，可根据自己需要调整位置

- `GOPATH` 一般是 `$HOME/go`

- `GO111MOGULE` 一般是 `on`

## HBuilderX

windows 配置路径 `%APPDATA%/HBuilder X/user/settings.json`

```json
{
  "editor.colorScheme": "Default",
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
  "theme-custom.updatetime": "2023-03-23"
}
```
