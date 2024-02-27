---
layout: post
title: 配置nodejs环境
date: 2024-02-27 09:33:00
categories: [语言]
tags: [nodejs]
---

建议使用最简单的软连接方式，只需要以下几个步骤就完成了配置，包括npm的配置

1. 下载node编译好的安装包

   ```shell
   $ wget https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz
   ```

2. 获取root临时权限

   ```shell
   $ sudo su
   ```

3. 拷贝安装包到local目录下

   ```shell
   $ cp /home/work/node-v20.11.1-linux-x64.tar.xz /usr/local
   ```

4. 解压缩包

   ```shell
   $ tar -xvf node-v20.11.1-linux-x64.tar.xz
   $ mv node-v20.11.1-linux-x64 nodejs
   ```

5. 设置命令软连接

   ```shell
   $ ln /usr/local/nodejs/bin/node /usr/local/bin
   $ ln /usr/local/nodejs/bin/npm /usr/local/bin
   ```

6. 读取node版本

   ```shell
   $ node -v
   ```

7. 配置profile文件（可选）

   ```shell
   $ vi /etc/profile
   
   在最后一行添加（设置环境变量）
   
   export NODE_HOME=/usr/local/nodejs
   
   export PATH=$NODE_HOME/bin:$PATH:/sbin 
   ```