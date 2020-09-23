<template>
  <div class="flexWrapper">
    <v-app>
        <v-dialog v-model="dialog" max-width="260" v-click-outside="this.cancelMoodTracking">
          <v-card class="dialogCard" light min-height="180">
            <div class="informationText">
              Would you like to track
              <span class="trackingInformation">
          Emotion: <span class="trackingInformationEmphasized">{{ this.emojiDescription }}</span>
          Degree/intensity: <span class="trackingInformationEmphasized">{{ this.degreeOfEmotion }}</span>
        </span>
            </div>
          <!--  <div><span>Add notes <v-icon @click="this.addNote">fas fa-plus-circle</v-icon></span></div>
            <v-textarea v-if="seeNotes" value="Write your notes here ..." v-model="notes" filled></v-textarea>-->
            <div class="buttonSection">
              <v-btn width="90px" text color="#DE6465" rounded class="editButton cancelButton"
                     @click="this.cancelMoodTracking">Cancel
              </v-btn> <!-- Must be v-btn -->
              <v-btn width="90px" color="#3CBB75" rounded class="editButton confirmationButton"
                     @click="this.confirmMoodTracking">Confirm
              </v-btn> <!-- Must be v-btn -->
            </div>
          </v-card>
        </v-dialog>

    </v-app>
  </div>
</template>
<script>
import { auth, db } from '~/plugins/firebase-client-init';
export default {
  name: "ConfirmationBubble.vue",
  computed: {
    emojiDescription: {
      get() {
        return this.$store.getters['moodtracker/emojiDescription']
      }
    },
    degreeOfEmotion: {
      get() {
        return this.$store.getters['moodtracker/degreeOfEmotion']
      }
    },
    notes: {
      get() {
        return this.$store.getters['moodtracker/notes']
      },
      set(value){
        this.$store.commit('moodtracker/setNotes', value);
      }
    },
  },
  data(){
    return{
      seeNotes: false,
      dialog: true,
    }
  },
  methods: {
    cancelMoodTracking: function() {
      this.$store.commit('moodtracker/setShowConfirmationBubble', false);
      this.$store.commit('moodtracker/setEmojiDescription', '');
      this.$store.commit('moodtracker/setNotes', '');
      document.querySelector('#tenseNervous').style.border = 'none';
      document.querySelector('#excitedLively').style.border = 'none';
      document.querySelector('#cheerfulHappy').style.border = 'none';
      document.querySelector('#relaxedCalm').style.border = 'none';
      document.querySelector('#gloomySad').style.border = 'none';
      document.querySelector('#boredWeary').style.border = 'none';
      document.querySelector('#irritatedAnnoyed').style.border = 'none';

    },
    confirmMoodTracking: function() {
      this.$store.commit('moodtracker/setDegreeOfEmotion', 4);
      this.$store.commit('moodtracker/setEmojiDescription', '');
      this.$store.commit('moodtracker/setShowEmotionOverview', false);
      document.querySelector('#tenseNervous').style.border = 'none';
      document.querySelector('#excitedLively').style.border = 'none';
      document.querySelector('#cheerfulHappy').style.border = 'none';
      document.querySelector('#relaxedCalm').style.border = 'none';
      document.querySelector('#gloomySad').style.border = 'none';
      document.querySelector('#boredWeary').style.border = 'none';
      document.querySelector('#irritatedAnnoyed').style.border = 'none';



      this.$store.commit('moodtracker/setShowConfirmationBubble', false)
      this.$store.commit('moodtracker/setShowFeedbackBubble', true)
      db.collection('users').doc(auth.currentUser.uid).collection('moodTracking').add({
        emotion: this.emojiDescription, degreeOfEmotion: this.degreeOfEmotion, time: Date.now(), notes: this.notes,
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      setTimeout(() => {
        this.$store.commit('moodtracker/setShowFeedbackBubble', false);
      }, 3000)
      this.$store.commit('moodtracker/setNotes', '');


    },
 /*   addNote: function() {
      this.seeNotes = true;
    }*/
  }
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
  align-items: center;
}

.informationText {
  padding: 40px 20px 5px;
  width: 240px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

.trackingInformation {
  justify-content: center;
}

.trackingInformationEmphasized {
  font-weight: 700;
  color: #1177b1;
  /*color: #ad5389;*/
}

.buttonSection {
  display: flex;
  justify-content: center;
}

.confirmationButton {
  background-color: #3CBB75;
  /*background-color: #3c1053 !important;*/
/*  background-color: #ad5389 !important;*/
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  transition: all 0.5s;
  font-family: 'Manrope', sans-serif;
  color: white;
}

.cancelButton {
  background-color: white;
  color: #DE6465;
  border: 1px solid #DE6465;
  /*color:#3c1053 !important;*/
  /*border: 1px solid #ad5389;*/
  padding: 10px 20px;
  border-radius: 10px;
  margin: 5px;
  font-family: 'Manrope', sans-serif;
}

.buttonSection {
  display:flex;
  justify-content: center;
  padding: 15px 15px 20px;
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
