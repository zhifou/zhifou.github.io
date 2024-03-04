---
layout: post
title: Git 常用命令
date: 2024-02-28 16:30:00
categories: [代码管理]
tags: [git]
---

> Git（读音为/gɪt/）是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。 [1] 也是Linus Torvalds为了帮助管理Linux内核开发而开发的一个开放源码的版本控制软件。    —— [百度百科](https://baike.baidu.com/item/GIT/12647237)

## 迁出代码库

```shell
$ git clone git://github.com/jquery/jquery.git
```

## 查看远程分支

```shell
$ git branch  # 查看本地所有分支
$ git branch -r  # 查看远程分支
$ git branch -a  # 查看本地和远程所有分支
$ git branch [name]  # 创建本地分支 注意：新分支创建后不会自动切换为当前分支
$ git branch -d [name]  # -d 选项只能删除已经参与了合并的分支, 对于未有合并的分支是无法删除的
$ git branch -D [name]  # -D 选项强制删除一个分支
```

## 更新本地分支记录

```shell
$ git fetch    # 获取远程新增的版本
```

## 拉取一个远程分支，并使用

```shell
$ git checkout [name] # 拉取远程同名分支到本地
$ git checkout -b [name] # 创建新分支并立即切换到新分支
$ git checkout -b 20171101 origin/20181101 # 拉取远程分支到本地，并新命名
```

## 拉取远程分支内容到本地

```shell
$ git pull
```

## 合并分支

```shell
$ git merge [name]  # 将名称为[name]的分支与当前分支合并
```

## 远程分支

```shell
$ git push origin [name]  # 创建远程分支(本地分支 push 到远程)
$ git push origin :heads/[name]  # 删除远程分支
```

## 签入本地修改

```shell
$ git add .
$ git commit -m '备注'
$ git push
# 需要经过CodeReview的Push
$ git push origin HEAD:refs/for/20171101
```

## 放弃本地修改及还原刚才的修改

```shell
$ git stash
$ git stash pop
```

## 代码重置到某个版本

```shell
$ git reset --hard HEAD^  # 回退到上个版本
$ git reset --hard HEAD~3  # 回退到前3次提交之前
$ git reset --hard commitID  # 退到/进到 指定的commit，比如：ea34578
$ git push origin HEAD --force  # 强退至远程

# 回退到某个commit 推送远程，步骤如下
$ git log --pretty=oneline  # 先查询对应的提交历史
$ git reset --soft commitID # 只删除commitID之后的提交记录log，代码的改动还在。
$ git reset --hard commitID # 彻底删除commitID之后所做的改动，代码也一起回退回来了。
$ git push -f origin master # 把当前分支push到远程仓库并且让远程仓库和当前分支保持一致,使用如下命令(假定当前分支为master)
```

## 版本(tag)操作相关命令

```shell
$ git tag  # 查看版本
$ git tag [name]  # 创建版本
$ git tag -d [name]  # 删除版本
$ git tag -r  # 查看远程版本
$ git push origin [name]  # 创建远程版本(本地版本 push 到远程)
$ git push origin :refs/tags/[name]  # 删除远程版本
```

## 子模块(submodule)相关操作命令

```shell
$ git submodule add [url] [path]  # 添加子模块
$ git submodule init  # 初始化子模块，只在首次检出仓库时运行一次就行 
$ git submodule update  # 更新子模块，每次更新或切换分支后都需要运行一下 
$ git rm --cached [path]  # 删除子模块
```

## 忽略文件操作

```
忽略一些文件、文件夹不提交 在仓库根目录下创建名称为“.gitignore”的文件,写入不需要的文件夹名或文件, 每个元素占一行即可,如
target
bin
*.db
```