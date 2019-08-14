---
date: 2019-04-11
---
# Case-Insensitive Queries using PostgreSQL and Waterline

An all-too-common requirement when working with records in a database
is to search by a text field ignoring case. Maybe you're looking for a user
by username or email address, but when using PostgreSQL and Waterline this doesn't come out of the box.

Enter <a href="https://www.postgresql.org/docs/9.1/citext.html" target="_blank">citext</a>, Postgres' case-insensitive character string type.
"Essentially, it internally calls lower when comparing values. Otherwise, it behaves almost exactly like text."
Sounds like what we want!

#### Installing citext extension
Before you are able to take advantage of the citext data-type, you will need to load the required extension into
your database.

Using the `psql` tool, you'll need to run the following while logged in as the owner of your database:
```sql
create extension citext;
```

#### Waterline attribute example
Here is an example of a "username" model attribute using citext with Waterline for case-insensitve querying.
Notice that we need to explicitly set the `columnType` so that Waterline can build the correct `CREATE TABLE` queries
when running it's migrations/table creation.
```js
username: {
  type: 'string',
  columnType: 'citext',
  required: true,
  unique: true,
  description: 'A users.. Username',
  // ...
},
```
