<template>
  <div class="flexWrapper">
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
            v-model="newSelectedEmotion"
            :items="emotions"
            label="Emotion"
            required
            return-object
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
        <div class="saveButtonSection">
          <v-btn color="#3CBB75" rounded class="editButton" @click="this.editMood">Save</v-btn> <!-- Must be v-btn -->
        </div>
      </v-form>
    </div>
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
      console.log("Test: ",this.selectedId)
      console.log("Test: ",this.newSelectedEmotion)
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
  }

}

</script>
<style scoped>
.editMoodWindow{
  width: 230px;
  border: 1px solid grey;
  border-radius: 10px;
  height: 280px;
  background-color: white;
  bottom: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.v-menu__content {
  top: -20px !important;
}

.v-menu__content .v-list {
  position: relative;
  /*  top: -20px;*/
}

.v-text-field {
  padding-top: 0;
}

.v-select__selections {
  text-align: right;
}

.editForm {
  padding: 25px;
  height: 270px;
  width: 210px;
  display: flex;
  flex-direction: column;
}
.saveButtonSection{
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

/* Confirmation bubble styling: */
.flexWrapper {
  display: flex;
  justify-content: center;
  padding-top: 25%;
}
</style>
