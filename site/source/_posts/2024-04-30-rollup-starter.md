---
layout: post
title: rollup 入门
date: 2024-04-30 10:08:00
categories: [构建工具]
tags: [rollup]
---

## 创建项目
```bash
pnpm init -y
```

## 安装typescript
```bash
pnpm add typescript -D
```

## 安装rollup
```bash
pnpm add rollup -D
```

## 根目录下增加tsconfig.json
``` json
{
  "compilerOptions": {
      "target": "esnext",
      "module": "esnext",
      "moduleResolution": "node",
      "jsx": "react",
      "allowJs": true,
      "esModuleInterop": true,
      "downlevelIteration": true,
      "sourceMap": true,
      "baseUrl": ".",
      "paths": {
          "@/*": [
              "src/*"
          ]
      },
      "allowSyntheticDefaultImports": true,
      "skipLibCheck": true,
      "declaration": false,
      "strictNullChecks": true
  },
  "include": [
      "src", "types.d.ts"
  ],
  "exclude": [
      "node_modules",
      "lib",
      "es",
      "dist",
  ]
}
```

## 根目录下增加一个类型声明文件types.d.ts
``` javascript
declare module window {}

interface Window {}

interface Document {}

```

## 修改package.json配置
### 导出多种格式，cjs、esm、iife的配置
- cjs是commonjs的缩写，支持使用require导入模块
- esm是es6模块的缩写，支持使用import导入模块
``` json
{
    "type": "module",
    "main": "./dist/bundle.cjs",
    "module": "./dist/bundle.mjs",
    "types": "./dist/bundle.d.ts",
    "scripts": {
        "dev": "rollup --config rollup.config.js --watch",
        "build": "rollup --config rollup.config.js"
    },
    "devDependencies": {
        "@types/node": "^20.12.7",
        "rollup": "^4.17.0",
        "tslib": "^2.6.2",
        "typescript": "^5.4.5"
    },
    "peerDependencies": {
        "react": ">=18.2.0"
    }
}
```

## 配置rollup
- 新建 `rollup.config.js` 文件
```
import { defineConfig } from "rollup";

export default defineConfig([
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/bundle.cjs",
                format: "umd",
                name: 'zhooks', // umd 编译必须有一个name
                sourcemap: true, // 增加.map文件， 如果不设置会在控制台出现一个警告，不过不影响打包和发布： (!) [plugin typescript] @rollup/plugin-typescript: Rollup 'sourcemap' option must be set to generate source maps.
            },
            {
                file: "dist/bundle.mjs",
                format: "esm",
                sourcemap: true,
            },
        ],
    },
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/bundle.d.ts",
                format: "esm",
            },
        ],
    },
]);

```

## 增加rollup插件
``` bash
pnpm add @rollup/plugin-typescript rollup-plugin-dts
```
- [@rollup/plugin-typescript](https://github.com/rollup/plugins) 用于 Rollup 和 Typescript 之间的无缝集成，编译Typescript为Javascript
- [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts) 这是一个可以让您生成.d.ts定义文件的插件

## rollup.config.js配置插件完整代码
``` json
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default defineConfig([
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/bundle.cjs",
                format: "umd",
                name: 'zhooks',
                sourcemap: true,
                globals: {
                    react: "react",
                },
            },
            {
                file: "dist/bundle.mjs",
                format: "esm",
                sourcemap: true,
                globals: {
                    react: "react",
                },
            },
        ],

        plugins: [typescript()],
        watch: {
            exclude: "node_modules/**", // 不监听
        },
        external: ["react"], // 排除项目中引用的第三方库
    },
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/bundle.d.ts",
                format: "esm",
            },
        ],
        plugins: [dts()],
    },
]);
```

## tsup实现hooks组件发布
- useWindowSize组件
```tsx
import { useEffect, useState, useCallback } from "react";

export type Size = { width?: number; height?: number };

/**
 * 监听窗口大小变化的Hook组件
 * @returns {Size} 窗口宽高对象
 */
const useWindowSize = (): Size => {
    const [state, setState] = useState<Size>(() => {
        const { clientWidth, clientHeight } = (document as Document)
            .documentElement;
        return {
            width: clientWidth,
            height: clientHeight,
        };
    });

    const onResize = useCallback(() => {
        const { clientWidth, clientHeight } = (document as Document)
            .documentElement;
        setState({
            width: clientWidth,
            height: clientHeight,
        });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", onResize, false);

        return () => {
            window.removeEventListener("resize", onResize, false);
        };
    }, []);

    return state;
};

export default useWindowSize;
```

## 编译
``` bash
pnpm build
```
生成dist如下：
 dist
--- bundle.cjs
--- bundle.cjs.map
--- bundle.d.ts
--- bundle.mjs
--- bundle.mjs.map

## 建议加上.npmrc文件加快安装速度
``` bash
registry=https://registry.npmmirror.com
```

## 其它插件，大家可以自行研究
- [@rollup/plugin-node-resolve](https://github.com/rollup/plugins) 节点解析的插件
- [@rollup/plugin-commonjs](https://github.com/rollup/plugins) 将commonjs语法转为es2015语法的插件
- [@rollup/plugin-babel](https://github.com/rollup/plugins) babel解析的插件
- [@rollup/plugin-replace](https://github.com/rollup/plugins) 编译时替换目标字符串的插件
- [rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2)  能打印Typescript编译错误的插件
- [rollup-plugin-clear](https://github.com/sheltondong/rollup-plugin-clear) 清除编译结果的插件
- [rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser) 压缩的插件
- [rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve) 启动server调试的插件
- [rollup-plugin-livereload](https://github.com/thgh/rollup-plugin-livereload) server热加载调试的插件
- [rollup-plugin-generate-html-template](https://github.com/bengsfort/rollup-plugin-generate-html-template) 配置调试html文件模版的插件
- [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 处理css兼容性的插件

## 本站源码
- [rollup-starter 源代码](https://github.com/zhifou/rollup-starter)
- [tsup-starter 源代码](https://github.com/zhifou/tsup-starter)
- [hooks 源代码](https://github.com/zhifou/hooks)