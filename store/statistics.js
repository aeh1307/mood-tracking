export const state = () => ({
  showCalendar: true,
  showMoodSection: true,
  showCalendarMoodDetails: false,
  showStats: false,
  showDatePicker: true,
  selectedDate: new Date().toISOString().slice(0, 10),
  moods: [],
  selectedDateMoods: [],
})


export const getters = {
  showCalendar: state => {
    return state.showCalendar;
  },
  showCalendarMoodDetails: state => {
    return state.showCalendarMoodDetails;
  },
  showMoodSection: state => {
    return state.showMoodSection
  },
  showStats: state => {
    return state.showStats;
  },
  showDatePicker: state => {
    return state.showDatePicker;
  },
  selectedDate: state => {
    return state.selectedDate;
  },
  selectedDateMoods: state => {
    return state.selectedDateMoods;
  },
  moods: state => {
    return state.moods;
  },
}

export const mutations = {
  setShowCalendar(state, boolean){
    state.showCalendar = boolean
  },
  setShowCalendarMoodDetails(state, boolean){
    state.showCalendarMoodDetails = boolean
  },
  setShowMoodSection(state, boolean){
    state.showMoodSection = boolean
  },
  setShowStat(state, boolean){
    state.showStats = boolean
  },
  setShowDatePicker(state, boolean){
    state.showDatePicker = boolean
  },
  setSelectedDate(state, string){
    state.selectedDate = string
  },
  addSelectedDateMoods(state, object){
    state.selectedDateMoods.push(object)
  },
  emptySelectedDateMoods(state){
    state.selectedDateMoods = []
  },
  addMoods(state, object){
    state.moods.push(object)
  },
  emptyMoods(state){
    state.moods = []
  },
}
