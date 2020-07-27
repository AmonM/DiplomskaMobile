<template>
  <q-page class="q-ma-md">
    <highcharts :options="Humidity" class="full-width"></highcharts>
  </q-page>
</template>

<script>
import { Chart } from "highcharts-vue";

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

        var povp = new Array();

        for (var i = 0; i < this.Humidity.series[0].data.length; i++) {
          if (i != 0 && i < this.Humidity.series[0].data.length - 2) {
            povp[i] =
              (this.Humidity.series[0].data[i - 1] +
                this.Humidity.series[0].data[i] +
                this.Humidity.series[0].data[i + 1] +
                this.Humidity.series[0].data[i + 2]) /
              4;
          } else if (i == 0) {
            povp[i] =
              (this.Humidity.series[0].data[i + 1] +
                this.Humidity.series[0].data[i] +
                this.Humidity.series[0].data[i + 2]) /
              3;
          } else {
            povp[i] =
              (this.Humidity.series[0].data[i - 1] +
                this.Humidity.series[0].data[i]) /
              2;
          }
        }

        this.Humidity.series[1].data = povp;
      })
      .catch(error => {
        console.log(error);
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
  beforeDestroy() {
    window.screen.orientation
      .lock("portrait-primary")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      Humidity: {
        chart: {
          height: (6 / 16) * 100 + "%",
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
