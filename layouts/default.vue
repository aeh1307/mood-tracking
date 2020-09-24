<template>
  <div>
    <TopMenu/>
    <nuxt/>
    <BackgroundImagePicker is="BackgroundImagePicker" v-if="showBackgroundImagePicker"/>
    <ConfirmationBubble is="ConfirmationBubble" v-if="showConfirmationBubble"/>
    <FeedbackBubble is="FeedbackBubble" v-if="showFeedbackBubble"/>
    <MainMenu is="MainMenu"/>
  </div>
</template>
<script>
  import { auth, db } from '~/plugins/firebase-client-init';
  import MainMenu from "~/components/mainMenu/MainMenu";
  import TopMenu from "~/components/topMenu/TopMenu";
  import ConfirmationBubble from "~/components/confirmationBubble/ConfirmationBubble";
  import FeedbackBubble from "~/components/feedbackBubble/FeedbackBubble";
  import BackgroundImagePicker from "~/components/backgroundImagePicker/BackgroundImagePicker";

  export default {
    middleware: 'authenticated',
    beforeCreate() {
      if (process.server) {
      } else if (process.client) {
        let uid = this.$store.getters["users/getUser"].user_id;

        if (auth.currentUser) {
          uid = auth.currentUser.uid;
        }

        db.collection("users").doc(uid).collection("moodTracking")
          .orderBy('time').onSnapshot(querySnapshot => {
          this.$store.commit('statistics/emptyMoods');
          let trackedMoods = []
          querySnapshot.forEach(doc => {
            // Degree of emotion, emotion, time, id:
            let trackedMood = {
              degreeOfEmotion: doc.data().degreeOfEmotion,
              emotion: doc.data().emotion,
              time: doc.data().time,
              notes: doc.data().notes,
              id: doc.id
            }
            trackedMoods.push(trackedMood)
          })
          this.$store.commit('statistics/addMoods', trackedMoods)
        })
      }
    },
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
      showBackgroundImagePicker: { get() {return this.$store.getters['settings/showBackgroundImagePicker']}},
      isLoggedIn: { get() {return this.$store.getters['users/isLoggedIn']}},
    },


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
