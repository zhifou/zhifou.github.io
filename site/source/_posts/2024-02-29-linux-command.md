---
layout: post
title: Linux常用命令
date: 2024-02-29 10:00:00
categories: [Linux]
tags: [linux, shell, command]
---

> 作为一名前端开发者，熟悉linux命令是必备的，接下来我们了解一下，我们再开发过程中经常用到的linux常用命令都有哪些？如果谁想了解一下linux系统介绍可以看看百度百科。    —— [百度百科](https://baike.baidu.com/item/linux/27050)

## ls 命令

**ls 命令**是用于列表显示目录内的文件及目录：

- **```ls -l```**  以长格式显示文件和目录的列表；
- **```ll```**  在mac下可以直接使用这个，功能和```ls -l```相同
- **```ls -a```**  显示所有子目录和文件的信息-A 与-a基本类似，但有两个特殊的隐藏目录‘.’和'..'不显示；

## mkdir 命令

 **mkdir 命令**是用于创建目录的命令：

- **```mkdir abcstatic```**  创建一个名为abcstatic的目录；

## cp 命令

**cp 命令**是用于复制文件或目录-f 覆盖同名文件或目录，强制复制-i 提醒用户确认-r 递归复制：

- **```cp nginx.conf nginx-new.conf```**  复制单个文件到当前目录并命名；
- **```cp -r vue-typescript ../typescript```**  复制某个目录包括里面的内容复制到上一层的typescript目录下；

## scp 命令

**scp 命令**是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。用于 Linux 服务器之间复制文件和目录：

- **```scp /home/work/music/1.mp3 root@192.168.10.123:/home/work/others/music```**  从本地复制到远程，指定了用户名，命令执行后需要再输入密码，仅指定了远程的目录，文件名字不变；
- **```scp -r local_folder remote_username@remote_ip:remote_folder```**  从本地复制到远程，复制目录和下面的文件；
- **```scp root@192.168.10.123:/home/work/others/music /home/work/music/1.mp3```**  从远程复制到本地，只要将从本地复制到远程的命令的后2个参数调换顺序即可；

## rm 命令

**rm 命令**是用于删除目录和权限：

- **```rm /home/work/music/1.mp3```**  删除指定文件；
- **```rm -r /home/work/others/music```**  删除指定目录和目录下文件，包括子文件夹；
- **```rm -rf /home/work/others/music```**  强制删除指定目录和目录下文件，包括子文件夹；

## mv 命令

**mv 命令**是用于移动文件到另外一个目录，或者可以当前目录使用另外一个名字：

- **```mv /home/work/music/1.mp3 /home/work/music/2.mp3```**  移动指定文件，并重命名；
- **```mv -r /home/work/others/music /home/work/```**  移动指定目录和目录下文件到指定目录，包括子文件夹；

## which 命令

**which 命令**是用于查询应用安装路径：

- **```which nginx```**  查询nginx安装路径；

  ```
  $ Public which nginx
  /usr/local/bin/nginx
  ```

## find 命令

## pwd 命令

**pwd 命令**是用于查询当前路径：

- **```pwd```**  查询当前路径；

  ```
  $ Public pwd
  /Users/yadongzhao/Public
  ```

## cat 命令

**cat 命令**是用于显示文件内容：

- **```cat nginx.conf```**  显示文件内容；

  ```
  $ cat nginx.conf
  
     #user  nobody;
     worker_processes  1;
  
     #error_log  logs/error.log;
     #error_log  logs/error.log  notice;
     #error_log  logs/error.log  info;
  
     #pid        logs/nginx.pid;
     ...
  ```

  - **```cat nginx.conf```**  显示文件内容；

    ```
    $ cat nginx.conf | grep 8200
    proxy_pass  http://localhost:8200;
    ```

## tail 命令

**grep 命令**是用于查找文件里符合条件的字符串的命令：

## grep 命令

**grep 命令**是grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。

- **```grep [-abcEFGhHilLnqrsvVwxy][-A<显示列数>][-B<显示列数>][-C<显示列数>][-d<进行动作>][-e<范本样式>][-f<范本文件>][--help][范本样式][文件或目录...]```**  grep命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹 配的行打印出来。

## ps 命令

**ps 命令**是用于查看所有进程的命令：

- **```ps -ef | grep 6379```**  查询进程中有6379内容的，一般查询端口；

## tar 命令

**tar 命令**是用于制作归档文件，释放归档文件：

- **-c: 建立压缩档案**

- **-x：解压**

- **-t：查看内容**

- **-r：向压缩归档文件末尾追加文件**

- **-u：更新原压缩包中的文件**

- **-z：有gzip属性的**

- **-j：有bz2属性的**

- **-Z：有compress属性的**

- **-v：显示所有过程**

- **-O：将文件解开到标准输出**

- **-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名**




```shell
# 压缩
tar -cvf jpg.tar *.jpg  将目录里所有jpg文件打包成tar.jpg
tar -czf jpg.tar.gz *.jpg   将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
tar -cjf jpg.tar.bz2 *.jpg 将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
tar -cZf jpg.tar.Z *.jpg   将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
rar a jpg.rar *.jpg rar格式的压缩，需要先下载rar for linux
zip jpg.zip *.jpg   zip格式的压缩，需要先下载zip for linux
```

```shell
# 解压
tar -xvf file.tar  解压 tar包
tar -xzvf file.tar.gz 解压tar.gz
tar -xjvf file.tar.bz2   解压 tar.bz2
tar -xZvf file.tar.Z   解压tar.Z
unrar e file.rar 解压rar
unzip file.zip 解压zip
tar -xvf file.tar --directory abc  解压tar包内容到abc目录中
```

总结

1. *.tar 用 tar –xvf 解压
2. *.gz 用 gzip -d或者gunzip 解压
3. *.tar.gz和*.tgz 用 tar –xzf 解压
4. *.bz2 用 bzip2 -d或者用bunzip2 解压
5. *.tar.bz2用tar –xjf 解压
6. *.Z 用 uncompress 解压
7. *.tar.Z 用tar –xZf 解压
8. *.rar 用 unrar e解压
9. *.zip 用 unzip 解压

## vi 命令

**vi 命令**是用于文本编辑器：

## yum 命令

**yum 命令**  linux下的安装软件的命令

```
yum -y install 软件名 // 安装软件
yum -y remove 软件名 // 卸载软件
yum -y update 软件名 // 升级软件 
umount /dev/rs0  // 卸载光盘
mount /dev/sr0 /media/  // 安装光盘
```

## useradd 命令

**useradd 命令**  添加用户账号 命令useradd [选项】 用户名-u ：指定uid标记号-d：指定宿主目录，缺省默认为/home/用户名-e:指定账号失效时间-M：不为用户建立初始化宿主目录 （-d 与 -M 不能同时使用）-s：指定用户登录的shell-g:指定用户的基本名-G：指定用户的附加组名-c：添加备注，显示在/etc/passwd第五字段

```
[root@www~]#groupadd group1
[root@www~]#mkdir -p /testgroup1
[root@www~]#groupadd jiaoxue
[root@www~]#useradd -d /testgroup1/tom/ -g group1 -G jiaoxue -s /bin/bash -e2016-01-01 tom
[root@www~]#passwd tom.......... ...........
[root@www~]#tail -1 /etc/passwd
[root@www~]#tail -1 /etc/shadow
```

## userdel 命令

**userdel 命令** 删除用户账号命令userdel 用户名-r ： 删除用户的同时删除用户的宿主目录eg

```
[root@www~]#userdel -r tom1
[root@www~]#ls /testgroup1/
```

## usermod 命令

**usermod 命令**  修改用户属性 命令usermod [选项] ... 用户名-l : 更改用户账号的登录名字-c : 修改用户的备注-L : 锁定用户账号-U: 解锁用户账号eg： 

```
[root@www~]#usermod -l tom1 tom
[root@www~]#tail -1                      /etc/passwdtom1:x:501:501::/testgroup1/tom/:/bin/bash
[root@www~]#usermod -c jiaoxue tom1
[root@www~]#tail -1 /etc/passwdtom1:x:501:501:jiaoxue:/testgroup1/tom/:/bin/bash
```

## groupadd 命令

**groupadd 命令** 添加组账号命令注GID：组标识号格式

```
groupadd [-g GID] 组账号名
```

## groupdel 命令

**groupdel 命令**  删除组账号

```
[root@www~]#groupdel market
[root@www~]#tail -5 /etc/group
```

## passwd 命令

**passwd 命令** 设置/更改用户口令passwd 【选项】 用户名-d : 清空用户密码-l ： 锁定用户账号-S： 查看用户账号的状态（是否被锁定）-u：解锁用户账号-x， --maximum=DAYS:密码的最长有效时限-n，--miximum=DAYS:密码的最短有效时限-w，--warning=DAYS:在密码过期前多少天开始提醒用户-i, --inactive=DAYS:当密码过期后经过多少天该账号会被禁用

## gpasswd 命令

**gpasswd 命令** 设置组账号密码（极少用），添加，删除组成员 gpasswd [选项] ... 组账号名

## tree 命令

**tree 命令** 将所有文件以树的形式列出来

- **```tree -l 2```**  查询层级

## lsof 命令

**lsof 命令**是英文list open file的简称，作用是列出系统上进程打开的所有文件，我们可以通过lsof命令查看这些文件信息：

- **```lsof -i :6379```**  查看占用6379号端口的那个进程的信息；

  ```
  $ Public lsof -i :6379
  COMMAND     PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
  redis-ser 13733 yadongzhao    6u  IPv6 0xc45af5887fdf3d83      0t0  TCP *:6379 (LISTEN)
  redis-ser 13733 yadongzhao    7u  IPv4 0xc45af5888702d873      0t0  TCP *:6379 (LISTEN)
  redis-ser 13733 yadongzhao    8u  IPv4 0xc45af5889cedd4e3      0t0  TCP localhost:6379->localhost:55982 (ESTABLISHED)
  node      74659 yadongzhao   36u  IPv4 0xc45af58887296f93      0t0  TCP localhost:55982->localhost:6379 (ESTABLISHED)
  ```