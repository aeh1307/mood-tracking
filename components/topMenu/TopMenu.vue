<template>
  <div class="topMenu">
    <div class="container">
      <v-icon class="backButton" v-if="showBackButton" v-on:click="goBack">fas fa-chevron-left</v-icon>
      <div class="hamburgerMenu" v-on:click="openMenu">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="menuOptions">
          <a>Profile settings</a>
          <a>General settings</a>
          <a v-on:click="chooseBackground">Customize Background Photo</a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "TopMenu.vue",
    data() {
      return{
        computed: {
          showBackgroundImagePicker: {
            get() {return this.$store.getters['settings/showBackgroundImagePicker']}
          },
        }
      }
    },
    methods: {
        openMenu: function() {
          let hamburger = this.$el.querySelector('.hamburgerMenu')
          let dropdown = this.$el.querySelector('.menuOptions')

          hamburger.classList.toggle("change");
           if (dropdown.style.display === "block") {
             dropdown.style.display = "none";
           } else {
             dropdown.style.display = "block";
           }
        },
      goBack: function() {
          this.$router.push(this.$router.options.base);
          this.$store.commit('statistics/setShowCalendar', true)
          this.$store.commit('statistics/setShowStat', false)
      },
      chooseBackground: function() {
        this.$store.commit('settings/setShowBackgroundImagePicker', true)
      },
    },
    computed: {
      showBackButton() {
        if(this.$route.path.match("^/$")) {
          return false;
        }
        return true;
      }
    }
  }

</script>
<style scoped>
  .topMenu {
    position: fixed;
   /* background-color: rgb(46 119 191);*/
    background: linear-gradient(to right, #24C6DC 0%, #514A9D 100%);

    /*background-color: rgb(42 106 170);*/
    opacity: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 15vw;
    overflow: hidden;
    z-index: 1;
  }

  .container {
    min-width: 100%;
    min-height: 100%;
  }
  .hamburgerMenu {
    position: fixed;
    top: 10px;
    right: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .bar1, .bar2, .bar3 {
    width: 30px;
    height: 4px;
    background-color: white;
    margin: 3px 0;
    transition: 0.4s;
    justify-content: flex-end;

  }

  .change .bar1 {
    transform: rotate(-45deg) translate(-8px, 6px);
  }
  .change .bar2 {opacity: 0;}

  .change .bar3 {
    transform: rotate(45deg) translate(-8px, -6px);
  }

  .menuOptions {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 100vw;
    height: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 0;
    top: 145%;
    right: -65%;
  }

  .menuOptions a {
    color: black;
    padding: 12px 0;
    text-decoration: none;
    display: block;
    border-bottom: 1px solid #44719a;
    text-align: center;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
  }
  .backButton {
    color: white;
    top: 2px;
    font-size: 30px;
    left: 5px;
  }
</style>
