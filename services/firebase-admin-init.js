const admin = require('firebase-admin')

// eslint-disable-next-line import/no-mutable-exports
let adminApp

if (admin.apps.length > 0) {
  adminApp = admin
} else {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert({
      "private_key": process.env.PRIVATEKEY,
      "client_email": `"${process.env.CLIENTEMAIL}"`,
      "project_id": process.env.PROJECTID,
      "type": process.env.TYPE,
      "private_key_id": process.env.PRIVATEIDKEY,
      "client_id": process.env.CLIENTID,
      "auth_uri": process.env.auth,
      "token_uri": process.env.TOKENURI,
      "auth_provider_x509_cert_url": process.env.AUTHPROVIDER,
      "client_x509_cert_url": process.env.CLIENTCERTURL,
    })
  })
}

export default adminApp
