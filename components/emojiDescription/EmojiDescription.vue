<template>
  <div class="container">
    <div class="emojiDescription">
      <!--<span class="captionText">Tense/Nervous</span>-->
     <!-- <span class="captionText">Irritated/Annoyed</span>-->
     <!-- <span class="captionText">Excited/Lively</span>-->
      <span class="captionText">Cheerful/Happy</span>
     <!-- <span class="captionText">Bored/Weary</span>-->
      <!--<span class="captionText">Gloomy/Sad</span>-->
      <!--<span class="captionText">Relaxed/Calm</span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "EmojiDescription.vue"
  }

</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    position: absolute;
  }
  .emojiDescription {
    position: fixed;
    bottom: 0;
    width: 150px;
    text-align: center;
    padding: 5px 0;
    align-self: center;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2b2b2b;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 30px solid white;
    height: 0;
    display: flex;
    justify-content: center;
  }

  .captionText {
    bottom: -25px;
    position: absolute;
  }
</style>
