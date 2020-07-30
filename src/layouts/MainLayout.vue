<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated style="height: 3.2222rem" class="q-pt-sm">
      <q-toolbar>
        <!--<q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          Seznam eksperimentov
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <!--<q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-4"
    >
      <q-list>
        <q-item-label header class="text-white bg-primary" style="height: 3.2222rem; font-size: 1.3rem">
          Meni
        </q-item-label>
        <MyMenu
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="newSelected(link.title)"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="content" >
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
  }
};
</script>

<style lang="sass" scoped>
.content
  height: calc(100% - 3.2222rem)
</style>