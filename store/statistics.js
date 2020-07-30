export const state = () => ({
  showCalendar: true,
  showStats: false,
  showDetails: false,
  showDatePicker: true,
})

export const getters = {
  showCalendar: state => {
    return state.showCalendar;
  },
  showStats: state => {
    return state.showStats;
  },
  showDetails: state => {
    return state.showDetails;
  },
  showDatePicker: state => {
    return state.showDatePicker;
  },
}

export const mutations = {
  setShowCalendar(state, boolean){
    state.showCalendar = boolean
  },
  setShowStat(state, boolean){
    state.showStats = boolean
  },
  setShowDetails(state, boolean){
    state.showDetails = boolean
  },
  setShowDatePicker(state, boolean){
    state.showDatePicker = boolean
  },
}
