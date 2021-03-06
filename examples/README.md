<p align="center">
    <img src="src/assets/img/Reactplate.png"></img>
</p>

<p align="center">
    A Minimal Setup & Fast Boilerplate for <a href="https://reactjs.org/">React.js</a> with <a href="https://vitejs.dev/">Vite</a>
</p>

## Features

π Dynamic Pages Routing with react-router-dom from <a href="https://reactjs.org/">React.js</a><br/>
π Fast development with <a href="https://vitejs.dev/">Vite</a><br/>
π SSR support with <a href="https://vitejs.dev/">Vite</a><br/>
π PWA support with <a href="https://vitejs.dev/">Vite</a><br/>
π SSG support with <a href="https://vitejs.dev/">Vite</a>

---

## Installation

```bash
git clone https://github.com/fauzan121002/reactplate.git

cd reactplate

npm install

# run server (development mode)
npm run dev
# run server (production mode)
npm run serve
# run debugger
npm run debug

# build the client side & the server side project
npm run build

# build the client side project
npm run build:client

# build the server side project
npm run build:server

# static site generate
npm run generate
```

## Built-in Configuration

### Import Aliases

- `@` equals to `_ROOT_/src`
- `#` equals to `_ROOT_/src/components`
- `%` equals to `_ROOT_/src/assets`

### ESBuild

ESBuild already injects `import React from 'react';` for any .jsx files so you don't need to import it again.

### Dynamic Pages Routing

Reactplate Dynamic Pages Routing folder structure works like [Next.js](https://nextjs.org/docs/routing/introduction).

```
pages
β   Home.jsx
β   About.jsx
β
ββββRank
β   β   [rank].jsx
β   ββββsubfolder1
β       β   [others].jsx
β       β   ...
```

Using the params example

```jsx
// Rank/[rank].jsx
import { useParams } from "react-router-dom";

export default function rank() {
  const { rank } = useParams();
  return <div>Reactplate will be number {rank}</div>;
}
```

**Note** : Index page will refer to **Home.jsx**

### URL Convertion

Reactplate will convert any jsx files filename with PascalCase or camelCase to kebab-case.

Example :

```
pages
β   Home.jsx
β   AboutMe.jsx
β
ββββmyRank
β   β   [rank].jsx
β   ββββsubfolder1
β       β   [others].jsx
β       β   ...
```

will be converted to :

```
/home
/about-me
/my-rank/:rank
/my-rank/:rank/subfolder1/:others
...
```

---

## License

Reactplate using the [MIT License](./LICENSE)

## Credits

Credits to <a href="https://reactjs.org/">React.js</a> and <a href="https://vitejs.dev/">Vite</a> teams for their awesome open source and resources!
