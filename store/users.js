export const state = () => ({
  user: {},
  isLoggedIn: false,
})

export const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  getUser: state => {
    return state.user
  }
}

function convertFirestoreUserToClientUser(firestoreUser) {
  return {
    user_id: firestoreUser.uid,
    email: firestoreUser.email,
    refresh_token: firestoreUser.refreshToken
  }
}

export const actions = {
  loginClient(context, firestoreUser) {
    console.log(firestoreUser);
    context.commit('setUser', convertFirestoreUserToClientUser(firestoreUser))
    console.log(convertFirestoreUserToClientUser(firestoreUser));
  }
}

export const mutations = {
  setIsLoggedIn(state, boolean) {
    state.isLoggedIn = boolean
  },
  setUser(state, user) {
    state.user = user;
  }
}
