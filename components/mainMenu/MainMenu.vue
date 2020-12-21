<template>
  <div class="mainMenu">
    <EmojiDescription v-if="showMoodTracker"/>
    <div class="navigation">
      <nuxt-link to="/moodstatistics/statistics" class="statistics">
        <v-icon class="heartIcon">fas fa-heartbeat</v-icon>
        <p class="iconCaption">Statistics</p></nuxt-link>
      <MoodTracker class="moodTrackerVisibility"/>
      <div class="moodTrackingButton" v-on:click="goToMoodTracking">
        <v-icon class="cheerfulHappyEmoji">fas fa-laugh-beam</v-icon>
        <div class="iconCaption">Mood Tracking</div>
      </div>
      <a href="" class="contact"><img class="contactIcon" src="@/assets/messageIcon.png"/>
        <p class="iconCaption">Contact</p></a>
    </div>
  </div>
</template>

<script>
import MoodTracker from "../moodTracker/MoodTracker";
import EmojiDescription from "../emojiDescription/EmojiDescription";

export default {
  name: 'MainMenu.vue',
  data(){
    return {
      showMoodTracker: false,
    }
  },
  components: {
    MoodTracker,
    EmojiDescription,
  },
  methods: {
    goToMoodTracking: function () {
      this.$router.push(this.$router.options.base);
      this.$store.commit('statistics/setShowCalendar', true);
      this.$store.commit('statistics/setShowStat', false);
      this.$store.commit('statistics/setSelectedPage', 'Calendar');
    },
  },
  watch: {
    $route: function() {
      let moodTracker = document.querySelector('.moodTrackerVisibility');
      let moodTrackingButton = document.querySelector('.moodTrackingButton');
      if (this.$route.path === "/") {
        moodTracker.style.display = "block";
        moodTrackingButton.style.display = "none";
        this.showMoodTracker = true
      } else  {
        moodTracker.style.display = "none";
        moodTrackingButton.style.display = "block";
        this.showMoodTracker = false
      }
    }
  },
  mounted() {
    let moodTracker = document.querySelector('.moodTrackerVisibility');
    let moodTrackingButton = document.querySelector('.moodTrackingButton');
    if (this.$route.path === "/") {
      moodTracker.style.display = "block";
      moodTrackingButton.style.display = "none";
      this.showMoodTracker = true
    } else  {
      moodTracker.style.display = "none";
      moodTrackingButton.style.display = "block";
      this.showMoodTracker = false
    }
  }
}
</script>

<style scoped>
.mainMenu {
  position: fixed;
  background: linear-gradient(to right, #24C6DC, #514A9D);
  min-width: 100%;
  max-width: 100%;
  bottom: 0;
  height: 110px;
}

.moodTrackerVisibility {
  visibility: visible;
}

.navigation {
  max-width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.contact, .statistics {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;
}

.iconCaption {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  text-align: center;
}

.contactIcon {
  height: 45px;
  width: 45px;
  display: flex;
  align-self: center;
}

.heartIcon {
  color: #F5F5F5;
  font-size: 35px;
}

.cheerfulHappyEmoji{
  display: flex;
  color: #F5F5F5;
  font-size: 35px;
}

.moodTrackingButton {
  display:flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  border-left: 1px solid #F5F5F5;
  border-right: 1px solid #F5F5F5;
  padding: 10px;
}

</style>
