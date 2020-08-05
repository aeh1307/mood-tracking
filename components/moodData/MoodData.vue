<template>
  <div class="moodData">
    <CalendarMoodDetails v-if="showCalendarMoodDetails"/>
    <Calendar v-if="showCalendar"/>

    <Stats v-if="showStats"/>
  </div>
</template>

<script>
  import Calendar from "./calendar/Calendar";
  import Stats from "./stats/Stats";
  import CalendarMoodDetails from "./calendar/CalendarMoodDetails";

  export default {
    name: "MoodData.vue",
    components: {
      Calendar,
      Stats,
      CalendarMoodDetails
    },
    computed: {
          showCalendar: { get() { return this.$store.getters['statistics/showCalendar'] }},
          showStats: { get() { return this.$store.getters['statistics/showStats'] }},
          showCalendarMoodDetails: { get() { return this.$store.getters['statistics/showCalendarMoodDetails']} },
      },
  }
</script>
<style scoped>
</style>

