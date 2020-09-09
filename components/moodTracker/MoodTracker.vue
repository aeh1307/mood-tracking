<template>
  <div class="moodTracker">

    <div class="emotionOverview" v-if="showEmotionOverview">
      <ul class="circleEmojiContainer">
        <li class="emojiListElement">
          <div class="circlePart1 circlePart">
            <v-icon class="emoji tenseNervousEmoji">fas fa-frown-open</v-icon>
          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart3 circlePart">
            <v-icon class="emoji excitedLivelyEmoji">fas fa-grin-stars</v-icon>
          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart4 circlePart">
            <v-icon class="emoji cheerfulHappyEmoji">fas fa-laugh-beam</v-icon>
          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart7 circlePart">
            <v-icon class="emoji relaxedCalmEmoji">fas fa-smile-beam</v-icon>
          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart8 circlePart">

          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart6 circlePart">
            <v-icon class="emoji gloomySadEmoji">fas fa-frown</v-icon>
          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart5 circlePart">
            <v-icon class="emoji boredWearyEmoji">fas fa-meh</v-icon>
          </div>
        </li>
        <li class="emojiListElement">
          <div class="circlePart2 circlePart">
            <v-icon class="emoji irritatedAnnoyedEmoji">fas fa-angry</v-icon>
          </div>
        </li>
      </ul>

    </div>

    <div v-if="showEmotionOverview" class="outerCircle" v-on:click="closeEmotionOverview">
      <div class="innerCircle">
        <div class="selectMoodText">
          <div class="bar1"></div>
          <div class="bar2"></div>
        </div>
      </div>
    </div>
    <div v-if="!showEmotionOverview" class="outerCircle" v-on:click="openEmotionOverview">
      <div class="innerCircle">
        <div class="selectMoodText">Select <br/> Mood</div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "MoodTracker.vue",
  data() {
    return {
      showEmotionOverview: false,
    }
  },
  computed: {
    /* swipeElement: {
       get() {return this.$store.getters['moodtracker/swipeElement']}
     },*/
    count: {
      get() {
        return this.$store.getters['moodtracker/count']
      }
    },
  },
  mounted() {
    this.$store.commit('moodtracker/setShowConfirmationBubble', false)
  },
  methods: {
    openEmotionOverview() {
      this.showEmotionOverview = true;
    },
    closeEmotionOverview() {
      this.showEmotionOverview = false;
    }
  }
}

</script>


<style scoped>
.moodTracker {
  width: 100px;
  margin-bottom: 120px;
  position: relative;
  margin-left: -8px; /*TODO: FIX*/
  display: flex;
  justify-content: center;
}

.emotionOverview {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background-color: #8fe2ee;
  position: absolute;
  margin-bottom: 260px;
  display: flex;
  /* align-items: center;*/
  /*  justify-content: center;*/
  bottom: -239px;
  overflow: visible;
}

.circleEmojiContainer {
  position: relative;
  width: 280px;
  height: 280px;
  transform: skewY(0deg) rotate(0deg);
  border-radius: 50%;
  border: 5px solid #514A9D;

}

.emojiListElement {
  list-style-type: none;
  display: flex;
  justify-content: center;
  position: absolute;
/*  border: 1px solid white;*/
}

.emoji {
  font-size: 72px;
  position: fixed;
  overflow-y: visible;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-self: center;
  display: block;
  left: 25px;
  top: -45px;
/*  border: 2px solid red;*/
}

.emoji::after {
  content: "";
  background: white;
  width: 47px;
  height: 47px;
  position: absolute;
  opacity: 1.0;
  top: 14px;
  left: 10px;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.bar1, .bar2 {
  width: 30px;
  height: 4px;
  background-color: #3f3f41;
  margin: 3px 0;
  transition: 0.4s;
  justify-content: flex-end;
}

.bar1 {
  transform: rotate(-45deg) translate(-3px, 2px);
}

.bar2 {
  transform: rotate(45deg) translate(-3px, -2px);
}

.outerCircle {
  position: absolute;
  border: 1px solid #514A9D;
  padding: 0;
  bottom: -55px;
  min-width: 110px;
  min-height: 110px;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
}

.innerCircle {
  min-width: 95px;
  min-height: 95px;
  border-radius: 50%;
  background: white;
  position: absolute;
  border: 1px solid #514A9D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: bolder;
  color: #3f3f41;
}

/*  .selectMoodText {
    animation: shake 1.0s cubic-bezier(.36,.07,.19,.97) both;
    animation-iteration-count: 3;
  }*/

.tenseNervousEmoji {
  color: #3CBB75;
  transform: rotate(-15deg);
}

.irritatedAnnoyedEmoji {
  color: #DE6465;
  transform: rotate(30deg);
}

.boredWearyEmoji {
  color: #8B42CC;
  transform: rotate(75deg);
}


.gloomySadEmoji {
  color: #3D3D3D;
  transform: rotate(120deg);
}

.excitedLivelyEmoji {
  color: #EB7955;
  transform: rotate(300deg);
}

.cheerfulHappyEmoji {
  color: #F7CB50;
  transform: rotate(255deg);
}


.relaxedCalmEmoji {
  color: #425CCC;
  transform: rotate(210deg);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

li {
  overflow: visible;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
  /*  border-left: 1px solid black;*/
}

.circlePart {
  position: absolute;
  left: -90%;
  top:30px;
  width: 260%;
  height: 300%;
  text-align: center;
  transform: skewY(0deg) rotate(15deg);
  /*  margin: 20px;*/
  /*   border: 1px solid black;*/
}

li:first-child {
  transform: rotate(0deg) skewY(0deg);
}

li:nth-child(2) {
  transform: rotate(45deg) skewY(0deg);
}

li:nth-child(3) {
  transform: rotate(90deg) skewY(0deg);
}

li:nth-child(4) {
  transform: rotate(135deg) skewY(0deg);
}

li:nth-child(5) {
  transform: rotate(180deg) skewY(0deg);
}

li:nth-child(6) {
  transform: rotate(225deg) skewY(0deg);
}

li:nth-child(7) {
  transform: rotate(270deg) skewY(0deg);
}

li:nth-child(8) {
  transform: rotate(315deg) skewY(0deg);
}

/*
li:first-child .circlePart {
  background: #ffffff;
}

li:nth-child(2) .circlePart {
  background: white;
}

li:nth-child(3) .circlePart {
  background: white;
}

li:nth-child(4) .circlePart {
  background: white;
}

li:nth-child(5) .circlePart {
  background: white;
}

li:nth-child(6) .circlePart {
  background: white;
}

li:nth-child(7) .circlePart {
  background: white;
}*/

</style>
