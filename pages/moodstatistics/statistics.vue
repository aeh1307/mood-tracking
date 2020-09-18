<template>
  <div class="statistics">
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
  methods: {
    calendarView() {
      this.$store.commit('statistics/setShowCalendar', true);
      this.$store.commit('statistics/setShowMoodSection', true);
      this.$store.commit('statistics/setShowCalendarMoodDetails', false);
      this.$store.commit('statistics/setShowStat', false);
    },
  },
  fetch() {

    /*      let element = document.querySelector('.statistics');
          element.style.backgroundImage = `url('${this.backgroundImagePath}')`;*/

  },
  mounted() {
    this.calendarView()
  }
}
</script>

<style scoped>
.statistics {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  font-size: 20px;
  font-family: 'Manrope', sans-serif;
  position: absolute;
}

.statistics::after {
  content: "";
  background: linear-gradient(to right, #24C6DC, #514A9D);
  /*background: linear-gradient(to right, #ad5389 0%, #3c1053 100%);*/
  opacity: 0.4;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

</style>
