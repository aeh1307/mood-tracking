<template>
  <div class="mainPage">
<!--    <Reminder/>--> <!-- TODO: comment in -->
      <BackgroundImage/>
  </div>

  </template>
<script>
  import BackgroundImage from "~/components/backgroundImage/BackgroundImage";
  import MapMarker from "../components/mapMarker/MapMarker";
  import Reminder from "../components/reminder/Reminder";
  export default {

    components: {
      BackgroundImage,
      MapMarker,
      Reminder,
    },
    mounted() {
    },
  }
</script>


<style scoped>

.mainPage {
  position: absolute;
}
</style>
