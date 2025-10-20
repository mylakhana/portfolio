# Project Guidelines

## Package Management
- Use `pnpm` exclusively for all package installations and dependency management

## Development Server
- Development server is running separately - avoid starting additional server instances

## Code Quality
- Follow DRY (Don't Repeat Yourself) principles - eliminate code duplication through reusable components and utilities

## Data Management
- Primary data source: `public/data.json`
- Content creation: Feel free to craft engaging titles and descriptions
- Data integrity: Always validate and reference the source data for accuracy

## UI Components
- Leverage modern UI libraries for enhanced user experience:
  - Aceternity UI
  - Skiper UI
  - 21st.dev
- Explore these resources for innovative UI patterns and components

## Technology Icons
- Use **Devicon** for displaying technology/tool icons consistently across the portfolio
- Import and usage:
  ```tsx
  import { TechIcon, getDeviconName } from "@/components/ui/tech-icon";

  // Basic usage with original colored variant (recommended)
  <TechIcon name="react" variant="original" />

  // Auto-map from display name
  <TechIcon name={getDeviconName("JavaScript/TypeScript")} variant="original" />
  ```
- Preferred variant: `original` with `colored` (default)
- Browse available icons: [devicon.dev](https://devicon.dev/)
- See full documentation in `docs/devicon-usage.md`