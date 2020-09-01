<template>
  <div class="flexWrapper">
    <v-app>
        <v-dialog v-model="dialog" persistent max-width="260">
          <v-card class="dialogCard" light min-height="180">
            <div class="buttonSection">
              <v-icon class="checkMark">fas fa-check-circle</v-icon>
            </div>
            <div class="informationText">
              <h3 class="feedbackText">Mood was tracked successfully!</h3>
              <p class="additionalInfo">See your tracked moods in Statistics</p>
            </div>
          </v-card>
        </v-dialog>
    </v-app>
  </div>
</template>
<script>
  export default {
    name: 'FeedbackBubble.vue',
    data(){
      return{
      dialog: true,
    }
    }
  }
</script>

<style scoped>
  .flexWrapper {
    display: flex;
    justify-content: center;
  }

  .dialogCard{
    padding-top: 15px;
  }

  .informationText {
    padding-bottom: 10px;
    font-family: 'Manrope', sans-serif;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .feedbackText {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 8px;

  }

  .additionalInfo {
    font-size: 16px;
    text-align: center;
  }

  .buttonSection {
    display:flex;
    justify-content: center;
  }

  .checkMark {
    color: #3CBB75;
    background-color: white;
    font-size: 45px;
    position: relative;
   /* top: -25px;*/
  /*  border-radius: 100%;*/
   /* padding: 5px;
    top: -30px;*/
  }

</style>
