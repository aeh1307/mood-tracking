export const state = () => ({
  showConfirmationBubble: false,
  showFeedbackBubble: false,
  swipeElement: 3,
  count: 0,
  emojiDescription: 'Cheerful/Happy',
  degreeOfEmotion: 0,
})

export const getters = {
  showConfirmationBubble: state => {
    return state.showConfirmationBubble
  },
  showFeedbackBubble: state => {
    return state.showFeedbackBubble
  },
  swipeElement: state => {
    return state.swipeElement
  },
  count: state => {
    return state.count
  },
  emojiDescription: state => {
    return state.emojiDescription
  },
  degreeOfEmotion: state => {
    return state.degreeOfEmotion
  }
}

export const mutations = {
  setShowConfirmationBubble (state, boolean) {
      state.showConfirmationBubble = boolean
  },
  setShowFeedbackBubble (state, boolean) {
    state.showFeedbackBubble = boolean
  },
  setSwipeElement (state, number) {
    state.swipeElement = number
  },
  setCount (state, number) {
    state.count = number
  },
  incrementCount (state){
    state.count++
  },
  setEmojiDescription (state, string) {
    state.emojiDescription = string
  },
  setDegreeOfEmotion (state, number) {
    state.degreeOfEmotion = number
  },
}

