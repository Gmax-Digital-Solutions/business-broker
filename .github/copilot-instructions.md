## Stitch MCP (design source of truth)

- Designs live in Google Stitch and are read through the Stitch MCP server. Stitch is the visual source of truth; this repo's
  instructions are the source of truth for architecture, data, security, accessibility and SEO. When they conflict, the repo rules win.
- Tool names depend on which Stitch MCP server is installed. At the start of every Stitch task, list the available Stitch tools and
  map them to these jobs: list projects, list screens, get screen metadata, fetch screen HTML/code, fetch screen screenshot,
  extract design context (colors, fonts, layout). Do not guess tool names.
- Treat Stitch output as a design reference, NOT production code:
  - Never paste Stitch HTML in as-is. Rebuild each screen as React Server Components with Tailwind classes using our design tokens
    and shadcn/ui primitives. Replace hard-coded content with Prisma data and real components.
  - Remove CDN scripts, inline <style> blocks and hard-coded hex values. Use tokens from the Tailwind theme.
  - Replace <div onClick> and fake buttons with real <button>/<a>. Add labels, alt text, focus states and headings in logical order.
  - Fix known contrast problems: no white text on #D97706; gold text on white uses #B45309; gold buttons use navy text.
  - Images from Stitch are placeholders. Use next/image with local or seeded sample images, never hotlink Stitch URLs.
- If a screen needs a state Stitch did not design (empty, loading, error, validation), build it consistently with the design system
  and list it in your report. Do not generate new Stitch screens unless asked.

## Indexing switch

- `NEXT_PUBLIC_ALLOW_INDEXING` (default "false"). When false, the whole site sends `noindex, nofollow` (meta robots and X-Robots-Tag)
  and robots.txt disallows everything. All SEO features are still fully built and must work when the switch is true.
  Reason: this is a concept demo that uses a real firm's name and must not compete with or be mistaken for the real site in search results.
