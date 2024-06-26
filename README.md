# personal-misc

> Just something miscellaneous for ghlandy personal usage.

## fnm

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
