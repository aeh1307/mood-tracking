<template>
  <div class="calendarView">
    <v-date-picker
      class="v-date-picker"
      dark
      single
      v-model="selectedDate"
      :events="functionEvents"
      @change="showDateInfo"
      no-title
      v-if="showDatePicker"
    >
    </v-date-picker>
    <div class="moodSection" v-if="showMoodSection">
      <div class="moods">
        <div class="moodStats">
          <v-icon class="emojiIcon tenseNervousIcon">fas fa-frown-open</v-icon>
          <div class="degreeTracked">{{ this.tenseNervousDateDegree }}</div>
        </div>
        <div class="moodStats">
          <v-icon class="emojiIcon irritatedAnnoyedIcon">fas fa-angry</v-icon>
          <div class="degreeTracked">{{ this.irritatedAnnoyedDateDegree }}</div>
        </div>
        <div class="moodStats">
          <v-icon class="emojiIcon excitedLivelyIcon">fas fa-grin-stars</v-icon>
          <div class="degreeTracked">{{ this.excitedLivelyDateDegree }}</div>
        </div>
        <div class="moodStats">
          <v-icon class="emojiIcon cheerfulHappyIcon">fas fa-laugh-beam</v-icon>
          <div class="degreeTracked">{{ this.cheerfulHappyDateDegree }}</div>
        </div>
        <div class="moodStats">
          <v-icon class="emojiIcon boredWearyIcon">fas fa-meh</v-icon>
          <div class="degreeTracked">{{ this.boredWearyDateDegree }}</div>
        </div>
        <div class="moodStats">
          <v-icon class="emojiIcon gloomySadIcon">fas fa-frown</v-icon>
          <div class="degreeTracked">{{ this.gloomySadDateDegree }}</div>
        </div>
        <div class="moodStats">
          <v-icon class="emojiIcon relaxedCalmIcon">fas fa-smile-beam</v-icon>
          <div class="degreeTracked">{{ this.relaxedCalmDateDegree }}</div>
        </div>
      </div>
      <div class="buttonSection">
        <!--<button v-on:click="this.deleteMood" class="deleteButton"><span>Delete Mood</span></button>
        <button v-on:click="this.updateMood" class="showDetailsButton"><span>Update</span></button>-->
        <button v-on:click="this.showDetails" class="showDetailsButton"><span>View Details</span></button>

      </div>
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
     /* xLabels: [], /!* For chart *!/
      yDegrees: [], /!* For chart *!/*/
      selectedDate: new Date().toISOString().slice(0, 10),
      selectAttribute: {
        dot: true
      },
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
  },
  watch: {
    moods: function () {
      this.showDateInfo()
    }
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
        return '#FF69B4'
      }
      return null
    },
    // Shows a overview over the different moods that are tracked on the date the user select in the calendar.
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

      this.moods.forEach(trackedMood => {
        let dateFromDB = new Date(trackedMood.time).toString().split(" ")
        let trackedDay = dateFromDB[2]
        let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
        let trackedYear = dateFromDB[3]
        /*let trackedTime = dateFromDB[4]*/

        /*          console.log("Test: ", dateFromDB, "Day: ", trackedDay, "Month: ", trackedMonth, "Year: ", trackedYear, "Time: ", trackedTime)*/
        if ((trackedYear === selectedYear) && (trackedMonth === selectedMonth) && (trackedDay === selectedDay)) {
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
          this.$store.commit('statistics/addSelectedDateMoods', trackedMood);
        }
      })
    },
    showDetails: function () {
      this.$store.commit('statistics/setShowCalendarMoodDetails', true);
      this.$store.commit('statistics/setShowCalendar', false);
      this.$store.commit('statistics/setShowMoodSection', false);
      this.$store.commit('statistics/setShowStat', false);
    }
  }
}
</script>

<style scoped>

.calendarView{
  background-color: #cbcaca;
  width: 100vw;
  height: 76vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.v-date-picker {
  top: -55px;
  width: 290px;
}

.moodSection {
  margin-top: -45px;
  background-color: white;
  width: 100vw;
  display:flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightgrey;
}

.moods {
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  padding: 5px 2px;
  margin-top: 0;
  width: 290px;
}

.moodStats {
  display: flex;
  flex-direction: column;
  width: 277px;
}

.emojiIcon {
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

.deleteButton {
  background-color: #DE6465;
  padding: 5px 15px;
  border-radius: 10px;
  margin: 2px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  color: white;
  font-size: 16px;
}

.showDetailsButton {
  background-color: #23a2b3;
  padding: 4px 10px;
  border-radius: 10px;
  margin: 2px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  color: white;
  font-size: 16px;
  width: 98vw;
}

</style>
