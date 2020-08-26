<template>
  <div class="calendarView">
    <!-- TODO: add dark ?-->
    <v-date-picker
      class="v-date-picker"
      single
      v-model="selectedDate"
      :events="functionEvents"
      @change="showDateInfo"
      no-title
      dark
      v-if="showDatePicker"
    >
    </v-date-picker>
    <div class="moodSection" v-if="showMoodSection">
      <div class="moods">
        <div class="moodStats" v-if="this.tenseNervousDateDegree !== 0">
          <v-icon class="emojiIcon tenseNervousIcon">fas fa-frown-open</v-icon>
          <div class="degreeTracked" >{{ this.tenseNervousDateDegree }}</div>
        </div>
        <div class="moodStats" v-if="this.irritatedAnnoyedDateDegree !== 0">
          <v-icon class="emojiIcon irritatedAnnoyedIcon">fas fa-angry</v-icon>
          <div class="degreeTracked">{{ this.irritatedAnnoyedDateDegree }}</div>
        </div>
        <div class="moodStats" v-if="this.excitedLivelyDateDegree !== 0">
          <v-icon class="emojiIcon excitedLivelyIcon">fas fa-grin-stars</v-icon>
          <div class="degreeTracked">{{ this.excitedLivelyDateDegree }}</div>
        </div>
        <div class="moodStats" v-if="this.cheerfulHappyDateDegree !== 0">
          <v-icon class="emojiIcon cheerfulHappyIcon">fas fa-laugh-beam</v-icon>
          <div class="degreeTracked">{{ this.cheerfulHappyDateDegree }}</div>
        </div>
        <div class="moodStats" v-if="this.boredWearyDateDegree !== 0">
          <v-icon class="emojiIcon boredWearyIcon">fas fa-meh</v-icon>
          <div class="degreeTracked">{{ this.boredWearyDateDegree }}</div>
        </div>
        <div class="moodStats" v-if="this.gloomySadDateDegree !== 0">
          <v-icon class="emojiIcon gloomySadIcon">fas fa-frown</v-icon>
          <div class="degreeTracked">{{ this.gloomySadDateDegree }}</div>
        </div>
        <div class="moodStats" v-if="this.relaxedCalmDateDegree !== 0">
          <v-icon class="emojiIcon relaxedCalmIcon">fas fa-smile-beam</v-icon>
          <div class="degreeTracked">{{ this.relaxedCalmDateDegree }}</div>
        </div>
      </div>
      <!--<div class="buttonSection" v-on:click="this.showDetails">
        <button class="showDetailsButton"><span>View Details</span></button>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar.vue',
  computed: {
    showDatePicker: { get() {return this.$store.getters['statistics/showDatePicker']},},
    showMoodSection: { get() {return this.$store.getters['statistics/showMoodSection']},},
    /*selectedDate: { get(){return this.$store.getters['statistics/selectedDate']}},*/
    selectedDateMoods: { get(){return this.$store.getters['statistics/selectedDateMoods']}},
    moods: { get(){return this.$store.getters['statistics/moods']}}
  },
  data() {
    return {
      filteredMoods: [],
      selectedDate: new Date().toISOString().slice(0, 10),
      date: new Date(),
      documentId: '',
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
    /*this.$store.commit('statistics/setSelectedDate', new Date().toISOString().slice(0, 10));*/
    this.$store.commit('statistics/setShowDatePicker', true);
    this.showDateInfo();
  },
  watch: {
    moods: function () {
      this.showDateInfo()
    },

  },
  methods: {
    // Move this to watch??
    // Marks all dates that contain tracked mood with the color pink.
    functionEvents(date) {
      let foundDate = this.moods.find(trackedMood => {
        let convertedDBTime = new Date(trackedMood.time).toISOString().substring(0, 10)
        return convertedDBTime === date;
      })
      if (foundDate) {
       /* return '#FF69B4'*/
        return '#58d6f1'
 /*       return '#24C6DC'*/
      }
      return null
    },
    // Shows a overview over the different moods that are tracked on the date the user select in the calendar.

    // TODO: separate switch into own method, use filter to find entries for selected date, see filterMoods in MoodTable
    showDateInfo: function () {
      this.$store.commit('statistics/emptySelectedDateMoods');
      let selectedDate = this.selectedDate ? this.selectedDate.split("-") : this.date.toString().split("-");
      this.$store.commit('statistics/setSelectedDate', selectedDate);
      let selectedYear = selectedDate[0]
      let selectedMonth = selectedDate[1]
      let selectedDay = selectedDate[2]

      this.tenseNervousDateDegree = 0;
      this.irritatedAnnoyedDateDegree = 0;
      this.excitedLivelyDateDegree = 0;
      this.cheerfulHappyDateDegree = 0;
      this.boredWearyDateDegree = 0;
      this.gloomySadDateDegree = 0;
      this.relaxedCalmDateDegree = 0;

       this.filteredMoods = this.moods.filter(trackedMood => {
         let dateFromDB = new Date(trackedMood.time).toString().split(" ")
         let trackedDay = dateFromDB[2]
         let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
         let trackedYear = dateFromDB[3]
         return ((trackedYear === selectedYear) && (trackedMonth === selectedMonth) && (trackedDay === selectedDay))
       })

       this.filteredMoods.forEach(filteredMood => {
         switch (filteredMood.emotion) {
           case 'Tense/Nervous':
             this.tenseNervousDateDegree = this.tenseNervousDateDegree + filteredMood.degreeOfEmotion;
             break;
           case 'Irritated/Annoyed':
             this.irritatedAnnoyedDateDegree = this.irritatedAnnoyedDateDegree + filteredMood.degreeOfEmotion;
             break;
           case 'Excited/Lively':
             this.excitedLivelyDateDegree = this.excitedLivelyDateDegree + filteredMood.degreeOfEmotion;
             break;
           case 'Cheerful/Happy':
             this.cheerfulHappyDateDegree = this.cheerfulHappyDateDegree + filteredMood.degreeOfEmotion;
             break;
           case 'Bored/Weary':
             this.boredWearyDateDegree = this.boredWearyDateDegree + filteredMood.degreeOfEmotion;
             break;
           case 'Gloomy/Sad':
             this.gloomySadDateDegree = this.gloomySadDateDegree + filteredMood.degreeOfEmotion;
             break;
           case 'Relaxed/Calm':
             this.relaxedCalmDateDegree = this.relaxedCalmDateDegree + filteredMood.degreeOfEmotion;
             break;
         }
         this.$store.commit('statistics/addSelectedDateMoods', filteredMood);
       })
    },
    showDetails: function () {
      this.$store.commit('statistics/setShowCalendarMoodDetails', true);
      this.$store.commit('statistics/setShowCalendar', false);
      this.$store.commit('statistics/setShowMoodSection', false);
      this.$store.commit('statistics/setShowStat', false);
      this.$store.commit('statistics/setSelectedPage', 'Details');
    },
  }
}
</script>

<style scoped>

.calendarView{
  /*background-color: #cbcaca;*/
/*  background: #12c2e9;  !* fallback for old browsers *!
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  !* Chrome 10-25, Safari 5.1-6 *!
  background: linear-gradient(to left, #f64f59 , #c471ed , #12c2e9); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!
  background: linear-gradient(to right, #24C6DC 0%, #514A9D 100%);*/
  width: 100vw;
  height: 70vh;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
}
/*.calendarView::after {
  content: "";
  background: linear-gradient(to left, #f64f59 , #c471ed , #12c2e9);
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}*/

.v-date-picker {
  top: 11vh;
  width: 290px;
  position: absolute;
}

.moodSection {
  margin-top: 43vh;
/*  background-color: white;*/
  width: 100vw;
  display:flex;
  flex-direction: column;
  align-items: center;
  color: dimgrey;
}

/*.moodSection::after {
  content: "";
  opacity: 0.8;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}*/

.moods {
  display: flex;
  justify-content: center;
  border-radius: 4px;
  padding: 5px 2px;
  margin-top: 0;
  max-width: 290px;
}

.moodStats {
  display: flex;
  flex-direction: column;
  margin: 0 3px;
  color: dimgrey;
  font-weight: 600;
}

.emojiIcon {
  padding: 5px;
  font-size: 30px;
  width: 37px;
  font-weight: bold;
/*  background: white;
  border-radius: 50%;*/
  position: relative;
  z-index: 0;
}

.emojiIcon::after {
  content: "";
  background: white;
  width: 20px;
  height: 20px;
  position:absolute;
  opacity: 1.0;
  top: 9px;
  left: 9px;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.degreeTracked {
  text-align: center;
  font-size: 16px;
  width: 37px;
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

.cheerfulHappyIcon {
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

.buttonSection {
  display: flex;
  justify-content: flex-end;
}

.showDetailsButton {
  background-color: dimgrey;
  padding: 4px 10px;
  border-radius: 10px;
  margin: 2px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  color: white;
  font-size: 16px;
 /* width: 98vw;*/
}

</style>
