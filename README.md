# DataLuminary Website

Official marketing site for [DataLuminary](https://dataluminary.dev), built with Next.js static export and deployed to Cloudflare Pages.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:13119](http://localhost:13119).

## Build

```bash
pnpm build
```

Static output is written to `out/`.

## Deployment

Deployed automatically on push to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

- **Production**: [dataluminary.dev](https://dataluminary.dev)
- **Platform**: Cloudflare Pages (`dataluminary-website`)

### Cloudflare API Token（GitHub Actions Secrets）

在 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) 创建 **Custom token**，权限至少包含：

| 资源 | 权限 |
|------|------|
| Account → Cloudflare Pages | Edit |
| Account → Account Settings | Read |
| User → User Details | Read |

`CLOUDFLARE_ACCOUNT_ID`：Cloudflare 控制台右侧边栏 **Account ID**（纯字母数字，无空格换行）。

Secrets 配置位置：[github.com/DataLuminary/website/settings/secrets/actions](https://github.com/DataLuminary/website/settings/secrets/actions)

### Brand assets

`public/` 中的 Logo / favicon 由 MetaRepo 同步：

```bash
# 在 DataLuminary-Platform 根目录
pnpm sync:brand
```

然后提交 `website` 仓库中的 `public/` 变更。
