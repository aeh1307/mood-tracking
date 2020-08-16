<template>
  <div class="stats">
    <h5>Statistics coming ...</h5>
    <div class="charts">
        <apexchart type="area" height="350" :options="chartOptions" :series="series"/>

      <!-- <li v-for="mood in moods">{{mood}}</li>-->
      Show in bubble chart:
      <ul>
        <li class="listElement">Total number of mood trackings: {{this.moods.length}}</li>
        <li class="listElement"> Longest chain/streak of trackings</li>
      </ul>

    </div>
    <div class="charts">
      Show in linear chart:
    <!--  Most tracked mood:{{this.mostTrackedMood}}-->

      <ul>
        <li class="listElement"> Number of mood trackings this day</li>
        <li class="listElement"> Number of mood trackings this week</li>
        <li class="listElement"> Number of mood trackings this month</li>
        <li class="listElement"> Perhaps a simple weekly mood chart?
          Showing which types of moods are tracked on which weekday the current week </li>
      </ul>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Stats.vue',
    computed: {
      moods: { get(){ return this.$store.getters['statistics/moods'] } },
    },
    data() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }]
      }
    },
    methods: {
      /*generateData(baseval, count, yrange) {
        let i = 0;
        let series = [];
        while (i < count) {
          let x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
          let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
          let z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
          series.push([x, y, z]);
          baseval += 86400000;
          i++;
        }
        return series;
      },*/

      /*   async fetchData() {
        let data = await d3.json("./tweets.json");
        this.loadData = data;
      },*/
      findMostTrackedMood() {
  /*      let mostFrequentEmotion;
        let moodFrequency = {};
        this.moods.forEach(trackedMood => {
          moodFrequency[trackedMood] = moodFrequency[trackedMood] ? moodFrequency[trackedMood] + 1 : 1;
        })
        console.log();
        this.mostTrackedMood = mostFrequentEmotion;*/
      }
    },
    watch: {
      moods: function () {
        this.findMostTrackedMood()
      }
    }
  }

</script>
<style scoped>
h5 {
  text-align: center;
}
  .stats {
    background-color: white;
    height: 76vh;
    min-width: 100vw;
    border-radius: 5px;
    top: 0;
  }
  .charts {
    min-height: 180px;
    max-width: 290px;
    padding: 15px;
    font-size: 16px;
  }

  .listElement {
    font-size: 14px;
    margin-left: 15px;
  }
</style>
