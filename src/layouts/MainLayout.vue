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
import MyMenu from "components/MyMenu.vue";

const linksData = [
  {
    title: "Glavna stran",
    icon: "home",
    link: "/",
    isSelected: true
  },
  {
    title: "Graf temperature",
    icon: "insert_chart",
    link: "/temperature",
    isSelected: false
  },
  {
    title: "Graf vlage",
    icon: "insert_chart",
    link: "/humidity",
    isSelected: false
  }
];

export default {
  name: "MainLayout",
  components: { MyMenu },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      selected: null
    };
  },
  methods: {
    newSelected(title) {
      for (var i = 0; i < this.essentialLinks.length; i++) {
        if (this.essentialLinks[i].title === title) {
          this.essentialLinks[i].isSelected = true;
        } else {
          this.essentialLinks[i].isSelected = false;
        }
      }
    },
    addExp(){
      this.$q.notify("Add new experiment.")
      //TODO add new experiment
    }
  },
  created() {
    if (this.$route.path != "/") {
      for (var i = 0; i < this.essentialLinks.length; i++) {
        if (this.essentialLinks[i].title === "Glavna stran") {
          this.essentialLinks[i].isSelected = true;
        } else {
          this.essentialLinks[i].isSelected = false;
        }
      }
      this.$router.push("/");
    }
  },
  computed: {
  }
};
</script>
