<template>
  <div class="stats">
    <div>
     <!-- <li v-for="mood in moods">{{mood}}</li>-->
      Number of mood tracking: {{moods.length}}
    <br>
      Most tracked mood:{{this.mostTrackedMood}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Stats.vue',
    data () {
      return{
        moods: [],
        mostTrackedMood: '',
        trackedToday: 0,
        trackedThisWeek: 0,
        trackedThisMonth: 0,
        daysStreak: 0,
      }
    },
    mounted() {
      this.$fireStore.collection('users').doc('1').collection('moodTracking')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach( doc => {
          this.moods.push(doc.data())
        })
      })
      this.findMostTrackedMood();
    },
    methods: {
        findMostTrackedMood() {
          let mostFrequentEmotion;
          this.moods.forEach(trackedMood => {

          })
          this.mostTrackedMood = mostFrequentEmotion;
        }
    },
    watch: {
      moods: function () {
        this.findMostTrackedMood()
      }
    },
  }

</script>
<style scoped>
  .stats {
    background-color: white;
    min-height: 375px;
    min-width: 290px;
    border-radius: 5px;
    top: -25px;
  }
</style>
