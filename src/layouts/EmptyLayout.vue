<template>
  <q-layout>
    <q-header elevated style="height: 3.2222rem" class="q-pt-sm">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          @click="$router.go(-1)"
        />

        <q-toolbar-title class="title">
          Pregled poskusa
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="content">
      <router-view style="height:10%" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "EmptyLayout",
  components: {},
  data() {
    return {
        experiment: null,
    };
  },
  created(){
      this.experiment = this.$route.params.experiment
  },
  methods: {}
};
</script>

<style lang="sass" scoped>
.title
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
</style>
