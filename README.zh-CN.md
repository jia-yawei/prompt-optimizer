# Prompt Optimizer

Prompt Optimizer 是一个纯 Web 的 AI 提示词优化、测试与评估应用。应用在浏览器中运行，数据保存在浏览器的 IndexedDB 中。

[在线使用](https://prompt.always200.com) | [文档](https://docs.always200.com) | [提示词库](https://garden.always200.com)

## 本地运行

环境要求：

- Node.js 24
- Corepack

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

开发服务器运行 Web 应用入口 `packages/web`。

## 构建与测试

```bash
corepack pnpm build
corepack pnpm lint
corepack pnpm test:gate
```

## 部署

项目构建为静态 Web 应用。

```bash
docker build -t prompt-optimizer .
docker run --rm -p 8080:80 prompt-optimizer
```

Vercel 使用 `packages/web/dist` 作为构建产物目录。

## 浏览器连接限制

模型请求由浏览器直接发起。模型服务需要为部署域名配置 CORS，或者通过兼容的代理转发。UI 中配置的 API Key 只保存在本地浏览器，不会提交到本仓库。

## 发布说明

发布说明只面向 Web 版，位于 `releases/`：

```bash
corepack pnpm release:notes:new 2.12.0
corepack pnpm release:notes:check 2.12.0
corepack pnpm release:notes:render-body 2.12.0 linshenkx/prompt-optimizer
```

## 许可证

AGPL-3.0-only，详见 [LICENSE](LICENSE)。
