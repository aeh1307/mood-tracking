<template>
  <div class="statistics">
    <div class="statisticsButtonSection">
    <button class="statisticsButton" v-on:click="calendarView">Calendar</button>
    <button class="statisticsButton" v-on:click="statsView">Stats</button>
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
    },
    methods: {
      calendarView () {
        this.$store.commit('statistics/setShowCalendar', true)
        this.$store.commit('statistics/setShowStat', false)

      },
      statsView() {
        this.$store.commit('statistics/setShowStat', true)
        this.$store.commit('statistics/setShowCalendar', false)
      }
    },
  }
</script>

<style scoped>
  .statistics {
    display: flex;
   /* justify-content: center;*/
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    font-size: 20px;
    font-family: 'Manrope', sans-serif;
  }

  .statisticsButtonSection {
    width: 100%;
    margin-top: 60px;
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
    margin-bottom: 30px;
    border-right: 1px solid #44719a;
  }

  .statisticsButton:focus {
    outline:0;
  }

</style>
