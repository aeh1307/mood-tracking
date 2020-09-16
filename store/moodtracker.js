export const state = () => ({
  showConfirmationBubble: false,
  showFeedbackBubble: false,
  showEmotionOverview: false,
/*  count: 0,*/
  emojiDescription: 'Cheerful/Happy',
  degreeOfEmotion: 4,
  notes: '',
})

export const getters = {
  showConfirmationBubble: state => {
    return state.showConfirmationBubble
  },
  showFeedbackBubble: state => {
    return state.showFeedbackBubble
  },
  showEmotionOverview: state => {
    return state.showEmotionOverview
  },
/*  count: state => {
    return state.count
  },*/
  emojiDescription: state => {
    return state.emojiDescription
  },
  degreeOfEmotion: state => {
    return state.degreeOfEmotion
  },
  notes: state => {
    return state.notes
  }
}

export const mutations = {
  setShowConfirmationBubble (state, boolean) {
      state.showConfirmationBubble = boolean
  },
  setShowFeedbackBubble (state, boolean) {
    state.showFeedbackBubble = boolean
  },
  setShowEmotionOverview (state, boolean) {
    state.showEmotionOverview = boolean
  },
/*  setCount (state, number) {
    state.count = number
  },*/
  incrementCount (state){
    state.count++
  },
  setEmojiDescription (state, string) {
    state.emojiDescription = string
  },
  setDegreeOfEmotion (state, number) {
    state.degreeOfEmotion = number
  },
  setNotes (state, string) {
  state.notes = string
}
}

