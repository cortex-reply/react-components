# Copilot Instructions for cortex-react-components

## Project Overview

This is **cortex-react-components**, a comprehensive React component library designed for building modern web applications with React 18+ and Next.js. The library provides reusable, accessible, and fully-typed UI components with seamless Tailwind CSS integration.

### Key Characteristics
- **TypeScript-first**: All components are fully typed with TypeScript 5.7+
- **React 18 Server Components**: Leverages React 18 server/client component architecture
- **Storybook Documentation**: 191+ stories documenting all components
- **Tailwind CSS Integration**: Components use Tailwind with a custom preset
- **Accessibility**: Built with Radix UI primitives for accessibility
- **Component Library**: Published to npm as `cortex-react-components`

## Technology Stack

### Core Dependencies
- **React 19.0.0** & **React DOM 19.0.0** - UI framework
- **TypeScript 5.7.2** - Type safety
- **Tailwind CSS 3.4.17** - Styling
- **Radix UI** - Accessible component primitives
- **Framer Motion (motion)** - Animations
- **Next.js** - Optional peer dependency for server components

### Build Tools
- **tsup 8.3.5** - TypeScript bundler (uses esbuild)
- **tsc** - TypeScript compiler for type definitions
- **Storybook 8.6.12** - Component documentation
- **Vitest 2.1.8** - Testing framework
- **ESLint** - Linting
- **Prettier** - Code formatting

### Testing Stack
- **Vitest** - Test runner with jsdom environment
- **@testing-library/react** - Component testing utilities
- **@vitest/coverage-v8** - Code coverage

## Package Manager

**CRITICAL**: This project uses **pnpm 10.9.0** as specified in `packageManager` field. Always use pnpm, never npm or yarn.

```bash
# Install pnpm if not available
npm install -g pnpm@10.9.0

# Install dependencies
pnpm install
```

## Essential Commands

### Development
```bash
pnpm run build         # Build the library (tsup + tsc)
pnpm run typecheck     # Type-check without emitting files
pnpm run test          # Run tests with coverage
pnpm run lint          # Lint the codebase
pnpm run lint:fix      # Auto-fix linting issues
pnpm run storybook     # Start Storybook dev server (port 6006)
pnpm run build-storybook  # Build static Storybook
```

### Important Notes on Commands
1. **Always run these three commands together when validating changes**:
   ```bash
   pnpm run build && pnpm run typecheck && pnpm run test
   ```
2. **Do NOT try to run Storybook** - per the development instructions, Storybook runs in a Docker container managed externally
3. **Build is successful even with some TypeScript errors** in example/demo files that are excluded from the build

## Known Issues and Workarounds

### 1. TypeScript Errors in Example Files
**Issue**: Running `pnpm run typecheck` shows TypeScript errors in:
- `example-usage.tsx` - Cannot find module 'cortex-react-components'
- `per-item-favorites-demo.tsx` - Missing 'Sidebar' export
- `sidebar-favorites-demo.tsx` - Missing 'Sidebar' export
- Test files with missing test types

**Workaround**: These files are excluded from the actual build via `tsconfig.json` exclude patterns. The build succeeds despite these errors. These are demo/example files not included in the published package.

**Impact**: No impact on the published library. The `pnpm run build` command completes successfully.

### 2. Test Failures
**Issue**: Some tests fail when running `pnpm run test`:
- `CopilotInterface.test.tsx` - CSS import issues with katex
- `Login.test.tsx` - Invalid base URL errors
- `ApprovalRequest.test.tsx` - Some assertion failures
- `TasksView.test.tsx` - Type import issues

**Current Status**: As of the last test run:
- Test Files: 5 failed | 3 passed (8 total)
- Tests: 11 failed | 46 passed (57 total)

**Workaround**: These are pre-existing test failures. When making changes:
- Focus on tests relevant to your changes
- Don't try to fix unrelated failing tests
- Ensure your changes don't introduce NEW test failures

### 3. pnpm Installation Required
**Issue**: `pnpm` is not available by default in CI/development environments

**Workaround**: Always install pnpm globally first:
```bash
npm install -g pnpm@10.9.0
```

This is handled in CI workflows via `npm i -g pnpm && pnpm i`

### 4. Server/Client Component Separation
**Issue**: React 18 server components require careful separation of 'use client' and 'use server' directives

**Solution**: See `DIRECTIVE_CONFLICT_FIX.md` for detailed guidance. Key points:
- Server actions must be in separate files from client components
- Import server actions as props, not directly in client components
- The library exports server code separately via `cortex-react-components/server`
- Build config uses `esbuild-plugin-preserve-directives` to maintain directives

**Example**:
```tsx
// ✅ Correct
import { Form } from 'cortex-react-components'
import { contactUsFormSubmit } from 'cortex-react-components/server'

<Form onSubmit={contactUsFormSubmit} />

// ❌ Wrong - Don't import server actions directly in client components
import { Form, contactUsFormSubmit } from 'cortex-react-components'
```

## Project Structure

```
/
├── .github/
│   ├── instructions/
│   │   └── development.md.instructions.md  # AI coding standards
│   └── workflows/                          # CI/CD workflows
├── .storybook/                             # Storybook configuration
├── src/
│   ├── components/                         # All UI components
│   │   ├── ui/                            # Base UI components (buttons, cards, etc.)
│   │   ├── Chat/                          # Chat/Copilot interface components
│   │   ├── DigitalColleagues/             # Digital colleague management
│   │   ├── Projects/                      # Project management components
│   │   ├── CRM/                           # CRM components
│   │   ├── Blocks/                        # Content blocks
│   │   ├── Cards/                         # Card components
│   │   ├── HeaderFooter/                  # Header/footer components
│   │   ├── Heros/                         # Hero sections
│   │   ├── Layouts/                       # Layout components
│   │   └── [other component categories]/
│   ├── hooks/                             # Custom React hooks
│   ├── utils/                             # Utility functions
│   ├── sections/                          # Page sections
│   ├── pages/                             # Full page components
│   ├── styles/                            # Global styles
│   ├── test-data/                         # Test data fixtures
│   ├── tests/                             # Test utilities
│   ├── index.ts                           # Main export file
│   ├── styles.css                         # Base CSS (no Tailwind utilities)
│   └── globals.css                        # Full CSS with Tailwind
├── tests/                                  # Root-level tests
├── dist/                                   # Build output (gitignored)
├── package.json                            # Package configuration
├── tsconfig.json                           # TypeScript config
├── tsup.config.ts                          # Build configuration
├── vitest.config.mts                       # Test configuration
├── tailwind.config.js                      # Tailwind config
└── eslint.config.mjs                       # ESLint config
```

## Build System

### Build Process (tsup + tsc)
The build uses a two-step process:

1. **tsup** - Bundles JavaScript and assets
   - Builds both ESM and CJS formats
   - Preserves 'use client' and 'use server' directives
   - Bundles all components with tree-shaking
   - Copies static assets (fonts, images)
   - Filters out .stories, .test, and .md files
   - Custom post-build cleanup

2. **tsc** - Generates TypeScript declarations
   - Uses `tsconfig-build.json`
   - Generates .d.ts files for type checking

### Build Configuration Details

**Important**: The `tsup.config.ts` has special handling:
- Excludes story files, test files, and markdown from the build
- Preserves directives using `esbuild-plugin-preserve-directives`
- Uses `esbuild-plugin-react18` for React 18 support
- Post-build removes any story files that slipped through
- Copies `styles.css` and `tailwind-preset.js` to dist

### Package Exports
The library exports multiple entry points:
```json
{
  ".": "./dist/index.mjs",           // Main components
  "./server": "./dist/sections/form/server/index.mjs",  // Server actions
  "./styles.css": "./dist/styles.css",  // Base styles (no Tailwind)
  "./globals.css": "./dist/globals.css", // Full styles with Tailwind
  "./tailwind-preset": "./dist/tailwind-preset.mjs"  // Tailwind preset
}
```

## Development Guidelines

### Coding Standards
Refer to `.github/instructions/development.md.instructions.md` for comprehensive coding standards. Key points:

1. **TypeScript**: All components must be fully typed with interfaces for props
2. **Testing**: Use Vitest with @testing-library/react
3. **Storybook**: Document all components with stories
4. **Styling**: Use Tailwind CSS with the `cn()` utility for conditional classes
5. **Components**: Make all components composable and responsive by default
6. **DRY Principle**: Extract reusable logic into hooks or utilities
7. **No hardcoded data**: Use test data from `tests/` or `test-data/` folders

### Component Patterns

1. **Use Radix UI primitives** for accessibility
2. **Use Shadcn UI patterns** where applicable
3. **Use Framer Motion (motion)** for animations
4. **Export all components** from `src/components/index.ts`
5. **Include .stories.tsx** for each component
6. **Write tests** for component functionality

### Path Aliases
The project uses TypeScript path aliases:
```typescript
"@/lib/utils": "./src/utils"
"@/components/*": "./src/components/*"
"@/hooks/*": "./src/hooks/*"
"@/tests/*": "./src/tests/*"
"@/images/*": "./src/images/*"
"@/payload-types": "./src/payload-types"
"@/common-types": "./src/common-types"
```

### File Naming Conventions
- Components: `ComponentName.tsx` (PascalCase)
- Stories: `ComponentName.stories.tsx`
- Tests: `ComponentName.test.tsx`
- Utilities: `utility-name.ts` (kebab-case)
- Types: `types.ts` or inline with components

## Testing

### Running Tests
```bash
pnpm run test              # Run all tests with coverage
pnpm run test -- --watch   # Watch mode
```

### Test Structure
- Test files use `.test.tsx` or `.test.ts` extension
- Use Vitest with jsdom environment
- Use @testing-library/react for component testing
- Coverage reports are in HTML format

### Test Patterns
```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Coverage Configuration
- Includes: `src/**`
- Excludes: `src/**/index.ts`, test files, declaration files
- Reporters: text, json, clover, html

## Styling System

### Tailwind CSS Setup
The library provides a Tailwind preset that consumers should use:

```javascript
// Consumer's tailwind.config.js
import cortexPreset from 'cortex-react-components/tailwind-preset'

export default {
  presets: [cortexPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/cortex-react-components/dist/**/*.{js,mjs}'
  ]
}
```

### CSS Import Patterns
**For Tailwind Projects** (recommended):
```tsx
import "cortex-react-components/styles.css"  // Only base styles
```

**For Non-Tailwind Projects**:
```tsx
import "cortex-react-components/globals.css"  // Includes Tailwind utilities
```

### Utility Functions
- `cn()` from `@/lib/utils` - Merges classnames with tailwind-merge
- Use `clsx` for conditional classes
- Use `class-variance-authority` for variant-based styling

## Common Pitfalls and Solutions

### 1. Don't Import Both Server and Client in Same File
**Problem**: Mixing 'use client' and 'use server' directives
**Solution**: Separate imports, pass server actions as props

### 2. Don't Import globals.css in Tailwind Projects
**Problem**: Duplicate Tailwind utilities
**Solution**: Use styles.css instead

### 3. Don't Hardcode Test Data in Components
**Problem**: Makes components less reusable
**Solution**: Accept data as props, store test data in test-data/ folder

### 4. Don't Forget to Update Exports
**Problem**: New components not accessible to consumers
**Solution**: Export from `src/components/index.ts` and `src/index.ts`

### 5. Don't Run Storybook in Development
**Problem**: Conflicts with Docker container
**Solution**: Storybook runs in Docker, test components via tests instead

## CI/CD Workflows

### Test Workflow (.github/workflows/test.yml)
- Runs on: push, pull_request, and scheduled (every 8 hours)
- Steps: checkout → setup Node 20 → install pnpm → pnpm test
- Uploads coverage to Codecov and Code Climate
- Note: Skips first run (`if: github.run_number != 1`)

### Release Workflow
- Uses semantic-release for version management
- Automated based on commit messages

## Making Changes

### Workflow for Adding a New Component

1. **Create the component file**
   ```bash
   src/components/CategoryName/ComponentName.tsx
   ```

2. **Add TypeScript types**
   ```typescript
   export interface ComponentNameProps {
     // Props definition
   }
   ```

3. **Create a story**
   ```bash
   src/components/CategoryName/ComponentName.stories.tsx
   ```

4. **Write tests**
   ```bash
   src/components/CategoryName/ComponentName.test.tsx
   ```

5. **Export the component**
   - Add to `src/components/CategoryName/index.ts`
   - Add to `src/components/index.ts`
   - If needed, add to `src/index.ts`

6. **Validate**
   ```bash
   pnpm run build
   pnpm run typecheck
   pnpm run test
   ```

### Workflow for Modifying Existing Components

1. **Make minimal changes** - Only change what's necessary
2. **Run tests** - Ensure your changes don't break existing tests
3. **Update stories** - If props or behavior changed
4. **Update types** - Keep TypeScript definitions in sync
5. **Validate**:
   ```bash
   pnpm run build && pnpm run typecheck && pnpm run test
   ```

## Architecture Decisions

### Why Two CSS Files?
- `styles.css` - Base CSS without Tailwind utilities (for projects with Tailwind)
- `globals.css` - Full CSS with Tailwind utilities (for non-Tailwind projects)
- Prevents duplicate utilities and conflicts

### Why Separate Server Exports?
- React 18 Server Components require directive separation
- Prevents bundler from mixing client and server code
- Allows tree-shaking to work properly

### Why tsup + tsc?
- tsup: Fast JavaScript bundling with esbuild
- tsc: Reliable TypeScript declaration generation
- Best of both worlds: speed + type safety

### Why Storybook in Docker?
- Consistent development environment
- Prevents port conflicts
- Managed externally for convenience

## Quick Reference

### Check If Build Works
```bash
pnpm run build && echo "Build successful"
```

### Check If Types Are Valid
```bash
pnpm run typecheck 2>&1 | grep "error TS" | wc -l
```

### Run Specific Tests
```bash
pnpm run test -- ComponentName.test.tsx
```

### Debug Build Output
```bash
ls -lh dist/index.mjs  # Check main export
ls -lh dist/styles.css # Check styles
```

### Clean Build
```bash
rm -rf dist node_modules && pnpm install && pnpm run build
```

## Additional Resources

- `README.md` - User-facing documentation
- `DIRECTIVE_CONFLICT_FIX.md` - Server/client separation guide
- `.github/instructions/development.md.instructions.md` - Detailed coding standards
- Component READMEs in various component folders
- Storybook (when running) at http://localhost:6006

## Getting Help

When troubleshooting:
1. Check if pnpm is installed: `pnpm --version`
2. Verify dependencies are installed: `ls node_modules | wc -l` (should be ~1700+)
3. Look at build output for specific errors
4. Check if issue exists in existing tests (don't fix unrelated issues)
5. Refer to DIRECTIVE_CONFLICT_FIX.md for server/client issues

## Summary Checklist for AI Agents

When working in this repository:
- [ ] Use `pnpm` (never npm/yarn)
- [ ] Run `pnpm install` first if node_modules missing
- [ ] Test with: `pnpm run build && pnpm run typecheck && pnpm run test`
- [ ] Don't run storybook (it's in Docker)
- [ ] Follow `.github/instructions/development.md.instructions.md`
- [ ] Keep server/client components separated
- [ ] Use `styles.css` not `globals.css` for Tailwind projects
- [ ] Export new components from index files
- [ ] Write stories and tests for new components
- [ ] Don't fix pre-existing test failures unless related to your changes
- [ ] Ignore TypeScript errors in demo/example files (they're excluded from build)
