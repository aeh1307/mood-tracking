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
        element.style.backgroundImage = `url('${val}')`;
      },
    },
    mounted() {
      let element = document.querySelector('.mainContainer');
      element.style.backgroundImage = `url('${this.backgroundImagePath}')`;
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
  background: no-repeat center fixed;
  background-size: cover;
  height: 100vh;
}
</style>
