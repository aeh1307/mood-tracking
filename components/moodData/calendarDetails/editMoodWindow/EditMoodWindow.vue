<template>
  <div class="flexWrapper">
      <v-app>
          <v-dialog v-model="dialog" persistent max-width="240">
            <v-card class="dialogCard">
              <v-form
                data-app
                class="editForm"
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                color="#fefefe"
              >
                <div>
                  <v-select
                    v-model="newSelectedEmotion"
                    :items="emotions"
                    label="Emotion"
                    required
                    return-object
                    id="selectEmotion"
                    class="v-list-item--link theme--light"
                  ></v-select>

                  <v-select
                    v-model="newSelectedDegree"
                    :items="numbers"
                    item-text="degree"
                    label="Degree"
                    required
                    return-object
                  ></v-select>

                  <v-text-field
                    v-model="newSelectedTime"
                    label="Time"
                    required
                    type="time"
                  ></v-text-field>
                </div>
                <div class="buttonSection">
                  <v-btn width="90px" text color="#DE6465"rounded class="editButton cancelButton" @click="this.cancelEdit">Cancel</v-btn> <!-- Must be v-btn -->
                  <v-btn width="90px" color="#3CBB75" rounded class="editButton confirmationButton" @click="this.editMood">Save</v-btn> <!-- Must be v-btn -->
                </div>
              </v-form>
            </v-card>
            </v-dialog>
      </v-app>
  </div>

</template>
<script>
export default {
  name: 'EditMoodWindow.vue',
  computed: {
    selectedId: { get(){ return this.$store.getters['statistics/selectedId']}},
    selectedEmotion: { get(){ return this.$store.getters['statistics/selectedEmotion']}},
    selectedDegree: { get(){ return this.$store.getters['statistics/selectedDegree']}},
    selectedTime: { get(){ return this.$store.getters['statistics/selectedTime']}},
    selectedDate:  { get(){ return this.$store.getters['statistics/selectedDate']}},
    showEditMoodWindow: { get(){ return this.$store.getters['statistics/showEditMoodWindow']}},
    findSelectedMonth: { get(){ return this.$store.getters['statistics/findSelectedMonth']}},
  },
  data() {
    return{
      dialog: true,
      newSelectedEmotion: this.$store.getters['statistics/selectedEmotion'],
      newSelectedDegree: this.$store.getters['statistics/selectedDegree'],
      newSelectedTime: this.$store.getters['statistics/selectedTime'],
      valid: true,
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
      emotions: [
        'Tense/Nervous',
        'Irritated/Annoyed',
        'Excited/Lively',
        'Cheerful/Happy',
        'Bored/Weary',
        'Gloomy/Sad',
        'Relaxed/Calm',
      ],
      numbers: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ],
      checkbox: false,
      lazy: true,
    }
  },
  methods: {
    editMood: function (){
     // console.log(this.selectedId, this.selectedEmotion, this.selectedDegree, this.selectedTime);
     //  console.log(this.$store.getters['statistics/selectedEmotion']);
      // TODO: fix: issue if month is november or december have to account for 2 digits.
      // TODO: rearrange so date is stored as timestamp and not millisecondtimestamp formated as number in firebase.
      this.$fireStore.collection('users').doc('1').collection('moodTracking').doc(this.selectedId).set({
        degreeOfEmotion: this.newSelectedDegree,
        emotion: this.newSelectedEmotion,
        time: new Date(`${this.selectedDate[2]} ${this.findSelectedMonth} ${this.selectedDate[0]} ${this.newSelectedTime} UTC+02:00`).getTime()
      })


      this.$store.commit('statistics/setSelectedTime', this.newSelectedTime);
      this.$store.commit('statistics/setSelectedEmotion', this.newSelectedEmotion);
      this.$store.commit('statistics/setSelectedDegree', this.newSelectedDegree);

      this.$store.commit('statistics/setShowEditMoodWindow', false);
      let selectedMoodEl = document.getElementById(this.selectedId);
      selectedMoodEl.style.border = '1px solid #e3e3e3';
      selectedMoodEl.style.backgroundColor = 'white';
    },
    cancelEdit: function () {
      this.$store.commit('statistics/setShowEditMoodWindow', false);
      let selectedMoodEl = document.getElementById(this.selectedId);
      selectedMoodEl.style.border = '1px solid #e3e3e3';
      selectedMoodEl.style.backgroundColor = 'white';
    },
  }

}

</script>
<style scoped>

/* Confirmation bubble styling: */
.flexWrapper {
  display: flex;
  justify-content: center;
  z-index: 500;
  align-content: center;
}

.dialogCard {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.confirmationButton {
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  color: white;
  font-size: 16px;
}

.cancelButton {
  border: 1px solid #DE6465;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
}

.editForm {
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  height: 270px;
  width: 210px;
  display: flex;
  flex-direction: column;
}
.buttonSection{
  display: flex;
  justify-content: center;
}
.editButton {
  color: white;
  text-transform: none;
  font-size: 16px;
  width: 160px;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Manrope', sans-serif;
  transition: all 0.5s;
}

</style>
