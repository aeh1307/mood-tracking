<template>
  <div class="calendarMoodDetails">
    <div class="selectedDate">
      Moods tracked {{this.selectedDate[2]}}.{{this.selectedDate[1]}}.{{this.selectedDate[0]}}
    </div>
    <table class="table">
      <thead class="tableHeader">
      <td class="tableHeaderColumnNames">Emotion</td>
      <td class="tableHeaderColumnNames">Degree</td>
      <td class="tableHeaderColumnNames">Time</td>
      </thead>
      <tr v-for="selectedDateMood in selectedDateMoods">
        <td id="emotionRow" class="tableRows">{{ selectedDateMood.emotion }}</td>
        <td class="tableRows">{{ selectedDateMood.degreeOfEmotion }}</td>
        <td class="tableRows">{{ selectedDateMood.time }}</td>
        <div class="actionSection">
          <v-icon class="trashIcon">far fa-trash-alt</v-icon>
          <v-icon class="editIcon">far fa-edit</v-icon>
        </div>
      </tr>
    </table>
    <!-- <v-data-table :headers="headers"
                   :items="moods"
                   :items-per-page="5"></v-data-table>-->
    <!--
      <ul>
        <li v-for="mood in moods">
          <div class="tableRow">
            <div>{{ mood.emotion}}</div>
            <div>{{ mood.degreeOfEmotion}}</div>
            <div>{{ mood.time}}</div>
          </div>
        </li>
      </ul>-->
  </div>
</template>
<script>
export default {
  name: 'CalendarMoodDetails.vue',
  computed: {
    selectedDate: {
      get() {
        return this.$store.getters['statistics/selectedDate']
      }
    },
    selectedDateMoods: { get() {return this.$store.getters['statistics/selectedDateMoods']}}
  },
  data() {
    return {
      headers: [
        {
          text: 'Emotion',
          align: 'start',
          sortable: false,
          value: 'emotion',
        },
        {
          text: 'Degree',
          align: 'start',
          sortable: false,
          value: 'degreeOfEmotion'
        },
        {
          text: 'Time',
          align: 'start',
          sortable: false,
          value: 'time'
        },
      ],
    }
  },
}

</script>
<style scoped>
.calendarMoodDetails {
  background-color: white;
  min-height: 375px;
  min-width: 290px;
  max-width: 290px;
  border-radius: 5px;
  top: 0;
}

.table {
  display: flex;
  flex-direction: column;
}

.selectedDate {
  font-size: 18px;
  text-align: center;
  padding: 10px;
}
.tableHeader {
  font-size: 16px;
  font-weight: 600;
  color: #5a5b60;
}

.tableHeaderColumnNames {
  width: 155px;
}

.tableRows {
  font-size: 14px;
  border-top: 1px solid #e3e3e3;
  width: 130px;
  height: 30px;
}

#emotionRow {
  min-width: 130px;
}

.actionSection {
  display: flex;
  justify-content: flex-end;
}
.trashIcon {
  color: #2b2b2b;
  font-size: 20px;
}

.editIcon {
  color: #2b2b2b;
  font-size: 20px;
}

</style>
