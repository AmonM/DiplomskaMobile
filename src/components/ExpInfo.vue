<template>
  <q-card class="q-mb-md" @click="$emit('click')">
    <q-card-section>
      <div class="text-bold row q-mb-xs" style="font-size: 1.2222rem">
        {{ title }}
      </div>
      <div class="row q-mb-md desc">
        {{ description }}
      </div>
      <div class="row">
        {{ "Začetek:  " + start }}
      </div>
      <div>
        {{ "Konec: " + end }}
      </div>
      <q-separator class="row q-my-md" />
      <div class="row">
        <used-sensor-notif
          v-for="(senzor, index) in sensors"
          :key="index"
          :sensor="senzor.name"
          :on="senzor.on"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "expInfo",
  components: {
    UsedSensorNotif: () => import("./UsedSensorNotif")
  },
  created() {},
  data() {
    return {};
  },
  props: {
    title: { type: String, required: false, default: "Naslov eksperimenta" },
    description: {
      type: String,
      required: false,
      default: "Delni opis eksperimenta, ki pride ravno do konca..."
    },
    start: { type: String, required: true },
    end: { type: String, required: false, default: "/" },
    sensors: { type: Object, required: true }
  }
};
</script>

<style lang="sass" scoped>
.desc
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
</style>
