---
layout: post
title: 作为一名合格的程序员，github打开速度太慢怎么能容忍
date: 2024-03-04 13:00:00
categories: [代码管理]
tags: [github]
---

作为一名合格的程序员，github打开速度太慢怎么能容忍。但是可以通过修改hosts文件信息来解决这个问题。

## 1. macOS下的解决方法

- 打开hosts文件终端输入

  ```shell
  sudo vim /etc/hosts
  ```

- 可以直接粘贴下面地址和域名的映射关系到hosts的最后一行

  ```
  sudo vim /etc/hosts
  ```

- 刷新DNS缓存

  ```shell
  dscacheutil -flushcache
  ```

## 2. window下的解决办法

- 打开hosts文件：`C:\Windows\System32\drivers\etc\hosts`

- 用记事本等打开都行，粘贴上面代码保存即可

- 刷新DNS缓存

  ```shell
  ipconfig /flushdns
  ```

## 3. 畅快访问github吧

  这时候，访问github速度应该蹭蹭蹭了！