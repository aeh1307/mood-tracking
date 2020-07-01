<template>
  <div class="flexWrapper">
    <div class="confirmationBubble">
      <div class="buttonSection">
        <v-icon class="checkMark">fas fa-check-circle</v-icon>
      </div>
      <div class="informationText">
        <h3 class="feedbackText">Mood was tracked successfully!</h3>
        <p class="additionalInfo">See all your tracked moods in Statistics</p>
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
    width: 290px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 15px;
    height:180px;
    background-color: white;
    position: absolute;
    bottom: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .informationText {
    padding: 10px;
    font-family: 'Manrope', sans-serif;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .feedbackText {
    text-align: center;
    padding: 15px 0;

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
    font-size: 55px;
    position: absolute;
    top: -25px;
    border-radius: 50%;
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
