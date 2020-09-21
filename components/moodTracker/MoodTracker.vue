<template>
  <div class="moodTrackerWrapper">

    <div class="emotionOverview" v-if="showEmotionOverview">
      <div class="touchZones">
        <div id="tenseNervous" class="touchZoneTenseNervous" v-on:click="selectEmotion($event)"></div>
        <div id="excitedLively" class="touchZoneExcitedLively" v-on:click="selectEmotion($event)"></div>

        <div id="cheerfulHappy" class="touchZoneCheerfulHappy" v-on:click="selectEmotion($event)"></div>

        <div id="relaxedCalm" class="touchZoneRelaxedCalm" v-on:click="selectEmotion($event)"></div>

        <div id="gloomySad" class="touchZoneGloomySad" v-on:click="selectEmotion($event)"></div>

        <div id="boredWeary" class="touchZoneBoredWeary" v-on:click="selectEmotion($event)"></div>

        <div id="irritatedAnnoyed" class="touchZoneIrritatedAnnoyed" v-on:click="selectEmotion($event)"></div>
      </div>
      <div class="circleEmojiContainer">
        <ul class="circleEmojiList">
          <li class="emojiListElement">
            <div class="circlePart1 circlePart">
              <v-icon class="emoji tenseNervousEmoji" @click="closeEmotionOverview()">fas fa-frown-open</v-icon>
            </div>
            <!--  <div class="emojiCaptions">Tense/Nervous</div>-->
          </li>
          <li class="emojiListElement">
            <div class="circlePart3 circlePart">
              <v-icon class="emoji excitedLivelyEmoji">fas fa-grin-stars</v-icon>
            </div>
            <!--          <div class="emojiCaptions">Excited/Lively</div>-->
          </li>
          <li class="emojiListElement">
            <div class="circlePart4 circlePart">
              <v-icon class="emoji cheerfulHappyEmoji">fas fa-laugh-beam</v-icon>
            </div>
            <!--          <div class="emojiCaptions">Cheerful/Happy</div>-->
          </li>
          <li class="emojiListElement">
            <div class="circlePart7 circlePart">
              <v-icon class="emoji relaxedCalmEmoji">fas fa-smile-beam</v-icon>
            </div>
            <!--   <div class="emojiCaptions">Relaxed/Calm</div>-->
          </li>
          <li class="emojiListElement">
            <div class="circlePart8 circlePart">
            </div>
          </li>
          <li class="emojiListElement">
            <div class="circlePart6 circlePart">
              <v-icon class="emoji gloomySadEmoji">fas fa-frown</v-icon>
            </div>
            <!--          <div class="emojiCaptions">Gloomy/Sad</div>-->
          </li>
          <li class="emojiListElement">
            <div class="circlePart5 circlePart">
              <v-icon class="emoji boredWearyEmoji">fas fa-meh</v-icon>
            </div>
            <!--
                      <div class="emojiCaptions">Bored/Weary</div>
            -->
          </li>
          <li class="emojiListElement">
            <div class="circlePart2 circlePart">
              <v-icon class="emoji irritatedAnnoyedEmoji">fas fa-angry</v-icon>
            </div>
            <!--
                      <div class="emojiCaptions">Irritated/Annoyed</div>
            -->
          </li>
        </ul>
      </div>

      <div class="currentTrackingInfo">
        <div v-if="this.emojiDescription === ''" class="selectedEmotion">No mood selected</div>
        <div v-if="this.emojiDescription !== ''" class="selectedEmotion">{{ this.emojiDescription }}</div>
        <!--        <div class="degreeTracker">-->
        <v-app class="sliderWrapper">
          <v-container fluid>
            <v-row>
              <v-col cols="15" class="colDegree">
                <!--     <v-subheader class="sliderLabel">Degree/Intensity:</v-subheader>-->
                <v-slider
                  v-model="degreeOfEmotion"
                  :thumb-size="24"
                  thumb-label="always"
                  max="7"
                  min="1"
                  :track-color="ex2.color"
                  :thumb-color="ex3.color"
                  :color="ex1.color"
                  class="slider"
                >
                </v-slider>

              </v-col>
            </v-row>
          </v-container>
        </v-app>
        <div>
          <v-btn class="trackMoodButton" v-on:click="this.openMoodTrackingConfirmationDialog">Track</v-btn>
        </div>
      </div>


    </div>
    <div class="showEmotionOverviewButton">
      <div v-if="this.showEmotionOverview" class="outerCircle" v-on:click="closeEmotionOverview">
        <div class="innerCircle">
          <div class="selectMoodText">
            <div class="bar1"></div>
            <div class="bar2"></div>
          </div>
        </div>
      </div>
      <div v-if="!this.showEmotionOverview" class="outerCircle" v-on:click="openEmotionOverview">
        <div class="innerCircle">
          <div class="selectMoodText">Select <br/> Mood</div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: "MoodTracker.vue",
  data() {
    return {
      /*      showEmotionOverview: false,*/
      /* ex1: {label: 'color', val: 25, color: '#3c1053'},
       ex2: {label: 'track-color', val: 75, color: "white"},
       ex3: {label: 'thumb-color', val: 50, color: '#3c1053'},*/
      ex1: {label: 'color', val: 25, color: '#514A9D'},
      ex2: {label: 'track-color', val: 75, color: "white"},
      ex3: {label: 'thumb-color', val: 50, color: '#514A9D'},
      degreeOfEmotion: this.$store.getters['moodtracker/degreeOfEmotion'],
      threeScaleDegree: ['Low', 'Medium', 'High'],
    }
  },
  computed: {
    emojiDescription: {
      get() {
        return this.$store.getters['moodtracker/emojiDescription']
      }
    },
    showEmotionOverview: {
      get() {
        return this.$store.getters['moodtracker/showEmotionOverview']
      }
    },
  },
  mounted() {
    this.$store.commit('moodtracker/setShowConfirmationBubble', false);
  },
  methods: {
    openEmotionOverview() {
      this.$store.commit('moodtracker/setDegreeOfEmotion', 4);
      this.$store.commit('moodtracker/setShowEmotionOverview', true);
    },
    closeEmotionOverview() {
      this.$store.commit('moodtracker/setShowEmotionOverview', false);
      this.$store.commit('moodtracker/setDegreeOfEmotion', 4);
      this.$store.commit('moodtracker/setEmojiDescription', '');
    },
    selectEmotion(e) {
      document.querySelector('#tenseNervous').style.border = 'none';
      document.querySelector('#excitedLively').style.border = 'none';
      document.querySelector('#cheerfulHappy').style.border = 'none';
      document.querySelector('#relaxedCalm').style.border = 'none';
      document.querySelector('#gloomySad').style.border = 'none';
      document.querySelector('#boredWeary').style.border = 'none';
      document.querySelector('#irritatedAnnoyed').style.border = 'none';

      let selectedEmotionEl = document.querySelector(`#${e.target.id}`);
      switch (e.target.id) {
        case 'tenseNervous':
          this.$store.commit('moodtracker/setEmojiDescription', 'Tense/Nervous');
          selectedEmotionEl.style.border = '8px solid #3CA475';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
        case 'excitedLively':
          this.$store.commit('moodtracker/setEmojiDescription', 'Excited/Lively');
          selectedEmotionEl.style.border = '8px solid #C76A55';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
        case 'cheerfulHappy':
          this.$store.commit('moodtracker/setEmojiDescription', 'Cheerful/Happy');
          selectedEmotionEl.style.border = '8px solid #E3BA49';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
        case 'relaxedCalm':
          this.$store.commit('moodtracker/setEmojiDescription', 'Relaxed/Calm');
          selectedEmotionEl.style.border = '8px solid #4231CC';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
        case 'gloomySad':
          this.$store.commit('moodtracker/setEmojiDescription', 'Gloomy/Sad');
          selectedEmotionEl.style.border = '8px solid #202B2B';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
        case 'boredWeary':
          this.$store.commit('moodtracker/setEmojiDescription', 'Bored/Weary');
          selectedEmotionEl.style.border = '8px solid #6B42CC';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
        case 'irritatedAnnoyed':
          this.$store.commit('moodtracker/setEmojiDescription', 'Irritated/Annoyed');
          selectedEmotionEl.style.border = '8px solid #AE6465';
          // selectedEmotionEl.style.border = '6px solid #3c1053';
          break;
      }

    },
    openMoodTrackingConfirmationDialog() {
      if (this.emojiDescription !== '') {
        this.$store.commit('moodtracker/setShowConfirmationBubble', true);
      }
    }
  },
  watch: {
    degreeOfEmotion: function (val) {
      this.$store.commit('moodtracker/setDegreeOfEmotion', val);
    },
    /*   emojiDescription: function (val) {
         this.$store.commit('moodtracker/setEmojiDescription', val);
       },*/
  },
}

</script>


<style scoped>
.moodTrackerWrapper {
  min-width: 100vw;
  min-height: 110px;
  position: relative;
  z-index: 99;
/*  TODO: if 99 then statistics link does not work. if not 99 then 50% of select mood button dose not work....*/
}

.showEmotionOverviewButton {
  width: 100%;
}

.emotionOverview {
  width: 100%;
  min-width: 100%;
  min-height: 280px;
  height: 280px;
  border-radius: 50%;
  position: absolute;
  bottom: 120px;
  overflow: visible;
  display: flex;
  justify-content: center;
}

.v-application--wrap {
  min-height: 100px !important;
  z-index: -1;
}

.circleEmojiContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.circleEmojiList {
  position: absolute;
  width: 270px;
  height: 270px;
  transform: skewY(0deg) rotate(0deg);
  border-radius: 50%;
  /*    border: 5px solid #514A9D;*/
  background: linear-gradient(to right, #24C6DC, #514A9D);
  border: 5px solid #3c1053;
}

.emojiListElement {
  list-style-type: none;
  display: flex;
  flex-direction: column;
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
  border: 10px solid transparent;
  width: 62px;
  height: 62px;
  position: absolute;
  opacity: 1.0;
  top: 4px;
  left: 4px;
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
  left: 96px;
  top: -41px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}


.touchZoneIrritatedAnnoyed {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: -3px;
  left: 3px;
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
  left: 188px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneCheerfulHappy {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: 91px;
  left: 226px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneBoredWeary {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  top: 91px;
  left: -36px;
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
  left: 188px;
  top: 183px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}

.touchZoneGloomySad {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  left: 3px;
  top: 183px;
  border: 2px solid transparent;
  background-color: transparent;
  z-index: 99;
}


.bar1, .bar2 {
  width: 35px;
  height: 4px;
  background-color: #3f3f41;
  /*background-color: #3c1053;*/
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
  position: relative;
  border: 1px solid #514A9D;
  /*  border: 1px solid #3c1053;*/
  padding: 0;
  bottom: 55px;
  margin: 0 auto;
  min-width: 121px;
  max-width: 121px;
  min-height: 121px;
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
  position: relative;
  border: 1px solid #514A9D;
  /*border: 1px solid #ad5389;*/
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: bolder;
  color: #3f3f41;
}

.selectMoodText {
  /*    color: #3c1053;*/
  /*    animation: shake 1.0s cubic-bezier(.36,.07,.19,.97) both;
      animation-iteration-count: 3;*/
}

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
  text-align: center;
}

.circlePart {
  position: absolute;
  left: -90%;
  top: 30px;
  width: 260%;
  height: 300%;
  /*  text-align: center;*/
  transform: skewY(0deg) rotate(15deg);
  /*     border: 1px solid black;*/
}

.emojiCaptions {
  background-color: #fefefe;
  height: 20px;
  width: 120px;
  z-index: 99;
  transform: skewY(0deg) rotate(50deg);
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


.currentTrackingInfo {
  position: absolute;
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Manrope', sans-serif;
}

.selectedEmotion {
  position: absolute;
  width: 150px;
  height: 50px;
  margin-bottom: 70px;
  text-align: center;
  /*  font-weight: 600;*/
  color: #fefefe;
}

.sliderWrapper {
  height: 100px;
  width: 170px;
  padding: 0;
  background-color: transparent;
  border-radius: 20%;
  margin-top: 75px;

}

.colDegree {
  height: 50px;
}

.container {
  height: 50px;
  border-radius: 30%;
  background-color: transparent;
}

.sliderLabel {
  padding-top: 2px;
  color: #fefefe;
  font-weight: 300;
}

.slider {
  margin-top: 15px;
}

/*.degreeTracker{
  position: absolute;
  width: 180px;
  text-align: center;
}*/

.trackMoodButton {
  position: relative;
/*  padding: 8px 15px;*/
  border-radius: 10px;
  margin: 15px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  text-transform: none;
  color: black;
  bottom: 40px;
}

</style>
