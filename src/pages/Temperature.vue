<template>
  <q-page class="q-pa-md">
    <highcharts :options="Temperature" class="full-width"></highcharts>
  </q-page>
</template>

<script>
import { Chart } from "highcharts-vue";
import { Utils } from "./../Utils.js";

export default {
  components: {
    highcharts: Chart
  },
  data() {
    return {
      Temperature: {
        chart: {
          height: (5.8 / 16) * 100 + "%",
          type: "spline",
          zoomType: "x",
          redraw: true
        },
        yAxis: {
          zoomEnabled: true
        },
        xAxis: {
          zoomEnabled: true,
          allowDecimals: false
        },
        title: {
          text: "Temperatura"
        },
        series: [
          {
            name: "Temperatura °C",
            data: [] // sample data
          },
          {
            name: "Zglajena temperatura °C",
            data: [] // sample data
          }
        ]
      }
    };
  },
  created() {
    this.$axios
      .get("/getData?expID=4")
      .then(response => {
        var DataArray = response.data;

        for (var index in DataArray) {
          this.Temperature.series[0].data.push(DataArray[index].Temperature);
        }
        this.Temperature.series[1].data = Utils.smoothData(
          this.Temperature.series[0].data
        );
      })
      .catch((error) =>{
        this.$q.notify({
          message: "Pridobivanje podatkov ni uspelo.",
          color: "negative"
        });
      });

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
  }
};
</script>
