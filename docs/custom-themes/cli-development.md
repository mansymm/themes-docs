---
sidebar_position: 2
---

# CLI Development

The **Easy Orders CLI** (`easyorders`) lets you scaffold a theme project, run a local dev server, and preview Liquid/CSS/JS changes on a **live store** in real time — without uploading the theme on every edit.

Install globally:

```bash
npm install -g easyorders
```

## Create a theme project

```bash
easyorders create my-theme
```

This creates `my-theme/` with a `theme/` folder and a minimal `package.json`. The dev server ships inside the CLI package — you only edit files under `theme/`.

## Start the dev server

```bash
cd my-theme
easyorders start
```

The CLI will:

1. Ask for your store **subdomain** (e.g. `sand` from `sand.myeasyorders.com`)
2. Generate a one-time CLI token and open the **seller dashboard approval page**
3. Start a local Express server on port `4000` (configurable)
4. Open a **Cloudflare tunnel** so the storefront can load your local theme

You can also pass the subdomain non-interactively:

```bash
easyorders start --store_name sand
```

### Authentication flow

1. The CLI calls `POST /api/v1/themes/cli-token` with your store name.
2. Your browser opens `https://app.easy-orders.net/#/approve-cli-token?store_id=…&token_id=…`.
3. Approve the request in the seller dashboard (pick the correct store if prompted).
4. The CLI polls until the token is approved, then saves credentials to `.cli-tokens.json` in the project root.

To force re-authentication, delete `.cli-tokens.json` and run `easyorders start` again.

### How live preview works

When the tunnel is ready, the CLI prints a store URL like:

```
https://sand.myeasyorders.com?load_theme=https://…trycloudflare.com/theme&code=…
```

| Query param   | Purpose |
| ------------- | ------- |
| `load_theme`  | URL of the CLI `/theme` JSON endpoint (tunnel + `/theme`) |
| `code`        | Short-lived CLI token validated by the storefront API |

On first visit, the storefront validates the token (`POST themes/cli-token/validate`) and sets a **`local_theme_src`** cookie pointing at your tunnel `/theme` URL. On later requests it reuses that cookie so you can browse the store normally while the dev server runs.

The storefront merges your local payload with live store settings:

- **Sections** (Liquid templates), **CSS**, **JS**, **`theme_data`**, and **`theme_data_schema`** come from your local `theme/` folder.
- **Palette** colors stay on the values already saved for the store (local `config.json` palette is not applied over the live palette).
- **Header/footer/announcement** config from local `config.json` is merged into `theme_config` for preview.

:::warning Session and performance
The tunnel URL is tied to your browser session. Stop the dev server, close the preview tab, or delete the `local_theme_src` cookie to end the session. If the store feels slow after closing the session, clear `local_theme_src` — the browser may still be waiting on a dead tunnel.
:::

## CLI theme folder layout

The scaffolded `theme/` folder is a superset of what you upload to production:

```
theme/
├── config.json              ← local preview defaults (see Theme Settings)
├── theme-data.json          ← default theme_data values for local preview
├── schema.json              ← theme_data schema (uploaded as theme_data_schema)
├── product-data-schema.json ← per-product schema (uploaded as product_theme_schema)
├── style.css
├── script.js
├── sections/
│   └── *.liquid
└── home-sections/
    └── <folder-name>/
        ├── config.json
        └── template.liquid
```

Files you **upload** to a theme template (admin or API) match the [Getting Started](./getting-started) file map — `config.json` and `theme-data.json` are **CLI-only** helpers for local preview defaults.

## Environment variables

Set these in a `.env` file at the **theme project root** (or export them):

| Variable            | Description                          | Default |
| ------------------- | ------------------------------------ | ------- |
| `PORT`              | Local server port                    | `4000` |
| `API_BASE_URL`      | Backend API for CLI token endpoints  | `https://api.easy-orders.net` |
| `FRONTEND_BASE_URL` | Seller dashboard URL for approval    | `https://app.easy-orders.net` |
| `STORE_DOMAIN`      | Domain used to build the store URL   | `myeasyorders.com` |
| `STORE_NAME`        | Skip the subdomain prompt on start   | — |
| `THEME_DIR`         | Path to the `theme/` folder          | `./theme` |

## Interactive mode

Running `easyorders` with no subcommand opens a menu to create a project or start the dev server.

## What's next

- [Theme Settings](./theme-settings) — `config.json`, header/footer/announcement/palette for merchants and local preview
- [Getting Started](./getting-started) — production upload layout and section file map
- [Custom home sections](./sections/home-sections#custom-home-sections) — `home-sections/` blocks and entity hydration patterns
