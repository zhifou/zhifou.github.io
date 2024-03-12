---
layout: post
title: tsup 入门
date: 2024-03-11 21:37:00
categories: [构建工具]
tags: [tsup]
---

## 创建项目
```bash
pnpm init -y
```

## 安装typescript
```bash
pnpm add typescript -D
```

## 安装tsup
```bash
pnpm add tsup -D
```

## 配置tsup
- 新建 `tsup.config.ts` 文件
```
import type { Options } from "tsup";

const config: Options = {
    entry: ["src/index.ts"],
    dts: true,
    sourcemap: true,
    format: ["iife", "cjs", "esm"],
    clean: true,
};

export default config;
```

## 发布的package.json配置
### 导出多种格式，cjs、esm、iife的配置
- cjs是commonjs的缩写，支持使用require导入模块
- esm是es6模块的缩写，支持使用import导入模块
- iife是立即执行函数，支持使用script标签导入模块
- 打包后的文件名格式为：index.cjs、index.mjs、index.global.js，另外types必须加上，否则无法使用，会出现这个问题 “Module not found: Error: Default condition should be last one”
``` package.json
{
    "type": "module",
    "main": "./dist/index.js",
    "module": "./dist/index.js",
    "exports": {
      "require": "./dist/index.cjs",
      "import": "./dist/index.js",
      "default": "./dist/index.cjs",
      "node": "./dist/index.cjs"
      "types": "./dist/index.d.ts",
    },
    "scripts": {
        "build": "tsup src/index.ts",
        "start": "npm run build -- --watch",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
}
```

- [tsup-starter 源代码](https://github.com/zhifou/tsup-starter)

## tsup实现hooks组件发布
## 安装jest组件
```bash
pnpm add jest jest-environment-jsdom ts-jest @testing-library/react @testing-library/react-hooks @types/node react-test-renderer ts-node tslib -D
```
- useWindowSize组件
```tsx
import { useEffect, useState, useCallback } from "react";

type Size = { width?: number; height?: number };

const useWindowSize = () => {
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
- 测试文件 useWindowSize/\_\_tests\_\_/index.test.ts
```ts
import { renderHook } from "@testing-library/react-hooks";
import useWindowSize from "../index";

describe("useWindowSize", () => {
    it("should be defined", () => {
        expect(useWindowSize).toBeDefined();
    });
    it("with argument", () => {
        const hook = renderHook(() => useWindowSize());
        expect(hook.result.current.width).toEqual(0);
        expect(hook.result.current.height).toEqual(0);
    });
});

```

- [hooks 源代码](https://github.com/zhifou/hooks)