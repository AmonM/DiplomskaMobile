<template>
  <q-page class="q-pa-md">
    <highcharts :options="chartOptions" class="full-width"></highcharts>
  </q-page>
</template>

<script>
import { Chart } from "highcharts-vue";
import { Utils } from "./../Utils";
export default {
  components: {
    highcharts: Chart
  },
  created() {7
    this.chartOptions.series[0].data = this.dataG;
    this.chartOptions.series[1].data = Utils.smoothData(this.dataG);

    this.$nextTick(() => {
      window.screen.orientation
        .lock("landscape")
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: (5.8 / 16) * 100 + "%",
          type: "spline",
          zoomType: "x",
          redraw: true
        },
        yAxis: {
          zoomEnabled: true,
          title: {
            text: "Vrednosti"
          }
        },
        xAxis: {
          zoomEnabled: true,
          allowDecimals: false
        },
        title: {
          text: ""
        },
        series: [
          {
            name: "Surovi podatki",
            data: [] // sample data
          },
          {
            name: "Zglajeni podatki",
            data: []// sample data
          }
        ]
      }
    };
  },
  watch:{
    dataG: function(){
      this.chartOptions.series[0].data = this.dataG;
      this.chartOptions.series[1].data = Utils.smoothData(this.dataG);
    }
  },
  computed:{
    dataG:{
      get(){
        return this.$store.state.SelectedExp.Chart[this.$route.params.info];    
      }
    }
  }
};
</script>
