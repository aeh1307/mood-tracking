export const state = () => ({
  user: {},
  isLoggedIn: false,
})

export const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
}


export const mutations = {

  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null

      // perform logout operations
    } else {
      console.log("ON AUTH TEST");
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
  },

  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null

      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  },

  setIsLoggedIn(state, boolean) {
    state.isLoggedIn = boolean
  }
}
