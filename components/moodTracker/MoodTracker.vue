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
     <div>
       <!--TODO: change from touchhold to longtap when the new version is out-->
       <swiper class="innerCircle active:interval" ref="mySwiper" :options="swiperOptions">
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

</template>

<script>
  export default {
    name: "MoodTracker.vue",
    data() {
      return {
        swiperOptions: {
          loop: false,
          spaceBetween: 15,
          slidesPerView: 1,
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
          emoji.style.border = '2px solid white';
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
      }
    },
    mounted() {
      this.$store.commit('moodtracker/setShowConfirmationBubble', false)
      this.swiper.slideTo(3, 300, false)
      this.swiper.on('slideChange', function (store, swiper){
        store.commit('moodtracker/setShowConfirmationBubble', false)
        store.commit('moodtracker/setCount', 0)
        store.commit('moodtracker/setSwipeElement', swiper.realIndex)
      }.bind(null, this.$store, this.swiper));
    },
    methods: {
      test(){
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
      },
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
  .moodTracker {
    width: 115px;
    margin-bottom: 115px;
    position: relative;
    margin-left: -8px;
  }
 .outerCircle {
   position: relative;
   border: 1px solid black;
   padding: 0;
   margin: 1em auto;
   width: 110px;
   height: 110px;
   border-radius: 50%;
   list-style: none;
   overflow: hidden;
   display: flex;
 }
 .circlePartContainer {
   position: absolute;
   width: 115px;
   height: 115px;
 }

 li {
   overflow-x: hidden;
   position: absolute;
   top: 0;
   right: 0;
   width: 50%;
   height: 50%;
   transform-origin: 0% 100%;
   border-left: 1px solid black;


 }
 .circlePart {
   position: absolute;
   left: -100%;
   width: 260%;
   height: 310%;
   text-align: center;
   transform: skewY(60deg) rotate(15deg);
   padding-top: 20px;
   border: 1px solid black;
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
    width: 95px;
    height: 95px;
    border-radius: 50%;
    background: white;
    position: absolute;
    border: 1px solid #000000;
    top: 7px;
    left: 7px;
  }

  .swiperSlides {
    display: flex;
    justify-content: center;
  }

  .emoji {
    font-size: 80px;
    position: relative;
    overflow-y: visible;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    align-self: center;
    animation: shake 1.0s cubic-bezier(.36,.07,.19,.97) both;
    animation-iteration-count: 3;
  }

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
