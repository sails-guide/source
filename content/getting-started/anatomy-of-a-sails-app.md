# Anatomy of a Sails Application

@flowstart
graph TB
S((" "))
S-->API[api]
S-->ASS[assets]
S-->CONF[config]
S-->TEST[test]
S-->V[views]
S-->SCP[scripts]
S-->TSK[tasks]
@flowend

---

<SailsAnatomy />

## /api
The `/api` directory is subdivided into several sections and will contain most of the code your application will need to run.

@flowstart
graph TB
API((api))-->C[controllers]
API-->MOD[models]
API-->POL[policies]
@flowend

<dl>
<dt>/api/controllers</dt>
<dd>...</dd>

<dt>/api/models</dt>
<dd></dd>

<dt>/api/policies</dt>
<dd></dd>

<dt>/api/hooks</dt>
<dd></dd>

<dt>/api/responses</dt>
<dd></dd>
</dl>

## /assets
The `/assets` directory contains all your images, CSS styles, and front-end JavaScript code to run in the browser.

@flowstart
graph TB
API((assets))-->DEP[dependencies]
API-->IMG[images]
API-->JS[js]
API-->CSS[styles]
API-->TPL[templates]
@flowend

## /config
The `/config` directory contains all the configuration files for your Sails application. You're also able to specify environment-specific overrides in the `/config/env` directory (ie, for development and production).

<!--
| File          | Purpose                                                                                        |
|---------------|------------------------------------------------------------------------------------------------|
| /env/         | Something about connections    |
| /locales/     | Something about connections    |
| blueprints.js | Something about connections    |
| bootstrap.js  | Something about connections    |
| custom.js     | Something about connections    |
| datastores.js | Something about connections    |
| globals.js    | Something about connections    |
| http.js       | Something about connections    |
| i18n.js       | Something about connections    |
| log.js        | Cuz boom boxes are still cool! |
| models.js     | Cuz boom boxes are still cool! |
| policies.js   | Cuz boom boxes are still cool! |
| routes.js     | Cuz boom boxes are still cool! |
| security.js   | Cuz boom boxes are still cool! |
| session.js    | Cuz boom boxes are still cool! |
| sockets.js    | Cuz boom boxes are still cool! |
| views.js      | Cuz boom boxes are still cool! |
-->

## /test
As good developers, our `/test` directory should contain unit tests and end-to-end tests for our application. Out of the box Sails comes with some example tests using Mocha, but it's also possible to [use jest for testing Sails.js applications](./using-jest-with-sails-js.md).

## /views
The `/views` directory contains HTML templates that will be used to display pages (and emails!) to your users. By default, Sails uses the [EJS](https://www.npmjs.com/package/ejs) templating library, but it's also possible to switch this out with other HTML templating engines.

@flowstart
graph TB
API((views))-->DEP[layouts]
API-->IMG[pages]
API-->JS[email]
@flowend

## /scripts
Sails version 1 introduced so-called [shell scripts](###) which allow you to run code that is part of your Sails application from outside the main 'run-a-web-server-and-handle-all-the-clients' process. This can be useful for running scheduled tasks (with something like [cron](https://en.wikipedia.org/wiki/Cron)), for performing database migrations or imports, and other periodic or one-off tasks.

## /tasks
The configuration files for [Grunt](https://www.npmjs.com/package/grunt) go here. Grunt is configured to run the scripts in the `/tasks` directory to bundle and minify your front-end assets when running in production mode, and also to simplify things in development.
