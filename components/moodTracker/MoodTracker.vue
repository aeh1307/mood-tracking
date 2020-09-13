<template>
  <div class="moodTracker">

    <div class="emotionOverview" v-if="showEmotionOverview">
      <div class="touchZones">
        <div class="touchZoneTenseNervous" v-on:click="closeEmotionOverview"></div>
        <div class="touchZoneExcitedLively" v-on:click="closeEmotionOverview"></div>
        <div class="touchZoneCheerfulHappy" v-on:click="closeEmotionOverview"></div>
        <div class="touchZoneRelaxedCalm" v-on:click="closeEmotionOverview"></div>
        <div class="touchZoneGloomySad" v-on:click="closeEmotionOverview"></div>
        <div class="touchZoneBoredWeary" v-on:click="closeEmotionOverview"></div>
        <div class="touchZoneIrritatedAnnoyed" v-on:click="closeEmotionOverview"></div>
      </div>
      <ul class="circleEmojiContainer">
        <li class="emojiListElement">
          <div class="circlePart1 circlePart">
            <v-icon class="emoji tenseNervousEmoji" @click="closeEmotionOverview()">fas fa-frown-open</v-icon>
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
    },
    selectEmotion() {
      console.log('TESSSSSSSSST');
    }
  }
}

</script>


<style scoped>
.moodTracker {
  width: 100px;
  margin-bottom: 120px;
  position: absolute;
/*  display: flex;
  align-self: center;*/
/*  justify-content: center;*/
}

.emotionOverview {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background-color: #8fe2ee;
  position: absolute;
  margin-bottom: 260px;
  display: flex;
/*  align-items: center;*/
/*  justify-content: center;
  align-self: center;
  justify-self: center;*/
  bottom: -250px;
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
}

.emoji {
  font-size: 72px;
  position: fixed;
  overflow-y: visible;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  left: 26px;
  /*left: 25px;*/
  top: -45px;
  /*  border: 2px solid red;*/
}

.emoji::after {
  content: "";
  background: white;
  border: 8px solid transparent;
  width: 59px;
  height: 59px;
  position: absolute;
  opacity: 1.0;
  top: 5px;
  left: 6px;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.touchZones {
  width: 280px;
  height: 280px;
  position: absolute;
}

/* Should be 95px from left(not 93px). to correspond to select emoji button.*/
.touchZoneTenseNervous {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  left: 95px;
  top: -43px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}


.touchZoneIrritatedAnnoyed {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: -2px;
  left: -2px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneExcitedLively {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: -3px;
  left: 192px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneCheerfulHappy {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: 94px;
  left: 233px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneBoredWeary {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: 94px;
  left: -42px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

/* TODO: is the excited lively icon 2 px higher than irritated/annoyed*/
.touchZoneRelaxedCalm {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  left: 192px;
  top: 192px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneGloomySad {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  left: -2px;
  top: 192px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}


.bar1, .bar2 {
  width: 35px;
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
  bottom: -60px;
  min-width: 120px;
  min-height: 120px;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
}

.innerCircle {
  min-width: 105px;
  min-height: 105px;
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
  top: 30px;
  width: 260%;
  height: 300%;
  text-align: center;
  transform: skewY(0deg) rotate(15deg);
  /*  margin: 20px;*/
  /*   border: 1px solid black;*/
}

/* TODO: Fix safari issue, transform where not working in last version ...*/
/* {

  -ms-transform: translateY(85px);
  -webkit-transform: translateY(85px);
  -moz-transform: translateY(85px);
  -o-transform: translateY(85px);
  transform: translateY(85px);
  z-index: 1000;
  position: relative;
  display: inline-block;

}*/

li:first-child {
  -ms-transform: rotate(0deg) skewY(0deg);
  -webkit-transform: rotate(0deg) skewY(0deg);
  -moz-transform: rotate(0deg) skewY(0deg);
  -o-transform: rotate(0deg) skewY(0deg);
  transform: rotate(0deg) skewY(0deg);
}

li:nth-child(2) {
  -ms-transform: rotate(45deg) skewY(0deg);
  -webkit-transform: rotate(45deg) skewY(0deg);
  -moz-transform: rotate(45deg) skewY(0deg);
  -o-transform: rotate(45deg) skewY(0deg);
  transform: rotate(45deg) skewY(0deg);
}

li:nth-child(3) {
  -ms-transform: rotate(90deg) skewY(0deg);
  -webkit-transform: rotate(90deg) skewY(0deg);
  -moz-transform: rotate(90deg) skewY(0deg);
  -o-transform: rotate(90deg) skewY(0deg);
  transform: rotate(90deg) skewY(0deg);
}

li:nth-child(4) {
  -ms-transform: rotate(135deg) skewY(0deg);
  -webkit-transform: rotate(135deg) skewY(0deg);
  -moz-transform: rotate(135deg) skewY(0deg);
  -o-transform: rotate(135deg) skewY(0deg);
  transform: rotate(135deg) skewY(0deg);
}

li:nth-child(5) {
  -ms-transform: rotate(180deg) skewY(0deg);
  -webkit-transform: rotate(180deg) skewY(0deg);
  -moz-transform: rotate(180deg) skewY(0deg);
  -o-transform: rotate(180deg) skewY(0deg);
  transform: rotate(180deg) skewY(0deg);
}

li:nth-child(6) {
  -ms-transform: rotate(225deg) skewY(0deg);
  -webkit-transform: rotate(225deg) skewY(0deg);
  -moz-transform: rotate(225deg) skewY(0deg);
  -o-transform: rotate(225deg) skewY(0deg);
  transform: rotate(225deg) skewY(0deg);
}

li:nth-child(7) {
  -ms-transform: rotate(270deg) skewY(0deg);
  -webkit-transform: rotate(270deg) skewY(0deg);
  -moz-transform: rotate(270deg) skewY(0deg);
  -o-transform: rotate(270deg) skewY(0deg);
  transform: rotate(270deg) skewY(0deg);
}

li:nth-child(8) {
  -ms-transform: rotate(315deg) skewY(0deg);
  -webkit-transform: rotate(315deg) skewY(0deg);
  -moz-transform: rotate(315deg) skewY(0deg);
  -o-transform: rotate(315deg) skewY(0deg);
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
