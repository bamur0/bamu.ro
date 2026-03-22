Import a case study from Notion into an MDX file.

Arguments: $ARGUMENTS (Notion page URL)

1. Fetch the page via Notion MCP
2. Follow the `notion-to-mdx` skill for conversion
3. Follow the `case-study` skill for frontmatter schema and structure
4. Save to `src/content/projects/[slug].mdx`
5. Create `public/images/projects/[slug]/` directory
6. Run `pnpm typecheck`
7. List any referenced images that need to be added manually
