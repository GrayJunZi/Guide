# TrickingLibrary

现代化Web开发
---
ASP.NET Core、Nuxt.js、CI/CD

## 一、介绍

### 项目是什么？

- 特技动作库
- 视频托管（上传视频、修剪缩放视频）
- 审核/投票
- 社交网络
- 公开API

### 技术栈是什么？

- ASP.NET Core
  - MediatR - cqrs 命令与查询分离
  - EF Core - ORM框架
  - ImageSharp - 图片处理
  - Xabe.FFmpeg - 视频处理
- Vue.js/Nuxt.js
  - Server Side Rendering - 服务端渲染
  - Client Side Rendering - 客户端渲染
- PostgreSQL
- 开发工具
  - Postman
- Git/Github/Github Actions
  - 版本控制
  - CI/CD
- Nginx

## 二、项目设置

### 创建 `TrackingLibrary.Api` 项目。

```bash
dotnet new sln -n "TrackingLibrary"
dotnet new webapi -n "TrackingLibrary.Api"
dotnet sln add .\TrackingLibrary.Api
```

### 创建 `web-client` 项目。

```bash
npx create-nuxt-app web-client
> Project name: web-client
> Programming language: JavaScript
> Package manager: Npm
> UI framework: Vuetify.js
> Template engine: HTML
> Nuxt.js modules: (*) Axios
> Linting tools: 
> Testing framework: None
> Rendering mode: Universal (SSR / SSG)
> Deployment target: Server (Node.js hosting)
> Development tools:
```

## 三、Github Actions

创建 `.github\workflows` 文件夹，并添加 `build.yaml` 文件，提交代码后将自动执行 `Github Action` 工作流。

## 四、Vuex与API接口交互

## 五、视频上传

## 六、简化视频上传(Streamline Video Uploads)

## 七、视频上传流程

## 八、使用EFCore并完善视频上传功能

## 九、拆分单独的Trick页面

## 十、组件拆分

## 十一、添加实体类并建立关系

## 十二、表单提交

## 十三、展示数据

## 十四、分类页面