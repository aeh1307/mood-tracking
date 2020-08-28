export const state = () => ({
  user: {},
  isLoggedIn: false,
})

export const getters = {
  user: state => {
    return state.user
  },
  isLoggedIn: state => {
    return state.isLoggedIn
  },
}


export const mutations = {
  setUser(state, object) {
    state.isLoggedIn = object
  },
  setIsLoggedIn(state, boolean) {
    state.isLoggedIn = boolean
  }
}
