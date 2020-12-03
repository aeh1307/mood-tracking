# mood-tracking

The app is part of a master thesis at the University of Bergen (UiB) in the institute of information and media science
and Centre for the Science of Learning & Technology (SLATE). The purpose of this project is to gain insight into how to best design a mental health app for
students, and investigate which attitudes students have towards usage of such apps.

This app was build as a start of the prototype of a mental health mood tracking app for students. 
The app was built in Vue.js using Nuxt.js for server side rendering, and Firebase for data storage. 
The app was at this stadium web based, in order to easily get access on both iOS and Android mobile phones in early testing.

It is important to note that the app has known bugs. These were dealt with, and the app was improved when 
integrating it into an open source project started by Suresh KUMAR Mukhiya (Phd) at Bergen University College;

- Frontend: https://github.com/sureshHARDIYA/psycometric-mobile
- Backend: https://github.com/sureshHARDIYA/psycometric

To integrate the app into the open source project, all frontend code was rewritten in react native, and 
backend was extended with new modules to support the actions of tracking, retrieving, and deleting mood in the app.


## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
