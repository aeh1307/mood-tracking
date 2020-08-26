<template>
  <div>
<!--    <Reminder/>--> <!-- TODO: comment in -->
    <div>
      <BackgroundImage/>
    </div>
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
  }
</script>


<style scoped>
</style>
