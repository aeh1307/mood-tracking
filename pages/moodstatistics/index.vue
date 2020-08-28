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
  async fetch() {
    await this.$fireStore.collection("users").doc(this.$fireAuth.currentUser.uid).collection("moodTracking")
      .orderBy('time').get().then(querySnapshot => {
      this.$store.commit('statistics/emptyMoods');
      let trackedMoods = []
      querySnapshot.forEach(doc => {
        // Degree of emotion, emotion, time, id:
        let trackedMood = {
          degreeOfEmotion: doc.data().degreeOfEmotion,
          emotion: doc.data().emotion,
          time: doc.data().time,
          notes: doc.data().notes,
          id: doc.id
        }
        trackedMoods.push(trackedMood)
      })
      this.$store.commit('statistics/addMoods', trackedMoods)
    })
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
}

.statistics::after {
  content: "";
  background: linear-gradient(to right, #24C6DC, #514A9D);
  opacity: 0.4;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

</style>
