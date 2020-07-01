<template class="moodData">
  <div>
    <Calendar v-if="showCalendar"/>
    <div v-if="showStats">Stats page comming ...</div>
  </div>
</template>

<script>
  import Calendar from "./calendar/Calendar";

  export default {
    name: "MoodData.vue",
    components: {
      Calendar,
    },
    computed: {
          showCalendar: { get() {  return  this.$store.getters['statistics/showCalendar'] }},
          showStats: { get() {  return this.$store.getters['statistics/showStats']} },
      },
  }
</script>
<style scoped>
</style>

