# astro-integration-hello

## About

basic `Astro` `Integration` package combining the examples from 

- https://github.com/understanding-astro/understanding-astro-book/blob/master/ch8.md
- https://github.com/florian-lefebvre/astro-integration-template

to create a super simple example of stand alone integration package. No pnpm, no bundlers, no mono repo... all things that make life easier to do dev work, but can cloud understanding. 

To read more see the [STEPS_TO_CREATE.md] page

## To Use

This is not a published package. One will have to download the files and install (`npm install ../path/to/folder`) it locally. Your `package.json` might end up looking something like:

```json
  "dependencies": {
    //...
    "astro-integration-hello": "file:../astro-integrations/astro-integration-hello",
    //...
  }
```



In your Astro instance's `astro.config.mjs` import the integration using an alias if preferred. 

```javascript
const { default: nameToUse } = await import("astro-integration-hello");

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [nameToUse()],
});
```

