# Motion Rental Documentation

This repository contains the customer support documentation for Motion Rental. It is built on [Documentation.AI](https://documentation.ai) and hosted at [docs.motionrental.com.au](https://docs.motionrental.com.au).

The repository is intended for both documentation contributors and AI agents that create, update, or review customer-facing content.

## Repository structure

```text
.
├── components/       MDX reference pages for available documentation components
├── de/               German documentation
├── en/               English source-of-truth documentation
├── es/               Spanish documentation
├── fr/               French documentation
├── hi/               Hindi documentation
├── it/               Italian documentation
├── partials/         Reusable MDX snippets
├── pt/               Portuguese documentation
├── scripts/          Custom JavaScript
├── zh-cn/            Simplified Chinese documentation
├── zh-tw/            Traditional Chinese documentation
├── changelog.mdx     Product and documentation changelog
├── documentation.json Site configuration and navigation
├── help-center.mdx   Help Center landing page
├── openapi.yaml      OpenAPI specification
└── roadmap.mdx       Product roadmap
```

### Directory details

| Folder | Contents |
| --- | --- |
| `components/` | Six MDX reference pages documenting available MDX components, including Callout, Steps, Tabs, Cards, Code, and Images. |
| `en/` | 27 English pages. English is the source of truth for all documentation content. |
| `de/` | 25 German pages. Some pages are translation placeholders. |
| `es/` | 25 Spanish pages. Some pages are translation placeholders. |
| `fr/` | 24 French pages. Pages are fully translated. |
| `hi/` | 25 Hindi pages. Pages are fully translated. |
| `it/` | 25 Italian pages. Some pages are translation placeholders. |
| `partials/` | 13 reusable MDX snippets, including language-specific checklists and quick links. |
| `pt/` | 25 Portuguese pages. Some pages are translation placeholders. |
| `scripts/` | One custom JavaScript file, `hide-label.js`. |
| `zh-cn/` | 23 Simplified Chinese pages. Some pages are translation placeholders. |
| `zh-tw/` | 25 Traditional Chinese pages. Some pages are translation placeholders. |

## Root-level files

| File | Purpose |
| --- | --- |
| `documentation.json` | Configures the site, branding, navigation, redirects, search, AI settings, and initial route. |
| `openapi.yaml` | Stores the OpenAPI specification used for API documentation. |
| `changelog.mdx` | Lists recent product or documentation changes. |
| `help-center.mdx` | Provides the Help Center landing page. |
| `roadmap.mdx` | Describes planned and upcoming work. |

## Multilingual documentation

Each language has its own directory. The English directory is the source of truth:

```text
en/get-started.mdx
de/get-started.mdx
es/get-started.mdx
fr/get-started.mdx
```

Keep the English page accurate before updating translations. Translated directories may contain placeholder pages where translation work is incomplete. Do not treat a placeholder as an authoritative translation.

When a page exists in several languages, keep the page topic and navigation path aligned across languages unless the content is intentionally language-specific.

## Navigation and `documentation.json`

`documentation.json` controls how pages appear in the published site. The navigation hierarchy is:

```text
navigation
└── languages[]
    └── language
        └── tabs[]
            └── tab
                └── groups[]
                    └── group
                        └── pages[]
                            ├── title
                            ├── path
                            └── icon
```

A page path omits the `.mdx` extension:

```json
{
  "title": "Get started",
  "path": "en/get-started",
  "icon": "rocket"
}
```

This entry points to:

```text
en/get-started.mdx
```

The folder name is part of the path. For example, `de/refunds` points to `de/refunds.mdx`.

### English navigation

The English navigation currently contains these groups:

- **Start Here**
  - Get started
  - Forms
- **Account**
  - Proof of balance
  - Proof of identity
- **Rentals**
  - Addons & extras
  - Charges & fees
  - Insurance
  - Helmet
  - Food delivery bag
  - Documents
  - Returns
  - Return checklist
  - Roadside assistance
  - Unlimited KMs
- **Payments**
  - Refunds
  - Direct debit, PayID via Email
  - Pay via PayID, ABN
- **Vehicle & Maintenance**
  - Home service
  - Flat tyre
  - Tyre size
  - Tyre load index & speed rating
  - Service intervals
  - Weekly checks
- **License**
  - QLD motorcycle license
  - Motorcycle license class
- **Other**
  - Partner program
  - Brand assets

The Support tab contains:

- Help Center
- Changelog
- Roadmap

### Other site configuration

The root of `documentation.json` also contains:

- Site name and description
- Light and dark colour settings
- Documentation template
- Dark and light logos
- Favicon
- AI settings
- Initial route
- Navbar actions and links
- Redirects
- Search configuration

Redirects map older `/docs/` URLs to the newer `/en/` structure. Preserve existing redirects when changing paths. Add a redirect when moving a page that already has a published URL.

## Reusable partials

The `partials/` folder contains reusable MDX snippets. Pages import these snippets before using them:

```mdx
import ReturnChecklist from "/partials/return-checklist-en.mdx"

<ReturnChecklist />
```

Use a partial when the same content belongs on multiple pages. Update the partial rather than copying the same text into each page. Check existing partial names before creating a new one.

## Component reference pages

The `components/` folder documents the MDX components available on the site. Use these pages as the reference when creating or editing documentation.

Available components include:

| Component | Use |
| --- | --- |
| `Callout` | Highlights information, tips, alerts, or warnings. Use the `kind` property, such as `info`, `tip`, `alert`, or `warning`. |
| `Steps` and `Step` | Presents a sequence of actions. Use properties such as `icon`, `title`, and `title-type`. |
| `ExpandableGroup` and `Expandable` | Groups optional or expandable content, including FAQs and advanced troubleshooting. Use `title` and `default-open`. |
| `Columns` and `Card` | Displays related resource links. `Columns` accepts `cols`; `Card` supports `title`, `href`, `icon`, `horizontal`, and `target`. |
| `Tabs` and `Tab` | Compares platforms, approaches, or other substantial content variants. |
| `CodeGroup` | Groups equivalent code examples in different languages or formats. |
| Markdown tables | Compares simple data sets such as fees, statuses, or feature availability. |

Use components to improve clarity. Do not add components only for decoration.

## MDX page structure

Most documentation pages are `.mdx` files with YAML frontmatter followed by page content:

```yaml
---
title: Page title in sentence case
description: Benefit-oriented description for SEO that explains what the reader will learn or accomplish
---
```

The body uses Markdown and MDX components:

```mdx
## Return your rental

Follow the return checklist before handing back the vehicle.

<Steps>
  <Step title="Check the vehicle">
    Inspect the vehicle and collect your personal items.
  </Step>

  <Step title="Complete the return">
    Follow the return instructions for your rental.
  </Step>
</Steps>
```

Use sentence case for titles and headings. Keep descriptions specific and focused on the reader's outcome.

For code examples:

- Show realistic, complete examples.
- Use `CodeGroup` for equivalent examples in multiple languages.
- Do not use placeholder credentials or misleading sample values.
- Keep request and response examples consistent with the documented behaviour.

## Writing conventions

- Use Australian English.
- Write for the customer first.
- Use plain English and a friendly, direct tone.
- Use sentence case for headings, titles, and navigation labels.
- Prefer active voice and short paragraphs.
- Explain product-specific terms the first time they appear.
- Give the reader the action or answer early.
- Include practical steps and clear success signals.
- Avoid marketing language, unnecessary technical detail, and internal implementation terms.
- Keep terminology consistent across languages and pages.

## Add a new page

1. Confirm that the page belongs in the documentation and identify its English source-of-truth content.
2. Create the English page as an `.mdx` file in the appropriate directory.

   ```text
   en/new-topic.mdx
   ```

3. Add YAML frontmatter with a title and description.
4. Write the page using Markdown and the appropriate MDX components.
5. Add the page to the correct navigation group in `documentation.json`.

   ```json
   {
     "title": "New topic",
     "path": "en/new-topic",
     "icon": "book-open"
   }
   ```

6. Verify that the path matches the file exactly and does not include `.mdx`.
7. Add translations only when the English page is complete and the translation is available.
8. Check internal links, navigation, spelling, and formatting before submitting the change.

Never add a navigation path before creating the corresponding file. A navigation entry for a missing file creates a broken page.

## Important warnings

- Do not invent prices, fees, eligibility rules, rental policies, legal requirements, or operational procedures.
- Verify facts against the existing documentation or an approved Motion Rental source.
- Always confirm that a file exists before linking to it or adding its path to `documentation.json`.
- Treat English as the source-of-truth language.
- Preserve redirects in `documentation.json`. Old `/docs/` URLs must continue to resolve to their corresponding `/en/` pages.
- Do not change a published path without checking its existing links and redirect requirements.
- Do not mark placeholder translations as complete.