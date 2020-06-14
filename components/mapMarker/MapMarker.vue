<template>
  <div class="markerContainer">
    <v-icon class="marker">fas fa-map-marker-alt</v-icon>
    <img class="markerPath" src="@/assets/markerPath.svg"/>
  </div>
</template>

<script>
  export default {
    name: "Marker.vue"
  }
</script>

<style scoped>
  .markerContainer {
    display: flex;
    align-content: center;
    margin-left: 45vw;
  }
  .marker {
    font-size: 40px;
    color: #3e3e3e;
    position: fixed;
    margin-top: 37vh;
  }

  .markerPath {
    width: 100%;
    height: 48%;
    position: fixed;
    right: 22vw;
    top: 33vh;
    transform: scale(1.1);
  }
</style>
