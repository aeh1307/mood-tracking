// Todo: sort in alphabetical order:
export const state = () => ({
  showCalendar: true,
  showMoodSection: true,
  showCalendarMoodDetails: false,
  showStats: false,
  showDatePicker: true,
  selectedDate: new Date().toISOString().slice(0, 10),
  moods: [],
  selectedDateMoods: [],

  showDeleteConfirmationWindow: false,
  showEditMoodWindow: false,
  selectedId: '',
  selectedEmotion: '',
  selectedDegree: '',
  selectedTime: '',
  findSelectedMonth: '',

  selectedPage: 'Calendar',
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
  selectedPage: state => {
    return state.selectedPage;
  },
  moods: state => {
    return state.moods;
  },
  showDeleteConfirmationWindow: state => {
    return state.showDeleteConfirmationWindow;
  },
  showEditMoodWindow: state => {
    return state.showEditMoodWindow
  },
  selectedId: state => {
    return state.selectedId;
  },
  selectedEmotion: state => {
    return state.selectedEmotion;
  },
  selectedDegree: state => {
    return state.selectedDegree;
  },
  selectedTime: state => {
    return state.selectedTime;
  },
  findSelectedMonth(state) {
    let month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[state.selectedDate[1][1]-1];
  }
}

export const mutations = {
  setShowDeleteConfirmationWindow(state, boolean){
    state.showDeleteConfirmationWindow = boolean
  },
  setShowEditMoodWindow(state, boolean){
    state.showEditMoodWindow = boolean
  },
  setSelectedId(state, string){
    state.selectedId = string
  },
  setSelectedEmotion(state, string){
    state.selectedEmotion = string
  },
  setSelectedDegree(state, string){
    state.selectedDegree= string
  },
  setSelectedTime(state, string){
    state.selectedTime = string
  },
  setSelectedPage(state, string){
    state.selectedPage= string
  },
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
  addMoods(state, moodList){
    state.moods = moodList
  },
  deleteMood(state, moodId){
    state.moods.filter(m => m.id !== moodId)
  },
  emptyMoods(state){
    state.moods = []
  },
}
