<template>
  <div class="selectMoodInfo">
    <div class="selectMoodInfoBubble">
      <div class="arrow bottom"></div>
      Select a mood you want to track first
    </div>
  </div>

</template>

<script>
export default {
  name: "SelectMoodInfo.vue",
}
</script>

<style scoped>

.selectMoodInfo {
  display: flex;
  justify-content: center;
  z-index: 2;
  position: relative;
}

.selectMoodInfoBubble {
  background-color: #f8f8f8;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  width: 150px;
  padding: 10px;
  position: absolute;
  height: 60px;
  font-size: 14px;
  font-family: 'Manrope', sans-serif;
  bottom: 130px;
  text-align: center;
}

.selectMoodInfoBubble .arrow {
  border-style: solid;
  position: absolute;
}

.bottom {
  border-color: #fefefe transparent transparent transparent;
  border-width: 8px 8px 0px 8px;
  bottom: -8px;
  left: 75px;
}
</style>
