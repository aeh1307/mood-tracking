<template>
  <div class="mainMenu">
<!--    <EmojiDescription/>-->
    <div class="navigation">
      <div class="statisticsContainer">
        <nuxt-link to="/moodstatistics/statistics" class="statistics">
          <v-icon class="heartIcon">fas fa-heartbeat</v-icon>
          <p class="iconCaption">Statistics</p></nuxt-link>
      </div>

      <MoodTracker v-if="showMoodTracker"/>
      <div v-if="!showMoodTracker" class="moodTrackingButton" v-on:click="goToMoodTracking">
        <v-icon class="cheerfulHappyEmoji">fas fa-laugh-beam</v-icon>
        <div class="iconCaption">Mood Tracking</div>
      </div>
      <div class="contactContainer">
      <a href="" class="contact"><img class="messageIcon" src="@/assets/messageIcon.png"/>
        <p class="iconCaption">Contact</p></a>
      </div>
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
      let statisticsButton = document.querySelector('.statisticsContainer');
      if (this.$route.path === "/") {
        this.showMoodTracker = true
        statisticsButton.style.borderBottom = "none";
      } else  {
        this.showMoodTracker = false
        statisticsButton.style.borderBottom = "2px solid white";
        this.$store.commit("moodtracker/setShowEmotionOverview", false);
      }
    }
  },
  mounted() {
    let statisticsButton = document.querySelector('.statisticsContainer');
    if (this.$route.path === "/") {
      this.showMoodTracker = true
      statisticsButton.style.borderBottom = "none";
    } else  {
      this.showMoodTracker = false
      statisticsButton.style.borderBottom = "2px solid white";
      this.$store.commit("moodtracker/setShowEmotionOverview", false);
    }
  }
}
</script>

<style scoped>
.mainMenu {
  position: fixed;
  background: linear-gradient(to right, #24c6dc, #514A9D);
/*  background: linear-gradient(to right, #ad5389, #3c1053);*/
  min-width: 100%;
  max-width: 100%;
  bottom: 0;
  height: 110px;
}

.navigation {
  max-width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.statisticsContainer {
  left: 25px;
  position: absolute;
  z-index: 2;
}

.contactContainer {
  right: 25px;
  position: absolute;
  z-index: 2;
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

.messageIcon {
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
