<template>
  <div class="calendarMoodDetails">
    <MoodTable/>
    <DeleteConfirmationWindow v-if="showDeleteConfirmationWindow"/>
    <EditMoodWindow v-if="showEditMoodWindow"/>
  </div>
</template>

<script>
import MoodTable from "@/components/moodData/calendarDetails/moodTable/MoodTable";
import DeleteConfirmationWindow
  from "@/components/moodData/calendarDetails/deleteConfirmationWindow/DeleteConfirmationWindow";
import EditMoodWindow from "@/components/moodData/calendarDetails/editMoodWindow/EditMoodWindow";

export default {
  name: 'CalendarDetails.vue',
  components: {
    DeleteConfirmationWindow,
    EditMoodWindow,
    MoodTable
  },
  computed: {
    showDeleteConfirmationWindow: {
      get() {
        return this.$store.getters['statistics/showDeleteConfirmationWindow']
      }
    },
    showEditMoodWindow: {
      get() {
        return this.$store.getters['statistics/showEditMoodWindow']
      }
    },
  },
}

</script>
<style scoped>
.calendarMoodDetails {
  min-width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  border-radius: 5px;
  margin-top: 50px;
}
</style>
