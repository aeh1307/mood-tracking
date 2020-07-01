export const state = () => ({
  showCalendar: true,
  showStats: false,
})

export const getters = {
  showCalendar: state => {
    return state.showCalendar;
  },
  showStats: state => {
    return state.showStats;
  }
}

export const mutations = {
  setShowCalendar(state, boolean){
    state.showCalendar = boolean
  },
  setShowStat(state, boolean){
    state.showStats = boolean
  },
}
