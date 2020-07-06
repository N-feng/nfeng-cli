# nfeng-cli

用简单的命令配置模板生成，既想减轻工作负担，又想形成架子规范

## Quick Start

### In node.js

1.install

```
npm i nfeng-cil -g
```

2.usage

```
nfeng-cli m
```

## 设计思想

通过pageConfig文件下下的配置文件，生成不通主题（UI库），不同模板类型的初始化文件

生成统一规范的表单跟列表壳子，再去书写不一样的业务逻辑，简单的通用逻辑基本架子可以满足

同时生成了页面路由入口，小白或者不想频繁更改路由的，可以直接引入入口文件

生成模版文件外，还可以用脚手架做eslint、组件模版生成等，规范的工作流搭建
