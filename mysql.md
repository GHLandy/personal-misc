# MySQL

## my.ini

```ini
# To install the server as a Windows service manually, execute this in a
# command line shell, e.g.
# mysqld --install MySQL --defaults-file="D:/MariaDB/my.ini"
#
# To remove MySQL service, run:
# mysqld --remove MySQL

[client]
port = 3306
default-character-set = utf8

[mysql]
default-character-set = utf8

[mysqld]
port = 3306
basedir = "D:/MariaDB/"
datadir = "D:/MariaDB/data/"
#character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
default-storage-engine = INNODB
sql-mode = "STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
max_connections = 100
```

## migrate.sh

```bash
#!/usr/bin/env bash

which mysql &>/dev/null
if [[ $? -ne 0 ]]; then
  echo "mysql cli tools not installed yet"
  echo "you need to install it"
  echo "run: pacman -S mariadb-clients (on archlinux, for example)"
  exit 0
fi

DB_HOST="127.0.0.1"
DB_NAME="test"
DB_USERNAME="root"
DB_PASSWORD="password_123456"

create_db_sql="CREATE DATABASE IF NOT EXISTS $DB_NAME DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci"

mysql -h$DB_HOST -u$DB_USERNAME -p$DB_PASSWORD --execute="$create_db_sql"

mysql -h$DB_HOST -u$DB_USERNAME -p$DB_PASSWORD $DB_NAME < sql/initialize.sql

mysql -h$DB_HOST -u$DB_USERNAME -p$DB_PASSWORD $DB_NAME < sql/seeds.sql

echo "Congratulation, Migrate success!"
echo "You can start the server now: npm run dev."
```

## initialize.sql

```sql
-- 设置时区
SET TIME_ZONE='+08:00';

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `dev` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建表
CREATE TABLE IF NOT EXISTS `administrator` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户 id',
  `name` VARCHAR(16) NOT NULL COMMENT '用户名',
  `fullname` VARCHAR(36) DEFAULT NULL COMMENT '用户全名 (昵称)',
  `password` VARCHAR(256) NOT NULL COMMENT '加盐密码',
  `status` TINYINT UNSIGNED DEFAULT 1 COMMENT '启用状态 0 禁用 1 启用',
  `email` VARCHAR(64) DEFAULT NULL COMMENT '邮箱地址',
  `mobile` VARCHAR(16) DEFAULT NULL COMMENT '手机号码',
  `avatar` VARCHAR(256) DEFAULT NULL COMMENT '头像',
  `biography` VARCHAR(256) DEFAULT NULL COMMENT '个人简介',
  `created_at` DATETIME DEFAULT NOW() COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT NOW() ON UPDATE NOW() COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '管理系统用户';
```

## seeds.sql

```sql
-- 设置时区
SET TIME_ZONE='+08:00';

-- 种子数据，初始化部署后记得登录修改密码
-- 系统管理员用户 root 密码 root_pwd，系统普通用户 test 密码 test_pwd
-- 密码经过 bcrypt.hash(password, 10) 加密存储
INSERT INTO `sys_user`
(name, nickname, password, create_time, update_time)
VALUES
('root', 'Administrator', '$2b$10$9fWrZ5Vq.H2n0kVdJm8zmuVgFlJ3Nn.1y9y7zvBjGGNqtVpsiTs0.', NOW(), NOW()),
('test', 'TestUser', '$2b$10$u.xOK9l0C1t2IOAst32HcedBVJkWHKqtdy.y..4nMfF5.Cncbkwxq', NOW(), NOW());
```
