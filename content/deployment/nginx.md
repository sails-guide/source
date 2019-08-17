# Deploying Sails.js with nginx

Nginx is a powerful and lightweight HTTP server that we use to proxy between
the internet and our Sails application. By serving our web traffic with nginx we will be able to load-balance our web
traffic between multiple application servers, host several domains or SSL certificates on the same IP address, set up L4 rate-limiting and access controls and much more.

@flowstart
graph TB
C((Users))-->N[Nginx]
N-->S[Sails]
N-->S2[Sails]
N-->S3[Sails]
@flowend

## Application Requirements
In order for client IP addresses to be accessible in Sails, you'll need to set [`sails.config.http.trustProxy`](https://sailsjs.com/documentation/reference/configuration/sails-config-http) to `true`. This guide also assumes that you have already configured your Sails application to run as a long-lived service.

## Installing nginx
You may need to first install nginx if it's not already.
The following commands should be enough to get you started quickly.

If you want to make sure you're running the latest version
or to create a custom build of nginx you should check out the official [nginx installation docs](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
as OS distributions can often include old versions in their software repositories.

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

The following nginx configuration file contains the [bare necessities](https://www.youtube.com/watch?v=9ogQ0uge06o) required to get nginx to proxy HTTP and WebSocket requests to our Sails.js application. It assumes that nginx and your Sails app are running on the same machine, and Sails is accepting requests on port `1337`.

```nginx
upstream upstream-kittehblr {
    server 127.0.0.1:1337;
}

# This will proxy all HTTP and WebSocket requests to our Sails application defined above
server {
  listen 80;
  server_name kittehblr.com www.kittehblr.com;

  location / {
    # Send all requests to our Sails Application
    proxy_pass http://upstream-kittehblr;

    # Proxy headers required for WebSocket connections
    proxy_redirect     off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Pass the client IP and requested Host (ie, kittehblr.com) to Sails as request headers
    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}

```

The `upstream` block tells nginx where to find our application. For now we have just the one server (`127.0.0.1`), but in the future you could easily have nginx [load balance requests between multiple servers](https://dnsdetective.net/articles/networking/http-load-balancing-with-nginx) to handle increased load. Just add another `server` line and `sudo service nginx reload` to tell nginx about the configuration change.

The [`server`](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/) block defines our public facing proxy settings. Namely that we want to serve traffic for `kittehblr.com` and `www.kittehblr.com` on port `80` ("regular" HTTP port).

The `location /` block passes ___all___ requests to our Sails application.

## Serving static files with nginx
```
[ request ] --> [ nginx ] --> [ Sails.js App ]
```
nginx is likely to be able to serve static assets (your CSS, images, frontend JavaScript, etc) more efficiently than your node application,

## File Caching

## Configuring SSL

## All together now


```nginx
upstream upstream-kittehblr {
    server 127.0.0.1:1337;
    # We could add multiple servers here, if we had them
    # 10.0.0.2:1337;
    # 10.0.0.3:1337;
}

map $sent_http_content_type $expires_kittehblr {
    default                    off;
    text/html                  epoch;
    text/css                   max;
    application/javascript     max;
    ~image/                    168h;
}

server {
  listen 80;
  server_name kittehblr.com www.kittehblr.com;

  access_log /var/log/nginx/kittehblr.com.access.log;
  error_log /var/log/nginx/kittehblr.com.error.log error;

  root /opt/kittehblr;

  client_max_body_size 12M;
  expires $expires_kittehblr;

  location / {
    # Pass off API and socket requests to the app server
    proxy_pass http://upstream-kittehblr;
    proxy_redirect     off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}

```
