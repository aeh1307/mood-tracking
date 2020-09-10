<template>
  <div class="mainMenu">
<!--    <EmojiDescription/>-->
    <div class="navigation">
      <div class="statisticsContainer">
        <nuxt-link to="/moodstatistics/statistics" class="statistics">
          <v-icon class="heartIcon">fas fa-heartbeat</v-icon>
          <p class="iconCaption">Statistics</p></nuxt-link>
      </div>

      <MoodTracker/>
      <div class="contactContainer">
        <a href="https://lifekeys.no/" class="contact"><img class="messageIcon" src="@/assets/messageIcon.png"/>
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
  components: {
    MoodTracker,
    EmojiDescription,
  }
}
</script>

<style scoped>
.mainMenu {
  position: fixed;
  background: linear-gradient(to right, #24c6dc, #514A9D);
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
}

.contactContainer {
  right: 25px;
  position: absolute;
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


</style>
