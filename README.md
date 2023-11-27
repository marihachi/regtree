# carol-js
A small tool for building regular expressions.

We build a RegExp object by combining functions.  
We only support ES modules.

## Example
```js
import carol from 'carol-js';

const regex = carol.seq([
  carol(/hello/),
  carol(/ /),
  carol(/world/),
  carol(/!/).many(1),
]).many().toRegex();

assert.strictEqual(regex.source, '(?:hello world(?:!)+)*');
```

## Documents
- [API reference](https://github.com/marihachi/carol-js/blob/3e5d29ffe37d7b4b827bbd59e3133627cac06e76/doc/api.md)
- [Usage](https://github.com/marihachi/carol-js/blob/3e5d29ffe37d7b4b827bbd59e3133627cac06e76/doc/usage.md)

## Installation
```sh
npm i carol-js
```

## Test
```sh
git clone https://github.com/marihachi/carol-js.git
cd carol-js
npm i
npm run build
npm test
```

## License
MIT
