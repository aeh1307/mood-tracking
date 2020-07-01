<template class="moodData">
  <div>
    <v-date-picker
      class="v-date-picker"
      dark
      single
      v-model="selectedDate"
      :events="functionEvents"
      year-icon="mdi-calendar-blank"
      @change="showDateInfo"
      no-title
    >
    </v-date-picker>
    <div class="moods">
      <div class="moodStats">
        <v-icon class="emojiIcon tenseNervousIcon">fas fa-frown-open</v-icon>
        <div class="degreeTracked">{{this.tenseNervousDateDegree}}</div>
      </div>
      <div class="moodStats">
        <v-icon class="emojiIcon irritatedAnnoyedIcon">fas fa-angry</v-icon>
        <div class="degreeTracked">{{this.irritatedAnnoyedDateDegree}}</div>
      </div>
      <div class="moodStats">
        <v-icon class="emojiIcon excitedLivelyIcon">fas fa-grin-stars</v-icon>
        <div class="degreeTracked">{{this.excitedLivelyDateDegree}}</div>
      </div>
      <div class="moodStats">
        <v-icon class="emojiIcon cheerfulHappyIcon">fas fa-laugh-beam</v-icon>
        <div class="degreeTracked">{{this.cheerfulHappyDateDegree}}</div>
      </div>
      <div class="moodStats">
        <v-icon class="emojiIcon boredWearyIcon">fas fa-meh</v-icon>
        <div class="degreeTracked">{{this.boredWearyDateDegree}}</div>
      </div>
      <div class="moodStats">
        <v-icon class="emojiIcon gloomySadIcon">fas fa-frown</v-icon>
        <div class="degreeTracked">{{this.gloomySadDateDegree}}</div>
      </div>
      <div class="moodStats">
        <v-icon class="emojiIcon relaxedCalmIcon">fas fa-smile-beam</v-icon>
        <div class="degreeTracked">{{this.relaxedCalmDateDegree}}</div>
      </div>
    </div>

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
        tenseNervousDateDegree: 0,
        irritatedAnnoyedDateDegree: 0,
        excitedLivelyDateDegree: 0,
        cheerfulHappyDateDegree: 0,
        boredWearyDateDegree: 0,
        gloomySadDateDegree: 0,
        relaxedCalmDateDegree: 0,
      }
    },
    mounted() {
      this.$fireStore.collection("users").doc("1").collection("moodTracking")
        .onSnapshot(querySnapshot => {
          this.moods = [];
          this.xLabels = [];
          this.yDegrees = [];

          querySnapshot.forEach(doc => {
            // Degree of emotion, emotion, time:
            this.moods.push(doc.data())
            // Emoji labels:
            this.xLabels.push(doc.data().emotion)
            // Degrees of emotions tracked:
            this.yDegrees.push(doc.data().degreeOfEmotion)
          })
        })
    },
    watch: {
      moods: function () {
        this.showDateInfo()
      }
    },
    methods: {
      functionEvents(date) {
        const [year, month , day] = date.split('-')
        console.log("MONTH: ", month, year)
        let trackedDates = []
        this.moods.forEach(trackedMood => {
          let dateFromDB = new Date(trackedMood.time).toString().split(" ")
          let trackedDay= dateFromDB[2]
          if (!(trackedDates.includes(trackedDay))){
            if(trackedDay.startsWith('0')){
              trackedDay = trackedDay.substr(1);
            }
            trackedDates.push(parseInt(trackedDay));
          }
        })
        console.log("Tracked dates: ", trackedDates);
        if (trackedDates.includes(parseInt(day, 10)) && trackedDates.includes(parseInt(month, 10))) return '#FF69B4';



       /* const [, , day] = date.split('-')*/

       /* let tenseNervousDates = []
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
          /!*       console.log("boolean check ", !eventColors.includes(calendarDate))*!/
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
*/
        /*if ([2].includes(parseInt(day, 10))) return eventColors*/

/*         if ([12, 17, 28].includes(parseInt(day, 10))) return true
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
      showDateInfo: function() {
        let selectedDate = this.selectedDate ? this.selectedDate.split("-") : this.date.toString().split("-");
        let selectedYear = selectedDate[0]
        let selectedMonth = selectedDate[1]
        let selectedDay = selectedDate[2]

    /*    console.log("Whole", selectedDate, "Selected Year: ", selectedYear, " Selected Month: ", selectedMonth, "Selected Day: ", selectedDay)*/

        this.tenseNervousDateDegree = 0;
        this.irritatedAnnoyedDateDegree = 0;
        this.excitedLivelyDateDegree = 0;
        this.cheerfulHappyDateDegree = 0;
        this.boredWearyDateDegree = 0;
        this.gloomySadDateDegree = 0;
        this.relaxedCalmDateDegree = 0;

        this.moods.forEach(trackedMood => {
          let dateFromDB = new Date(trackedMood.time).toString().split(" ")
          let trackedDay= dateFromDB[2]
          let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
          let trackedYear = dateFromDB[3]
          /*let trackedTime = dateFromDB[4]*/

/*          console.log("Test: ", dateFromDB, "Day: ", trackedDay, "Month: ", trackedMonth, "Year: ", trackedYear, "Time: ", trackedTime)*/
          if((trackedYear === selectedYear) && ( trackedMonth === selectedMonth) && (trackedDay === selectedDay)){
            switch (trackedMood.emotion) {
              case 'Tense/Nervous':
                this.tenseNervousDateDegree = this.tenseNervousDateDegree + trackedMood.degreeOfEmotion;
                break;
              case 'Irritated/Annoyed':
                this.irritatedAnnoyedDateDegree = this.irritatedAnnoyedDateDegree + trackedMood.degreeOfEmotion;
                break;
              case 'Excited/Lively':
                this.excitedLivelyDateDegree = this.excitedLivelyDateDegree + trackedMood.degreeOfEmotion;
                break;
              case 'Cheerful/Happy':
                this.cheerfulHappyDateDegree = this.cheerfulHappyDateDegree + trackedMood.degreeOfEmotion;
                break;
              case 'Bored/Weary':
                this.boredWearyDateDegree = this.boredWearyDateDegree + trackedMood.degreeOfEmotion;
                break;
              case 'Gloomy/Sad':
                this.gloomySadDateDegree = this.gloomySadDateDegree + trackedMood.degreeOfEmotion;
                break;
              case 'Relaxed/Calm':
                this.relaxedCalmDateDegree = this.relaxedCalmDateDegree + trackedMood.degreeOfEmotion;
                break;
            }
          }

        })
      },
    }
  }
</script>

<style scoped>
  .v-date-picker {
    top: -10px;
  }
  .moods {
    display: flex;
    justify-content: space-between;
  }

  .moodStats {
    display:flex;
    flex-direction: column;
  }

  .emojiIcon{
    padding: 5px;
    font-size: 30px;
    font-weight: bold;
  }

  .degreeTracked {
    text-align: center;
    font-size: 16px;
  }

  .tenseNervousIcon {
    color: #3CBB75;
  }

  .irritatedAnnoyedIcon {
    color: #DE6465;
  }

  .excitedLivelyIcon {
    color: #EB7955;
  }

  .cheerfulHappyIcon{
    color: #F7CB50;
  }

  .boredWearyIcon {
    color: #8B42CC;
  }

  .gloomySadIcon {
    color: #3D3D3D;
  }

  .relaxedCalmIcon {
    color: #425CCC;
  }

</style>
