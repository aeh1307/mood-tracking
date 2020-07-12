<template class="backgroundPhotosDisplayContainer">
  <div class="backgroundPhotosDisplay">
    <div class="photoRow">
      <div><img v-on:click="this.changeBackground" id="bali" class="backgroundPhoto row1" src="../../assets/bali.jpg"
                alt="green nature in Bali"></div>
      <div><img v-on:click="this.changeBackground" id="pinkBeach" class="backgroundPhoto row1"
                src="../../assets/pinkishBeach.jpg" alt="Beach"></div>
    </div>
    <div class="photoRow">
      <div><img v-on:click="this.changeBackground" id="lakeMountain" class="backgroundPhoto row2"
                src="../../assets/water.jpg" alt="lake and mountain"></div>
      <div><img v-on:click="this.changeBackground" id="oceanSun" class="backgroundPhoto row2"
                src="../../assets/ocean.jpg" alt="ocean"></div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "BackgroundImage.vue",
    computed: {
      backgroundImagePath: {
        get() {
          return this.$store.getters['settings/backgroundImagePath']
        }
      },
    },
    methods: {
      changeBackground(e) {
        /*        document.getElementById('bali').style.border = 'none';
                document.getElementById('pinkBeach').style.border = 'none';
                document.getElementById('lakeMountain').style.border = 'none';
                document.getElementById('oceanSun').style.border = 'none';*/
        console.log("HEUAAA: ", document.getElementById('bali'))

        switch (e.target.id) {
          case 'bali':
            this.$store.commit('settings/setBackgroundImagePath', '_nuxt/assets/bali.jpg');
            this.$store.commit('settings/setShowBackgroundImagePicker', false)
            break;
          case 'pinkBeach':
            this.$store.commit('settings/setBackgroundImagePath', '_nuxt/assets/pinkishBeach.jpg');
            this.$store.commit('settings/setShowBackgroundImagePicker', false)
            break;
          case 'lakeMountain':
            this.$store.commit('settings/setBackgroundImagePath', '_nuxt/assets/water.jpg');
            this.$store.commit('settings/setShowBackgroundImagePicker', false)
            break;
          case 'oceanSun':
            this.$store.commit('settings/setBackgroundImagePath', '_nuxt/assets/ocean.jpg');
            this.$store.commit('settings/setShowBackgroundImagePicker', false)
            break;
        }
      },
    },
    watch: {
      backgroundImagePath: function (val) {
        console.log('Test:', this.backgroundImagePath, val, document.getElementById('bali'));
        document.getElementById('bali').style.border = 'none';
        document.getElementById('pinkBeach').style.border = 'none';
        document.getElementById('lakeMountain').style.border = 'none';
        document.getElementById('oceanSun').style.border = 'none';
        switch(this.backgroundImagePath){
          case '_nuxt/assets/bali.jpg':
            document.getElementById('bali').style.border = 'solid 3px #3CBB75';
            break;
          case '_nuxt/assets/pinkishBeach.jpg':
            document.getElementById('pinkBeach').style.border = 'solid 3px #3CBB75';
            break;
          case '_nuxt/assets/water.jpg':
            document.getElementById('lakeMountain').style.border = 'solid 3px #3CBB75';
            break;
          case '_nuxt/assets/ocean.jpg':
            document.getElementById('oceanSun').style.border = 'solid 3px #3CBB75';
            break;
        }
      },
    },
    mounted() {
      document.getElementById('bali').style.border = 'solid 3px #3CBB75';
    }
  }


</script>
<style scoped>
  .backgroundPhotosDisplayContainer {
    min-width: 300px;
    min-height: 400px;
  }

  .backgroundPhotosDisplay {
    top: 54px;
    width: 100%;
    height: 435px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .photoRow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 20px;
    margin-right: 20px;
  }

  .backgroundPhoto {
    width: 145px;
    height: 190px;
    margin: 5px;
  }

  .row1 {
    margin-top: 20px;
    margin-bottom: 5px;
  }

  .row2 {
    margin-top: 5px;
    margin-bottom: 20px;
  }
</style>
