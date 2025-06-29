# Steps to Recreate this Repo

This file contains the commands needed and the contents of each file to get this basic example running with the same behavior as the example from [Understanding Astro: Integrations](https://github.com/understanding-astro/understanding-astro-book/blob/master/ch8.md). 

It's here for reference if changes are made to the repo. 

## Commands to Start Up

```bash
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
npm install astro-integration-kit
npm install astro -D

touch README.md
touch LICENSE
touch .gitignore
## UPDATE GITIGNORE FIRST!!!
git init; git add .; git commit -m "Initialize repository"
mkdir src
touch src/index.ts
touch integration/index.ts
mkdir scripts
touch src/scripts/support_script.ts
npm install kleur #this is to make the example code work exactly like the original demo. 
```

## .gitignore

copied from:
- https://github.com/florian-lefebvre/astro-integration-template/tree/main/templates/manual-kit

```bash
# build output
dist/

# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store
```


## tsconfig.json

starting from the generated tsconfig, matched it to strictest by hand, but had to change some of the setting to better match what was reflected in the tsup settings of the example. 

- https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/base.json
- https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strict.json
- https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strictest.json
- https://github.com/florian-lefebvre/astro-integration-template/blob/5944471673762c71672666b13217d89b7020583e/templates/manual-kit/package/tsup.config.ts#L4

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */

    /* Language and Environment */
    "target": "ESNext",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "jsx": "preserve",                                   /* Honestly N/A for this lib, Specify what JSX code is generated. */

    /* Modules */
    "module": "esnext",                                  /* Specify what module code is generated. */
    //"rootDir": "./src",                                /* Specify the root folder within your source files. */
    "moduleResolution": "bundler",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    "allowImportingTsExtensions": false,                 /* DIFFERENT FROM BASE Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    
  
    /* JavaScript Support */
    "allowJs": true,                                     /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */

    /* Emit */
    "declaration": true,                                 /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    "sourceMap": true,                                   /* Create source map files for emitted JavaScript files. */
    "noEmit": false,                                     /* DIFFERENT FROM BASEDisable emitting files from a compilation. */
    "outDir": "./dist",                                  /* Specify an output folder for all emitted files. */
   
    /* Interop Constraints */
    "isolatedModules": true,                             /* Ensure that each file can be safely transpiled without relying on other imports. */
    "verbatimModuleSyntax": true,                        /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "noUnusedLocals": true,                              /* Enable error reporting when local variables aren't read. */
    "noUnusedParameters": true,                          /* Raise an error when a function parameter isn't read. */
    "exactOptionalPropertyTypes": true,                  /* Interpret optional property types as written, rather than adding 'undefined'. */
    "noImplicitReturns": true,                           /* Enable error reporting for codepaths that do not explicitly return in a function. */
    "noFallthroughCasesInSwitch": true,                  /* Enable error reporting for fallthrough cases in switch statements. */
    "noUncheckedIndexedAccess": true,                    /* Add 'undefined' to a type when accessed using an index. */
    "noImplicitOverride": true,                          /* Ensure overriding members in derived classes are marked with an override modifier. */
    "allowUnusedLabels": false,                          /* Disable error reporting for unused labels. */
    "allowUnreachableCode": false,                       /* Disable error reporting for unreachable code. */

    /* Completeness */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "include": [
    "src/"
  ],
  "exclude": [
    "dist/"
  ]
}
```

## package.json

Some of the needed changes were made by the install scripts, but we'll need a few more. Also there would be a lot more needed in order to publish correctly. 


```json
{
  "name": "astro-integration-hello",
  "version": "0.0.0",
  "description": "",
  "keywords": [],
  "author": "",
  "license": "Apache-2.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./globalLog": {
      "types": "./dist/scripts/support_script.d.js",
      "default": "./dist/scripts/support_script.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -b --verbose",
    "clean": "rm -rf ./dist"
  },
  "peerDependencies": {
    "astro": "^5.0.0"
  },
  "dependencies": {
    "astro-integration-kit": "^0.18.0",
    "kleur": "^4.1.5"
  },
  "devDependencies": {
    "@types/node": "^24.0.4",
    "astro": "^5.10.1",
    "typescript": "^5.8.3"
  }
}
```

### type

"type": "commonjs", => "type": "module",

### main -> exports/files

Uses the more modern exports syntax.  Also set up an entry point for the reference to the logging script. 

- https://nodejs.org/api/packages.html#exports

```json
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./globalLog": {
      "types": "./dist/scripts/support_script.d.js",
      "default": "./dist/scripts/support_script.js"
    }
  },
  "files": [
    "dist"
  ],
```

### scripts

Add them.

```json
  "scripts": {
    "build": "tsc -b --verbose",
    "clean": "rm -rf ./dist"
  },
```

### peerDependency 

Since this isn't a mono repo where the plugin could be easily checked inside a running Astro instance. went ahead and installed astro as a dev dependency. Still need to add it as peerDependency by hand for other environments. 

```json
  "peerDependencies": {
    "astro": "^5.10.1"
  },
```

## index.ts

exports the integration as the default export. 

Note the _js_ in the import statement. To import `./integration.ts`, `'allowImportingTsExtensions'` would need to be enabled in the tsconfig. That option requires noEmit to also be enabled, and we need to emit. 

- https://github.com/florian-lefebvre/astro-integration-template/blob/5944471673762c71672666b13217d89b7020583e/templates/manual-kit/package/src/index.ts

This uses the word `integration` in the file name and object name but that isn't required. 

```typescript
import { integration } from "./integration.js";

export default integration;
```

## integration.ts

This is the file that emits the js file referred to in the `index.ts`

It contains an almost exact dupe of `src/integrations/astro-hello.ts` from [Understanding Astro: Integrations](https://github.com/understanding-astro/understanding-astro-book/blob/master/ch8.md), except we import the [entry point](https://nodejs.org/api/packages.html#package-entry-points) that was set up in the `package.json` instead of a local file reference. 

```javascript
import { defineIntegration } from "astro-integration-kit";
import kleur from "kleur";

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const logServerMessage = (message:String) => {
  const date = dateTimeFormat.format(new Date());
  console.log(`${kleur.gray(date)} ${kleur
    .bold()
    .cyan("[astro-hello-integration]")} ${message}
    `);
};

export const integration = defineIntegration({
	name: "astro-integration-hello",
	setup() {
		return {
			hooks: {
				"astro:config:setup": (options) => {
					options.injectScript(
						"page",
            //THIS IS WHAT'S DIFFERENT!!! 
						`import "astro-integration-hello/globalLog";`
					)
					logServerMessage("Integration Happened");
				}
				
			},
		};
	},
});

```

Aside: one does a full `import` instead of just passing in a file name because that second parameter is a raw code string. 

```javascript
export const integration = defineIntegration({
	name: "astro-integration-hello",
	setup() {
		return {
			hooks: {
				"astro:config:setup": (options) => {
					options.injectScript(
						"page",
						`console.log("test this!");`
					)
					logServerMessage("Integration Happened");
				}
				
			},
		};
	},
});
```

## scripts/support_script.ts

This file is specifically not named the same as the exported entry point to make it clear that the entry point is how the client package is accessing the code. 

started with vanilla javascript from the [Understanding Astro: Integrations](https://github.com/understanding-astro/understanding-astro-book/blob/master/ch8.md) example. 

```javascript
const logger = () => {
  const msg = "Hello Integrations";
  console.log(`%c ${msg}`, "background: black;  color: yellow");
};

logger();

```