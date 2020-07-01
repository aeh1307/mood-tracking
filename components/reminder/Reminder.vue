<template>
  <div class="reminder">
    <div class="reminderBubble">
      <div class="arrow bottom"></div>
      You have completed 2/3 parts of the survey.
      Remember to complete the last part at   http://survey.com
    </div>
  </div>

</template>

<script>
  export default {
    name: "Reminder.vue"
  }
</script>

<style scoped>

  .reminder {
    display: flex;
    justify-content: center;
  }
  .reminderBubble{
    background-color: #f8f8f8;
    border: 1px solid #c8c8c8;
    border-radius: 5px;
    width: 250px;
    padding: 10px;
    position: absolute;
    height: 80px;
    font-size: 14px;
    font-family: 'Manrope', sans-serif;
    top: 10%;
  }

 /* .reminderBubble .arrow {
    border-style: solid;
    position: absolute;
  }*/
  .bottom {
    border-color: #878787 transparent transparent transparent;
    border-width: 8px 8px 0px 8px;
    bottom: -8px;
    left:125px;
  }
  .bottom:after {
    border-color: #f8f8f8 transparent transparent transparent;
    border-style: solid;
    border-width: 7px 7px 0px 7px;
    bottom: 1px;
    content: "";
    position: absolute;
    left: -3px;
  }



</style>
