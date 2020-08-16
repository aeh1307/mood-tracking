import Vue from 'vue'

if(process.client){
  let VueApexCharts = require('vue-apexcharts');
  Vue.use(VueApexCharts)
  Vue.component('apexchart', VueApexCharts)
}
