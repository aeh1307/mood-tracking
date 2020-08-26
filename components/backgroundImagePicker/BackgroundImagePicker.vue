<template class="backgroundPhotosDisplayContainer">
  <div class="backgroundPhotosDisplay">
    <div class="photoRow">
      <div><img v-on:click="this.changeBackground" id="bali" class="backgroundPhoto row1" src="~/assets/bali.jpg"
                alt="green nature in Bali"></div>
      <div><img v-on:click="this.changeBackground" id="pinkBeach" class="backgroundPhoto row1"
                src="~/assets/pinkishBeach.jpg" alt="Beach"></div>
    </div>
    <div class="photoRow">
      <div><img v-on:click="this.changeBackground" id="lakeMountain" class="backgroundPhoto row2"
                src="~/assets/water.jpg" alt="lake and mountain"></div>
      <div><img v-on:click="this.changeBackground" id="oceanSun" class="backgroundPhoto row2"
                src="~/assets/ocean.jpg" alt="ocean"></div>
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
        switch (e.target.id) {
          case 'bali':
              this.$store.commit('settings/setBackgroundImagePath', 'baliBackgroundImage');
              this.$store.commit('settings/setShowBackgroundImagePicker', false);
          break;
          case 'pinkBeach':
            this.$store.commit('settings/setBackgroundImagePath', 'pinkBeachBackgroundImage');
            this.$store.commit('settings/setShowBackgroundImagePicker', false);
            break;
          case 'lakeMountain':
            this.$store.commit('settings/setBackgroundImagePath', 'lakeMountainBackgroundImage');
            this.$store.commit('settings/setShowBackgroundImagePicker', false);
            break;
          case 'oceanSun':
            this.$store.commit('settings/setBackgroundImagePath', 'oceanSunBackgroundImage');
            this.$store.commit('settings/setShowBackgroundImagePicker', false);
            break;
        }
      },
    },
    mounted() {
      switch(this.backgroundImagePath){
        case 'baliBackgroundImage':
          document.querySelector('#bali').style.border = 'solid 3px #3CBB75';
          break;
        case 'pinkBeachBackgroundImage':
          document.querySelector('#pinkBeach').style.border = 'solid 3px #3CBB75';
          break;
        case 'lakeMountainBackgroundImage':
          document.querySelector('#lakeMountain').style.border = 'solid 3px #3CBB75';
          break;
        case 'oceanSunBackgroundImage':
          document.querySelector('#oceanSun').style.border = 'solid 3px #3CBB75';
          break;
      }
    },
  }


</script>
<style scoped>
  .backgroundPhotosDisplayContainer {
    min-width: 300px;
    min-height: 400px;
  }

  .backgroundPhotosDisplay {
    top: 55px;
    width: 100%;
    height: 95%;
    z-index: 99;
    position: fixed;
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
/*  #bali{
    border: solid 3px #3CBB75;
  }*/

  #bali, #pinkBeach, #lakeMountain, #oceanSun {
    border: solid 3px white;
  }
</style>
