<template>
  <div class="mainPage">
      <BackgroundImage/>
  </div>

  </template>
<script>
  import BackgroundImage from "~/components/backgroundImage/BackgroundImage";
  import MapMarker from "../components/mapMarker/MapMarker";
  export default {
    components: {
      BackgroundImage,
      MapMarker,
    },
    mounted() {

    },
  }
</script>


<style scoped>

.mainPage {
  position: absolute;
  overflow: hidden;
}
</style>
