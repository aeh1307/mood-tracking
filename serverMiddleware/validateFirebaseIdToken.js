import Cookies from 'cookies'
import admin from '../services/firebase-admin-init'

export default (req, res, next) => {
  getIdTokenFromRequest(req, res).then((idToken) => {
    if (idToken) {
      addDecodedIdTokenToRequest(idToken, req).then(() => {
  /*      fetchUserDataFirestore(req.user, req).then(() => {*/
          next()
  /*      })*/
      })
    } else {
      next()
    }
  })
}

function getIdTokenFromRequest(req, res) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    return Promise.resolve(req.headers.authorization.split('Bearer ')[1])
  }
  return new Promise((resolve) => {
    const cookie = new Cookies(req, res)
    // console.log(cookie.get('__session'))
    if (typeof cookie.get('__session') !== 'undefined') {
      // console.log('Found "__session" cookie')
      // Read the ID Token from cookie.
      resolve(cookie.get('__session'))
    } else {
      resolve()
    }
  })
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
function addDecodedIdTokenToRequest(idToken, req) {
  return admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      // console.log('ID Token correctly decoded', decodedIdToken)
      req.user = decodedIdToken
    })
    .catch((error) => {
      console.error('Error while verifying Firebase ID token:', error)
    })
}

/*function fetchUserDataFirestore(user, req) {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const user = {
          name: doc.data().name,
          email: doc.data().email.toLowerCase(),
          petName: doc.data().petName,
          uid: doc.id
        }

        // Set user request data
        req.userData = user
      }
    })
    .catch((error) => {
      console.error(error.message)
    })
}*/
