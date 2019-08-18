# Deploying Your Application
Queue the celebration - your app is complete (or at least functional and ready to show the world), and the time has come to make it available online.
Most of the hard work is done - you've written your code (and tests to boot!), but there's still a few things that need to be done so we can sleep sound at night knowing our application is online and happily serving traffic.

## What we're going to cover
<!--
The possibilities are endless when it comes to [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service), [IaaS](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) and other environment-in-a-box services.
-->

In these guides we will look at production-ready configuration options for your Sails application, and at process management [using PM2](./using-pm2-with-sailsjs) to make sure our application is running, and will be restarted should any uncaught exceptions unexpectedly kill our application process.

We will also [deploy our Sails.js application with nginx](./nginx.md) on a Linux VPS which will serve all user requests and proxy them to our Sails application.

## The moving parts
Perhaps obviously, our application needs to run _somewhere_ and be accessible on the internet.

Our app will communicate with a database engine for data storage and retrieval, [redis](https://en.wikipedia.org/wiki/Redis) for storing user sessions and WebSocket communication, and a file system (the local disk, or something fancy like Amazon's S3) for storing user uploads and other files.

The flow chart below also contains a _Load Balancer_ which can be used to help prepare your application for production traffic levels and [horizontal scaling](https://en.wikipedia.org/wiki/Scalability#HORIZONTAL-SCALING).

@flowstart
graph LR
C((Clients))-->N[Ingress/<br>Load Balancer]
N-->S[Sails]
N-->SN[Sails]
N-->SNN[Sails]
X{ }
S-->X
SN-->X
SNN-->X
X-->DB[Database]
X-->R[Redis]
X-->FS[File System]
@flowend

## Considerations
## Database

## Redis/Session Storage

## Sockets

## Process Management

## Production Config
