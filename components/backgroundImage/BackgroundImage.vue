<template>
  <div class="backgroundImage"></div>
</template>
<script>
export default {
  name: 'BackgroundImage.vue',
  computed: {
    backgroundImagePath: { get() { return this.$store.getters['settings/backgroundImagePath']}},
  },
  watch: {
    backgroundImagePath: function (val) {
      let element = document.querySelector('.backgroundImage');
      element.className = `backgroundImage ${val}`;
    },
  },
  mounted() {
    let element = document.querySelector('.backgroundImage');
    element.className = `backgroundImage ${this.backgroundImagePath}`;
  }
}

</script>
<style scoped>
.backgroundImage {
  height: 100vh;
  overflow: hidden;
  max-width: 100vw;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}

.baliBackgroundImage {
  background-image: url('~assets/bali.jpg');
}

.pinkBeachBackgroundImage {
  background-image:  url('~assets/pinkishBeach.jpg');
}

.lakeMountainBackgroundImage {
  background-image:  url('~assets/water.jpg');
}
.oceanSunBackgroundImage {
  background-image:  url('~assets/ocean.jpg');
}
</style>
