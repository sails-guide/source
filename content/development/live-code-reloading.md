# Live code reloading
It can be annoying having to stop and lift your application after each code change during development - especially if you forget to do so and wonder why code changes you've made aren't having any effect!

Fortunately, there are tools we can use to make our development experience smoother.

## Using nodemon with Sails.js
[nodemon](https://nodemon.io)
_"is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development."_

Hey - that sounds like something I could get onboard with! Let's set up nodemon to stop and lift our Sails application automatically when our code changes.

First, we'll add nodemon as a development dependency of our project.
```bash
npm install --save-dev nodemon
# OR
yarn add --dev nodemon
```

We can add a simple script to our `package.json` file so that we can start our application with nodemon watching for file changes easily.
```json
"scripts": {
  "dev": "nodemon sails lift --ignore 'assets' --ignore 'views'"
}
```

Now we can start our application with nodemon watching for file changes. All we have to do is run the script we added to `package.json`.
```bash
npm run dev
# OR
yarn dev
```

Hey-presto! Now any time you change a file in your codebase nodemon will restart your Sails application for you.

::: tip
___Keep in mind___ - Your application will be completely stopped and started for every code change.

If you have long-running or destructive code in your `config/bootstrap.js` file, or are using Waterline with auto-migrations set to `drop` or `alter` this could result in slow restarts.

If you are using the default in-memory session store, user sessions and socket connections will not be persisted between reloads ([setting up redis](###) is easy though!).
:::

## Using sails-hook-autoreload
Another alternative for reloading your application during development is [sails-hook-autoreload](https://github.com/sgress454/sails-hook-autoreload).

There are detailed instructions at the link above for installing and configuring `sails-hook-autoreload`, however official support for the hook has ended, and it is incompatible with many existing npm modules and Sails application configurations.
