## Start Up

```bash
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
## does not matter if use npm or pnpm or yarn, fwiw
## do tsup on other branch
## npm i tsup -D
# pnpm add tsup -D
# pnpm add astro-integration-kit
mkdir src
touch README.md
touch src/index.ts
touch LICENSE
touch .gitignore
touch .npmignore
## UPDATE GITIGNORE FIRST!!!
```

### .gitignore

copied from:
- https://www.github.com/florian-lefebvre/astro-integration-template/templates/manual-kit


### .npmingore

duplicate of .gitingore [for now](https://www.npmjs.com/package/npmignore)


### initialize repo
```
git init; git add .; git commit -m "Initialize repository"
```


## Update Content

### tsconfig.json

```
{
  "compilerOptions": {
    ...
    "outDir": "./dist",
    ...
  },
  ...
}
```

### package.json

There will be more changes to make before publishing, but these are the changes to compile. 

Note the installed items. 

#### type

"type": "commonjs", => "type": "module",

#### main

tsup puts output files in dist. 

```
   "main": "index.js", => "main": "dist/index.js",
```
#### scripts

	"scripts": {
		"dev": "tsup --watch",
		"build": "tsup"
	},

#### peerDependency 

I actually installed it, and then moved it out of dependencies to peer. 

  "peerDependencies": {
    "astro": "^5.10.1"
  },




```
{
  ...
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  ...
}
```