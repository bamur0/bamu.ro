Build a Next.js component from a Figma design.

Arguments: $ARGUMENTS (component name or Figma file URL)

1. Take a screenshot of the current Figma selection via `figma_take_screenshot`
2. Extract variables/tokens via `figma_get_variables` if available
3. Follow the `figma-to-code` skill for the build process
4. Follow the `design-system` skill for token mapping
5. Create the component in the correct directory under `src/components/`
6. Run `pnpm typecheck`
