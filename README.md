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

安装 VS IDE 或者 VS 生成工具:

- Visual Studio 2022 社区版 https://visualstudio.microsoft.com/zh-hans/downloads/
- Visual Studio 2022 生成工具 https://visualstudio.microsoft.com/zh-hans/downloads/#build-tools-for-visual-studio-2022

运行安装后的 Visual Studio Installer 勾选单个组件:

- 适用于 v143 生成工具的 C++ ATL (x86 和 x64)
- MSVC v143 - VS 2022 C++ x64/x86 生成工具(最新)
- Windows 11 SDK (10.0.26100.0)

## Google 浏览器下载

exe 下载地址：https://www.google.com/chrome/?standalone=1&platform=win64

https://dl.google.com/tag/s/appguid={8A69D345-D564-463C-AFF1-A69D9E530F96}&iid={D7EBF260-56DE-B258-5E69-EA6E1A49461B}&lang=zh-CN&browser=4&usagestats=0&appname=Google%20Chrome&needsadmin=prefers&ap=x64-statsdef_1&installdataindex=empty/chrome/install/ChromeStandaloneSetup64.exe

deb 包下载地址：

https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

rpm 包下载地址：

https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm

## Windows

系统版本信息 start msinfo32

https://kms.cx/

## Clash Verge

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/Clash.Verge_1.3.8_x64-setup.exe

https://github.com/zzzgydi/clash-verge/releases/download/v1.3.8/clash-verge_1.3.8_amd64.deb

## 环境变量

- `JAVA_HOME‌` JDK 目录

  具体看下载 JDK 后解压到哪个目录，比如 `$HOME/jdk17.0.12_7`，一般把 `$JAVA_HOME/bin` 添加到 `PATH`

- `ANDROID_HOME‌` Android SDK 目录

  具体看 Android SDK 下载时自己选择放在哪个目录就设置哪个目录，比如 `$HOME/Android/Sdk`，一般把 `$ANDROID_HOME/tools`、`$ANDROID_HOME/platform-tools` 添加到 `PATH`

- `GRADLE_USER_HOME‌` Gradle 全局配置和缓存目录

  默认是 `$HOME/.gradle`, 可根据需要调整位置，比如 windows 设置为 `D:\.gradle`，Android Studio 中也是默认位置，需要在
  【Settings】- 【Build, Excecution, Deployment】-【Build Tools】-【Gradle】中选择需要使用目录

- `GOPATH` 一般是 `$HOME/go`, 可根据需要调整位置

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

prettier.config.js

工具 - 设置 - 插件配置 - 打开文件 prettier.config.js 进行配置

```js
// Prettier配置文档：https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  //自定义文件后缀对应的parser
  parsers: {
    '.nvue': 'vue',
    '.ux': 'vue',
    '.uvue': 'vue',
    '.uts': 'typescript',
  },
};
```

jsbeautifyrc.js

工具 - 设置 - 插件配置 - 打开文件 jsbeautifyrc.js 进行配置

```js
//配置文档参考：https://www.npmjs.com/package/js-beautify#options
module.exports = {
  parsers: {
    '.js': 'js',
    '.json': 'js',
    '.njs': 'js',
    '.sjs': 'js',
    '.wxs': 'js',
    '.css': 'css',
    '.nss': 'css',
    '.wxss': 'css',
    '.acss': 'css',
    '.ttss': 'css',
    '.qss': 'css',
    '.html': 'html',
    '.ux': 'html',
    '.wxml': 'html',
    '.nml': 'html',
    '.vue': 'html',
    '.nvue': 'html',
    '.axml': 'html',
    '.swan': 'html',
    '.ttml': 'html',
    '.qml': 'html',
    '.md': 'md',
  },
  options: {
    indent_size: 2,
    indent_char: ' ',
    indent_with_tabs: false, //使用tab缩进
    eol: '\n', //行结束符
    end_with_newline: true, //使用换行结束输出
    indent_level: 0, //起始代码缩进数
    editorconfig: true,
    preserve_newlines: true, //保留空行
    max_preserve_newlines: 2, //最大连续保留换行符个数。比如设为2，则会将2行以上的空行删除为只保留1行
    space_in_paren: false, //括弧添加空格 示例 f( a, b )
    space_in_empty_paren: false, //函数的括弧内没有参数时插入空格 示例 f( )
    jslint_happy: false, //启用jslint-strict模式
    space_after_anon_function: true, //匿名函数的括号前加空格
    space_after_named_function: false,
    brace_style: 'preserve-inline', //代码样式，可选值 [collapse|expand|end-expand|none][,preserve-inline] [collapse,preserve-inline
    unindent_chained_methods: false, //不缩进链式方法调用
    break_chained_methods: false, //在随后的行中断开链式方法调用
    keep_array_indentation: false, //保持数组缩进
    unescape_strings: false, //使用xNN符号编码解码可显示的字符
    wrap_line_length: 120,
    e4x: false, //支持jsx
    comma_first: false, //把逗号放在新行开头，而不是结尾
    operator_position: 'before-newline',
    unformatted: ['wbr'],
    html: {
      'wrap-attributes': 'auto',
      'wrap-attributes-indent-size': 1,
      inline: undefined,
      unformatted: undefined,
      content_unformatted: undefined,
      indent_handlebars: true,
      indent_inner_html: true,
      'indent-scripts': 'normal', //[keep|separate|normal]
      extra_liners: [], //配置标签列表，需要在这些标签前面额外加一空白行
    },
    css: {
      'selector-separator-newline': true,
      'newline-between-rules': false,
    },
    typescript: {
      // "convert_tabs_to_spaces":true,
      indent_multi_line_object_literal_beginning_on_blank_line: true,
      insert_space_after_comma_delimiter: true,
      insert_space_after_constructor: false,
      insert_space_after_function_keyword_for_anonymous_functions: true,
      insert_space_after_keywords_in_control_flow_statements: true,
      insert_space_after_opening_and_before_closing_empty_braces: true,
      insert_space_after_opening_and_before_closing_jsx_expression_braces: false,
      insert_space_after_opening_and_before_closing_nonempty_braces: true,
      insert_space_after_opening_and_before_closing_nonempty_brackets: false,
      insert_space_after_opening_and_before_closing_nonempty_parenthesis: false,
      insert_space_after_opening_and_before_closing_template_string_braces: false,
      insert_space_after_semicolon_in_for_statements: true,
      insert_space_after_type_assertion: false,
      insert_space_before_and_after_binary_operators: true,
      insert_space_before_function_parenthesis: false,
      insert_space_before_type_annotation: true,
      place_open_brace_on_new_line_for_control_blocks: false,
      place_open_brace_on_new_line_for_functions: false,
      semicolons: 'ignore', // values include "ignore" | "insert" | "remove"
      trim_trailing_whitespace: true,
    },
  },
};
```
