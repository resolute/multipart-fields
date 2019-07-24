# Multipart Fields

## Usage

```js
const multipartFields = require('@resolute/mulitpart-fields');

fastify
    .register(multipart)
    .addHook('preHandler', multipartFields)
```