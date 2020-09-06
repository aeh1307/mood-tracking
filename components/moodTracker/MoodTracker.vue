<template>
  <div class="moodTracker">
  <div class="outerCircle">
    <ul class="circlePartContainer">
      <li>
        <div class="circlePart1 circlePart"></div>
      </li>
      <li>
        <div  class="circlePart2 circlePart"></div>
      </li>
      <li>
        <div class="circlePart3 circlePart"></div>
      </li>
      <li>
        <div class="circlePart4 circlePart"></div>
      </li>
      <li>
        <div class="circlePart5 circlePart"></div>
      </li>
      <li>
        <div class="circlePart6 circlePart"></div>
      </li>
      <li>
        <div class="circlePart7 circlePart"></div>
      </li>
    </ul>
    <div class="innerCircle"></div>
    <div>
  <div class="moodSelector">
       <!--TODO: change from touchhold to longtap when the new version is out-->
       <swiper class="swiperSlider active:interval" ref="mySwiper" :options="swiperOptions">
<!--         <swiper-slide><div @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="swipeContainer"><v-icon class="swipeArrow">fas fa-angle-double-left</v-icon><v-icon class="swipeArrow">fas fa-angle-double-right</v-icon></div></swiper-slide>-->
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji tenseNervousEmoji">fas fa-frown-open {{count}}</v-icon></swiper-slide>
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji irritatedAnnoyedEmoji">fas fa-angry</v-icon></swiper-slide>
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji excitedLivelyEmoji">fas fa-grin-stars</v-icon></swiper-slide>
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji cheerfulHappyEmoji">fas fa-laugh-beam</v-icon></swiper-slide>
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji boredWearyEmoji">fas fa-meh</v-icon></swiper-slide>
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji gloomySadEmoji">fas fa-frown</v-icon></swiper-slide>
         <swiper-slide class="swiperSlides"><v-icon @mousedown="startCounter" @mouseleave="stop" @mouseup="stop" @touchstart="startCounter" @touchend="stop" @touchcancel="stop" class="emoji relaxedCalmEmoji">fas fa-smile-beam</v-icon></swiper-slide>
       </swiper>
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
        swiperOptions: {
          loop: false,
          slidesPerView: 1,
        /*  slidesPerGroup: 6,*/
          spaceBetween: 1,
   /*       lazyLoading: true,*/
/*          watchSlidesVisibility: true,*/
        },
        interval: false,
      }
    },
    computed: {
      swipeElement: {
        get() {return this.$store.getters['moodtracker/swipeElement']}
      },
      count: {
        get() {return this.$store.getters['moodtracker/count']}
      },
      swiper() {
        return this.$refs.mySwiper.$swiper
      },

    },
    watch: {
      count: function (val) {
        let color;
        let classSelector;
        let emoji;
        let node = document.getElementsByTagName("LI");

        switch(this.swipeElement){
          case 0:
            color = '#3CBB75';
            classSelector = '.tenseNervousEmoji';
            break;
          case 1:
            color = '#DE6465';
            classSelector = '.irritatedAnnoyedEmoji';
            break;
          case 2:
            color = '#EB7955';
            classSelector = '.excitedLivelyEmoji';
            break;
          case 3:
            color = '#F7CB50';
            classSelector = '.cheerfulHappyEmoji';
            break;
          case 4:
            color = '#8B42CC';
            classSelector = '.boredWearyEmoji';
            break;
          case 5:
            color = '#3D3D3D';
            classSelector = '.gloomySadEmoji';
            break;
          case 6:
            color = '#425CCC';
            classSelector = '.relaxedCalmEmoji';
            break;
        }

        emoji = document.querySelector(classSelector);

        if(val === 0){
          node[0].firstChild.style.background = 'white';
          node[1].firstChild.style.background = 'white';
          node[2].firstChild.style.background = 'white';
          node[3].firstChild.style.background = 'white';
          node[4].firstChild.style.background = 'white';
          node[5].firstChild.style.background = 'white';
          node[6].firstChild.style.background = 'white';
          emoji.style.border = '2px solid transparent';
        }

        if(val >= 1){
          node[0].firstChild.style.background = color;
          emoji.style.border = `2px solid ${color}`;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 1)
        }
        if(val >= 3){
          node[1].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 2)
        }
        if(val >= 5){
          node[2].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 3)
        }
        if(val >= 7){
          node[3].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 4)
        }
        if(val >= 9){
          node[4].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 5)
        }
        if(val >= 11){
          node[5].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 6)
        }
        if(val >= 13){
          node[6].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 7)
        }
      },
      swipeElement: function(val) {
        switch(val){
          case 0: // Tense/Nervous
            document.querySelector('.tenseNervousEmoji').style.fontSize = '70px';

            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '50px';
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '50px';
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '50px';
            document.querySelector('.boredWearyEmoji').style.fontSize = '50px'
            document.querySelector('.gloomySadEmoji').style.fontSize = '50px';
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '50px';
            break;
          case 1: // Irritated/Annoyed
            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '70px';

            document.querySelector('.tenseNervousEmoji').style.fontSize = '50px';
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '50px';
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '50x';
            document.querySelector('.boredWearyEmoji').style.fontSize = '50px'
            document.querySelector('.gloomySadEmoji').style.fontSize = '50px';
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '50px';
            break;
          case 2: // Excited/Lively
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '70px';

            document.querySelector('.tenseNervousEmoji').style.fontSize = '50px';
            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '50px';
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '50px';
            document.querySelector('.boredWearyEmoji').style.fontSize = '50px'
            document.querySelector('.gloomySadEmoji').style.fontSize = '50px';
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '50px';
            break;
          case 3:// Cheerful/Happy
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '70px';

            document.querySelector('.tenseNervousEmoji').style.fontSize = '50px';
            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '50px';
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '50px';
            document.querySelector('.boredWearyEmoji').style.fontSize = '50px'
            document.querySelector('.gloomySadEmoji').style.fontSize = '50px';
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '50px';
            break;
          case 4: // Bored/Weary ==
            document.querySelector('.boredWearyEmoji').style.fontSize = '70px';

            document.querySelector('.tenseNervousEmoji').style.fontSize = '50px';
            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '50px';
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '50px';
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '50px';
            document.querySelector('.gloomySadEmoji').style.fontSize = '50px';
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '50px';
            break;
          case 5:// Gloomy/Sad
            document.querySelector('.gloomySadEmoji').style.fontSize = '70px';

            document.querySelector('.tenseNervousEmoji').style.fontSize = '50px';
            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '50px';
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '50px';
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '50px';
            document.querySelector('.boredWearyEmoji').style.fontSize = '50px'
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '50px';
            break;
          case 6:// Relaxed/Calm
            document.querySelector('.relaxedCalmEmoji').style.fontSize = '70px';

            document.querySelector('.tenseNervousEmoji').style.fontSize = '50px';
            document.querySelector('.irritatedAnnoyedEmoji').style.fontSize = '50px';
            document.querySelector('.excitedLivelyEmoji').style.fontSize = '50px';
            document.querySelector('.cheerfulHappyEmoji').style.fontSize = '50px';
            document.querySelector('.boredWearyEmoji').style.fontSize = '50px'
            document.querySelector('.gloomySadEmoji').style.fontSize = '50px';
            break;
        }
      }
    },
    mounted() {
      this.$store.commit('moodtracker/setShowConfirmationBubble', false)
      this.swiper.slideTo(3, 300, false)
      document.querySelector('.cheerfulHappyEmoji').style.fontSize = '70px';
      this.swiper.on('slideChange', function (store, swiper){
        store.commit('moodtracker/setShowConfirmationBubble', false)
        store.commit('moodtracker/setCount', 0)
        store.commit('moodtracker/setSwipeElement', swiper.realIndex)
      }.bind(null, this.$store, this.swiper));
    },
    methods: {
      /*test(){
        const swiperElements = document.getElementsByClassName('swiperSlides');
        swiperElements.addEventListener('mousedown', e => {
          this.$store.commit('moodtracker/setCount', 0)
          if(!this.interval){
            this.interval = setInterval(() => this.$store.commit('moodtracker/incrementCount'), 500)
          }
        });

        swiperElements.addEventListener('mouseup', e => {
          if(this.count >= 1){
            this.$store.commit('moodtracker/setShowConfirmationBubble', true)
          }else{
            this.$store.commit('moodtracker/setShowConfirmationBubble', false)
          }
          clearInterval(this.interval)
          this.interval = false
        });
      },*/
      startCounter(){
        this.$store.commit('moodtracker/setCount', 0)
        if(!this.interval){
         this.interval = setInterval(() => this.$store.commit('moodtracker/incrementCount'), 500)
        }
      },
      stop(){
        if(this.count >= 1){
          this.$store.commit('moodtracker/setShowConfirmationBubble', true)
        }else{
          this.$store.commit('moodtracker/setShowConfirmationBubble', false)
        }
        clearInterval(this.interval)
        this.interval = false
      },
    }
  }

</script>


<style scoped>

.moodTracker{
  width: 100px;
  height: 100px;
  margin-bottom: 145px;
}

  .moodSelector {
    width: 100px;
    overflow: visible;
    left: 40%;
/*    overflow-x: visible;
    overflow-y: visible;*/
    max-height: 100px;
    margin-bottom: 160px;
    position: fixed;
    margin-left: -8px; /*TODO: FIX*/
  }
 .outerCircle {
   position: relative;
   border: 1px solid black;
   padding: 0;
   width: 100px;
   height: 100px;
   border-radius: 50%;
   list-style: none;
   overflow: hidden;
   display: flex;
   margin-bottom: 160px;
 }
 .circlePartContainer {
   position: relative;
   width: 100px;
   height: 100px;
   overflow: visible;
 }

 li {
   overflow: hidden;
   position: absolute;
   top: 0;
   right: 0;
   width: 50%;
   height: 50%;
   transform-origin: 0% 100%;
/*   border-right: 1px solid black;
   border-bottom: 1px solid black;
   border-top: 1px solid black;*/
   border-left: 1px solid black;


 }
 .circlePart {
   overflow: visible;
   position: absolute;
   left: -100%;
   width: 260%;
   height: 300%;
   text-align: center;
   transform: skewY(60deg) rotate(15deg);
   padding-top: 20px;
/*   border: 1px solid black;*/
 }

  li:first-child {
    transform: rotate(0deg) skewY(-39deg);
  }
  li:nth-child(2) {
    transform: rotate(51.4285714286deg) skewY(-39deg);
  }
  li:nth-child(3) {
    transform: rotate(102.8571428572deg) skewY(-39deg);
  }
  li:nth-child(4) {
    transform: rotate(154.2857142858deg) skewY(-39deg);
  }
  li:nth-child(5) {
    transform: rotate(205.7142857144deg) skewY(-39deg);
  }
  li:nth-child(6) {
    transform: rotate(257.142857143deg) skewY(-39deg);
  }
  li:nth-child(7) {
    transform: rotate(308.5714285716deg) skewY(-39deg);
  }
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
  }
  .innerCircle {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background: white;
    position: absolute;
    border: 1px solid #000000;
    top: 7px;
    left: 7px;
  }

  .swiperSlider{
    width: 85px;
    height: 85px;
    position: absolute;
    top: 7px;
    left: 7px;
  }

  .swiperSlides {
    display: flex;
    justify-content: center;
   /* min-width: 65px;*/
    width: 60px;
    overflow-x: visible;
    z-index: 99;
  }

  .emoji {
    z-index: 99;
    font-size: 50px;
    position: relative;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-self: center;
/*    animation: shake 1.0s cubic-bezier(.36,.07,.19,.97) both;
    animation-iteration-count: 3;*/
  }

  .emoji::after {
    content: "";
    background: white;
    width: 40px;
    height: 40px;
    position: absolute;
    opacity: 1.0;
    top: 15px;
    left: 15px;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .swiper-container {
    overflow: visible;
  }

/*  .swipeContainer {
    display: flex;
    justify-content: center;
    align-content: center;
  }*/

/*  .swipeArrow {
    font-size: 30px;
    padding-top: 30%;
    padding-left: 13px;
    padding-right: 13px;
    display: flex;
    align-self: center;

  }*/

  .tenseNervousEmoji {
    color: #3CBB75;
  }

  .irritatedAnnoyedEmoji {
    color: #DE6465;
  }

  .excitedLivelyEmoji {
    color: #EB7955;
  }

  .cheerfulHappyEmoji{
    color: #F7CB50;
  }

  .boredWearyEmoji {
    color: #8B42CC;
  }

  .gloomySadEmoji {
    color: #3D3D3D;
  }

  .relaxedCalmEmoji {
    color: #425CCC;
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


</style>
