---
title: PostgreSQL Arrays and Waterline
menuTitle: Native PostgreSQL Arrays
date: 2019-04-11T14:24:03+11:00
draft: false
---

# PostgreSQL Arrays and Waterline

Fancy storing arrays in your PostreSQL database using Sails.js and Waterline?

Using the native support for arrays in Postgres is basically as easy as manually specifying a `columnType` in your model attributes.

## Defining Array-Type Model Attributes
Below is an example of a Waterline attribute containing an array of strings:
```js
 favouriteFruits: {
  type: 'ref',
  columnType: 'text[]',
  description: `An array of a user's favourite fruits`,
},
```

And it's really as simple as that. Now throughout your Sails application you're able to do things that should feel quite natural as a JS developer.

You might also want to check out the [PostgreSQL Arrays documentation](https://www.postgresql.org/docs/10/arrays.html)
for a better understanding of the different column types available and other low-level usage examples.

## Creating/Editing Records with Array Columns
You're able to use the regular [create](https://sailsjs.com/documentation/reference/waterline-orm/models/create)/[update](https://sailsjs.com/documentation/reference/waterline-orm/models/update) methods passing an array as an attribute's value.
```js
let newFruitLover = await People.create({
  name: 'Bob',
  favouriteFruits: ['apple', 'orange']
}).fetch()
```

## Searching Array Columns
For searching on an ***exact match*** of an array, you can use the usual query methods.
```js
let results = await People.find({ favouriteFruits: ['apple', 'orange'] })
```

Unfortunately, searching for records that *contain* a single/several items in an array column but which could contain others is a little messy.
It's at this point we may need to bust out some [raw SQL](https://sailsjs.com/documentation/reference/waterline-orm/datastores/send-native-query) and kick it old-school.
```js
let FRUIT_LOVERS_QUERY = `SELECT * FROM "people" WHERE "favouriteFruits" @> $1`;
let appleLovers = await sails.sendNativeQuery(FRUIT_LOVERS_QUERY, ['{apple}']);
// Any returned records should be found in
//   appleLovers.rows
```
The `@>` in the above query is Postgres' "contains" query operator. A list of other native Postgres array functions/operators are available [here](https://www.postgresql.org/docs/10/functions-array.html).
