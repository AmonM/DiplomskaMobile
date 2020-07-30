<template>
  <q-page class="q-pa-md">
    <highcharts :options="Humidity" class="full-width"></highcharts>
  </q-page>
</template>

<script>
import { Chart } from "highcharts-vue";
import { Utils } from "./../Utils";
export default {
  components: {
    highcharts: Chart
  },
  created() {
    this.$axios
      .get("/getData?expID=4")
      .then(response => {
        var DataArray = response.data;

        for (var index in DataArray) {
          this.Humidity.series[0].data.push(DataArray[index].Humidity);
        }

        this.Humidity.series[1].data = Utils.smoothData(
          this.Humidity.series[0].data
        );
      })
      .catch(function(error){
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
  },
  data() {
    return {
      Humidity: {
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
          text: "Vlaga"
        },
        series: [
          {
            name: "Vlaga %",
            data: [] // sample data
          },
          {
            name: "Zglajena vlaga %",
            data: [] // sample data
          }
        ]
      }
    };
  }
};
</script>
