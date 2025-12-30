# Cortex Reply React Component library

Reusable components for use internally and externally.

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with Storybook


## Getting Started

### Installation

```bash
pnpm add cortex-react-components
```

**_or_**

```bash
npm install cortex-react-components
```

**_or_**

```bash
yarn add cortex-react-components
```

> You need `r18gs` as a peer-dependency

### Setup for Tailwind CSS Projects (Recommended)

This library is designed to work seamlessly with your existing Tailwind CSS setup. **Do not import `globals.css` directly** as it may cause duplicate utility classes.

#### Step 1: Import the base styles

Import only the CSS custom properties (design tokens) and non-Tailwind styles:

```tsx
// app/layout.tsx or _app.tsx
import "cortex-react-components/styles.css";
```

#### Step 2: Load the Manrope font

This library uses the [Manrope](https://fonts.google.com/specimen/Manrope) font. You need to load it in your application.

**Option A: Google Fonts (HTML)**

Add this to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Option B: Next.js (next/font) - Recommended**

```tsx
// app/layout.tsx
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>{children}</body>
    </html>
  );
}
```

#### Step 3: Extend your Tailwind config with our preset

```js
// tailwind.config.js or tailwind.config.ts
import cortexPreset from 'cortex-react-components/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [cortexPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include the library's components for Tailwind to scan
    './node_modules/cortex-react-components/dist/**/*.{js,mjs}',
  ],
  // ... your other configuration
};
```

This approach ensures:
- ✅ No duplicate Tailwind utility classes
- ✅ Proper CSS specificity
- ✅ Full theme customization support
- ✅ Smaller bundle size (utilities are generated once by your app)

### Alternative: Standalone CSS (Non-Tailwind projects)

If your project doesn't use Tailwind CSS, you can import the pre-built CSS:

```tsx
// layout.tsx
import "cortex-react-components/globals.css";
```

⚠️ **Warning**: Do not use this approach if your project already uses Tailwind CSS, as it will cause duplicate utility classes and CSS conflicts.

### Usage

Using components is straightforward.

```tsx
import { Bars1 } from "cortex-react-components";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

