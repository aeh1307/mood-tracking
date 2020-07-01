<template>
  <div>
    <Reminder/>
   <!-- <MapMarker/>-->
    <div class="mainContainer">
    </div>
  </div>

  </template>
<script>
  import MapMarker from "../components/mapMarker/MapMarker";
  import Reminder from "../components/reminder/Reminder";
  export default {
    components: {
      MapMarker,
      Reminder,
    }
  }
</script>


<style scoped>
.mainContainer {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url('../assets/bali.jpg') no-repeat center fixed;
  background-size: cover;

  height: 100vh;
}
</style>
