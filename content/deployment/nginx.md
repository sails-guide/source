# Deploying Sails.js with nginx

Nginx is a powerful and lightweight HTTP server that we can easily utilise as a reverse-proxy between
the internet and our Sails application. By serving our web traffic with nginx, we will be able to load-balance our web
traffic between multiple instances of our application or several application servers, manage multiple SSL certificates,
set up rate-limiting and access controls and much more.

## Installing nginx
Perhaps obviously, we will first need to install nginx.
The following commands should be enough to get you started quickly.

If you want to make sure you're running the latest version
or to create a custom build of nginx you should check out the official [nginx installation docs](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
as OS distributions can often include old versions in their software repositories.

### Let's install it already
:::: tabs type:board-card
::: tab Ubuntu/Debian
```bash
sudo apt-get install nginx
```
:::

::: tab CentOS/RHEL
```bash
sudo yum install nginx
```
:::

::: tab OSX
Assuming you have [homebrew](https://brew.sh/) installed, simply run:
```bash
brew install nginx
```
:::
::::

## Proxying nginx requests to our application
We'll need to add a configuration file to tell nginx how and where to send requests to our Sails.js application.

:::: tabs type:board-card
::: tab Ubuntu/Debian
::: tip
If you're using Ubuntu/Debian, this configuration file will need to be placed in the `***/etc/nginx/sites-enabled***` directory
:::
::: tab CentOS/RHEL
::: tip
If you're using CentOS/RHEL, this configuration file will need to be placed in the `***/etc/nginx/sites-enabled***` directory
:::
::: tab OSX
::: tip
If you're using OSX, this configuration file will need to be placed in the `***/etc/nginx/sites-enabled***` directory
:::
::::