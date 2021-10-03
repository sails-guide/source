# Maintain Types in Multipart Form Data

There are some tricks to submitting multipart/form-data in Sails.

When we send send FromData in this typical example, non-File and non-string values are all stringified.

```js
async function () {
  const values = {
    // these are fine
    file: new File(['foo'], 'foo.txt', { type: 'text/plain' });
    string: 'this will work',
    // these will be turned to strings
    truthy: true,
    falsy: false,
    nully: null,
    numbery: 12,
    objecty: { foo: true },
    arrayie: [1, 2, 3]
  };
    
  const formData = new FormData();
    
  const res = await fetch(`/api/v1/masjids/${defaultMasjid.id}/affairs`, {
    method: 'POST',
    headers: {
      'X-CSRF-Token': SAILS_LOCALS._csrf,
    },
    body: formData,
  })
}
```

If you want to maintain the types you have to pass a special headers attribute called `X-JSON-MPU-Params` and it should be comma-seperated list of all field names that should be `JSON.parse`'ed before giving to actions.

So in the example above add this to `headers`:

```js
headers: {
  'X-CSRF-Token': SAILS_LOCALS._csrf,
  'X-JSON-MPU-Params': 'truthy,falsy,nully,numbery,objecty,arrayie' 
},
```

Also you should stringify `object` and `arrayie`:

```js
const values = {
  objecty: JSON.stringify({ foo: true },
  arrayie: JSON.stringify([1, 2, 3])
}
```

<Author github-username="noitidart" />
