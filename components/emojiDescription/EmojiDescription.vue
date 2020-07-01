<template>
  <div class="container">
    <div class="emojiDescription">
      <span class="captionText">{{this.emojiDescription}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EmojiDescription.vue",
    computed: {
      swipeElement: {
        get() { return this.$store.getters['moodtracker/swipeElement']}
      },
      emojiDescription: {
        get() {return this.$store.getters['moodtracker/emojiDescription']}
      }
    },
    watch: {
      swipeElement: function () {
        switch(this.swipeElement){
          case 0:
            this.$store.commit('moodtracker/setEmojiDescription', 'Tense/Nervous')
            break;
          case 1:
            this.$store.commit('moodtracker/setEmojiDescription', 'Irritated/Annoyed')
            break;
          case 2:
            this.$store.commit('moodtracker/setEmojiDescription', 'Excited/Lively')
            break;
          case 3:
            this.$store.commit('moodtracker/setEmojiDescription', 'Cheerful/Happy')
            break;
          case 4:
            this.$store.commit('moodtracker/setEmojiDescription', 'Bored/Weary')
            break;
          case 5:
            this.$store.commit('moodtracker/setEmojiDescription', 'Gloomy/Sad')
            break;
          case 6:
            this.$store.commit('moodtracker/setEmojiDescription', 'Relaxed/Calm')
            break;
        }
      }
    },
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
    width: 160px;
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
