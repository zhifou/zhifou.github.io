---
layout: post
title: mac下mysql本机连接命令
date: 2024-03-05 10:00:00
categories: [数据库]
tags: [mysql]
---

### 1.mac下mysql本机连接命令

```shell
[root@zhifou ~]# mysql -u root -p
Enter password:********
******
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

### mac下mysql远程连接命令

```sql
[root@zhifou ~]# mysql -h100.45.142.11 -P8030 -uzhifou_r -pzhifou_r
```

### 2.mysql的简单命令

```shell
mysql> SHOW DATABASES;
+----------+
| Database |
+----------+
| mysql    |
| test     |
+----------+
2 rows in set (0.13 sec)
```

### 3.为root账号修改密码

```shell
[root@host]# mysqladmin -u root password "new_password";
```

### 4.查看mysql版本

```shell
[root@host]# mysqladmin --version
mysqladmin  Ver 8.0.19 for macos10.15 on x86_64 (MySQL Community Server - GPL)
```