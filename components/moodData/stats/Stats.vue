<template>
  <div class="stats">
<!--    <h6>Total number of tracked moods</h6>
    <div class="charts">
      <apexchart type="radialBar" width="80" height="125" :options="tenseNervousOptions" :series="tenseNervousOptions.series"/>
      <apexchart type="radialBar" width="80" height="125" :options="irritatedAnnoyedOptions" :series="irritatedAnnoyedOptions.series"/>
      <apexchart type="radialBar" width="80" height="125" :options="irritatedAnnoyedOptions" :series="irritatedAnnoyedOptions.series"/>
      <apexchart type="radialBar" width="80" height="125" :options="irritatedAnnoyedOptions" :series="irritatedAnnoyedOptions.series"/>
      &lt;!&ndash;        <v-icon>fas fa-frown-open</v-icon>&ndash;&gt;
    </div>
    <div class="charts">
      <apexchart type="radialBar" width="80" height="125" :options="tenseNervousOptions" :series="tenseNervousOptions.series"/>
      <apexchart type="radialBar" width="80" height="125" :options="irritatedAnnoyedOptions" :series="irritatedAnnoyedOptions.series"/>
      <apexchart type="radialBar" width="80" height="125" :options="irritatedAnnoyedOptions" :series="irritatedAnnoyedOptions.series"/>
    </div>-->

    <div class="charts">
      <apexchart type="line" width="300" height="300" :options="lineChartOptions" :series="lineChartOptions.series"/>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Stats.vue',
    computed: {
      moods: { get(){ return this.$store.getters['statistics/moods'] } },
      selectedDateMoods: { get(){ return this.$store.getters['statistics/selectedDateMoods'] } },
      selectedDate: { get(){ return this.$store.getters['statistics/selectedDate'] } },
    },
    data() {
      return {
        totalNumberOfMoodTrackings: 0,
        degrees: [],
        emotions: [],
        times: [],
        emotionList: [],
        lastWeekMoods: [],
 /*       degrees: [],
        emotions: [],
        times: [],
        emotionList: this.emotions.unique,*/
        // Tense/ nervous options:
        tenseNervousOptions: {
          chart: {
            height: 280,
            type: "radialBar"
          },
          series: [70],
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%",
                background: "#DEDEDE"
              },
              track: {
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  blur: 4,
                  opacity: 0.15
                }
              },
              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#111",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                  fontSize: "30px",
                  show: true
                }
              }
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#87D4F9"],
                stops: [30, 100]
              }
            },
            stroke: {
              lineCap: "round",
            },
            labels: [""],
            colors: ["#3CBB75"],
          },
        // Irritated/Annoyed
        irritatedAnnoyedOptions: {
          chart: {
            height: 280,
            type: "radialBar"
          },
          series: [70],
          radialBar: {
            hollow: {
              margin: 0,
              size: "70%",
              background: "#DEDEDE"
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#111",
                fontSize: "13px"
              },
              value: {
                color: "#fff",
                fontSize: "30px",
                show: true
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: ["#87D4F9"],
              stops: [30, 100]
            }
          },
          stroke: {
            lineCap: "round",
          },
          labels: [""],
          colors: ["#DE6465"],
        },
        // Excited/ Lively
        // Cheerful/Happy
        // Bored/Weary
        // Gloomy/Sad
        // Relaxed/Calm

        // Selected Day chart:
        lineChartOptions: {
          series: [
            {
              name: "Tense/Nervous",
              type: "line",
              data: [30, 10, 25, 10, 5, 21, 23, 30]
            },
            {
              name: "Irritated/Annoyed",
              type: "line",
              data: [23, 12, 14, 15, 32, 6, 20, 19]
            },
            {
              name: "Excited/Lively",
              type: "line",
              data: [22, 12, 15, 35, 10, 11, 23, 13]
            },
            {
              name: "Cheerful/Happy",
              type: "line",
              data: [30, 11, 0, 10, 4, 11, 23, 13]
            },
            {
              name: "Bored/Weary",
              type: "line",
              data: [0, 1, 4, 3, 6, 20, 25, 15]
            }
            ,
            {
              name: "Gloomy/Sad",
              type: "line",
              data: [25, 20, 4, 3, 6, 2, 4, 0]
            }
            ,
            {
              name: "Relaxed/Calm",
              type: "line",
              data: [30, 20, 4, 3, 6, 2, 4, 20]
            },
          ],
          chart: {
            type: 'area',
            stacked: false,
            group: 'social',
            height: 160,
            zoom: {
              type: 'x',
              enabled: false,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          markers: {
            size: 0,
          },
          title: {
            text: 'Mood trend this week',
            align: 'center'
          },
          fill: {
            /*type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 1.0,
              opacityTo: 0,
              stops: [0, 90, 100]
            },*/
          },
          colors: ['#3CBB75', '#DE6465', '#EB7955', '#F7CB50','#8B42CC','#3D3D3D','#425CCC'],
          yaxis: {
            labels: {
              minWidth: 40,
            },
            title: {
              text: ''
            },
          },
          xaxis: {
            categories:  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val / 1000000).toFixed(0)
              }
            }
          },
          annotations: {
            yaxis: [{
              y: 8200,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
                text: 'Support',
              }
            }, {
              y: 8600,
              y2: 9000,
              borderColor: '#000',
              fillColor: '#FEB019',
              opacity: 0.2,
              label: {
                borderColor: '#333',
                style: {
                  fontSize: '10px',
                  color: '#333',
                  background: '#FEB019',
                },
                text: 'Y-axis range',
              }
            }],
            xaxis: [{
              x: new Date().getTime(),
              strokeDashArray: 0,
              borderColor: '#775DD0',
              label: {
                borderColor: '#775DD0',
                style: {
                  color: '#fff',
                  background: '#775DD0',
                },
                text: 'Mood',
              }
            }, {
              x: new Date().getTime(),
              x2: new Date().getTime(),
              fillColor: '#B3F7CA',
              opacity: 0.4,
              label: {
                borderColor: '#B3F7CA',
                style: {
                  fontSize: '10px',
                  color: '#fff',
                  background: '#00E396',
                },
                offsetY: -10,
                text: 'X-axis range',
              }
            }],
            points: [{
              x: new Date('01 Dec 2017').getTime(),
              y: 8607.55,
              marker: {
                size: 8,
                fillColor: '#fff',
                strokeColor: 'red',
                radius: 2,
                cssClass: 'apexcharts-custom-class'
              },
              label: {
                borderColor: '#FF4560',
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: '#FF4560',
                },

                text: 'Point Annotation',
              }
            }, {
              x: new Date().getTime(),
              y: 9340.85,
              marker: {
                size: 0
              },
            }]
          },
        }

      } // end return
    }, // end data
    methods: {
      findLastWeekMoods: function () {
        this.lastWeekMoods = this.moods.filter( mood => {
          return null;
          }
        )
      }
    },
    watch: {
      moods: function () {

      }
    },
    mounted() {
      console.log("TEst: ", this.selectedDateMoods);
      this.selectedDateMoods.forEach(trackedMood => {
        this.degrees.push(trackedMood.degreeOfEmotion);
        this.emotions.push(trackedMood.emotion);
        this.times.push(trackedMood.time);
      })

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      this.emotionList = this.emotions.filter( onlyUnique);
      console.log("Emotionlist: ", this.emotionList);

      let irritatedAnnoyed = [];
      let excitedLively = [];
      let cheerfulHappy = [];
      let boredWeary = [];
      let gloomySad = [];
      let relaxedCalm = [];

      /*let tenseNervous =  this.selectedDateMoods.filter(trackedMood => {
        return trackedMood.emotion = 'Tense/Nervous'
      })
      console.log("Tensetest: ", tenseNervous);*/
    }
  }

</script>
<style scoped>
  .stats {
    background-color: white;
    height: 76vh;
    min-width: 100vw;
    border-radius: 5px;
    top: 0;
  }
  .charts {
    max-width: 100vw;
    max-height: 200px;
    padding: 0;
    font-size: 16px;
    display: flex;
    justify-content: center;
    border-top: 1px solid lightgray;
  }

  .listElement {
    font-size: 14px;
    margin-left: 15px;
  }
</style>
