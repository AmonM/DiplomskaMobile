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
      this.$store.dispatch("Experiments/fetchExperiments");
    }
  },
  computed:{
    experiments:{
      get(){
        return this.$store.state.Experiments.experiments;
      }
    }
  }
};
</script>
