const admin = require('firebase-admin')
const key = require('../secrets/serviceAccount.json') // You will get it inside your firebase project settings

// eslint-disable-next-line import/no-mutable-exports
let adminApp

if (admin.apps.length > 0) {
  adminApp = admin
} else {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(key)
  })
}

export default adminApp
