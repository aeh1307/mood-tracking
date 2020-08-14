<template>
  <div>
    <div class="selectedDate">
      Tracked moods {{this.selectedDate[2]}}.{{this.selectedDate[1]}}.{{this.selectedDate[0]}}
    </div>

    <table class="moodTable table table-striped table-bordered table-sm">
      <thead class="tableHeader">
      <td id="emotionHeader" class="tableHeaderColumnNames">Emotion</td>
      <td id="degreeHeader" class="tableHeaderColumnNames">Degree</td>
      <td id="timeHeader" class="tableHeaderColumnNames">Time</td>
      </thead>

      <div class="noTrackedMoodsText" v-if="selectedDateMoods.length === 0">
        There are no tracked mood on the day you have selected.
      </div>

      <tr v-bind:key="`${selectedDateMood.id}-key`" :id="selectedDateMood.id" class="tableRow" v-for="selectedDateMood in selectedDateMoods" v-if="selectedDateMoods.length > 0">
        <td><v-icon class="emojiIcon" :id="`icon-${selectedDateMood.id}`" :style="`color: ${findEmojiIcon(selectedDateMood).color}`">{{findEmojiIcon(selectedDateMood).icon}}</v-icon></td>
        <td id="emotionRow" class="tableRowCells"><b class="emotionText">{{ selectedDateMood.emotion }}</b>
          <div class="viewNotes" v-on:click="viewNotes">View notes</div>
        </td>
        <td id="degreeRow" class="tableRowCells">{{ selectedDateMood.degreeOfEmotion }}</td>
        <td id="timeRow" class="tableRowCells">{{ ('0' + new Date(selectedDateMood.time).getHours()).toString()
          .slice(-2) + ':' + (new Date(selectedDateMood.time).getMinutes().toString() + '0').substr(0,2)}}</td>
        <div class="actionSection">
          <v-icon class="trashIcon" v-on:click="deleteMood(selectedDateMood.id)">far fa-trash-alt</v-icon>
          <v-icon class="editIcon" v-on:click="openEditMoodWindow(selectedDateMood)">far fa-edit</v-icon>
        </div>
      </tr>
    </table>
  </div>

</template>
<script>
export default {
  name: 'MoodTable.vue',
  computed: {
    selectedDateMoods: { get(){ return this.$store.getters['statistics/selectedDateMoods'] } },
    selectedDate: { get(){ return this.$store.getters['statistics/selectedDate'] } },
    selectedId: { get(){ return this.$store.getters['statistics/selectedId'] } },
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
      this.$store.commit('statistics/setSelectedId',selectedDateMood.id);
      this.$store.commit('statistics/setSelectedDegree', selectedDateMood.degreeOfEmotion); //number
      this.$store.commit('statistics/setSelectedEmotion', selectedDateMood.emotion); // string
      this.$store.commit('statistics/setSelectedTime', ('0' + new Date(selectedDateMood.time).getHours()).toString()
        .slice(-2) + ':' + (new Date(selectedDateMood.time).getMinutes().toString() + '0').substr(0, 2)); // string

      let selectedMoodEl = document.getElementById(this.selectedId);
      selectedMoodEl.style.border = '1px solid #3CBB75';
      selectedMoodEl.style.backgroundColor = '#b1f8cc';
    },

    viewNotes: function () {
      console.log("View notes fired");
    },
    findEmojiIcon(selectedDateMood) {
      /*        let iconEl = document.querySelector(`#icon-${selectedDateMood.id}`);*/
      let emojiIconObj = {};
      switch(selectedDateMood.emotion){
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
          return  emojiIconObj;
        case 'Bored/Weary':
          emojiIconObj.icon = 'fas fa-meh';
          emojiIconObj.color = '#8B42CC';
          return  emojiIconObj;
        case 'Gloomy/Sad':
          emojiIconObj.icon = 'fas fa-frown';
          emojiIconObj.color = '#3D3D3D';
          return  emojiIconObj;
        case 'Relaxed/Calm':
          emojiIconObj.icon = 'fas fa-smile-beam';
          emojiIconObj.color = '#425CCC';
          return emojiIconObj;
      }
    }
  },

}

</script>

<style scoped>

.moodTable {
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: auto;
}

.selectedDate {
  font-size: 18px;
  text-align: center;
  padding: 10px;
  background-color: white;
}
.tableHeader {
  font-size: 16px;
  font-weight: 600;
  color: #5a5b60;
  padding-left: 40px;
  width: 100vw;
  border-bottom: 1px solid #e3e3e3;
}

.tableHeaderColumnNames {
  /*min-width: 100px;*/
}

.tableRow {
  border: 1px solid #e3e3e3;
  padding-bottom: 15px;
  padding-left: 10px;
  margin-top: 1px;
  display: flex;
  height: 65px;
  justify-content: center;
  align-items: center;
  color: #454444;
}

.tableRowCells {
  font-size: 14px;
  width: 90px;
  height: 20px;
}

.noTrackedMoodsText {
  font-size: 16px;
  padding: 12px;
  text-align: center;
  background-color: white;
}

#emotionRow, #emotionHeader {
  min-width: 115px;
}

.emotionText {
  color: #454444;
}

.emojiIcon {
  font-size: 20px;
  padding: 8px;
}

#degreeRow, #degreeHeader {
  min-width: 75px;
  text-align: center;
  padding-right: 20px;
}

#timeRow, #timeHeader {
  min-width: 74px;
}

#timeRow {
  padding-left: 10px;
}

.actionSection {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.trashIcon, .editIcon {
  color: #454444;
  font-size: 18px;
  padding: 4px;
}

.viewNotes {
  padding-top: 3px;
}
</style>
