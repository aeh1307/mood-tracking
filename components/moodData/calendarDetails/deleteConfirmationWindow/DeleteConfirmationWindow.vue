<template>
  <div class="flexWrapper" >
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

</template>

<script>
export default {
  name: 'DeleteConfirmationWindow.vue',
  computed: {
    selectedId: { get() { return this.$store.getters['statistics/selectedId']}}
  },
  methods: {
    confirmMoodDeletion: function () {
      let deleteId = this.selectedId;
      let store = this.$store;
      this.$fireStore.collection('users').doc('1').collection('moodTracking')
        .doc(this.selectedId).delete().then(function () {
        console.log(`The mood: ${deleteId} was successfully deleted!`);
        store.commit('statistics/deleteMood', deleteId)
      }).catch(function (error) {
        console.error("Error occurred, could not delete mood: ", error);
      })
      this.$store.commit('statistics/setShowDeleteConfirmationWindow', false);
    },
    cancelMoodDeletion: function () {
      this.$store.commit('statistics/setShowDeleteConfirmationWindow', false);
      let selectedMoodEl = document.getElementById(this.selectedId);
      selectedMoodEl.style.border = '1px solid #e3e3e3';
      selectedMoodEl.style.backgroundColor = 'white';
    },
  },
}

</script>

<style scoped>
.flexWrapper {
  display: flex;
  justify-content: center;
  padding-top: 25%;
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
