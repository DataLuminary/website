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

Brand assets in `public/` are synced from MetaRepo `assets/` via `pnpm sync:brand` in [DataLuminary-Platform](https://github.com/DataLuminary/DataLuminary-Platform).
