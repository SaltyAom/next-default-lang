# Default Language Proof of Concept
Proof of concept using Next.js with fallback default language.

## Outline:
Every page has a prefix of [lang] as param to accept the page language.
By default. Next.js provided a way to accept param by naming file or folder with `[paramName]` and then pass the param name as props to the Next.js Page Component by export the `getStaticProps` and we could also defined an accepted value of param using `getStaticPaths`.

File/folder without the `[paramName]` param couldn't accept any param and if forced to, will lead to build failure.

## Concept:
By adding the default value of the page params and export the module to the file. 

For example:

If we have a structure of
```
| pages
| -
  | - index.tsx
  | - [lang].tsx
```

In `[lang].tsx`, we accepted the param `lang` and make `index.tsx` import the `[lang].tsx` with default lang of `en`.
The `index.tsx` will have a default lang of `en` without actually receiving anything but fallback to the default function value.

For example if we have a path `/`. The project structure would be:

```
/     <--- Re export with en fallback
/en   <--- File
```

And the file would be:

[lang].tsx:
```typescript
// [lang].tsx
import { GetStaticProps, GetStaticPaths } from "next"
import { Fragment } from "react"

const Landing = ({ lang = "en" }) => (
  <Fragment>
    <h1>Landing Page</h1>
    <h4>Lang: {lang}</h4>
  </Fragment>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ["en", "fr", "gb"]  // Only accept and pre-render these arguments

  return {
    paths: languages.map((language) => ({
      params: { lang: language }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    ...params
  }
})

export default Landing
```

Index.tsx:
```typescript
// index.tsx

import Landing from "./[lang]"

export default Landing
```

## Result:
```html
// path: /

Landing Page
lang: en


// path: /en

Landing Page
lang: en


// path: /fr

Landing Page
lang: fr
```

## Benefit
Be able to export to static file directly from Next.js. So no rewrite is need.

## Drawback
It might be a bit fraustrating at first since there are a lot of page.

For example:

The figure below provide a the following part and group with the same file:
/
/en

/contact
/en/contact

/settings
/en/settings

/settings/theme
/en/settings/theme

```
| pages
| -
  | - index.tsx
  | - [lang].tsx
  |
  | - about.tsx
  | - contact.tsx
  |
  | - settings          <--- /settings   with en as fallback lang
  | | - theme.tsx       <--- /settings/theme  with en as fallback lang
  |
  | - [lang]
    | index.tsx
    | - contact.tsx
    |
    | - settings        <--- /[lang]/settings
      | - theme.tsx.    <--- /[lang]/settings/theme
```

## Step to reproduce
Simply clone and build

```bash
git clone https://github.com/SaltyAom/next-default-lang 
    && cd next-default-lang
    && yarn
    && yarn build
```

To start static server:
```
yarn start:static
```

To dev:
```
yarn dev
```