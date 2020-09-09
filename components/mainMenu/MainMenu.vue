<template>
  <div class="mainMenu">
<!--    <EmojiDescription/>-->
    <div class="navigation">
      <nuxt-link to="/moodstatistics/statistics" class="statistics">
        <v-icon class="heartIcon">fas fa-heartbeat</v-icon>
        <p class="iconCaption">Statistics</p></nuxt-link>
      <MoodTracker/>

      <a href="https://lifekeys.no/" class="contact"><img class="lifekeys" src="@/assets/lifekeysLogo.png"/>
        <p class="iconCaption">Contact</p></a>
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
  background: linear-gradient(to right, #24C6DC, #514A9D);
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
}

.messageIcon {
  height: 45px;
  width: 45px;
  align-self: center;
}

.heartIcon {
  color: #F5F5F5;
  font-size: 35px;
}


</style>
