manyの条件  
流石に分かりにくため廃案  
```js
// if (length != null || (min != null && min === max))
//   quantifier = '{' + (length ?? min) + '}';
// else if (min != null && max == null && (min === 0 || min === 1))
//   quantifier = (min === 0 ? '*' : '+');
// else if (min != null)
//   quantifier = '{' + min + ',' + (max ?? '') + '}';
// else if (max == null)
//   quantifier = '*';
// else
//   throw new TypeError('invalid arguments.');
```
