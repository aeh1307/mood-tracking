<template>
  <div>
    <TopMenu/>
    <nuxt/>
    <BackgroundImagePicker v-if="showBackgroundImagePicker"/>
    <ConfirmationBubble v-if="showConfirmationBubble"/>
    <FeedbackBubble v-if="showFeedbackBubble"/>
    <MainMenu/>
  </div>
</template>
<script>
  import MainMenu from "../components/mainMenu/MainMenu";
  import TopMenu from "../components/topMenu/TopMenu";
  import ConfirmationBubble from "../components/ConfirmationBubble/ConfirmationBubble";
  import FeedbackBubble from "../components/FeedbackBubble/FeedbackBubble";
  import BackgroundImagePicker from "../components/BackgroundImagePicker/BackgroundImagePicker";

  export default {
    components: {
      MainMenu,
      TopMenu,
      ConfirmationBubble,
      FeedbackBubble,
      BackgroundImagePicker,
    },
    computed: {
      showConfirmationBubble: { get() {return this.$store.getters['moodtracker/showConfirmationBubble']}},
      showFeedbackBubble: { get() {return this.$store.getters['moodtracker/showFeedbackBubble']}},
      showBackgroundImagePicker: { get() {return this.$store.getters['settings/showBackgroundImagePicker']}}
    }
  }


</script>

<style>
html, body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}
</style>
