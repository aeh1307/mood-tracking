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
        console.log("Calendar", this.$store.getters['statistics/showCalendar'], "Stats: ", this.showStats)
        this.$store.commit('statistics/setShowCalendar', true)
        this.$store.commit('statistics/setShowStat', false)

      },
      statsView() {
        this.$store.commit('statistics/setShowStat', true)
        this.$store.commit('statistics/setShowCalendar', false)
        console.log("Calendar", this.showCalendar, "Stats: ", this.showStats)
      }
    },
    mounted() {
      console.log(this.showCalendar, this.showStats)
    }
  }
</script>

<style scoped>
  .statistics {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    font-size: 20px;
    font-family: 'Manrope', sans-serif;
  }

  .statisticsButtonSection {
  }
  .statisticsButton {
    background-color: #44719a;
    padding: 10px 20px;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
    transition: all 0.5s;
    font-family: 'Manrope', sans-serif;
    color: white;
    font-size: 16px;
    margin-bottom: 30px;
  }
</style>
