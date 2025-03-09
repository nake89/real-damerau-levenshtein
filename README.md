# Real Damerau Levenshtein

Damerau Levenshtein that actually produces right results.

Read motivations for this from my blog: https://kevinkivi.com/posts/real-damerau-levenshtein/

In short:
1. Works simply in browser.
2. Produces correct result unlike npm packages: `damerau-levenshtein` or `damerau-levenshtein-js`
3. Produces nice usable result like.



## In the browser

Usage:
```html
<script src="https://cdn.jsdelivr.net/gh/nake89/real-damerau-levenshtein/dist/browser.min.js"></script>
```

```javascript
const result = dam("CA", "ABC");
```

Returns an object with keys: steps, relative, similarity.

## In Node.js

```
npm install real-damerau-levenshtein
```
