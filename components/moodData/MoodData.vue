<template>
  <div class="moodData">
    <CalendarDetails v-if="showCalendarMoodDetails"/>
    <Calendar v-if="showCalendar"/>
    <Stats v-if="showStats"/>
  </div>
</template>

<script>
  import Calendar from "./calendar/Calendar";
  import Stats from "./stats/Stats";
  import CalendarDetails from "./calendarDetails/CalendarDetails";

  export default {
    name: "MoodData.vue",
    components: {
      Calendar,
      Stats,
      CalendarDetails,
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

