<template>
  <div class="calendarMoodDetails">
    <div class="selectedDate">
      Moods tracked {{this.selectedDate[2]}}.{{this.selectedDate[1]}}.{{this.selectedDate[0]}}
    </div>

   <!-- <mdb-datatable
    :data="selectedDateMoods"
    striped
    bordered
  />-->
    <table class="moodTable table table-striped table-bordered table-sm">
      <thead class="tableHeader">
      <td id="emotionHeader" class="tableHeaderColumnNames">Emotion</td>
      <td id="degreeHeader" class="tableHeaderColumnNames">Degree</td>
      <td id="timeHeader" class="tableHeaderColumnNames">Time</td>
      </thead>
      <tr class="tableRow" v-for="selectedDateMood in selectedDateMoods">
        <td id="emotionRow" class="tableRowCells">{{ selectedDateMood.emotion }}</td>
        <td id="degreeRow" class="tableRowCells">{{ selectedDateMood.degreeOfEmotion }}</td>
        <td id="timeRow" class="tableRowCells">{{ new Date(selectedDateMood.time * 1000).getHours()+ ':' + new Date(selectedDateMood.time * 1000).getMinutes() }}</td>
        <div class="actionSection">
          <v-icon class="trashIcon" v-on:click="deleteMood">far fa-trash-alt</v-icon>
          <v-icon class="editIcon">far fa-edit</v-icon>
        </div>
      </tr>
    </table>
     <!--<v-data-table :headers="headers"
                   :items="this.selectedDateMoods"
                   :items-per-page="5" dense></v-data-table>-->
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
import { mdbDatatable } from 'mdbvue';
export default {
  name: 'CalendarDetails.vue',
  components: {
    mdbDatatable
  },
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
 /*     data: {
        columns: [
          {
          label: 'Emotion',
          field: 'emotion',
          sort: 'asc'
          },
          {
            label: 'Degree',
            field: 'degreeOfEmotion',
            sort: 'asc'
          },
          {
            label: 'Time',
            field: 'time',
            sort: 'asc'
          },
        ],
        rows: this.selectedDateMoods
      },*/
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
  methods: {
    deleteMood: function () {

    }
  }
}

</script>
<style scoped>
.calendarMoodDetails {
  background-color: #cbcaca;
  height: 75vh;
  min-width: 100vw;
  max-width: 290px;
  border-radius: 5px;
  top: 0;
}

.moodTable {
  display: flex;
  flex-direction: column;
  background-color: white;
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
  padding-left: 20px;
  width: 100vw;
  border-bottom: 1px solid #e3e3e3;
}

.tableHeaderColumnNames {
  /*min-width: 100px;*/
}

.tableRow {
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 5px;
  padding-left: 20px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.tableRowCells {
  font-size: 14px;
  width: 90px;
  height: 20px;
}

#emotionRow, #emotionHeader {
  min-width: 130px;
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
.trashIcon {
  color: #454444;
  font-size: 18px;
  padding: 4px;
}

.editIcon {
  color: #454444;
  font-size: 18px;
  padding: 4px;
}

</style>
