<template>
  <div>
<!--    <Reminder/>--> <!-- TODO: comment in -->
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
    },
    computed: {
      backgroundImagePath: { get() { return this.$store.getters['settings/backgroundImagePath']}},
    },
    watch: {
      backgroundImagePath: function (val) {
        let element = document.querySelector('.mainContainer');
        element.className = `mainContainer ${val}`;
      },
    },
    mounted() {
      let element = document.querySelector('.mainContainer');
      element.className = `mainContainer ${this.backgroundImagePath}`;
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
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}
</style>
