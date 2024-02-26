---
layout: post
title: nginx配置二级目录子站点
date: 2024-02-26 13:42:00
categories: [Web服务器]
tags: [nginx]
---

## nginx配置二级目录子站点

**站点部署时，我们经常会需要二级目录的子站点，今天说说如何配置**

- 主站点：http://www.zhifou.co
- 子站点guide：http://www.zhifou.co/guide
- 子站点ext：http://www.zhifou.co/ext

**配置和详解：**

```nginx
server {
    listen       80;
    server_name  www.zhifou.co;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    #server_name_in_redirect on;

    location / {
          root /home/work/zhifou;
        add_header Cache-Control "no-cache";
        index index.html  index.htm;
        try_files $uri /index.html;
    }

    #部署到一台机器上的不同目录
    location /guide/ {
        alias /home/work/guide/; #最后"/" 必须加上，否则不生效
        add_header Cache-Control "no-cache";
        index  index.html index.htm;
        #try_files $uri /index.html;
    }

    location /guide {
        rewrite ^/guide http://$http_host/guide/$1 permanent;
    }

    #代理到其它服务地址上
    location /ext/ {
        proxy_pass  http://172.10.22.40:8000/; #最后"/" 必须加上，否则不生效
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header Host $host;
    }

    location /ext {
            rewrite ^/ext http://$http_host/ext/$1 permanent;
      }
}
```

**相关资料**

- [nginx.conf基本配置有哪些？](http://zhifou.co/nginx-conf/)
- [mac下安装Nginx及常用命令使用](http://www.zhifou.co/nginx-install-brew/)