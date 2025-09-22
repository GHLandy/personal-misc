# GnuPG (gpg)

## 生成密钥对

```bash
gpg --full-generate-key
```

交互流程中一般：

- 选择 `(1) RSA and RSA (default)`
- 输入密钥长度 `4096`
- 选择过期时间 `0` 永不过期
- 确认上述选择
- 输入 Real Name，一般输入自己的常用 ID 或则名在拼音即可
- 输入 Email Address，一般输入自己的常用邮箱可以
- 输入 Comment，备注信息
- 最后确认输入要设置的密码

## 查看

```bash
# 查看已导入的公钥
gpg --list-keys --keyid-format short

# 查看已导入的私钥
gpg --list-secret-keys --keyid-format short
```

## 导出导入

```bash
# 先查看密钥对 ID D504D18E

# 导出公钥
gpg --export --armor D504D18E > D504D18E.pub.asc

# 导出私钥，会提示输入之前设置的密码
gpg --export --armor D504D18E > D504D18E.sec.asc

# 导入
gpg --import D504D18E.sec.asc
```

https://www.xdty.org/2037
