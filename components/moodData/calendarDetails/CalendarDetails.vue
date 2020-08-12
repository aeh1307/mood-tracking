<template>
  <div class="calendarMoodDetails">
    <div class="selectedDate">
      Tracked moods {{this.selectedDate[2]}}.{{this.selectedDate[1]}}.{{this.selectedDate[0]}}
    </div>

    <table v-if="!showEditMoodWindow" class="moodTable table table-striped table-bordered table-sm">
      <thead class="tableHeader">
      <td id="emotionHeader" class="tableHeaderColumnNames">Emotion</td>
      <td id="degreeHeader" class="tableHeaderColumnNames">Degree</td>
      <td id="timeHeader" class="tableHeaderColumnNames">Time</td>
      </thead>

      <div class="noTrackedMoodsText" v-if="selectedDateMoods.length === 0">
        There are no tracked mood on the day you have selected.
      </div>

      <tr :id="selectedDateMood.id" class="tableRow" v-for="selectedDateMood in selectedDateMoods" v-if="selectedDateMoods.length > 0">
        <td><v-icon class="emojiIcon" :id="`icon-${selectedDateMood.id}`">{{findEmojiIcon(selectedDateMood)}}</v-icon></td>
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

      <div class="flexWrapper" v-if="showDeleteConfirmationWindow">
        <div class="confirmationBubble">
          <div class="informationText">
            Are you sure you want to delete the tracked mood?
          </div>
          <div class="buttonSection">
            <button v-on:click="this.cancelMoodDeletion" class="cancelButton">Cancel</button>
            <button v-on:click="this.confirmMoodDeletion" class="confirmationButton"><span>Confirm</span></button>
          </div>
        </div>
      </div>

    <div class="flexWrapper" v-if="showEditMoodWindow">
      <div class="editMoodWindow">
        <v-form
          data-app
          class="editForm"
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <div>
            <v-select
              v-model="selectedEmotion"
              :items="emotions"
              item-text="hi"
              item-color="white"
              label="Emotion"
              return-object
              required
              single-line
            ></v-select>

            <v-select
              v-model="selectedDegree"
              :items="numbers"
              item-text="degree"
              item-color="white"
              label="Degree"
              return-object
              required
              single-line
            ></v-select>

           <!-- <v-select
              v-model="selectedDegree"
              :items="numbers"
              item-text="degree"
              label="Degree"
              return-object
              required
              single-line
            ></v-select>-->

            <v-text-field
              v-model="selectedTime"
              label="Time"
              required
            ></v-text-field>
          </div>
          <div class="saveButtonSection">
            <v-btn class="editButton" @click="editMood()">
              Save
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CalendarDetails.vue',
  computed: {
    selectedDate: {
      get() {
        return this.$store.getters['statistics/selectedDate']
      }
    },
    selectedDateMoods: {
      get() {
        return this.$store.getters['statistics/selectedDateMoods']
      }
    },
  },
    data() {
      return {
        emojiIcon: '',
        selectedDateMoodCopy: '',
        moodToEdit: {},
        valid: true,
        selectedId: '',
        selectedDegree: '',
        selectedEmotion: '',
        selectedTime: '',
        selectedTimestamp: '',
        /*      degreeRules: [
        v => !!v || 'Degree is required',
        v => (1>= v <= 7) || 'Degree must be from 1-7',
      ],
      timeRules: [
        v => !!v || 'Time is required',
        v => /.+@.+\..+/.test(v) || 'Time must be valid',
      ],*/
        select: {},
        emotions: [
          'Tense/nervous',
          'Irritated/Annoyed',
          'Excited/Lively',
          'Cheerful/Happy',
          'Bored/Weary',
          'Gloomy/Sad',
          'Relaxed/Calm',
        ],
        numbers: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
        ],
        checkbox: false,
        lazy: true,
        showEditMoodWindow: false,
        showDeleteConfirmationWindow: false,
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
            value: 'degree'
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
      deleteMood: function (docId) {
        this.showDeleteConfirmationWindow = true;
        this.selectedId = docId;
        let selectedMoodEl = document.getElementById(this.selectedId);
        selectedMoodEl.style.border = '1px solid #DE6465';
      },
      confirmMoodDeletion: function () {
        this.$fireStore.collection('users').doc('1').collection('moodTracking')
          .doc(this.selectedId).delete().then(function () {
          console.log("The mood was successfully deleted!",);
        }).catch(function (error) {
          console.error("Error occurred, could not delete mood: ", error);
        })
        this.showDeleteConfirmationWindow = false;
      },
      cancelMoodDeletion: function () {
        this.showDeleteConfirmationWindow = false;
        let selectedMoodEl = document.getElementById(this.selectedId);
        selectedMoodEl.style.border = '1px solid #e3e3e3';
      },
      openEditMoodWindow: function (selectedDateMood) {
        this.showEditMoodWindow = true;
        this.selectedDateMoodCopy = selectedDateMood;
        console.log(selectedDateMood.degreeOfEmotion);
        this.selectedId = selectedDateMood.id;
        this.selectedDegree = selectedDateMood.degreeOfEmotion;
        this.selectedEmotion = selectedDateMood.emotion;
        this.selectedTime = ('0' + new Date(selectedDateMood.time).getHours()).toString()
          .slice(-2) + ':' + (new Date(selectedDateMood.time).getMinutes().toString() + '0').substr(0, 2)
      },
      closeEditMoodWindow: function () {
        this.showEditMoodWindow = false;
      },
      editMood() {
        console.log("Will edit document with id: ", this.selectedDateMoodCopy.id);
       /* this.$fireStore.collection('users').doc('1').collection('moodTracking').doc(this.selectedDateMoodCopy.id).set({
          degreeOfEmotion: newDegreeValue,
          emotion: newEmotionValue,
          time: newTimeValue,
        })*/
      },
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
      viewNotes: function () {
        console.log("View notes fired");
      },
      findEmojiIcon(selectedDateMood) {
        let iconEl = document.getElementById(`icon-${selectedDateMood.id}`);
        switch(selectedDateMood.emotion){
          case 'Tense/Nervous':
          /*  iconEl.style.color = '#3CBB75';*/ /* TODO: <-- not working: null, even though element is found in iconEL*/
            this.emojiIcon = 'fas fa-frown-open';
            break;
          case 'Irritated/Annoyed':
            // iconEl.style.color = '#425CCC';
            this.emojiIcon = 'fas fa-angry';
            break;
          case 'Excited/Lively':
            // iconEl.style.color = '#EB7955';
            this.emojiIcon = 'fas fa-grin-stars';
            break;
          case 'Cheerful/Happy':
            // iconEl.style.color = '#F7CB50';
            this.emojiIcon = 'fas fa-laugh-beam';
            break;
          case 'Bored/Weary':
            // iconEl.style.color = '#8B42CC';
            this.emojiIcon = 'fas fa-meh';
            break;
          case 'Gloomy/Sad':
            // iconEl.style.color = '#3D3D3D';
            this.emojiIcon = 'fas fa-frown';
            break;
          case 'Relaxed/Calm':
            // iconEl.style.color = '#425CCC';
            this.emojiIcon = 'fas fa-smile-beam';
            break;
        }
        return this.emojiIcon;
      }
    },
}

</script>
<style scoped>
.calendarMoodDetails {
  background-color: #cbcaca;
  height: 75vh;
  min-width: 100vw;
  max-width: 100vw;
  border-radius: 5px;
  top: 0;
}

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
  color: #514A9D;
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
.eyeIcon{
  color: #605f5f;
  font-size: 16px;
  padding: 4px;
}

.editMoodWindow{
  /*background-color: white;
  display: flex;
  justify-content: center;*/
  width: 240px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
  height: 300px;
  background-color: white;
  position: absolute;
  bottom: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.editForm {
  max-width: 200px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: absolute;
}
.saveButtonSection{
  display: flex;
  justify-content: flex-end;
}
.editButton {
  display: flex;
  justify-self: flex-end;
  color: #425CCC;
  font-weight: bold;
  border: 2px solid #5871d9;
}
/* Confirmation bubble styling: */
.flexWrapper {
  display: flex;
  justify-content: center;
}

.confirmationBubble {
  width: 260px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
  height: 180px;
  background-color: white;
  position: absolute;
  bottom: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.informationText {
  padding: 25px;
  width: 240px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

.buttonSection {
  display:flex;
  justify-content: center;
}

.confirmationButton {
  background-color: #3CBB75;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  color: white;
  font-size: 16px;
}

.cancelButton {
  background-color: white;
  color: #DE6465;
  border: 1px solid #DE6465;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
}

</style>
