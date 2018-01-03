
## Usage
1. Add routes to `app.js` before the last line.
2. Add JSON file(s).
3. `npm start`

## Examples
```js
addRoute('/stores/list', 'POST', './stores.json'); // GET is default method
addRoute('/metadata/:id', 'GET', './April-21-Query.json'); // wildcard
addRoute('/test'); // if 3rd param missing, assume ./fixtures/test.json
addRoute('/my/api/search', 'PUT'); // sends ./fixtures/my/api/search.json
addRoute('/my/api/search', 'GET', './response.json');```
