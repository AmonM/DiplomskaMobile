<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Seznam eksperimentov
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="refresh"
          aria-label="Menu"
          @click="refresh();"
        />
        <q-btn
          flat
          dense
          round
          icon="add"
          @click="addExp()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container >
      <router-view style="height:10%"/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
    };
  },
  methods: {
    addExp(){
      this.$q.notify("Add new experiment.")
      //TODO add new experiment
    },
    notification(message, color){
        if(this.$q.platform.is.desktop){
          this.$q.notify({
            message: message,
            color: color,
            position: "top"
          })
        }else{
          this.$q.notify({
            message: message,
            color: color
          })
        }
    },
    refresh(){
      this.$store.dispatch("Experiments/fetchExperiments").then(message =>{
        this.notification(message, "info")
      }).catch(error =>{
        this.notification(error, "negative")
      });
    }
  }
};
</script>
