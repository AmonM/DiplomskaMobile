<template>
  <q-page class="q-ma-md">
    <highcharts :options="chartOptions" class="full-width"></highcharts>
  </q-page>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'PageIndex',
  components:{
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 250,
          type: 'spline',
          zoomType: 'xy'
        },
        yAxis: {
          zoomEnabled: true
        },  
        xAxis:{
          zoomEnabled: true,
          allowDecimals: false
        },
        title:{
          text:"Moj Moj<3"
        },
        series: [{
          data: [1,2,3,2.5,2.3,2.6,2.5,2.6,2.6,2.6,2.7,3] // sample data
        }]
      }
    }
  }
}
</script>
