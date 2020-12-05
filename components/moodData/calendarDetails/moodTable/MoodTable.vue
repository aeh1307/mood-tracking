<template>
  <v-app>
    <v-dialog v-model="dialog" max-width="320" v-click-outside="this.closeDetails">
      <v-card class="dialogCard" light height="500">
        <v-toolbar elevation="0">
          <v-btn icon dark @click="this.closeDetails">
            <v-icon color="grey">mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="selectedDate">Tracked moods {{ this.selectedDate[2] }}.{{
              this.selectedDate[1]
            }}.{{ this.selectedDate[0] }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="tableSection">
          <table class="moodTable table table-striped table-bordered table-sm">
            <thead class="tableHeader">
            <td id="emotionHeader" class="tableHeaderColumnNames">Emotion</td>
            <td id="degreeHeader" class="tableHeaderColumnNames">Degree</td>
            </thead>

            <div class="noTrackedMoodsText" v-if="filteredMoods.length === 0">
              There are no tracked mood on the day you have selected.
            </div>

            <tr v-bind:key="filteredMood.id" :id="filteredMood.id" class="tableRow"
                v-for="filteredMood in filteredMoods"
                v-if="filteredMoods.length > 0">
              <td>
                <v-icon class="emojiIcon" :id="`icon-${filteredMood.id}`"
                        :style="`color: ${findEmojiIcon(filteredMood).color}`">{{ findEmojiIcon(filteredMood).icon }}
                </v-icon>
              </td>
              <td id="emotionRow" class="tableRowCells">
                <b class="emotionText">{{ filteredMood.emotion }}</b>
                <div> {{
                    ('0' + new Date(filteredMood.time).getHours()).toString()
                      .slice(-2) + ':' + (new Date(filteredMood.time).getMinutes().toString() + '0').substr(0, 2)
                  }}
                </div>

              </td>
              <td id="degreeRow" class="tableRowCells">{{ filteredMood.degreeOfEmotion }}</td>
              <div class="actionSection">
                <v-icon class="trashIcon" v-on:click="deleteMood(filteredMood.id)">far fa-trash-alt</v-icon>
              </div>
            </tr>
          </table>
        </div>
      </v-card>
    </v-dialog>
  </v-app>

</template>
<script>
export default {
  name: 'MoodTable.vue',
  computed: {
    moods: {
      get() {
        return this.$store.getters['statistics/moods']
      }
    },
    selectedDate: {
      get() {
        return this.$store.getters['statistics/selectedDate']
      }
    },
    selectedId: {
      get() {
        return this.$store.getters['statistics/selectedId']
      }
    },
  },
  data() {
    return {
      dialog: true,
      filteredMoods: [],
    }
  },
  methods: {
    deleteMood: function (docId) {
      this.$store.commit('statistics/setShowDeleteConfirmationWindow', true);
      this.$store.commit('statistics/setShowEditMoodWindow', false);
      this.$store.commit('statistics/setSelectedId', docId);
      let selectedMoodEl = document.getElementById(this.selectedId);
      selectedMoodEl.style.border = '1px solid #DE6465';
      selectedMoodEl.style.backgroundColor = '#f5b1b2';
    },
    openEditMoodWindow: function (selectedDateMood) {
      this.$store.commit('statistics/setShowEditMoodWindow', true);
      this.$store.commit('statistics/setShowDeleteConfirmationWindow', false);
      this.$store.commit('statistics/setSelectedId', selectedDateMood.id);
      this.$store.commit('statistics/setSelectedDegree', selectedDateMood.degreeOfEmotion); //number
      this.$store.commit('statistics/setSelectedEmotion', selectedDateMood.emotion); // string
      this.$store.commit('statistics/setSelectedTime', ('0' + new Date(selectedDateMood.time).getHours()).toString()
        .slice(-2) + ':' + (new Date(selectedDateMood.time).getMinutes().toString() + '0').substr(0, 2)); // string

      let selectedMoodEl = document.getElementById(this.selectedId);
      selectedMoodEl.style.border = '1px solid #3CBB75';
      selectedMoodEl.style.backgroundColor = '#b1f8cc';
    },
    findEmojiIcon(selectedDateMood) {
      let emojiIconObj = {};
      switch (selectedDateMood.emotion) {
        case 'Tense/Nervous':
          emojiIconObj.icon = 'fas fa-frown-open';
          emojiIconObj.color = "#3CBB75";
          return emojiIconObj;
        case 'Irritated/Annoyed':
          emojiIconObj.icon = 'fas fa-angry';
          emojiIconObj.color = '#DE6465';
          return emojiIconObj;
        case 'Excited/Lively':
          emojiIconObj.icon = 'fas fa-grin-stars';
          emojiIconObj.color = '#EB7955';
          return emojiIconObj;
        case 'Cheerful/Happy':
          emojiIconObj.icon = 'fas fa-laugh-beam';
          emojiIconObj.color = '#F7CB50';
          return emojiIconObj;
        case 'Bored/Weary':
          emojiIconObj.icon = 'fas fa-meh';
          emojiIconObj.color = '#8B42CC';
          return emojiIconObj;
        case 'Gloomy/Sad':
          emojiIconObj.icon = 'fas fa-frown';
          emojiIconObj.color = '#3D3D3D';
          return emojiIconObj;
        case 'Relaxed/Calm':
          emojiIconObj.icon = 'fas fa-smile-beam';
          emojiIconObj.color = '#425CCC';
          return emojiIconObj;
      }
    },
    filterMoods() {
      let selectedYear = this.selectedDate[0]
      let selectedMonth = this.selectedDate[1]
      let selectedDay = this.selectedDate[2]

      this.filteredMoods = this.moods.filter(trackedMood => {
        let dateFromDB = new Date(trackedMood.time).toString().split(" ")
        let trackedDay = dateFromDB[2]
        let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
        let trackedYear = dateFromDB[3]

        return (trackedYear === selectedYear) && (trackedMonth === selectedMonth) && (trackedDay === selectedDay);
      })

    },
    closeDetails: function () {
      this.dialog = false;
      this.$store.commit('statistics/setShowCalendarMoodDetails', false);
    }
  },
  watch: {
    moods: function () {
      this.filterMoods();
    }
  },
  mounted() {
    this.filterMoods();
  }
}

</script>

<style scoped>

.dialogCard {
  overflow-y: scroll;
}

.moodTable {
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
}

.selectedDate {
  font-size: 18px;
  text-align: center;
  padding: 5px !important;
  background-color: #fefefe;
}

.tableHeader {
  font-size: 16px;
  font-weight: 600;
  color: #5a5b60;
  padding-left: 35px;
}

.tableRow {
  border-top: 1px solid #e3e3e3;
  margin-top: 1px;
  display: flex;
  max-width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  justify-self: center;
  color: #454444;
}

.tableRowCells {
  font-size: 14px;
  width: 90px;
  height: 20px;
}

.noTrackedMoodsText {
  display: flex;
  justify-self: center;
  align-self: center;
  font-size: 16px;
  width: 250px;
  padding: 14px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  background-color: white;
}

#emotionRow, #emotionHeader {
  min-width: 120px;
}

.emotionText {
  color: #454444;
}

.emojiIcon {
  font-size: 20px;
  padding: 8px;
}

#degreeRow {
  min-width: 75px;
  text-align: center;
  padding-right: 20px;
}

#degreeHeader {
  min-width: 110px;
  text-align: center;
}

.actionSection {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}

.trashIcon {
  color: #454444;
  font-size: 18px;
  padding: 4px;
}


@media only screen and (max-width: 330px) {
  .dialogCard {

  }
}

</style>
