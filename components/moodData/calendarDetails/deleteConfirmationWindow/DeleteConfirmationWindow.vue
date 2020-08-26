<template>
  <div class="flexWrapper">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="260">
        <v-card class="dialogCard" light min-height="180">
          <div class="informationText">
            Are you sure you want to delete the tracked mood?
          </div>
          <div class="buttonSection">
            <v-btn width="90px" text color="#DE6465" rounded class="editButton cancelButton"
                   @click="this.cancelMoodDeletion">Cancel
            </v-btn>
            <v-btn width="90px" color="#3CBB75" rounded class="editButton confirmationButton"
                   @click="this.confirmMoodDeletion">Confirm
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-app>
  </div>

</template>

<script>
export default {
  name: 'DeleteConfirmationWindow.vue',
  computed: {
    selectedId: {
      get() {
        return this.$store.getters['statistics/selectedId']
      }
    }
  },
  data() {
    return {
      dialog: true,
    }
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
  align-self: center;
  padding-top: 25%;

}

.dialogCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.informationText {
  padding: 40px 20px 5px;
  width: 240px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: normal;
  color: black;
  display: flex;
  justify-self: center;
  align-self: center;
  flex-direction: column;
}

.buttonSection {
  display: flex;
  justify-content: center;
  padding: 15px 15px 20px;
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
