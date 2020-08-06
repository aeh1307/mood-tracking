<template>
  <div class="flexWrapper">
    <div class="confirmationBubble">
      <div class="informationText">
        Would you like to track
        <span class="trackingInformation">
          Emotion: <span class="trackingInformationEmphasized">{{this.emojiDescription}}</span>
          Degree/intensity: <span class="trackingInformationEmphasized">{{this.degreeOfEmotion}}</span> ?
        </span>
      </div>
      <div class="buttonSection">
        <button v-on:click="this.cancelMoodTracking" class="cancelButton">Cancel</button>
        <button v-on:click="this.confirmMoodTracking" class="confirmationButton"><span>Confirm</span></button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ConfirmationBubble.vue",
    computed: {
      emojiDescription: { get() { return this.$store.getters['moodtracker/emojiDescription'] }},
      degreeOfEmotion: { get() { return this.$store.getters['moodtracker/degreeOfEmotion'] }},
    },
    methods: {
      cancelMoodTracking(){
        this.$store.commit('moodtracker/setShowConfirmationBubble', false)
        this.$store.commit('moodtracker/setCount', 0)
      },
      confirmMoodTracking() {
        this.$store.commit('moodtracker/setShowConfirmationBubble', false)
        this.$store.commit('moodtracker/setShowFeedbackBubble', true)
        this.$fireStore.collection('users').doc('1').collection('moodTracking').add({
          emotion: this.emojiDescription, degreeOfEmotion: this.degreeOfEmotion, time: Date.now()
        }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        setTimeout(() => {this.$store.commit('moodtracker/setShowFeedbackBubble', false)
        this.$store.commit('moodtracker/setCount', 0)}, 3000)

      }
    }
  }
</script>

<style scoped>
  .flexWrapper {
    display: flex;
    justify-content: center;
  }

  .confirmationBubble {
    width: 260px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    height:200px;
    background-color: white;
    position: absolute;
    bottom: 145px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .informationText {
    padding: 25px;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    display: flex;
    flex-direction: column;
  }

  .trackingInformation{
    justify-content: center;
  }

  .trackingInformationEmphasized {
    font-weight: bold;
    color: #1177b1;
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
  }

  .cancelButton {
    background-color: white;
    color: #DE6465;
    border: 1px solid #DE6465;
    padding: 10px 20px;
    border-radius: 10px;
    margin: 5px;
    font-family: 'Manrope', sans-serif;
  }

</style>
