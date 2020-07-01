<template class="container">
    <div class="mainMenu">
      <EmojiDescription/>
      <div class="navigation">
        <nuxt-link to="/moodstatistics/statistics" class="statistics"><v-icon class="heartIcon">fas fa-heartbeat</v-icon><p class="iconCaption">Statistics</p></nuxt-link>
        <MoodTracker/>
        <a href="https://lifekeys.no/" class="contact"><img class="lifekeys" src="@/assets/lifekeysLogo.png"/><p class="iconCaption">Contact</p></a>
      </div>
    </div>
</template>

<script>
  import MoodTracker from "../moodTracker/MoodTracker";
  import EmojiDescription from "../emojiDescription/EmojiDescription";
    export default {
        name: "MainMenu.vue",
        components:{
          MoodTracker,
          EmojiDescription,
        }
    }
</script>

<style scoped>
  .container {
    max-width: 100vw;
  }
  .mainMenu {
    position: fixed;
    /*background-color: rgb(42 106 170);*/
    background-color: rgb(46 119 191);
    opacity: 85%;
    min-width: 100%;
    max-width: 100%;
    bottom: 0;
    height: 25vw;
  }

  .navigation {
    max-width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .contact,  .statistics {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: white;

  }
  .iconCaption {
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
  }

  .lifekeys{
    height: 45px;
    width: 32px;
    align-self: center;
  }

  .heartIcon {
    color: #F5F5F5;
    font-size: 35px;
  }

</style>
