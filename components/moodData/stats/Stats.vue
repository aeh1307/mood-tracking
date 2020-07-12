<template>
  <div class="stats">
    <div class="charts">
      <!--<apex-charts.component
        width="500" type="bar"
        :options="options" :series="series"/>-->
      <!-- <li v-for="mood in moods">{{mood}}</li>-->
      Show in bubble chart:
      <ul>
        <li class="listElement">Total number of mood trackings: {{this.moods.length}}</li>
      </ul>

    </div>
    <div class="charts">
      Show in linear chart:
      Most tracked mood:{{this.mostTrackedMood}}
      <ul>
        <li class="listElement"> Number of mood trackings this day</li>
        <li class="listElement"> Number of mood trackings this week</li>
        <li class="listElement"> Number of mood trackings this month</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import VueApexCharts from 'vue-apexcharts';

  export default {
    name: 'Stats.vue',
    components: {
      apexcharts: VueApexCharts
    },
    data() {
      return {
        options: {
          chart: {
            id: 'apexchart'
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ]
          }
        },
        series: [{
          name: 'series-1',
          data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139]
        }],
        loadData: {},
        moods: [],
        mostTrackedMood: '',
        trackedToday: 0,
        trackedThisWeek: 0,
        trackedThisMonth: 0,
        daysStreak: 0,
        /*series: [{
          name: 'Product1',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
          {
            name: 'Product2',
            data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
              min: 10,
              max: 60
            })
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'bubble',
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: 'gradient',  /!*opacity: 0.8,*!/
          },
          title: {
            text: '3D Bubble Chart'
          },
          xaxis: {
            tickAmount: 12,
            type: 'datetime', /!*'category',*!/
            labels: {
              rotate: 0,
            }
          },
          yaxis: {
            max: 70
          },
          theme: {
            palette: 'palette2'
          }
        },*/
      }
    },
    mounted() {
      this.$fireStore.collection('users').doc('1').collection('moodTracking')
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.moods.push(doc.data())
          })
        })
    /*  this.findMostTrackedMood();*/
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
  .stats {
    background-color: white;
    min-height: 375px;
    min-width: 290px;
    border-radius: 5px;
    top: -25px;
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
