---
layout: post
title: Git Push失败怎么办?
date: 2024-03-01 16:30:00
categories: [代码管理]
tags: [git]
---

GitHub push失败怎么办，有两个地方需要配置，请接着往下看

## 1. 配置.git中的config文件

如果你用的vscode编辑器，可以在项目根目录下创建.vscode目录，然后在此目录下创建settings.json文件，这个配置文件是用来设置项目中哪些文件是否可以隐藏的，如下：

```json
{
    "files.exclude": {
        "**/.git": false,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/.browserslistrc": true,
        "**/.babelrc": false,
        "**/.editorconfig": true,
        "**/.npmrc": false,
        "package-lock.json": true
    }
}
```

可以把.git设置为false，显示出来，并在.git目录下找到config文件，进行config文件的编辑，新的文件如下：

```yaml
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = https://github.com/zhifou/node-nest-ejs.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
    remote = origin
    merge = refs/heads/main
```

我们需要做的事情是，将url的地址中的github.com域名前加上用户名，

```yaml
url = https://zhifou@github.com/zhifou/node-nest-ejs.git
```

这样签入的时候就使用指定的用户名签入了。

如果第一步的设置后，还出现以下错误，请接着配置

```shell
Push failed: Failed with error: unable to access 'https://github.com/zhifou/node-nest-ejs/': 
OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

## 2. 项目本地根目录下执行.git命令

这个是和Git的http代理有关的问题，Git支持三种协议：git://、ssh://和http:// ，本来push的时候应该走ssh隧道的，但是因为设置了http代理，所以就走了http的代理，于是就提交不了了。 

OK，找到原因了，那就取消http代理吧

解决办法：

在github项目在本地的根目录下打开git命令行， 

执行下面的命令：

```shell
git config --global --unset http.proxy
```

然后再次使用git push，OK，问题解决，本来还想着需要再设置一下ssh呢，没有想到不用了。