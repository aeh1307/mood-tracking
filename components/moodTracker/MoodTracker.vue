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
    /*    count: 0,*/
      }
    },
    computed: {
      swipeElement: {
        get() {return this.$store.getters['moodtracker/swipeElement']}
      },
      count: {
        get() {return this.$store.getters['moodtracker/count']}
      },
     /* interval: {
        get() {return this.$store.getters['moodtracker/interval']}
      },*/
      swiper() {
        return this.$refs.mySwiper.$swiper
      },

    },
    watch: {
      count: function (val) {
        this.$store.commit('moodtracker/setSwipeElement', this.swiper.realIndex)
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
        }

        if(val >= 3){
          node[0].firstChild.style.background = color;
          emoji.style.border = `2px solid ${color}`;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 1)
        }
        if(val >= 8){
          node[1].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 2)
        }
        if(val >= 13){
          node[2].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 3)
        }
        if(val >= 18){
          node[3].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 4)
        }
        if(val >= 23){
          node[4].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 5)
        }
        if(val >= 28){
          node[5].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 6)
        }
        if(val >= 33){
          node[6].firstChild.style.background = color;
          this.$store.commit('moodtracker/setDegreeOfEmotion', 7)
        }
      }
    },
    mounted() {
      this.$store.commit('moodtracker/setShowConfirmationBubble', false)
      this.swiper.slideTo(3, 300, false)
      this.swiper.on('slideChange', function (store){
        store.commit('moodtracker/setShowConfirmationBubble', false)
        store.commit('moodtracker/setCount', 0)
      }.bind(null, this.$store));
    },
    methods: {
      startCounter(){
        this.$store.commit('moodtracker/setCount', 0)
        if(!this.interval){
         this.interval = setInterval(() => this.$store.commit('moodtracker/incrementCount'), 0)
        }
      },
      stop(){
        if(this.count >= 3){
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
    width: 100px;
    margin-bottom: 90px;
  }
 .outerCircle {
   position: relative;
   border: 1px solid black;
   padding: 0;
   margin: 1em auto;
   width: 100px;
   height: 100px;
   border-radius: 50%;
   list-style: none;
   overflow: hidden;
 }
 .circlePartContainer {
   position: relative;
   width: 100px;
   height: 100px;
 }

 li {
   overflow: hidden;
   position: absolute;
   top: 0;
   right: 0;
   width: 50%;
   height: 50%;
   transform-origin: 0% 100%;
   border: 1px solid black;
 }
 .circlePart {
   position: absolute;
   left: -100%;
   width: 260%;
   height: 290%;
   text-align: center;
   transform: skewY(60deg) rotate(15deg);
   padding-top: 20px;
   border: 1px solid black;
 }

  li:first-child {
    transform: rotate(0deg) skewY(-35deg);
  }
  li:nth-child(2) {
    transform: rotate(51.42deg) skewY(-35deg);
  }
  li:nth-child(3) {
    transform: rotate(102.58deg) skewY(-35deg);
  }
  li:nth-child(4) {
    transform: rotate(154.28deg) skewY(-35deg);
  }
  li:nth-child(5) {
    transform: rotate(205.71deg) skewY(-35deg);
  }
  li:nth-child(6) {
    transform: rotate(257.14deg) skewY(-35deg);
  }
  li:nth-child(7) {
    transform: rotate(308.57deg) skewY(-35deg);
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
    top: 7%;
    left: 7%;
  }

  .swiperSlides {
    display: flex;
    justify-content: center;
  }

  .emoji {
    font-size: 70px;
    position: relative;
    overflow-y: visible;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-self: center;
  }

  .swipeContainer {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .swipeArrow {
    font-size: 30px;
    padding-top: 30%;
    padding-left: 13px;
    padding-right: 13px;
    display: flex;
    align-self: center;

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

</style>
