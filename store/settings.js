export const state = () => ({
  backgroundImagePath: '_nuxt/assets/bali.jpg',
  showBackgroundImagePicker: false,
})

export const getters = {
  backgroundImagePath: state => {
   return state.backgroundImagePath;
 },
  showBackgroundImagePicker: state => {
    return state.showBackgroundImagePicker
  },
}

export const mutations = {
  setBackgroundImagePath(state, string){
    state.backgroundImagePath = string;
  },
  setShowBackgroundImagePicker(state, boolean){
  state.showBackgroundImagePicker = boolean;
  },
}

