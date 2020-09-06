import Cookies from 'js-cookie'
import { auth } from '~/plugins/firebase-client-init'

export default (context) => {
  auth.addAuthTokenListener((idToken) => {
    // 3600 sec = 0.04166667 Days
    Cookies.set('__session', idToken, { expires: idToken ? 0.04166667 : 0 })
  })
}
