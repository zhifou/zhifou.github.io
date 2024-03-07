---
layout: post
title: 我安装完MySQL 8.0.19之后Node无法连接到mysql
date: 2024-03-07 20:20:00
categories: [数据库]
tags: [mysql]
---

### 我安装完MySQL 8.0.19之后Node无法连接到mysql，出现如下错误：

```shell
SequelizeConnectionError: Client does not support authentication protocol requested by server; consider upgrading mysql client
```

### 最终查询了以下几个方法解决了，主要是root的plugin不是mysql_native_password,所以进行了修改。我的"root"@localhost 对应的plugin 不是mysql_native_password，应该用什么命令修改？

```sql
mysql> SELECT Host,User,Password,plugin from user;
+-----------+------+-------------------------------------------+-------------------------------------------+
| Host      | User | Password                                  | plugin                                    |
+-----------+------+-------------------------------------------+-------------------------------------------+
| localhost | root | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 | *43B2D714E0B8EA658E921ED9C7A52B5154C9693C |
| 127.0.0.1 | root | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 | mysql_native_password                     |
| ::1       | root | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 | mysql_native_password                     |
| localhost |      |                                           | mysql_native_password                     |
+-----------+------+-------------------------------------------+-------------------------------------------+
4 rows in set (0.00 sec)
```

 MySQL 8.0 配置mysql_native_password身份验证插件的密码

```shell
方法一：

登录MySQL后输入：

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPassword';

FLUSH PRIVILEGES;

方法二：

编辑my.cnf文件，更改默认的身份认证插件。

vi /etc/my.cnf

在[mysqld]中添加下边的代码
default_authentication_plugin=mysql_native_password

然后重启MySQL
service mysqld restart
```
