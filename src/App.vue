<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/high-contrast-dark";
import Vue from 'vue'
import { Notify } from 'quasar'


export default {
  name: 'App',
  created(){
    this.$q.dark.set(false);
    var NormalTheme = Highcharts.getOptions();
    Highcharts.setOptions({
      credits:{
        enabled: false
      }
    })
    Vue.use(Highcharts);
  }
}
</script>
