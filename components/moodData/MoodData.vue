<template>
  <div class="moodData">
    <Calendar v-if="showCalendar"/>
    <Stats v-if="showStats"/>
  </div>
</template>

<script>
  import Calendar from "./calendar/Calendar";
  import Stats from "./stats/Stats";

  export default {
    name: "MoodData.vue",
    components: {
      Calendar,
      Stats,
    },
    computed: {
          showCalendar: { get() {  return  this.$store.getters['statistics/showCalendar'] }},
          showStats: { get() {  return this.$store.getters['statistics/showStats']} },
      },
  }
</script>
<style scoped>
</style>

