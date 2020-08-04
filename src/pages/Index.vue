<template>
  <q-page class="q-pa-sm bg-grey-3">
    <exp-info
      v-for="experiment in experiments"
      :key="experiment.id"
      :title="experiment.name"
      :description="experiment.desc"
      :sensors="experiment.sensors"
      :start="experiment.start"
      :end="experiment.end"
      @click="
        $router.push({
          name: 'experiment',
          params: { experiment: experiment.id }
        })
      "
    ></exp-info>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  components: {
    expInfo: () => import("../components/ExpInfo.vue")
  },
  data() {
    return {
      sensors: undefined,
      experiments: []
    };
  },
  created() {
    this.loadData();
    this.$nextTick(() => {
      window.screen.orientation
        .lock("portrait")
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  methods: {
    loadData() {
      console.log("Tukaj!")
      this.$axios
        .get("/getInfo")
        .then(response => {
          var DataArray = response.data;
          var experiment;

          for (var data in response.data) {
            experiment = new Object();
            experiment.id = DataArray[data].exp_ID;
            experiment.name = DataArray[data].exp_name;
            experiment.desc = DataArray[data].exp_desc;
            if (DataArray[data].exp_start_date)
              experiment.start = new Date(
                DataArray[data].exp_start_date.replace(" ", "T")
              ).toLocaleString();
            if (DataArray[data].exp_end_date)
              experiment.end = new Date(
                DataArray[data].exp_end_date.replace(" ", "T")
              ).toLocaleString();
            experiment.sensors = {};

            experiment.sensors[1] = {
              name: "Co2",
              on: DataArray[data].Co2 ? true : false
            };
            experiment.sensors[2] = {
              name: "C2H4",
              on: DataArray[data].C2H4 ? true : false
            };
            experiment.sensors[3] = {
              name: "O2",
              on: DataArray[data].O2 ? true : false
            };
            experiment.sensors[4] = {
              name: "RH",
              on: DataArray[data].RH ? true : false
            };
            experiment.sensors[5] = {
              name: "T",
              on: DataArray[data].T ? true : false
            };
            this.experiments.push(experiment);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
