<template>
  <div class="flexWrapper">
    <div class="confirmationBubble">
      <div class="buttonSection">
        <v-icon class="checkMark">fas fa-check-circle</v-icon>
      </div>
      <div class="informationText">
        <h3 class="feedbackText">Mood was tracked successfully!</h3>
        <p class="additionalInfo">See your tracked moods in Statistics</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "FeedbackBubble.vue",
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
    padding: 15px;
    height:200px;
    background-color: white;
    position: absolute;
    bottom: 145px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .informationText {
    padding-bottom: 10px;
    font-family: 'Manrope', sans-serif;
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
