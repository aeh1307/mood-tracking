<template>
  <div>
      <div class="loginComponent" v-if="!isLoggedIn">
        <Login/>
      </div>
      <div v-if="isLoggedIn">
        <h1>Test</h1>
        <TopMenu/>
        <nuxt/>
        <BackgroundImagePicker is="BackgroundImagePicker" v-if="showBackgroundImagePicker"/>
        <ConfirmationBubble is="ConfirmationBubble" v-if="showConfirmationBubble"/>
        <FeedbackBubble is="FeedbackBubble" v-if="showFeedbackBubble"/>
        <MainMenu is="MainMenu"/>
      </div>
  </div>
</template>
<script>
  import MainMenu from "~/components/mainMenu/MainMenu";
  import TopMenu from "~/components/topMenu/TopMenu";
  import ConfirmationBubble from "~/components/confirmationBubble/ConfirmationBubble";
  import FeedbackBubble from "~/components/feedbackBubble/FeedbackBubble";
  import BackgroundImagePicker from "~/components/backgroundImagePicker/BackgroundImagePicker";
  import Login from "~/components/login/Login.Vue";

  export default {
    components: {
      MainMenu,
      TopMenu,
      ConfirmationBubble,
      FeedbackBubble,
      BackgroundImagePicker,
      Login,
    },
    computed: {
      showConfirmationBubble: { get() {return this.$store.getters['moodtracker/showConfirmationBubble']}},
      showFeedbackBubble: { get() {return this.$store.getters['moodtracker/showFeedbackBubble']}},
      showBackgroundImagePicker: { get() {return this.$store.getters['settings/showBackgroundImagePicker']}},
      isLoggedIn: { get() {return this.$store.getters['users/isLoggedIn']}},
    }
  }


</script>

<style>
html, body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}

.loginComponent{
  height: 100vh;
  width: 100vw;
}
</style>
