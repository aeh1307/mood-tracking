<template>
  <div class="statistics">
    <div></div>
    <div class="statisticsButtonSection">
    <button id="calendarButton" class="statisticsButton" v-on:click="calendarView">Calendar</button>
      <button id="detailsButton" class="statisticsButton" v-on:click="calendarView">Details</button>
    <button id="statsButton" class="statisticsButton" v-on:click="statsView">Stats</button>
    </div>
    <MoodData/>
  </div>
</template>

<script>
  import MoodData from "../../components/moodData/MoodData";

  export default {
    name: "statistics.vue",
    components: {
      MoodData,
    },
    computed: {
      showCalendar: { get() { return this.$store.getters['statistics/showCalendar']}},
      showStats: { get() { return this.$store.getters['statistics/showStats'] }},
      backgroundImagePath: { get() { return this.$store.getters['settings/backgroundImagePath']}},
    },
    methods: {
      calendarView () {
        this.$store.commit('statistics/setShowCalendar', true)
        this.$store.commit('statistics/setShowMoodSection', true)
        this.$store.commit('statistics/setShowCalendarMoodDetails', false)
        this.$store.commit('statistics/setShowStat', false)
        /*let calendarButtonEl = document.getElementById("calendarButton");
        let statsButtonEl = document.getElementById("statsButton");
        calendarButtonEl.style.fontWeight = 'bold';
        statsButtonEl.style.fontWeight = 'normal';*/
      },
      statsView() {
        this.$store.commit('statistics/setShowStat', true)
        this.$store.commit('statistics/setShowCalendar', false)
        this.$store.commit('statistics/setShowCalendarMoodDetails', false)
       /* let calendarButtonEl = document.getElementById("calendarButton");
        let statsButtonEl = document.getElementById("statsButton");
        statsButtonEl.style.fontWeight = 'bold';
        calendarButtonEl.style.fontWeight = 'normal';*/
      }
    },
    watch: {
      showCalendar: function (val) {
        let calendarButtonEl = document.getElementById("calendarButton");
        let statsButtonEl = document.getElementById("statsButton");
        if(val === true){
          calendarButtonEl.style.fontWeight = 'bold';
          calendarButtonEl.style.background = '#a4b6bb';
          statsButtonEl.style.fontWeight = 'normal';
          statsButtonEl.style.background = '#ffffff'
        }else{
          statsButtonEl.style.fontWeight = 'bold';
          statsButtonEl.style.background = '#a4b6bb';
          calendarButtonEl.style.fontWeight = 'normal';
          calendarButtonEl.style.background = '#ffffff'
        }
      },
      backgroundImagePath: function (val) {
        let element = document.querySelector('.statistics');
        element.style.backgroundImage = `url('../${val}')`;
      },
    },
    mounted() {
      this.calendarView()
      let element = document.querySelector('.statistics');
      element.style.backgroundImage = `url('../${this.backgroundImagePath}')`;

      this.$fireStore.collection("users").doc("1").collection("moodTracking")
        .onSnapshot(querySnapshot => {
          this.$store.commit('statistics/emptyMoods');
          querySnapshot.forEach(doc => {
            // Degree of emotion, emotion, time, id:
            let trackedMood = {
              degreeOfEmotion: doc.data().degreeOfEmotion,
              emotion: doc.data().emotion,
              time: doc.data().time,
              id: doc.id
            }
            this.$store.commit('statistics/addMoods', trackedMood)
          })
        })
    }
  }
</script>

<style scoped>
  .statistics {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    font-size: 20px;
    font-family: 'Manrope', sans-serif;
    background: no-repeat center fixed;
    background-size: cover;
  }

  .statisticsButtonSection {
    background-color: white;
    width: 100vw;
    height: 27px;
    margin-top: 50px;
    display: flex;
  }
  .statisticsButton {
    background-color: white;
    padding: 2px 20px;
    margin-left: 0;
    margin-right: 0;
    transition: all 0.5s;
    font-family: 'Manrope', sans-serif;
    color: #44719a;
    font-size: 16px;
 /*   border-right: 1px solid #44719a;*/
    border-bottom:  1px solid #44719a;
    width: 145px;
  }

  .statisticsButton:focus {
    outline:0;
  }

  #calendarButton {
    border-right: 1px solid #44719a;
    font-weight: bold;
    background-color: #a4b6bb;
  }

  #detailsButton {
    border-right: 1px solid #44719a;
    background-color: white;
  }

</style>
