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
  created() {
    this.$axios
      .get(`/getData?expID=${this.$store.state.SelectedExp.Exp.id}`)
      .then(response => {
        var DataArray = response.data;
        for (var index in DataArray) {
          switch (String(this.$store.state.SelectedExp.Title).toLowerCase()) {
            case "temperatura":
              this.chartOptions.series[0].data.push(
                DataArray[index].Temperature
              );
              break;
            case "vlaga":
              this.chartOptions.series[0].data.push(DataArray[index].Humidity);
              break;
            //TO-DO dokoncaj.
            default:
              break;
          }
        }

        this.chartOptions.series[1].data = Utils.smoothData(
          this.chartOptions.series[0].data
        );
      })
      .catch(() => {
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
      chartOptions: {
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
