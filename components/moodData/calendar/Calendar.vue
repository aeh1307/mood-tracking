<template class="moodData">
  <div>
    <v-date-picker
      class="v-date-picker"
      dark
      single
      v-model="titleDate"
      :events="functionEvents"
      year-icon="mdi-calendar-blank"
      @change="popUpWindow"
    >
    </v-date-picker>
  </div>
</template>

<script>
  import DatePicker from 'v-calendar/lib/components/date-picker.umd'

  export default {
    name: 'Calendar.vue',
    components: {
      DatePicker,
    },
    data() {

      return {
        moods: [],
        xLabels: [],
        yDegrees: [],
        selectedDate: null,
        selectAttribute: {
          dot: true
        },
        date: new Date(),
        titleDate: new Date().toISOString().substr(0, 10),
      }
    },
    mounted() {
      this.$fireStore.collection("users").doc("1").collection("moodTracking").get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // Degree of emotion, emotion, time:
            this.moods.push(doc.data())
            // Emoji labels:
            this.xLabels.push(doc.data().emotion)
            // Degrees of emotions tracked:
            this.yDegrees.push(doc.data().degreeOfEmotion)
          })
        })
        .catch(error => {
          console.log("Failed getting documents: ", error);
        })
    },
    methods: {
      /*TODO: Loop through data, apply color corresponding to mood on the dates where the mood was tracked*/
      functionEvents(date) {
        const [, , day] = date.split('-')

        let tenseNervousDates = []
        let irritatedAnnoyed = []
        let excitedLively = []
        let cheerfulHappy = []
        let boredWeary = []
        let gloomySad = []
        let relaxedCalm = []

        this.moods.forEach(trackedMood => {
          switch (trackedMood.emotion) {
            case 'Tense/Nervous':
              if(!tenseNervousDates.includes(new Date(trackedMood.time).getDate()))tenseNervousDates.push(new Date(trackedMood.time).getDate());
              break;
            case 'Irritated/Annoyed':
              if(!irritatedAnnoyed.includes(new Date(trackedMood.time).getDate())) irritatedAnnoyed.push(new Date(trackedMood.time).getDate());
              break;
            case 'Excited/Lively':
              if(!excitedLively.includes(new Date(trackedMood.time).getDate())) excitedLively.push(new Date(trackedMood.time).getDate());
              break;
            case 'Cheerful/Happy':
              if(!cheerfulHappy.includes(new Date(trackedMood.time).getDate())) cheerfulHappy.push(new Date(trackedMood.time).getDate());
              break;
            case 'Bored/Weary':
              if(!boredWeary.includes(new Date(trackedMood.time).getDate())) boredWeary.push(new Date(trackedMood.time).getDate());
              break;
            case 'Gloomy/Sad':
              if(!gloomySad.includes(new Date(trackedMood.time).getDate())) gloomySad.push(new Date(trackedMood.time).getDate());
              break;
            case 'Relaxed/Calm':
              if(!relaxedCalm.includes(new Date(trackedMood.time).getDate())) relaxedCalm.push(new Date(trackedMood.time).getDate());
              break;
          }
        })

        let eventColors = [];
        for(let calendarDate = 1; calendarDate < 31; calendarDate++){
          /*       console.log("boolean check ", !eventColors.includes(calendarDate))*/
          if(!eventColors.includes(calendarDate)){
            if(tenseNervousDates.includes(calendarDate)){
              eventColors.push('#3CBB75')
            }
            if(irritatedAnnoyed.includes(calendarDate)){
              eventColors.push('#DE6465')
            }
            if(excitedLively.includes(calendarDate)){
              eventColors.push('#EB7955')
            }
            if(cheerfulHappy.includes(calendarDate)){
              eventColors.push('#F7CB50')
            }
            if(boredWeary.includes(calendarDate)){
              eventColors.push('#8B42CC')
            }
            if(gloomySad.includes(calendarDate)){
              eventColors.push('#3D3D3D')
            }
            if(relaxedCalm.includes(calendarDate)){
              eventColors.push('#425CCC')
            }
          }
        }

        if ([2].includes(parseInt(day, 10))) return eventColors

        /* if ([12, 17, 28].includes(parseInt(day, 10))) return true
         if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']*/
        /*

                if (tenseNervousDates.includes(parseInt(day, 10))) return ['#3CBB75']
                if (irritatedAnnoyed.includes(parseInt(day, 10))) return ['#DE6465']
                if (excitedLively.includes(parseInt(day, 10))) return ['#EB7955']
                if (cheerfulHappy.includes(parseInt(day, 10))) return ['#F7CB50']
                if (boredWeary.includes(parseInt(day, 10))) return ['#8B42CC']
                if (gloomySad.includes(parseInt(day, 10))) return ['#3D3D3D']
                if (relaxedCalm.includes(parseInt(day, 10))) return ['#425CCC']*/
      },
      popUpWindow: function(date) {
        console.log("TEST date select*: ", date)
        focus()
        /*    switch (date){

            }*/
      },
    }
  }
</script>

<style scoped>
  .v-date-picker {
    top: -25px;
  }
</style>
