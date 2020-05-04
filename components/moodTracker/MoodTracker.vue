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
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji tenseNervousEmoji">fas fa-frown-open {{count}}</v-icon></swiper-slide>
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji irritatedAnnoyedEmoji">fas fa-angry</v-icon></swiper-slide>
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji excitedLivelyEmoji">fas fa-grin-stars</v-icon></swiper-slide>
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji cheerfulHappyEmoji">fas fa-laugh-beam</v-icon></swiper-slide>
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji boredWearyEmoji">fas fa-meh</v-icon></swiper-slide>
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji gloomySadEmoji">fas fa-frown</v-icon></swiper-slide>
         <swiper-slide><v-icon @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" class="emoji relaxedCalmEmoji">fas fa-smile-beam</v-icon></swiper-slide>
       </swiper>
     </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'moodTracker',
    data() {
      return {
        swiperOptions: {
          loop: true,
          // Some Swiper option/callback...
        },
        interval: false,
        count: 0,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
    methods: {
      start(){
        if(!this.interval){
          this.interval = setInterval(() => this.count++, 30)
          console.log("Start", this.interval)
        }
      },
      stop(){
        console.log("Stop", this.interval)
        clearInterval(this.interval)
        this.interval = false
      },

     /* mouseDownHandler (){
        console.log("touch")
      /!*  // Define variable
        let pressTimer = null

        // Define funtion handlers
        // Create timeout ( run function after 1s )
        let start = (e) => {

          if (e.type === 'click' && e.button !== 0) {
            return;
          }

          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              // Execute something !!!
            }, 1000)
          }
        }

        // Cancel Timeout
        let cancel = (e) => {
          // Check if timer has a value or not
          if (pressTimer !== null) {
            clearTimeout(pressTimer)
            pressTimer = null
          }
        }*!/
        /!* console.log('Element: ', el.addEventListener("mousedown", start));*!/
        /!*
        // Add Event listeners
        el.addEventListener("mousedown", start);
        // Cancel timeouts if this events happen
        el.addEventListener("click", cancel);
        el.addEventListener("mouseout", cancel);*!/
        /!*     }
*!/

       /!* console.log('test');
        let node = document.getElementsByTagName("LI");
        /!*Fin timer function for hold.... now it just a timer that get triggered if the user holds for a while
        * so it will complete the coloring regardless of when the user stops holding*!/
        /!*touchHoldTolerance default 400 millisecond The timeout for a touchhold event.*!/
        /!*Style color on elements according to timer*!/
        setInterval(firstDegree, 500);
        setInterval(secondDegree, 1000);
        setInterval(thirdDegree, 1500);
        setInterval(fourthDegree, 2000);
        setInterval(fifthDegree, 2500);
        setInterval(sixthDegree, 3000);
        setInterval(seventhDegree, 3500);

        function firstDegree() {
          node[0].firstChild.style.background = '#3CBB75';
        }

        function secondDegree() {
          node[1].firstChild.style.background = '#3CBB75';
        }

        function thirdDegree() {
          node[2].firstChild.style.background = '#3CBB75';
        }

        function fourthDegree() {
          node[3].firstChild.style.background = '#3CBB75';
        }

        function fifthDegree() {
          node[4].firstChild.style.background = '#3CBB75';
        }

        function sixthDegree() {
          node[5].firstChild.style.background = '#3CBB75';
        }

        function seventhDegree() {
          node[6].firstChild.style.background = '#3CBB75';
        }*!/
      },
      mouseUpHandler: function(){
        console.log("released")
      }*/
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
   /*background-color: rgb(42 106 170);*/
   /*background-color: darkgrey;*/
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
    opacity: 70%;
  }
  li:nth-child(2) .circlePart {
    background: white;
    opacity: 70%;
  }
  li:nth-child(3) .circlePart {
    background: white;
    opacity: 70%;
  }
  li:nth-child(4) .circlePart {
    background: white;
    opacity: 70%;
  }
  li:nth-child(5) .circlePart {
    background: white;
    opacity: 70%;
  }
  li:nth-child(6) .circlePart {
    background: white;
    opacity: 70%;
  }
  li:nth-child(7) .circlePart {
    background: white;
    opacity: 70%;
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

  .emoji {
    font-size: 70px;
    left: 9%;
    top: 9%;
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
