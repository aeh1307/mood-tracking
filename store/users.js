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


export const mutations = {
  setIsLoggedIn(state, boolean) {
    state.isLoggedIn = boolean
  },
  setUser(state, user) {
    state.user = user;
  }
}
