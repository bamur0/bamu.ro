Pre-deploy checklist for Cloudflare Pages.

1. Run `pnpm typecheck` — fix errors
2. Run `pnpm lint` — fix warnings
3. Run `pnpm build` — verify static export
4. Check `out/` directory exists
5. Report build size and page count
6. Remind: push to main to trigger Cloudflare deploy
