import { auth } from '~/plugins/firebase-client-init'

export default function ({ store, redirect }) {
  console.log("PageChange: ", redirect)
  if (process.server) {

  } else if (process.client) {
    if (!auth.currentUser.uid) {
      return redirect('/login')
    }
  }
}
