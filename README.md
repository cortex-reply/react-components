# Cortex Reply React Component library

Reusable components for use internally and externally

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

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "cortex-react-components/dist";
```

```tsx
// layout.tsx
import "cortex-react-components/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "cortex-react-components/dist/client"; /** required if you are using LoaderContainer */
@import "cortex-react-components/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "cortex-react-components";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

