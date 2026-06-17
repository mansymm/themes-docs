---
sidebar_position: 3
---

# Home Sections

Home sections render on the store's homepage. They display the hero slider, category navigation, and product collections in different layouts.

---

## Slider

**File:** `sections/slider.liquid`

A hero image slider / carousel. Each slide uses `image` as the main source and can optionally use `mobile_image` on small screens.

### Variables

| Variable     | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `slides`     | array  | Slide objects (see properties below) |
| `theme_data` | object | Merchant-configured dynamic settings |

**Slide properties:**

| Property             | Type           | Description                                                   |
| -------------------- | -------------- | ------------------------------------------------------------- |
| `slide.image`        | string         | Main image URL (desktop + tablet, and fallback for all sizes) |
| `slide.mobile_image` | string \| null | Optional mobile image URL used on screens `<= 425px`          |
| `slide.url`          | string \| null | Optional link destination                                     |
| `slide.alt`          | string         | Alt text for the image                                        |

:::info
Render an `<a>` element only when `slide.url` is not empty; otherwise render a non-clickable `<div>`.
Use a `<picture>` element to serve `slide.mobile_image` on small screens and `slide.image` for the rest.
See example for more details.
:::

### Example

```liquid
<section class="slider">
  <div class="slider-track">
    {% for slide in slides %}
      {% if slide.url != blank %}
        <a href="{{ slide.url }}" class="slide{% if forloop.first %} active{% endif %}">
          <picture>
            {% if slide.mobile_image != blank %}
              <source media="(max-width: 425px)" srcset="{{ slide.mobile_image }}" />
              <source media="(min-width: 426px)" srcset="{{ slide.image }}" />
            {% endif %}
            <img
              src="{{ slide.image }}"
              alt="{{ slide.alt | default: "Slide image" }}"
              loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
            />
          </picture>
        </a>
      {% else %}
        <div class="slide{% if forloop.first %} active{% endif %}">
          <picture>
            {% if slide.mobile_image != blank %}
              <source media="(max-width: 425px)" srcset="{{ slide.mobile_image }}" />
              <source media="(min-width: 426px)" srcset="{{ slide.image }}" />
            {% endif %}
            <img
              src="{{ slide.image }}"
              alt="{{ slide.alt | default: "Slide image" }}"
              loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
            />
          </picture>
        </div>
      {% endif %}
    {% endfor %}
  </div>
</section>
```

:::tip
Use `loading="eager"` on the first slide and `loading="lazy"` on the rest for optimal performance. The `<picture>` element with `<source>` lets you serve different images for mobile and desktop.
:::

---

## Categories

**File:** `sections/categories.liquid`

A category grid or carousel that links to collection pages.

### Variables

| Variable     | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `categories` | array  | Category objects (see properties below) |
| `theme_data` | object | Merchant-configured dynamic settings    |

**Category properties:**

| Property         | Type   | Description                  |
| ---------------- | ------ | ---------------------------- |
| `category.name`  | string | Category display name        |
| `category.slug`  | string | URL slug                     |
| `category.thumb` | string | Category thumbnail image URL |

### Example

```liquid
<div class="categories">
  {% for category in categories %}
    <a href="/collections/{{ category.slug }}" class="category-card">
      <img src="{{ category.thumb }}" alt="{{ category.name }}" loading="lazy" />
      <span>{{ category.name }}</span>
    </a>
  {% endfor %}
</div>
```

---

## Products (Featured / List / Home Grid)

Three section files share the same variable contract but render products in different layouts on the **homepage**:

| File                                 | Layout                      | Typical Use                  |
| ------------------------------------ | --------------------------- | ---------------------------- |
| `sections/featured-products.liquid`  | Featured hero + card grid   | Homepage featured collection |
| `sections/list-products.liquid`      | Horizontal scrollable list  | Homepage product carousel    |
| `sections/home-products-grid.liquid` | Multi-column grid with hero | Homepage product grid        |

### Variables (shared)

| Variable        | Type           | Description                                  |
| --------------- | -------------- | -------------------------------------------- |
| `products`      | array          | Product objects (see properties below)       |
| `category`      | object \| null | Parent category with `name`, `slug`, `thumb` |
| `section_title` | string         | Section heading text                         |
| `currency`      | string         | Currency symbol/code                         |
| `add`           | string         | Translated "Add" button text                 |
| `shop_now`      | string         | Translated "Shop now" text                   |
| `sale`          | string         | Translated "Sale" label                      |
| `hide_view_all` | boolean        | Whether to hide the "View all" link          |
| `theme_data`    | object         | Merchant-configured dynamic settings         |

**Product properties:**

| Property             | Type           | Description                                |
| -------------------- | -------------- | ------------------------------------------ |
| `product.id`         | string         | Product ID (used in events)                |
| `product.name`       | string         | Product name                               |
| `product.slug`       | string         | URL slug                                   |
| `product.price`      | number         | Regular price                              |
| `product.sale_price` | number \| null | Sale price                                 |
| `product.thumb`      | string         | Main thumbnail URL                         |
| `product.images`     | string[]       | Additional image URLs                      |
| `product.variations` | array          | Variation groups with `type` and `props[]` |
| `product.product_theme_data` | object         | Merchant-configured dynamic settings for each product, set on the product edit page in the Seller Dashboard |

**Variation properties (for color swatches):**

| Property          | Type   | Description                          |
| ----------------- | ------ | ------------------------------------ |
| `variation.type`  | string | `"color"` or `"image"`               |
| `variation.props` | array  | Swatch items with `name` and `value` |

### Events

| Event             | Detail                  | Purpose                                                                           |
| ----------------- | ----------------------- | --------------------------------------------------------------------------------- |
| `quick-add`       | `{ productId: string }` | Adds the product to cart directly                                                 |
| `quick-view`      | `{ productId: string }` | Opens a quick-view modal for the product                                          |
| `toggle-wishlist` | `{ productId: string }` | Toggles the product in the wishlist (adds if absent, removes if already saved)    |
| `toggle-compare`  | `{ productId: string }` | Adds the product to the compare list (if not present) and opens the compare modal |

Dispatch from your add-to-cart button:

```html
onclick="event.preventDefault();event.stopPropagation();this.dispatchEvent(new
CustomEvent('quick-add',{bubbles:true,detail:{productId:'{{ product.id }}'}}))"
```

Dispatch from your wishlist / compare buttons:

```html
<button type="button"
  onclick="event.preventDefault();event.stopPropagation();
    this.dispatchEvent(new CustomEvent('toggle-wishlist',{bubbles:true,detail:{productId:'{{ product.id }}'}}))">
  ♡
</button>

<button type="button"
  onclick="event.preventDefault();event.stopPropagation();
    this.dispatchEvent(new CustomEvent('toggle-compare',{bubbles:true,detail:{productId:'{{ product.id }}'}}))">
  Compare
</button>
```

### Featured Products Example

```liquid
<section class="featured">
  {% if section_title %}
    <h2>{{ section_title }}</h2>
  {% endif %}

  <div class="featured-grid">
    {% for product in products limit: 4 %}
      <a href="/products/{{ product.slug }}" class="product-card">
        {% if product.sale_price and product.sale_price < product.price %}
          {% assign discount = product.price | minus: product.sale_price | times: 100 | divided_by: product.price | floor %}
          <span class="badge">{{ sale }} -{{ discount }}%</span>
        {% endif %}

        <div class="product-media">
          <img src="{{ product.thumb }}" alt="{{ product.name }}" loading="lazy" />
          {% if product.images[0] %}
            <img class="hover-img" src="{{ product.images[0] }}" alt="{{ product.name }}" loading="lazy" />
          {% endif %}
        </div>

        <div class="product-info">
          <p>{{ product.name }}</p>
          {% if product.sale_price and product.sale_price < product.price %}
            <span class="price-old">{{ product.price }} {{ currency }}</span>
            <span class="price-sale">{{ product.sale_price }} {{ currency }}</span>
          {% else %}
            <span>{{ product.price }} {{ currency }}</span>
          {% endif %}
        </div>

        <button type="button"
          onclick="event.preventDefault();event.stopPropagation();this.dispatchEvent(new CustomEvent('quick-add',{bubbles:true,detail:{productId:'{{ product.id }}'}}));">
          {{ add }}
        </button>
      </a>
    {% endfor %}
  </div>
</section>
```

### Color Swatches Pattern

All three product layouts can display color/image swatches from the product variations:

```liquid
{% assign color_variation = product.variations | where: "type", "color" | first %}
{% assign image_variation = product.variations | where: "type", "image" | first %}

{% if color_variation and color_variation.props %}
  {% for prop in color_variation.props limit: 4 %}
    <span class="swatch" style="background: {{ prop.value }}" title="{{ prop.name }}"></span>
  {% endfor %}
{% elsif image_variation and image_variation.props %}
  {% for prop in image_variation.props limit: 4 %}
    <span class="swatch swatch-image" title="{{ prop.name }}">
      <img src="{{ prop.value }}" alt="{{ prop.name }}" loading="lazy" />
    </span>
  {% endfor %}
{% endif %}
```

### Discount Badge Pattern

Calculate and display a percentage discount:

```liquid
{% if product.sale_price and product.sale_price < product.price %}
  {% assign discount = product.price | minus: product.sale_price | times: 100 | divided_by: product.price | floor %}
  <span class="badge">{{ sale }} -{{ discount }}%</span>
{% endif %}
```

---

## Products Grid (Search & Collections pages)

**File:** `sections/products-grid.liquid`  
**Section key:** `products_grid`

A product grid rendered on the **search page** and **collection pages** (browsing a category). Unlike the homepage grid (`home-products-grid.liquid`), this template has no hero block and renders all products received from the current page of results. The "load more" button is rendered outside the Liquid template by the storefront.

### Variables (shared)

The same product variable contract as the homepage product sections applies here:

| Variable        | Type           | Description                                                                             |
| --------------- | -------------- | --------------------------------------------------------------------------------------- |
| `products`      | array          | Current page of product objects                                                         |
| `category`      | object \| null | Current category with `name`, `slug`, `thumb` (collections page only; `null` on search) |
| `section_title` | string         | Section heading — category name on collections, search query on search page             |
| `currency`      | string         | Currency symbol/code                                                                    |
| `add`           | string         | Translated "Add" button text                                                            |
| `shop_now`      | string         | Translated "Shop now" text                                                              |
| `sale`          | string         | Translated "Sale" label                                                                 |
| `hide_view_all` | boolean        | Always `true` on this section (storefront hides the view-all link)                      |
| `theme_data`    | object         | Merchant-configured dynamic settings                                                    |

**Product properties** and **variation properties** are identical to the other product sections — see above.

### Events

| Event             | Detail                  | Purpose                                                                           |
| ----------------- | ----------------------- | --------------------------------------------------------------------------------- |
| `quick-add`       | `{ productId: string }` | Adds the product to cart directly                                                 |
| `quick-view`      | `{ productId: string }` | Opens a quick-view modal for the product                                          |
| `toggle-wishlist` | `{ productId: string }` | Toggles the product in the wishlist (adds if absent, removes if already saved)    |
| `toggle-compare`  | `{ productId: string }` | Adds the product to the compare list (if not present) and opens the compare modal |

### Example

```liquid
<section class="products-grid">
  {% if section_title %}
    <h2 class="products-grid-title">{{ section_title }}</h2>
  {% endif %}

  <div class="products-grid-wrap">
    {% for product in products %}
      <a href="/products/{{ product.slug }}" class="product-card">
        {% if product.sale_price and product.sale_price < product.price %}
          {% assign discount = product.price | minus: product.sale_price | times: 100 | divided_by: product.price | floor %}
          <span class="badge">{{ sale }} -{{ discount }}%</span>
        {% endif %}

        <div class="product-media">
          <img src="{{ product.thumb }}" alt="{{ product.name }}" loading="lazy" />
          {% if product.images[0] %}
            <img class="hover-img" src="{{ product.images[0] }}" alt="{{ product.name }}" loading="lazy" />
          {% endif %}
          <button type="button"
            onclick="event.preventDefault();event.stopPropagation();this.dispatchEvent(new CustomEvent('quick-add',{bubbles:true,detail:{productId:'{{ product.id }}'}}));">
            {{ add }}
          </button>
        </div>

        <div class="product-info">
          <p>{{ product.name }}</p>
          {% if product.sale_price and product.sale_price < product.price %}
            <span class="price-old">{{ product.price }} {{ currency }}</span>
            <span class="price-sale">{{ product.sale_price }} {{ currency }}</span>
          {% else %}
            <span>{{ product.price }} {{ currency }}</span>
          {% endif %}
        </div>
      </a>
    {% endfor %}
  </div>
</section>
```

:::info
On collections pages the storefront renders a "Load more" button **outside** this template using React. Each click fetches the next page and re-renders this template with the full accumulated product list.
:::

## Custom home sections {#custom-home-sections}

Optional homepage blocks you ship with the theme live under `home-sections/`. Each block is one folder whose **name you choose** when authoring the theme — it must be **unique** among folders under `home-sections/` (no two blocks may share the same folder name).

Example layout:

```
my-theme/
├── home-sections/
│   ├── category-mosaic/          ← unique folder name (example)
│   │   ├── config.json           ← icon, label, section_schema
│   │   └── template.liquid       ← Liquid for this block
│   └── shop-the-look/            ← another unique folder name (example)
│       ├── config.json
│       └── template.liquid
├── schema.json                   ← global theme schema (theme_data)
├── sections/                     ← built-in section templates (.liquid)
├── ...
```

Every folder must contain exactly these files:

- **`config.json`** — `icon`, `label`, and **`section_schema`** (field definitions; same types as in [Dynamic theme data](../dynamic-theme-data.md), including optional root-level [`group`](../dynamic-theme-data.md#optional-editor-grouping-group) for editor layout).
- **`template.liquid`** — Liquid for that block.

Example `config.json`:

```json
{
  "icon": "https://api.iconify.design/lucide:layout-grid.svg",
  "label": "Category mosaic",
  "section_schema": [
    {
      "name": "title",
      "type": "string",
      "default": "Shop by mood",
      "description": "Section heading"
    }
  ]
}
```

When the theme is uploaded, those folders populate the theme template’s **`home_sections`** list. Merchants add instances in the home builder; each instance’s saved values are exposed in Liquid as **`section_data`**.

`section_data` is **only** available in these custom home section templates — not in built-in `sections/*.liquid` files. Global settings from `schema.json` are still available as **`theme_data`** here (as in every section).

:::info
Custom home sections do **not** receive `product.product_theme_data`. Entity pickers in `section_schema` store IDs in `section_data`; resolve them in Liquid or via `data-eo-hs-*` hydration (below).
:::

### Section key naming

| Authoring | Stored `key` |
| --------- | ------------ |
| Folder `category-mosaic` | `category_mosaic` |
| Folder `tilted-scrolling-marque` | `tilted_scrolling_marque` |

Hyphens in folder names become underscores. Use **lowercase kebab-case** folder names (like the other blocks in the CLI template). Keys must be unique across all `home-sections/` folders.

### Entity fields in `section_data`

`product_multi_select`, `category_multi_select`, `page_multi_select`, and the single-select variants store **IDs only** in `section_data` — not full product/category/page records. To render names, prices, or URLs you can:

1. **Resolve in Liquid** when the section already receives matching entities in scope (same patterns as [Resolving IDs in templates](../dynamic-theme-data.md#resolving-ids-in-templates)).
2. **Hydrate client-side** with `data-eo-hs-*` attributes (below) — the reference CLI `script.js` includes helpers for this.
3. **Fetch in your own `script.js`** using the Easy Orders API (for example `https://api.easy-orders.net/api/v1/products?filter=id||$in||…`).

### Hydrating entity IDs (`data-eo-hs-*`)

Custom home sections often use entity pickers. A practical pattern (included in the CLI template `script.js`):

**Product or category grids** — container with ID list and mount point:

```liquid
<div
  class="my-picks"
  data-eo-hs-entity="products"
  data-eo-hs-ids="{{ section_data.pick_product_ids | join: ',' | strip }}"
>
  <div data-eo-hs-mount>
    {% for id in section_data.pick_product_ids %}
      <div class="eo-hs-skeleton eo-hs-skeleton--product" aria-hidden="true"></div>
    {% endfor %}
  </div>
</div>
```

- `data-eo-hs-entity` — `products` or `categories`
- `data-eo-hs-ids` — comma-separated IDs in merchant display order
- `data-eo-hs-mount` — inner element replaced with fetched cards after load

Show skeleton placeholders in Liquid so layout does not jump while `script.js` fetches entities.

**Single link from an entity ID** (e.g. category tile inside `object_array`):

```liquid
<a
  href="#"
  data-eo-hs-cta="1"
  data-eo-hs-cta-entity="categories"
  data-eo-hs-cta-id="{{ tile.category_id }}"
>
  {{ tile.label }}
</a>
```

The CLI script resolves the ID and sets `href` to `/collections/{slug}`, `/products/{slug}`, or `/pages/{slug}` depending on `data-eo-hs-cta-entity`.

Optional: wrap the section in an element with `data-eo-api-base` pointing at your store API origin if you need a non-default API base.

### Events

Custom home sections support the same storefront events as product grids when you wire them in your template:

| Event | Detail | Purpose |
| ----- | ------ | ------- |
| `quick-add` | `{ productId }` | Add to cart from a hydrated product card |
| `quick-view` | `{ productId }` | Open quick-view modal |
| `toggle-wishlist` | `{ productId }` | Toggle wishlist |
| `toggle-compare` | `{ productId }` | Add to compare and open modal |
| `footer-subscribe` | `{ email }` | Newsletter signup |

Dispatch bubbling `CustomEvent`s as documented in [Events reference](../events-reference). Link clicks inside the section are intercepted for SPA navigation when the section container enables link interception.

```liquid
{% if section_data.title != blank %}
  <h2>{{ section_data.title }}</h2>
{% endif %}
```
