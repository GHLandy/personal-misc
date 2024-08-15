# personal-misc

> Just something miscellaneous for ghlandy personal usage.

## fnm

linux 安装 `fnm`

下载 https://github.com/Schniz/fnm/releases/download/v1.37.1/fnm-linux.zip 解压到 `$HOME/.local/fnm/` 下，并添加到 `$PATH`

windows 安装 `fnm`

```bash
winget install fnm
```

设置 PowerShell 的配置文件

```ps1
# code 为安装 vs code 之后的命令行打开方式
# $PROFILE 为 PowerShell 的配置文件，默认为 C:\Users\<USER>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
code $PROFILE

# 添加配置
fnm env --use-on-cd | Out-String | Invoke-Expression

# 修改当前用户 PowerShell 执行策略
# https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4#change-the-execution-policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

设置 `.bashrc` (Git-Bash)

```bash
eval "$(fnm env --use-on-cd)"
```

`fnm` 下载 nodejs

```bash
fnm install 20
```

项目中 `husky` 运行找不到 `node`、`npx` 的问题，在家目录添加 `.huskyrc` 文件

```bash
eval "$(fnm env --use-on-cd)"
```

## PlanUML 预览

VS Code 安装 PlantUML 插件

```text
Name: PlantUML
Id: jebbs.plantuml
Description: Rich PlantUML support for Visual Studio Code.
Version: 2.15.1
Publisher: jebbs
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml
```

下载安装 jdk：https://www.oracle.com/java/technologies/downloads/

下载安装 graphviz：http://www.graphviz.org/download/

## Windows 11 使用经典右键菜单

注册表 计算机\HKEY_CURRENT_USER\Software\Classes\CLSID
新建项 {86CA1AA0-34AA-4E8B-A509-50C905BAE2A2}
再新建项 InprocServer32
重启资源管理器

## Windows

获取系统版本信息 start msinfo32

启动密钥输入框 start slui 3

https://mi.nurluq.vip/liebiao/DFAD12A48990F5F6

https://kms.cx/
https://www.moerats.com/kms/

## Google 浏览器下载

exe 下载地址：

https://www.google.com/chrome/?standalone=1&platform=win64

https://dl.google.com/tag/s/appguid={8A69D345-D564-463C-AFF1-A69D9E530F96}&iid={81CDF040-C0AD-52A1-73E3-606850A81740}&lang=zh-CN&browser=4&usagestats=0&appname=Google Chrome&needsadmin=prefers&ap=x64-statsdef_1&installdataindex=empty/chrome/install/ChromeStandaloneSetup64.exe

https://dl.google.com/tag/s/lang=zh-CN&browser=4&appname=Google Chrome&needsadmin=prefers&installdataindex=empty/chrome/install/ChromeStandaloneSetup64.exe

deb 包下载地址：

https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

## Clash Verge

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/Clash.Verge_1.3.8_x64-setup.exe

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/clash-verge_1.3.8_amd64.deb
