<template>
  <div class="calendarView">
    <v-date-picker
      class="v-date-picker"
      single
      v-model="userSelectedDate"
      :events="functionEvents"
      @change="dateChosen"
      :picker-date.sync="pickerDate"
      no-title
      dark
      v-if="showDatePicker"
    >
    </v-date-picker>
    <div class="moodSection" v-if="moodsCurrentMonth.length !== 0">
      <div class="moods">
        <div class="moodStats" v-if="this.tenseNervousDateDegree !== 0">
          <v-icon class="emojiIcon tenseNervousIcon">fas fa-frown-open</v-icon>
          <div class="degreeTracked">{{ this.tenseNervousDateDegree }}</div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar.vue',
  computed: {
    showDatePicker: {
      get() {
        return this.$store.getters['statistics/showDatePicker']
      },
    },
    showMoodSection: {
      get() {
        return this.$store.getters['statistics/showMoodSection']
      },
    },
    selectedDateMoods: {
      get() {
        return this.$store.getters['statistics/selectedDateMoods']
      }
    },
    moods: {
      get() {
        return this.$store.getters['statistics/moods']
      }
    },
  },
  data() {
    return {
      moodsCurrentMonth: [],
      filteredMoods: [],
      userSelectedDate: null,
      date: new Date(),
      documentId: '',
      tenseNervousDateDegree: 0,
      irritatedAnnoyedDateDegree: 0,
      excitedLivelyDateDegree: 0,
      cheerfulHappyDateDegree: 0,
      boredWearyDateDegree: 0,
      gloomySadDateDegree: 0,
      relaxedCalmDateDegree: 0,
      pickerDate: null,
    }
  },
  mounted() {
    this.$store.commit('statistics/setShowDatePicker', true);
    this.showDateInfo();
  },
  watch: {
    moods: function () {
      this.showDateInfo();
      this.updateMoodsCurrentMonth(this.pickerDate);
    },
    pickerDate: function (val) {
      this.updateMoodsCurrentMonth(val);
    }

  },
  methods: {
    // Marks all dates that contain tracked mood with the color pink.
    functionEvents(date) {
      let foundDate = this.moods.find(trackedMood => {
        let convertedDBTime = new Date(trackedMood.time).toISOString().substring(0, 10)
        return convertedDBTime === date;
      })
      if (foundDate) {
        return '#24C6DC'
      }
      return null
    },
    // Shows a overview over the different moods that are tracked on the date the user select in the calendar.
    // TODO: separate switch into own method, use filter to find entries for selected date, see filterMoods in MoodTable
    showDateInfo: function () {

      this.$store.commit('statistics/emptySelectedDateMoods');
      if (!this.userSelectedDate) return;
      let userSelectedDate = this.userSelectedDate.split("-");
      this.$store.commit('statistics/setSelectedDate', userSelectedDate);

      let selectedYear = userSelectedDate[0]
      let selectedMonth = userSelectedDate[1]
      let selectedDay = userSelectedDate[2]

      this.filteredMoods = this.moods.filter(trackedMood => {
        let dateFromDB = new Date(trackedMood.time).toString().split(" ")
        let trackedDay = dateFromDB[2]
        let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
        let trackedYear = dateFromDB[3]
        return ((trackedYear === selectedYear) && (trackedMonth === selectedMonth) && (trackedDay === selectedDay))
      })

    },
    dateChosen: function () {
      this.showDateInfo()
      this.$store.commit('statistics/setShowCalendarMoodDetails', true)

    },
    updateMoodsCurrentMonth: function (val) {

      this.moodsCurrentMonth = [];
      // Selected month:
      let dateFromDB = val.split("-")
      let selectedMonth = dateFromDB[1];
      let selectedYear = dateFromDB[0];
      this.moodsCurrentMonth = this.moods.filter(trackedMood => {
        let dateFromDB = new Date(trackedMood.time).toString().split(" ")
        let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
        let trackedYear = dateFromDB[3]
        return ((trackedYear === selectedYear) && (trackedMonth === selectedMonth))
      })
//For mood section, selected month:
      this.tenseNervousDateDegree = 0;
      this.irritatedAnnoyedDateDegree = 0;
      this.excitedLivelyDateDegree = 0;
      this.cheerfulHappyDateDegree = 0;
      this.boredWearyDateDegree = 0;
      this.gloomySadDateDegree = 0;
      this.relaxedCalmDateDegree = 0;

      this.moodsCurrentMonth.forEach(filteredMood => {
        switch (filteredMood.emotion) {
          case 'Tense/Nervous':
            this.tenseNervousDateDegree = this.tenseNervousDateDegree + 1;
            break;
          case 'Irritated/Annoyed':
            this.irritatedAnnoyedDateDegree = this.irritatedAnnoyedDateDegree + 1;
            break;
          case 'Excited/Lively':
            this.excitedLivelyDateDegree = this.excitedLivelyDateDegree + 1;
            break;
          case 'Cheerful/Happy':
            this.cheerfulHappyDateDegree = this.cheerfulHappyDateDegree + 1;
            break;
          case 'Bored/Weary':
            this.boredWearyDateDegree = this.boredWearyDateDegree + 1;
            break;
          case 'Gloomy/Sad':
            this.gloomySadDateDegree = this.gloomySadDateDegree + 1;
            break;
          case 'Relaxed/Calm':
            this.relaxedCalmDateDegree = this.relaxedCalmDateDegree + 1;
            break;
        }
      })
    }

  }
}
</script>

<style scoped>

.calendarView {
  width: 100vw;
  height: 70vh;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  overflow: hidden;
}

.v-date-picker {
  top: 11vh;
  width: 290px;
  position: absolute;
}

.moodSection {
  margin-top: 230px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: dimgrey;
}

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
  position: relative;
  z-index: 0;
}

.emojiIcon::after {
  content: "";
  background: white;
  width: 20px;
  height: 20px;
  position: absolute;
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
</style>
