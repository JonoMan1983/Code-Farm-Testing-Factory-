# Claude Code Instructions

## Communication
- Always end every response with a clear signal that the task is complete and you are ready for the next one.

## Deployment
- The live site (GitHub Pages) deploys exclusively from the `portfolio-build` branch — not `main`. Any change the user needs to see on the live site must be merged into `portfolio-build` and pushed there, not just to `main` or a feature branch.
- A task involving visible site changes is not done until it has been merged into `portfolio-build`, pushed, and the resulting "pages build and deployment" GitHub Actions run has completed successfully.
