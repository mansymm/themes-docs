---
sidebar_position: 3
---

# Theme Settings

Beyond `schema.json` (global `theme_data`), custom themes support **structured store settings** that control the header, footer, announcement bar, and [palette](./palette) colors. Merchants edit these in the **Home Builder → Theme settings** panel. Theme authors preview them locally via `config.json` in the CLI `theme/` folder.

## Two layers of customization

| Layer | Merchant UI | Author defines | Liquid access |
| ----- | ----------- | -------------- | ------------- |
| **Theme settings** | Theme settings panel (header, footer, announcement, palette) | Defaults in CLI `config.json`; live values saved per store | Header/footer variables, CSS variables on `:root` |
| **Dynamic theme data** | Theme settings → schema fields from `schema.json` | `schema.json` | `theme_data` in every section |

Use theme settings for navigation structure, announcement content, footer links, and global colors. Use `schema.json` for everything else (typography toggles, hero copy, repeatable slides, etc.).

---

## `config.json` (CLI local preview)

When developing with the [CLI](./cli-development), put preview defaults in `theme/config.json`. The dev server sends this object as `config` inside the `/theme` JSON payload; the storefront merges it into `theme_config` (except palette — live store palette wins).

Example structure (abbreviated):

```json
{
  "header": {
    "logo": "",
    "links": [
      { "id": "ADD_CATEGORY_ID_HERE", "type": "category" },
      { "id": "ADD_PAGE_ID_HERE", "type": "page" }
    ],
    "is_use_config": true
  },
  "footer": {
    "logo": "",
    "categories": [{ "id": "ADD_CATEGORY_ID_HERE" }],
    "pages": [{ "id": "ADD_PAGE_ID_HERE" }],
    "social": [
      { "url": "https://facebook.com", "type": "facebook" },
      { "url": "https://instagram.com", "type": "instagram" }
    ],
    "payment_img": "https://…/payment_icons.svg",
    "is_use_config": true
  },
  "palette": {
    "hd_bg": "#fff",
    "hd_text": "",
    "ann_bg": "#212121",
    "buy_btn_bg": "",
    "body_bg": "",
    "body_text": ""
  },
  "theme_data": {
    "hero_headline": "Welcome to Our Store",
    "color_primary": "#1A1A2E"
  },
  "announcement_bar": {
    "text": ["Free shipping", "Genuine quality"],
    "type": "marquee",
    "is_use_config": true
  }
}
```

Replace placeholder IDs with real category/page IDs from your dev store so header and footer links resolve during preview.

:::info
`config.json` is **not** part of the production theme upload zip. Merchants configure live values through the dashboard; authors only need this file for CLI preview.
:::

---

## `is_use_config`

Header, footer, and announcement bar each support **`is_use_config`**:

| `is_use_config` | Behavior |
| ----------------- | -------- |
| `true` | Use the structured config from theme settings (or CLI `config.json`) — custom logo, link IDs, social URLs, announcement lines, etc. |
| `false` / omitted | Fall back to **store defaults** — store logo/title, navigation API categories/pages, `top_header_text` for announcements, plugin social links, etc. |

Your Liquid templates should not branch on `is_use_config` directly. The storefront resolves config **before** rendering and passes the final variables (e.g. `categories`, `announcement_text`, `logo`) into [header](./sections/layout-sections#header) and [footer](./sections/layout-sections#footer) templates.

---

## Announcement bar

**Config shape** (`announcement_bar` in theme settings / `config.json`):

| Property | Type | Description |
| -------- | ---- | ----------- |
| `is_use_config` | boolean | When `true`, use `text` and `type` below |
| `text` | `string[]` | One or more announcement lines |
| `type` | string | `"simple"`, `"slider"`, or `"marquee"` |

**Header Liquid variables** (see [Layout sections](./sections/layout-sections#header)):

- `announcement_config` — object with `text` and `type` when config is active
- `announcement_text` — single-line fallback from store `top_header_text` when config is not used

---

## Header config

**Config shape** (`header`):

| Property | Type | Description |
| -------- | ---- | ----------- |
| `is_use_config` | boolean | Use custom header config |
| `logo` | string | Header logo URL (overrides store logo when config is active) |
| `links` | array | Nav entries: `{ id, type }` where `type` is `"category"` or `"page"` |

The storefront resolves `links` to `{ name, url, children? }` and passes them as `categories` in `header.liquid`. When `is_use_config` is false, default store navigation is used instead.

Optional color overrides (`bg_color`, `txt_color`) may appear in saved config but header styling should rely on [palette](./palette) CSS variables (`--hd-bg`, `--hd-text`) and `theme_data`.

---

## Footer config

**Config shape** (`footer`):

| Property | Type | Description |
| -------- | ---- | ----------- |
| `is_use_config` | boolean | Use custom footer config |
| `logo` | string | Footer logo URL |
| `categories` | `{ id }[]` | Category IDs for the Shop column |
| `pages` | `{ id }[]` | Simple page IDs for the Help column |
| `social` | `{ type, url }[]` | Social links — `type` is one of `facebook`, `instagram`, `twitter`, `linkedin`, `tiktok`, `youtube`, `snapchat`, `whatsapp` |
| `payment_img` | string | Payment methods image URL |

When `is_use_config` is false, footer categories/pages come from store navigation flags (`show_in_header`, `show_in_footer`), social links from the Social Links plugin, and payment image from the theme default.

Resolved footer Liquid variables are documented in [Layout sections — Footer](./sections/layout-sections#footer).

---

## Palette

Palette keys in `config.json` use **snake_case** (`hd_bg`, `buy_btn_text`). The storefront maps them to CSS variables on `:root` (`--hd-bg`, `--buy-btn-text`, etc.). See the full variable list in [Palette](./palette).

During **CLI preview**, palette values from the live store are kept; local `config.json` palette entries are not overwritten onto production palette (so merchants' saved colors remain visible while you edit templates).

---

## `theme-data.json` (CLI only)

CLI projects include `theme-data.json` — default values for `theme_data` during local preview. It mirrors what merchants would save from your `schema.json` fields (sale badge colors, newsletter text, layout spacing, etc.).

Production stores persist `theme_data` in the database; merchants edit it through the schema form generated from `schema.json`. You do not upload `theme-data.json` — only `schema.json` (`theme_data_schema`).

---

## Merchant workflow summary

1. Merchant activates your custom theme on their store.
2. In **Home Builder**, open **Theme settings** to configure palette, announcement bar, header links, and footer columns.
3. The same panel (and product edit pages) also show fields from `schema.json` and `product-data-schema.json`.
4. Values are saved to the store's `theme_config` and `theme_data` and injected into Liquid on every page load.
