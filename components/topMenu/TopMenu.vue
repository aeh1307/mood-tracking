<template>
  <div class="topMenu">
    <v-container class="topMenuContainer">

  <!--    <div class="custom-select" v-if="isStatisticPage">
        <select id="selectInput" class="select-items" @change="switchPage" v-model="selectedPage">
          <option class="itemOptions" value="Calendar">Calendar</option>
          <option class="itemOptions" value="Details">Details</option>
          <option class="itemOptions" value="Stats">Stats</option>
          <option class="itemOptions" value="Achievements">Achievements</option>
        </select>
      </div>-->

        <div class="calendar" v-if="isStatisticPage">Calendar</div>
<!--      <div class="custom-select text-white" v-if="isStatisticPage">
        <v-app color="transparent" class="transparent text-white">
          <v-card class="vCard text-white" color="transparent">
            <v-select
              @change="this.switchPage"
              v-model="selectedPage"
              class="custom text-white"
              :items="statPages"
              color="white"
              item-text="white"
              :width="100"
            >
            </v-select>
          </v-card>
        </v-app>
      </div>-->
      <v-icon class="backButton" v-if="isStatisticPage" v-on:click="goBack">fas fa-chevron-left</v-icon>
      <div class="hamburgerMenu" v-on:click="openMenu">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="menuOptions">
        <!--  <a class="constraint">Profile settings</a>
          <a class="constraint">General settings</a>
          <a class="constraint">Goals</a>
          <a class="constraint">Reminders</a>-->
          <a v-on:click="chooseBackground">Customize Background Photo</a>
        </div>
      </div>
    </v-container>

  </div>
</template>
<script>
export default {
  name: 'TopMenu.vue',
  computed: {
    isStatisticPage() {
      if (this.$route.path.match("^/$")) {
        return false;
      }
      return true;
    },
    showBackgroundImagePicker: {
      get() {
        return this.$store.getters['settings/showBackgroundImagePicker']
      }
    },
    showCalendar: {
      get() {
        return this.$store.getters['statistics/showCalendar']
      }
    },
    showStats: {
      get() {
        return this.$store.getters['statistics/showStats']
      }
    },
    showCalendarMoodDetails: {
      get() {
        return this.$store.getters['statistics/showCalendarMoodDetails']
      }
    },
    selectedPage: {
      get() {
        return this.$store.getters['statistics/selectedPage']
      },
      set(value){
        this.$store.commit('statistics/setSelectedPage', value);
      }
    },
  },
  data() {
    return {
/*      selectedPage: this.$store.getters['statistics/selectedPage'],*/
      statPages: [
        'Calendar',
        'Details',
        'Stats',
        'Achievements'
      ]
    }
  },
  methods: {
    openMenu: function () {
      let hamburger = this.$el.querySelector('.hamburgerMenu');
      let dropdown = this.$el.querySelector('.menuOptions');
      hamburger.classList.toggle("change");
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      } else {
        dropdown.style.display = "block";
      }
    },
    goBack: function () {
      this.$router.push(this.$router.options.base);
      this.$store.commit('statistics/setShowCalendar', true);
      this.$store.commit('statistics/setShowStat', false);
      this.$store.commit('statistics/setSelectedPage', 'Calendar');
    },
    chooseBackground: function () {
      this.$store.commit('settings/setShowBackgroundImagePicker', true)
    },
    calendarView() {
      this.$store.commit('statistics/setShowCalendar', true);
      this.$store.commit('statistics/setShowMoodSection', true);
      this.$store.commit('statistics/setShowCalendarMoodDetails', false);
      this.$store.commit('statistics/setShowStat', false);
    },
    detailView() {
      this.$store.commit('statistics/setShowCalendarMoodDetails', true);
      this.$store.commit('statistics/setShowCalendar', false);
      this.$store.commit('statistics/setShowMoodSection', false);
      this.$store.commit('statistics/setShowStat', false);
    },
    statsView() {
      this.$store.commit('statistics/setShowStat', true);
      this.$store.commit('statistics/setShowCalendar', false);
      this.$store.commit('statistics/setShowMoodSection', false);
      this.$store.commit('statistics/setShowCalendarMoodDetails', false);
    },
    switchPage: function () {
      if (this.selectedPage === 'Calendar') {
        this.calendarView();
      }
      if (this.selectedPage === 'Details') {
        this.detailView();
      }
      if (this.selectedPage === 'Stats') {
        this.statsView();
      }
    },
  },
  watch: {
    selectedPage: function (){
      let element = document.getElementById('selectInput');
      element.value = this.selectedPage;
      this.switchPage();
    }
  }
}
</script>
<style scoped>
.topMenu {
  position: fixed;
  background: linear-gradient(to right, #24C6DC 0%, #514A9D 100%);
  min-width: 100%;
  max-width: 100%;
  height: 55px;
  overflow: hidden;
  z-index: 1;
}

.theme--light.v-select .v-select__selection--comma {
  color: white !important;
}

.topMenuContainer {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
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

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  transform: rotate(45deg) translate(-8px, -6px);
}

.menuOptions {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 100vw;
  height: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  top: 10px;
  font-size: 30px;
  left: 10px;
  position: absolute;
}

.calendar {
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 18px;
  font-family: 'Manrope', sans-serif;
 /* position: relative;*/
/*  min-height: 55px;*/
}

.custom-select {
 /* min-width: 250px;*/
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 18px;
  font-family: 'Manrope', sans-serif;
  position: relative;
}

.custom-select select {
  color: #fefefe;
  background-color: transparent;
  text-align-last: center;
}

#selectInput:focus {
  outline: none;
}

/* Style the arrow inside the select element: */
#selectInput:after {
  position: absolute;
  content: "";
  top: 19px;
  right: 50px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  /*border-color: #fff transparent transparent transparent;*/
}
/* Point the arrow upwards when the select box is open (active): */
#selectInput .select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}


.select-selected {
  background-color: #5a5b60;
}

.itemOptions {
  background-color: white;
  color: black;
}

.select-items  {
  text-align: center;
}
.constraint {
  background-color: #c8c8ca;
}

.transparent {
  background-color: transparent !important;
  border-style: none !important;
}

.vCard {
  box-shadow: none;
}

</style>


