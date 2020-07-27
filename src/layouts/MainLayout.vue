<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 3.2222rem">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <MyMenu
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="newSelected(link.title)"
        />
      </q-list>
    </q-drawer>

    <q-page-container style="max-height: 10px">
      <router-view />
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
  }
};
</script>
